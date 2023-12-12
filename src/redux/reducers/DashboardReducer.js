import { DASHBOARD_TOTAL_COUNT } from "../constants/types";

const  initialState = { DASHBOARD_TOTAL_COUNT : 0 }

export const dashboardReducer = (state = initialState,action) => {
    switch(action.type) {
      case DASHBOARD_TOTAL_COUNT : 
        return{
            ...state,
            dashboardTotalCount : action.payload
        }
        default : return state
    }  
}