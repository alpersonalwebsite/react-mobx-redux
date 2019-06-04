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


class OtherUserStore {
  users = []

  fetchUsers = async () => {
    try {
      const composedURL = API + '?' + limitQuery + limitUserResults + '&' + offsetQuery + 20

      const response = await fetch(composedURL)
      const parsedResponse = await response.json()

      runInAction(() => {
        this.users = parsedResponse
      })
    } catch (err) {
      console.log(`mobexStores/OtherUserStore ${err}`)
    }
  }
}

decorate(OtherUserStore, {
  users: observable
})

export default OtherUserStore
