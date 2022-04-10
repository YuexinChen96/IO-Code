import { combineReducers } from 'redux'
import userDashboardReducer from './userDashboardReducer'

export default combineReducers({
    userDashboard : userDashboardReducer
})