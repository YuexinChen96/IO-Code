import { INITIALIZE, UI_UPDATE, USERS_ERROR } from '../types'
import axios from 'axios'

export const initUpdate = (email, start_time, end_time) => async dispatch => {
    try {
        axios.post('http://localhost:8000/nmi/', {'email' : email}).then((res) => {
            const data = {'nmi_id': res.data.nmi[0], 'start':start_time, 'end':end_time};
            console.log(data)
            axios.post('http://localhost:8000/page1/', data).then((ret) => {
                console.log(ret)
                dispatch({
                    type : INITIALIZE,
                    ret1 : res.data,
                    ret2 : ret.data,
                    start_time : start_time,
                    end_time : end_time
                })
            })
        })
    } catch(error) {
        dispatch({
            type : USERS_ERROR,
            payload : error
        })
    }
}

export const UIUpdate = (nmi_id, start_date, end_date) => async dispatch => {
    try {
        console.log(nmi_id, start_date, end_date)
        const data = {'nmi_id': nmi_id, 'start':start_date, 'end':end_date}
        const res = await axios.post('http://localhost:8000/page1/', data)
        console.log(res.data)
        dispatch({
            type : UI_UPDATE,
            payload : res.data
        })
    } catch(error) {
        dispatch({
            type : USERS_ERROR,
            payload : error
        })
    }
}