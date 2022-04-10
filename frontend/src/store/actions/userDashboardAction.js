import { INITIALIZE, UI_UPDATE, USERS_ERROR } from '../types'
import axios from 'axios'

export const initUpdate = (email) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:8000/nmi/', {'email' : email})
        dispatch({
            type : INITIALIZE,
            payload : res.data
        })
    } catch(error) {
        dispatch({
            type : USERS_ERROR,
            payload : error
        })
    }
} 