import { INITIALIZE, UI_UPDATE, USERS_ERROR } from '../types'
import { fromJS } from 'immutable';

const defaultState = fromJS({
	init: false,
    loading : true
});

export default function(state = defaultState, action){
    switch(action.type){
        case INITIALIZE:
            return {
                ...state,
                init : true,
                nmi : action.payload.nmi,
                nmi_id : action.payload.nmi[0],
                loading : false,
            }
        case UI_UPDATE:
            return state
        case USERS_ERROR:
            return {
                loading : false,
                error : action.payload
            }
        default: return state
    }

}