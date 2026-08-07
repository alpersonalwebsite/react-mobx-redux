import { observable, runInAction, decorate } from 'mobx'

import { buildUsersUrl, jsonOrThrow, readUsers } from './apiConfiguration'

// The other MobX arrangement: a standalone store exported as a ready-made INSTANCE,
// with no root store around it. Compare with mobexStores/index.js, where a RootStore
// constructs its children and hands each one a reference to itself. Both are common;
// the root-store version is what you want once stores need to talk to each other.
class SingleMobexStore {
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
      const response = await fetch(buildUsersUrl({ offset: 20 }))
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

decorate(SingleMobexStore, {
  users: observable,
  loading: observable,
  error: observable
})

const singleMobexStore = new SingleMobexStore()

export default singleMobexStore
