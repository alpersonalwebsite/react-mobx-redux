import { observable, runInAction, decorate } from 'mobx'

import { buildUsersUrl, jsonOrThrow, readUsers } from '../apiConfiguration'

// The second sub-store on the root store. Identical to UserStore apart from the
// offset, which is the point: two independent slices, each with its own observables.
class OtherUserStore {
  users = []
  loading = false
  error = null

  fetchUsers = async () => {
    // Every assignment that observers should react to has to happen inside an action.
    // Outside one, MobX either warns or silently does not notify, depending on
    // configuration, which is the usual first surprise with MobX.
    runInAction(() => {
      this.loading = true
      this.error = null
    })

    try {
      const response = await fetch(buildUsersUrl({ offset: 10 }))
      const parsed = await jsonOrThrow(response)

      runInAction(() => {
        this.users = readUsers(parsed)
        this.loading = false
      })
    } catch (err) {
      // Previously this was console.log and nothing else, so a failure left the store
      // looking exactly like a successful fetch that returned nobody.
      runInAction(() => {
        this.users = []
        this.error = err.message
        this.loading = false
      })
    }
  }
}

decorate(OtherUserStore, {
  users: observable,
  loading: observable,
  error: observable
})

export default OtherUserStore
