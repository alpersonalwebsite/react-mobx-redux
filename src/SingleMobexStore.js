import {
  observable,
  runInAction,
  decorate
} from 'mobx';

import { API, limitQuery, limitUserResults } from './apiConfiguration'


class SingleMobexStore {
  users = []

  fetchUsers = async () => {
    const response = await fetch(API + limitQuery + limitUserResults)
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
