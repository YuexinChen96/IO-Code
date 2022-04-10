import { INITIALIZE, UI_UPDATE, RANGECLICK, USERS_ERROR } from '../types'
import axios from 'axios'

export const initUpdate = (email, start_time, end_time, NAME_MONTH) => async dispatch => {
    try {
        axios.post('http://localhost:8000/nmi/', {'email' : email}).then((res) => {
            const data = {'nmi_id': res.data.nmi[0], 'start':start_time, 'end':end_time};
            console.log(data)
            axios.post('http://localhost:8000/page1/', data).then((ret) => {
                console.log(ret)
                const start_date = NAME_MONTH[start_time.split('-')[1] - 1] + ' ' + start_time.split('-')[2]
                const end_date = NAME_MONTH[end_time.split('-')[1] - 1] + ' ' + end_time.split('-')[2]
                dispatch({
                    type : INITIALIZE,
                    ret1 : res.data,
                    ret2 : ret.data,
                    start_time_str : start_date,
                    end_time_str : end_date,
                    start_date : start_time,
                    end_date : end_time
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

export const UIUpdate = (nmi_id, select, NAME_MONTH) => async dispatch => {
    try {
        
        console.log(nmi_id, select)
        
        const start_date = select.startDate.getFullYear().toString()+'-'+ (select.startDate.getMonth()+1).toString() +'-' + select.startDate.getDate().toString()
        const end_date = select.endDate.getFullYear().toString() + '-'+ (select.endDate.getMonth()+1).toString() + '-'+ select.endDate.getDate().toString()
        
        const start_time = NAME_MONTH[start_date.split('-')[1] - 1] + ' ' + start_date.split('-')[2]
        const end_time = NAME_MONTH[end_date.split('-')[1] - 1] + ' ' + end_date.split('-')[2]

        const data = {'nmi_id': nmi_id, 'start':start_date, 'end':end_date}
        console.log(data)
        axios.post('http://localhost:8000/page1/', data).then((res) => {
            console.log(res)
            dispatch({
                type : UI_UPDATE,
                ret : res.data,
                start_time_str : start_time,
                end_time_str : end_time,
                start_date : start_date,
                end_date : end_date
            })
        })
    } catch(error) {
        dispatch({
            type : USERS_ERROR,
            payload : error
        })
    }
}

export const rangeClick = () => async dispatch => {
    try {
        dispatch({
            type : RANGECLICK,
        })
    } catch(error) {
        dispatch({
            type : USERS_ERROR,
            payload : error
        })
    }
}

