import axios from 'axios';
import exportValue from '../../apiconfig';
//import { CountryLists } from './LocationActions';
import { DASHBOARD_TOTAL_COUNT , COUNT_TRANSPORTLIST, USERS_FIND_COUNT, COUNT_SHIPMENT,COUNT_VEHICLE_LIST} from "../constants/types";

// import { toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';


export const DashboardLists = (data) => (dispatch) => {
    console.log("hello is hello",data);
   
    let dashboard_data = {};
    
      axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/dashboard_api`,  dashboard_data , { headers: exportValue.headers }).then((res) => {
        console.log("fjh",res); 
        if(res.data.users_find_count != undefined){
            let count_detail = {users_find_count:res.data.users_find_count,count_vehicle_lists:res.data.count_vehicle_lists,count_transporterList:res.data.count_transporterList,count_shipment:res.data.count_shipment,admin:res.data.admin,count_shipment_bids:res.data.count_shipment_bids,count_spamReport:res.data.count_spamReport,week_amount:res.data.week_amount,graph:res.data.graph}
           
            dispatch({
                type: DASHBOARD_TOTAL_COUNT, 
                payload: count_detail,
            })
            
            
            console.log( "hb",count_detail)
        }
   
   
    
       }).catch((e)=>{      
        //toast.configure()
        //toast.error("Some thing went wrong")  
        console.log("----error:   ",e);
    })
}
 
