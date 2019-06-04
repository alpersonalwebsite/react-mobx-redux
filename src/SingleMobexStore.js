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
} from './apiConfiguration'


class SingleMobexStore {
  users = []

  fetchUsers = async () => {
    try {
      const composedURL = API + '?' + limitQuery + limitUserResults + '&' + offsetQuery + 30

      const response = await fetch(composedURL)
      const parsedResponse = await response.json()

      runInAction(() => {
        this.users = parsedResponse
      })

    } catch (err) {
      console.log(`SingleMobexStore ${err}`)
    }

  }
}

decorate(SingleMobexStore, {
  users: observable
})

export default new SingleMobexStore()
