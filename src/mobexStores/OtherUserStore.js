import {
  observable,
  runInAction,
  decorate
} from 'mobx';

import { API, limitQuery, limitUserResults } from '../apiConfiguration'


class OtherUserStore {
  users = []

  fetchUsers = async () => {
    const response = await fetch(API + limitQuery + limitUserResults)
    const parsedResponse = await response.json()

    runInAction(() => {
      this.users = parsedResponse
    })

  }
}

decorate(OtherUserStore, {
  users: observable
})

export default OtherUserStore
