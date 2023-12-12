import { combineReducers } from 'redux'

import { dashboardReducer } from './DashboardReducer'



const RootReducer = combineReducers({
 
    dashboardData : dashboardReducer,
 
    
})

export default RootReducer
