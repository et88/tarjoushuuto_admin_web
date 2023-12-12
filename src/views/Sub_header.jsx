import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import exportValue from "../apiconfig";
import { borderRadius } from "@mui/system";
import moment from "moment";
import Moment from "react-moment";
const Sub_header = () => {  
  let navigate = useNavigate();

  const[state,setState]= React.useState({notification:[],count:0})
  
  let loginDetail = localStorage.getItem('admin_login');
 // const [state, setState] = useState({ full_name: "" });
 
  //console.log("e => ", loginDetail);
  if(loginDetail == null) {
    window.location.href = '/login';
    //navigate('/login')
  }else {    
    loginDetail = JSON.parse(localStorage.getItem('admin_login'));
   // setState(JSON.parse(loginDetail))
  }
  const logout = () => {
    console.log("e => ");
    localStorage.removeItem('admin_login');
    localStorage.clear();
    navigate('/login')
 
    
}

const notification=()=>{
     
  let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/notification_find`;
 let send={
  find:"",

  indexValue: 0,
  limit:5
 }
  
  axios.post(full_api, send,{ headers: exportValue.headers }).then((res) => {
     // console.log("res ", res);
   
      setState({...state,notification:res.data.output,count:res.data.count})
     // console.log("res",res)
    
     
  }).catch((e) => {

  });
}

React.useEffect(()=>{
  notification()
},[])

const To_payment =()=>{
  navigate('/payments')
}
const seen_payment =(notification_id)=>{
  console.log("notification_id",notification_id)

  let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/notification_update`;
  let send={
   notification_id:notification_id,
   seen:1,
   
  }
  console.log("send",send)
   
   axios.post(full_api, send,{ headers: exportValue.headers }).then((res) => {
       console.log("res ", res);
       notification()
      //  setState({...state,notification:res.data.output,count:res.data.count})
      //  console.log("res",res)
     
      
   })
   .catch((e) => {
 
   });
}

const notification_bell =()=>{
  // console.log("notification_id",notification_id)

  let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/notification_batch_count_update`;
  let send={
  
   batch_count:0,
   
  }
  console.log("send",send)
   
   axios.post(full_api, send,{ headers: exportValue.headers }).then((res) => {
       console.log("res ", res);
       notification()
      //  setState({...state,notification:res.data.output,count:res.data.count})
      //  console.log("res",res)
     
      
   })
   .catch((e) => {
 
   });
}

const view_all =()=>{
  // console.log("notification_id",notification_id)

  let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/view_all`;
  let send={
  
   
   seen:1
   
  }
  console.log("send",send)
   
   axios.post(full_api, send,{ headers: exportValue.headers }).then((res) => {
       console.log("res ", res);
       notification()
      //  setState({...state,notification:res.data.output,count:res.data.count})
      //  console.log("res",res)
     
      
   })
   .catch((e) => {
 
   });
}
const userListdateTime = (dateTimeStr) => {
//    console.log("created",dateTimeStr);
//    let dbDate = dateTimeStr;

// console.log('getTime value =>', dbDate);
// let date = moment(dateTimeStr * 1000).getDate();
//    console.log("date",date)
//   //  let time = moment(dateTimeStr * 1000).format("hh:mm:ss");
//   // console.log("time ------ ",time);

// let parsedDate = date 

// console.log('parsed date =>', parsedDate);

// console.log('Date =>', getDate(parsedDate));
// console.log('Hours =>', getHours(parsedDate));
// console.log('Minutes =>', getMinutes(parsedDate));
// //   let newDate = Date.now();
//   let todaydate = moment(newDate).format("DD-MM-YY");
//    let date = moment(dateTimeStr * 1000).format("YY-MM-DD");
//    console.log("date",date)
//    let time = moment(dateTimeStr * 1000).format("hh:mm:ss");
//   console.log("time ------ ",time);
//     // return moment(new Date()).fromNow();

//  return moment({dateTimeStr}).local().startOf('seconds').fromNow()  
  //  return (todaydate != date) ? date +"days ago" : time + "hrs ago";
}
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${ day }. ${ month } at ${ hours }:${ minutes }`;
  }

  // 10. January 2017. at 10:20
  return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
}


function timeAgo(created) {
  // console.log("date",date)
  // console.log("time",time)
  
  // let newdate = new Date();
  // console.log("newdate",newdate) 
  let date1 = moment(created *1000).format("YYYY-MM-DD HH:mm:ss");
 // console.log("date1",date1)
 
 
  return moment(date1).local().startOf('seconds').fromNow()


  
//   console.log("dateparams",typeof dateParam)
//   if (!dateParam) {
//     return null;
//   }
//   let date1 = moment(dateParam * 1000).format("YY-MM-DD");
// console.log("date1",date1)
//   let date = typeof dateParam === 'object' ? dateParam : new Date(date1);
//   console.log("date",date)
//   let  DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
//   let  today = new Date();
//   console.log("today",today)
//   let yesterday = new Date(today - DAY_IN_MS);
//   console.log("yesterday",yesterday)
//    let seconds = Math.round((today - date) / 1000);
//    console.log("seconds",seconds)
//    let  minutes = Math.round(seconds / 60);
  // let isToday = today.toDateString() === date.toDateString();
  // let isYesterday = yesterday.toDateString() === date.toDateString();
  // let isThisYear = today.getFullYear() === date.getFullYear();


  // if (seconds < 5) {
  //   return 'now';
  // } else if (seconds < 60) {
  //   return `${ seconds } seconds ago`;
  // } else if (seconds < 90) {
  //   return 'about a minute ago';
  // } else if (minutes < 60) {
  //   return `${ minutes } minutes ago`;
  // } else if (isToday) {
  //   return getFormattedDate(date, 'Today'); // Today at 10:20
  // } else if (isYesterday) {
  //   return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  // } else if (isThisYear) {
  //   return getFormattedDate(date, false, true); // 10. January at 10:20
  // }

  // return getFormattedDate(date); // 10. January 2017. at 10:20
}

  return (
    <>
    
       

<nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
<div className="container-fluid px-0">
<div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
<div className="d-flex align-items-center">
{/* <!-- Search form --> */}
{/* <form className="navbar-search form-inline" id="navbar-search-main">
<div className="input-group input-group-merge search-bar">
  <span className="input-group-text" id="topbar-addon">
    <svg className="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
    </svg>
  </span>
  <input type="text" className="form-control" id="topbarInputIconLeft" placeholder="Search" aria-label="Search" aria-describedby="topbar-addon"/>
</div>
</form> */}
{/* <!-- / Search form --> */}
</div>
{/* <!-- Navbar links --> */}

<ul className="navbar-nav align-items-center">
<li className="nav-item dropdown">
{/* <a className="nav-link  dropdown-toggle" data-unread-notifications="true" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"> */}
{/* <a href="http://www.facebook.com/sharer.php?s=100&p[url]=http://ar.zu.my&p[images][40]=http://www.gravatar.com/avatar/2f8ec4a9ad7a39534f764d749e001046.png&p[title]=Rock on Arzumy!&p[summary]=In this blog, Arzumy will teach you how to rock!>Customized Share">dsags</a> */}
<i class="fa fa-bell fa-1x dropdown-toggle notification" onClick={()=>notification_bell()} data-bs-toggle="dropdown" >{state.count!=0?<span className="notification-icon-badge" style={{fontSize:"12px", fontWeight:"bold"}}>{state.count}</span>:""}</i>

{/* </a> */}

<div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
<div className="list-group list-group-flush">
  <a className="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a>
  {state.notification.map((sub)=>(
  <a  className="list-group-item list-group-item-action border-bottom" style={sub.seen==0?{backgroundColor:"#E4F6FF"}:{backgroundColor:""}}>
   
    <div className="row align-items-center">
        <div className="col-auto ">
         
          <img alt="Image placeholder" src="../../../assets/img/dollar.png" className="avatar-md rounded"/>
        </div>
        <div className="col ps-0 ms-2"  onClick={()=> {seen_payment(  sub.notification_id); To_payment()}}>
          <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">${sub.paid_amount}</h4>
              </div>
              <div className="text-end">
                <small className="text-danger">{timeAgo(sub.created)}</small>
                {/* <Moment fromNow={sub.created}></Moment> */}
               
              </div>
          </div>
          <p className="font-small mt-1 mb-0">Payment received for shipment #{sub.shipment_id}</p>
        </div>
    </div>
   
  </a>
   ))}
  <a onClick={()=> {view_all() ; To_payment()}} className="dropdown-item text-center fw-bold rounded-bottom py-3">
    <svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
    View all
  </a>
</div>
</div>
</li>
<li className="nav-item dropdown ms-lg-3">
<a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
<div className="media d-flex align-items-center">
  <img className="avatar rounded-circle" alt="Image placeholder" src="../../../assets/img/team/profile-picture-2.jpg"/>
  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
    <span className="mb-0 font-small fw-bold text-gray-900">{(loginDetail && loginDetail.full_name)?"Welcome "+loginDetail.full_name :""}</span>
  </div>
</div>
</a>
<div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
<a className="dropdown-item d-flex align-items-center" href="/my_profile">
  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
  My Profile
</a>
<a className="dropdown-item d-flex align-items-center" href="/change_password">
  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
  Change Password
</a>
<div role="separator" className="dropdown-divider my-1"></div>
<a className="dropdown-item d-flex align-items-center" onClick={()=>logout()}>
  <svg className="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>                
  Logout
</a>
</div>
</li>
</ul>
</div>
</div>
</nav>
  </>
  )
}

export default Sub_header