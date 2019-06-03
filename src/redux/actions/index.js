import { FETCH_USERS } from './types';

import axios from 'axios';

const api = 'https://node-express-postgre.herokuapp.com/';

const headers = {
    Accept: 'application/json'
};

export const fetchUsers = () => async dispatch => {
    const query = 'users?limit=10';
    const endPoint = `${api}${query}`;

    const response = await axios.get(endPoint, { headers })

    return dispatch({ type: FETCH_USERS, payload: response.data });
}