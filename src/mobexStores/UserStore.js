import { observable, runInAction, decorate } from 'mobx'

import { buildUsersUrl, jsonOrThrow, readUsers } from '../apiConfiguration'

// One of two sub-stores hanging off the root store, so you can see how MobX handles
// several stores that each own a slice.
class UserStore {
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
      const response = await fetch(buildUsersUrl())
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

decorate(UserStore, {
  users: observable,
  loading: observable,
  error: observable
})

export default UserStore
