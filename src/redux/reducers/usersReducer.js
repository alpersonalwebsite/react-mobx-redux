import { FETCH_USERS, FETCH_USERS_FAILED } from '../actions/types'

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    // REPLACE, not append. This was `[...state, ...action.payload]`, so a second fetch
    // showed every user twice and a third showed them three times. FETCH_USERS carries
    // the current answer to "who are the users", not an increment of it.
    case FETCH_USERS:
      return { ...state, items: action.payload, loading: false, error: null }

    case FETCH_USERS_FAILED:
      return { ...state, items: [], loading: false, error: action.payload }

    default:
      return state
  }
}
