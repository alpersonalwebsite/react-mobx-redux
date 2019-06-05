import { FETCH_USERS } from './types';

import axios from 'axios';

import {
  API,
  limitQuery,
  limitUserResults
} from '../../apiConfiguration'


const headers = {
  Accept: 'application/json'
};

export const fetchUsers = () => async dispatch => {

  const endPoint = API + '?' + limitQuery + limitUserResults;

  try {
    const response = await axios.get(endPoint, { headers })

    return dispatch({ type: FETCH_USERS, payload: response.data });
  } catch (err) {
    console.log(`redux AC ${err}`)
  }
}