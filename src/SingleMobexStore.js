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

    const composedURL = API + '?' + limitQuery + limitUserResults + '&' + offsetQuery + 30

    const response = await fetch(composedURL)
    const parsedResponse = await response.json()

    runInAction(() => {
      this.users = parsedResponse
    })

  }
}

decorate(SingleMobexStore, {
  users: observable
})

export default new SingleMobexStore()
