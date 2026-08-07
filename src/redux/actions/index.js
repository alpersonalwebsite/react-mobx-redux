import axios from 'axios'

import { FETCH_USERS, FETCH_USERS_FAILED } from './types'
import { API, limitUserResults, readUsers } from '../../apiConfiguration'

const headers = {
  Accept: 'application/json'
}

export const fetchUsers = () => async dispatch => {
  try {
    // params rather than string concatenation, so a REACT_APP_API_URL that already has
    // a query string does not end up with two '?'.
    const response = await axios.get(API, {
      headers,
      params: { limit: limitUserResults }
    })

    return dispatch({ type: FETCH_USERS, payload: readUsers(response.data) })
  } catch (err) {
    // Was console.log and nothing else, so the store could not tell a failed request
    // from an empty result.
    return dispatch({ type: FETCH_USERS_FAILED, payload: err.message })
  }
}
