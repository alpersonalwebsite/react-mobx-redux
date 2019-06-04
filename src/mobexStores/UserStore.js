import {
  observable,
  runInAction,
  decorate
} from 'mobx';

import {
  API,
  limitQuery,
  limitUserResults,
  offsetQuery
} from '../apiConfiguration'


class UserStore {
  users = []

  fetchUsers = async () => {

    try {
      const composedURL = API + '?' + limitQuery + limitUserResults + '&' + offsetQuery + 10

      const response = await fetch(composedURL)
      const parsedResponse = await response.json()

      runInAction(() => {
        this.users = parsedResponse
      })
    } catch (err) {
      console.log(`mobexStores/UserStore ${err}`)
    }

  }
}

decorate(UserStore, {
  users: observable
})

export default UserStore
