import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2';
import TablePagination from '@mui/material/TablePagination';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import '../../components/loader.css';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ReactStarsRating from 'react-awesome-stars-rating';


const User_detail = () => {
    const {user_id} = useParams();

    const [state, setState] = React.useState({isLoading:true});
    const [customerstate, setCustomerState] = React.useState({customer_review:[],isLoading:true});
  const[likecountstate,setLikeCountState]= React.useState({count_customer_likes:[]})
  const[notlikecountstate,setnotLikeCountState]= React.useState({count_customer_notlikes:[]})
  const[countstate,setCountState]= React.useState({count_customer_review:[]})
  const[infostate,setInfoState]= React.useState({customer_info:[],shipments:"",shipment_count:"",count_liked_shipments:"",count_notliked_shipments:"",count_review:"",reviews:"",payments:"",isLoading:true})
  const[modals,setModals] = React.useState({show: false})
  const [shipmentstate, setshipStatus] = React.useState({ status: null });
  const [countryList, setcountryList] = React.useState([]);
  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);
   
  const[dimensionState,setdimensionState] = React.useState({companyDetail:[]})



  const dimension_detail = () =>{
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/company_info_api`;
    let sendData = {};
  
    axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
      setdimensionState({...dimensionState,companyDetail:res.data.companyDetail});
      console.log("rnmmmmm", res);
    }).catch((e) => {
      // toast.configure()
       //toast.error("Some thing went wrong")
      console.log("----error:   ", e);
    })
  }
  React.useEffect(() => {
    dimension_detail();
    customer_info()
   
   
  }, [])

      React.useEffect(() => {
        //  axios_get_api()
        customer_info()
      }, [])

      const customer_info = () => {

        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/customer_info_find`;
        let sendData = {
         user_id: user_id,
         };
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            setInfoState({ ...infostate,  customer_info: res.data.output ,shipment_count:res.data.count_shipments,count_liked_shipments:res.data.count_liked_shipments,count_notliked_shipments:res.data.count_notliked_shipments,count_review:res.data.count_review, shipments:res.data.shipments,reviews:res.data.reviews,payments:res.data.payments,isLoading:false});
             getCountryList();
           
            getStateList(res.data.country)
            getCityList(res.data.state)
      console.log("response user", res);
        }).catch((e) => {
           console.log("----error:   ", e);
        })
      }

      const shipmentFilter = (status) => {
        console.log("action ",status);
        setshipStatus({ ...shipmentstate, status: status })
           
      }

      const getCountryList = () => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/country_list`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("res ", res);           
            setcountryList(res.data.output)


        }).catch((e) => {


        });
    }

    const getStateList = (country_id) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/state_list`;
        let sendData = { t_country_id: country_id, limit: 1000 };
        //  console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("state ", res);           
            setStateList(res.data.output)


        }).catch((e) => {


        });
    }

    const getCityList = (t_state_id) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/city_list`;
        let sendData = { t_state_id: t_state_id, limit: 1000 };
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("city  ", res);           
            setCityList(res.data.output)


        }).catch((e) => {


        });
    }
    const onChangeLocationGeneral = (e) => {
        // console.log("e general name ",e.target.name);
        // console.log("e general value ",e.target.value);
        const newdata = { ...infostate };
        newdata[e.target.name] = e.target.value;
        setInfoState(newdata);
        if (e.target.name == "country") {            
            getStateList(e.target.value)
            setStateList([]);
            setCityList([]);
        }
        else if (e.target.name == "state") {
           
            getCityList(e.target.value);
            setCityList([])
        }
    }
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={9}/></div>
            {infostate.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>: 
            infostate.customer_info.map((sub)=>(
            <div className='col-9' style={{marginLeft:"-60px"}}>
                
                <Sub_header/>
                <section>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div class="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                        <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li class="breadcrumb-item">
                                <a href="/users">
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Users</li>
                        </ol>
                    </nav>
                    <h2 class="h4">{sub.full_name}</h2>
                    <small>Member Since: <Moment format="DD/MM/YYYY hh:mm" unix>{sub.created}</Moment> <i class="fa fa-circle fs-10" aria-hidden="true"></i></small>
                    <small class="text-info">Percent Positive %: {infostate.count_liked_shipments!=="" &&infostate.shipment_count!=="" && infostate.count_liked_shipments!==0 &&infostate.shipment_count!==0 && infostate.count_liked_shipments!==undefined &&infostate.shipment_count!==undefined?parseInt(infostate.count_liked_shipments/infostate.shipment_count*100):"0"} </small> <i class="fa fa-circle fs-10" aria-hidden="true"></i>
                    <small class="text-success">Total Positive: {infostate.count_liked_shipments!="" && infostate.count_liked_shipments!=undefined? infostate.count_liked_shipments:0} <i class="fa fa-long-arrow-up" aria-hidden="true"></i> </small><i class="fa fa-circle fs-10" aria-hidden="true"></i>
                    <small class="text-danger">Total Negative: {infostate.count_notliked_shipments!="" && infostate.count_notliked_shipments!=undefined? infostate.count_notliked_shipments:0} <i class="fa fa-long-arrow-down" aria-hidden="true"></i></small>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    {/* <span class="badge rounded-pill bg-success">Active</span> */}
                    {(sub.dstatus == 1) ? <span className="badge rounded-pill bg-success">Active</span>:(sub.dstatus == 2) ? <span className="badge rounded-pill bg-warning">Inactive</span> : (sub.dstatus == 3) ? <span className="badge rounded-pill bg-primary">Suspended</span> : (sub.dstatus == 0) ? <span className="badge rounded-pill bg-danger">Deleted</span> : ""}
                </div>
            </div>
            
    </section>

    <section>
        <div class="row">
            <div class="col-12 col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-danger rounded me-4 me-sm-0">
                                    <i class="fa fa-2x fa-cubes" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-12 col-xl-7 px-xl-0">
                                <div class=" d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0">Shipments</h2>
                                    <h3 class="fw-extrabold mb-2">{infostate.shipment_count!="" && infostate.shipment_count!=undefined?infostate.shipment_count:0}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-secondary rounded me-4 me-sm-0">
                                    <i class="fa fa-2x fa-star" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-12 col-xl-7 px-xl-0">
                                <div class=" d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0">Reviews</h2>
                                    <h3 class="fw-extrabold mb-2">{infostate.count_review!="" && infostate.count_review!=undefined ? infostate.count_review:0}</h3>
                                   
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-info rounded me-4 me-sm-0">
                                    <i class="fa fa-2x fa-money" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-12 col-xl-7 px-xl-0">
                                <div class=" d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0"> Payments</h2>
                                    <h3 class="fw-extrabold mb-2">{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{sub.total_paid_amount!='' && sub.total_paid_amount!=undefined ? sub.total_paid_amount: 0}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

    <section>
        <ul class="nav nav-tabs justify-content-end">
            <li class="nav-item">
              <a class={(shipmentstate.status == null) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(null)} >Info</a>
            </li>
            <li class="nav-item">
              <a class={(shipmentstate.status == 0) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(0)} >Shipments</a>
            </li>
            <li class="nav-item">
              <a class={(shipmentstate.status == 1) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(1)} >Reviews</a>
            </li>
            <li class="nav-item">
              <a class={(shipmentstate.status == 2) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(2)} >Payments</a>
            </li>
        </ul>
    </section>
    <section id="generalinfo">
        <div class="row">
            <div class="col-12 col-xl-12">
                {shipmentstate.status==null?
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 my-4">User Information</h2>
                    <form>
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <div>
                                    <label for="first_name">Full Name</label>
                                    <input class="form-control" id="first_name" type="text" placeholder="" readOnly value={sub.full_name} required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" id="email" type="email" placeholder="" readOnly value={sub.email} required />
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input class="form-control" id="phone" type="number" placeholder="" readOnly value={sub.mob_number} required />
                                </div>
                            </div>
                            <div class="col-sm-6 mb-3">
                                <label for="state">Account Type</label>
                                <select class="form-select w-100 mb-0" id="state" name="" readOnly aria-label="State select example">
                                    <option selected >{sub.account_type}</option>
                                    {/* <option selected>Business</option> */}
                                </select>
                            </div>
                        </div>
                        {/* <h2 class="h5 my-4">Location</h2> */}
                        <div class="row">
                            {/* <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input class="form-control" id="address" type="text" placeholder="Enter your home address" value={sub.address!=""? sub.address:""} required />
                                </div>
                            </div> */}
                            <div class="col-sm-4 mb-3">
                                {/* <label for="state">Country</label>
                                <select class="form-select w-100 mb-0" id="state" name="country" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={sub.country}>
                                                    <option>Select</option>
                                                    {countryList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_country_id}>{item.country}</option>
                                                        )
                                                    })}
                                                </select > */}
                            </div>
                            <div class="col-sm-4 mb-3">
                                {/* <label for="state">State</label>
                                <select class="form-select w-100 mb-0" id="state" name="state" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={sub.state}>
                                                    <option >Select</option>
                                                    {stateList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_state_id}>{item.state_name}</option>
                                                        )
                                                    })}
                                                </select> */}
                            </div>
                            <div class="col-sm-4 mb-3">
                                {/* <label for="state">City</label>
                                <select class="form-select w-100 mb-0" id="state" name="city" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={sub.city}>
                                                    <option>Select</option>
                                                    {cityList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_city_id}>{item.city_name}</option>
                                                        )
                                                    })}
                                                </select> */}
                            </div>
                        </div>
                        {/* <h2 class="h5 my-4">Password Reset</h2> */}
                        {/* <div class="row">
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="address">New Password</label>
                                    <input class="form-control" id="address" type="password" placeholder="Enter new password" autocomplete="new-password" />
                                </div>
                            </div>
                        </div> */}

                        {/* <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save</button>
                        </div> */}
                    </form>
                </div>
                :shipmentstate.status==0?
                <div class="card card-body border-0 shadow mb-4">
                <h2 class="h5 my-4">Shipments</h2>
                {infostate.shipments!="" && infostate.shipments!=undefined?
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                          
                            <th className="border-gray-200">Shipment ID</th>
                            <th className="border-gray-200">Title</th>						
                            <th className="border-gray-200">Pickup</th>
                            <th className="border-gray-200">Delivery</th>
                            <th className="border-gray-200">Status</th>
                            
                        </tr>
                    </thead>
                    {infostate.shipments.map((subscriber)=>(
                    <tbody>
                       <tr>
                        <td><a href={"/shipment_detail/" + subscriber.invoice_id} class="text-info fw-700" >{subscriber.invoice_id}</a>
                        <br />
                                <span class="fw-normal">  {subscriber.date} <small>{subscriber.time}</small></span></td>
                            <td>{subscriber.title}</td>
                            <td>{subscriber.pickup_address}</td>
                            <td>{subscriber.delivery_address}</td>
                           <td>
                           <span class="badge rounded-pill bg-success">{subscriber.dstatus==1?"Active":"Inactive"}</span><br />
                           <span class="badge rounded-pill bg-danger">
                            {subscriber.current_shipment_status==1?"Start":subscriber.current_shipment_status==2?"Pickup In Progress":subscriber.current_shipment_status==3?"Picked Up":subscriber.current_shipment_status==4?"In Transit" :subscriber.current_shipment_status==5?"Delieverd":subscriber.current_shipment_status==6?"Returned":subscriber.current_shipment_status==7?"Cancelled":"Not Started"}
                            </span></td>
                        </tr>
                    </tbody>
                    ))}
                    </table>
                    </div> 
                    :<h4 className='text-muted'>NO SHIPMENTS </h4>}   
                </div>:
                shipmentstate.status==1?
                <div class="card card-body border-0 shadow mb-4">
                <h2 class="h5 my-4">Reviews</h2>
                {infostate.reviews!=''?
                                    infostate.reviews.map((sub)=>(
                                        <>
                                    <div class="d-flex justify-content-between ">
                                         <div class=" ">
                                        <h6>{sub.full_name}</h6>
                                        <p class="text-primary" style={{marginTop:"-10px"}}><ReactStarsRating value={sub.rating} isEdit={false} /></p>
                                        
                                    </div>
                                    </div>
                                    <h6 style={{marginTop:"-10px"}}>{sub.title}</h6>

                                    <p style={{marginTop:"-10px"}} className="" >{sub.review_description}</p>
                                    <p class="text-end text-muted"><small> Was this helpful? <i class="fa fa-thumbs-o-up text-primary" aria-hidden="true"></i> {sub.isLiked?(sub.isLiked):"0"} &nbsp;&nbsp;&nbsp; <i class="fa fa-thumbs-o-down text-primary" aria-hidden="true"></i> {sub.notLiked?(sub.notLiked):"0" }</small></p>
                    
                                    
                                         {sub.transporter_review!="" && sub.transporter_review!=undefined?
                                         sub.transporter_review.map((item)=>(
                                            <div class="p-3 ml-30 mb-5 ml-5 bg-light  border-start border-primary border-5" style={{marginTop:"-15px"}}>
                        
                                            <h6>{sub.branch_name}</h6>
                                            <small >{item.transporter_review_description}</small>
                                            </div>

                                         ))
                                         
                                         :""}
                                         
                                        </>   )):<h4 className='text-muted'>NO REVIEWS </h4>}
                </div>
                :
                shipmentstate.status==2?
                <div class="card card-body border-0 shadow mb-4">
                <h2 class="h5 my-4">Payments</h2>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
             
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Initiated</th>
                            <th class="border-gray-200">Transaction ID</th>
                            <th class="border-gray-200">Gateway</th>						
                            <th class="border-gray-200">Shipment #</th>						
                            <th class="border-gray-200">User</th>
                            <th class="border-gray-200">Amount</th>
                            <th class="border-gray-200">Status</th>
                        </tr>
                    </thead>
                    {infostate.payments!="" && infostate.payments.length>0?
                    infostate.payments.map((sub)=>(
                    <tbody>
                        {/* <!-- Item --> */}
                        <tr>
                            <td>
                                <span class="fw-normal">
                                    <small><Moment format="MMMM DD , YYYY  HH:MM:ssA" unix>{sub.created}</Moment><br />
                                    </small>
                                </span>
                            </td>
                            <td>
                                <a   class="fw-700 text-info">{sub.transaction_id}</a>
                            </td>
                            <td>
                                <span class="fw-bold">{sub.payment_method} </span><br />
                                     <small>{sub.merchant_id}</small>
                            </td>
                            <td>
                                <a href="" class="fw-700 text-info">{sub.shipment_id}</a>
                            </td>
                            <td>
                                <a href="#" class="fw-700 text-info">
                                    {sub.full_name}
                                </a>
                            </td>                        
                            <td>
                                <span class="fw-bold text-danger">
                                    {sub.paid_amount} {sub.currency_code}
                                </span> <br />
                                <small>
                                {dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{sub.admin_advance} + {dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{sub.transporter_advance} +{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{sub.service_charge}
                                </small>
                            </td>
                            <td><span class="badge rounded-pill bg-success">{sub.status==1?"Success":sub.status==3?"Cancelled":sub.status==2?"Pending":""}</span></td>
                        </tr>
                                                    
                    </tbody>
                    )):<h4 className='text-muted'>NO PAYMENTS </h4>}
                </table>
                </div>
              
               </div>:""
                                                   
            }
            </div>
            
        </div>
    </section>

            </div>))}
        </div>
    </div>
  )
}

export default User_detail