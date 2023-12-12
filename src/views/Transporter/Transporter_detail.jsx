import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from 'react-moment';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

const Transporter_detail = () => {
    const { transporter_id } = useParams();
    
    const [state, setState] = useState([]);
    const [stateTab, setStateTab] = useState({tab:1,reviewList:[],paymentList:[],shipment:[]});
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
      getTransporterDetail()
     
     
    }, [])


    useEffect(() => {
        getTransporterDetail();
    }, [])

    const getTransporterDetail = () => {
       
        // setOtherState(setValues)
         let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/get_transporter_detail`;
         let sendData = {transporter_id:transporter_id};
          console.log("bb", sendData);
          
         axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
             console.log("res ", res);
            // let setValues = {};
             setState(res.data.output[0]);
             setStateTab({...stateTab,reviewList:res.data.review_list,paymentList:res.data.payments,shipment:res.data.shipments})
            // setValues.isLoading = false;
            // setValues.page = page;
             
            // console.log("setValues ", setValues);
            
             
         }).catch((e) => {
 
 
         });
     }

  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={8}/></div>
            <div className='col-9' style={{marginLeft:"-60px"}}>
                <Sub_header/>
                <section>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                        <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <a href="#">
                                    <svg className="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Transporters</li>
                        </ol>
                    </nav>
                    <h2 className="h4">{state.branch_name}</h2>
                    <div className="text-warning">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i> {state.total_ratings} Rating <small className="text-info">{state.total_reviews ==undefined || state.total_reviews==""?0:state.total_reviews} Reviews </small> <i className="fa fa-circle fs-10" aria-hidden="true"></i>
                        <small className="text-success">{state.like_shipment!=0 && state.total_shipment!=0?parseInt((state.like_shipment/state.total_shipment)*100):"0"}% of shippers would use again </small></div>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <span className="badge rounded-pill bg-success">Active</span>
                </div>
            </div>
            
    </section>

    <section>
        <div className="row">
            <div className="col-12 col-sm-6 col-xl-4 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-body">
                        <div className="row d-block d-xl-flex align-items-center">
                            <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div className="icon-shape icon-shape-primary rounded me-4 me-sm-0">
                                    <i className="fa fa-2x fa-money" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-12 col-xl-7 px-xl-0">
                                <div className=" d-sm-block">
                                    <h2 className="h6 text-gray-400 mb-0">Payout Balance</h2>
                                    <h3 className="fw-extrabold mb-2">{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{state.transporter_wallet!=undefined && state.transporter_wallet!='' && state.transporter_wallet!=0? state.transporter_wallet:"0"} <small className="wallet_bal_sm text-muted">{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{state.hold_amount!=undefined && state.hold_amount!='' && state.hold_amount!=0? state.hold_amount:"0"} HOLD</small></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-body">
                        <div className="row d-block d-xl-flex align-items-center">
                            <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div className="icon-shape icon-shape-info rounded me-4 me-sm-0">
                                    <i className="fa fa-2x fa-cubes" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-12 col-xl-7 px-xl-0">
                                <div className=" d-sm-block">
                                    <h2 className="h6 text-gray-400 mb-0">Total Shipments</h2>
                                    <h3 className="fw-extrabold mb-2">{state.total_shipment}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-body">
                        <div className="row d-block d-xl-flex align-items-center">
                            <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div className="icon-shape icon-shape-secondary rounded me-4 me-sm-0">
                                    <i className="fa fa-2x fa-star" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-12 col-xl-7 px-xl-0">
                                <div className=" d-sm-block">
                                    <h2 className="h6 text-gray-400 mb-0">Reviews</h2>
                                    <h3 className="fw-extrabold mb-2">{state.total_reviews==undefined || state.total_reviews==""?"0":state.total_reviews}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-body">
                        <div className="row d-block d-xl-flex align-items-center">
                            <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div className="icon-shape icon-shape-danger rounded me-4 me-sm-0">
                                    <i className="fa fa-2x fa-thumbs-o-down" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-12 col-xl-7 px-xl-0">
                                <div className=" d-sm-block">
                                    <h2 className="h6 text-gray-400 mb-0"> Shipments Not Liked</h2>
                                    <h3 className="fw-extrabold mb-2">{state.unlike_shipment!=0 && state.total_shipment!=0?parseInt((state.unlike_shipment/state.total_shipment)*100):"0"}%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

    <section>
        <ul className="nav nav-tabs justify-content-end">
            <li className="nav-item" onClick={()=>setStateTab({...stateTab,tab:1})}>
              <a className={"nav-link "+(stateTab.tab == 1 ? "active" : "")} >Info</a>
            </li>
            <li className="nav-item" onClick={()=>setStateTab({...stateTab,tab:2})}>
              <a className={"nav-link "+(stateTab.tab == 2 ? "active" : "")} >Shipments</a>
            </li>
            <li className="nav-item" onClick={()=>setStateTab({...stateTab,tab:3})}>
              <a className={"nav-link "+(stateTab.tab == 3 ? "active" : "")} >Reviews</a>
            </li>
            <li className="nav-item" onClick={()=>setStateTab({...stateTab,tab:4})}>
              <a className={"nav-link "+(stateTab.tab == 4 ? "active" : "")} >Payments</a>
            </li>
        </ul>
    </section>
    <section id="generalinfo">
        <div className="row">
            <div className="col-12 col-xl-12">
                {(stateTab.tab == 1) ?
                <div className="card card-body border-0 shadow mb-4">
                    <h2 className="h5 my-4">Company Information</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div>
                                    <label for="first_name">Full Name</label>
                                    <input className="form-control" id="first_name" type="text" placeholder="" required value={state.branch_name} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input className="form-control" id="email" type="email" placeholder="" required value={state.email} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label for="phone">Phone</label>
                                    <input className="form-control" id="phone" type="text" placeholder="" required value={state.contact_no} readOnly/>
                                </div>
                            </div>
                            {/* <div className="col-sm-6 mb-3">
                                <label for="state">Account Type</label>
                                <select className="form-select w-100 mb-0" id="state" name="state" aria-label="State select example">
                                    <option >Personal</option>
                                    <option >Business</option>
                                </select>
                            </div> */}
                        </div>
                        <h2 className="h5 my-4">Location</h2>
                        <div className="row">
                            <div className="col-sm-12 mb-3">
                                <div className="form-group">
                                    <label for="address">Address</label>
                                    <input className="form-control" id="address" type="text" placeholder="" readOnly required value={state.address}/>
                                </div>
                            </div>
                            {/* <div className="col-sm-4 mb-3">
                                <label for="state">Country</label>
                                <select className="form-select w-100 mb-0" id="state" name="state" aria-label="State select example">
                                    <option selected>Country</option>
                                </select>
                            </div>
                            <div className="col-sm-4 mb-3">
                                <label for="state">State</label>
                                <select className="form-select w-100 mb-0" id="state" name="state" aria-label="State select example">
                                    <option selected>State</option>
                                </select>
                            </div>
                            <div className="col-sm-4 mb-3">
                                <label for="state">City</label>
                                <select className="form-select w-100 mb-0" id="state" name="state" aria-label="State select example">
                                    <option selected>City</option>
                                </select>
                            </div> */}
                        </div>
                        <h2 className="h5 my-4">Operated By</h2>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <a href={"/user_detail/"+state.user_id} className="text-info fw-700">{state.full_name}</a>
                            </div>
                        </div>

                        {/* <div className="mt-3">
                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save</button>
                        </div> */}
                    </form>
                </div> 
                : (stateTab.tab == 2) ? 
                <div className="card card-body border-0 shadow mb-4">
                <h2 className="h5 my-4">Shipments</h2>
                <div className="row">
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
                                   {stateTab.shipment.map((subscriber)=>(
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
                        </div>

                </div>
                :(stateTab.tab == 3) ? 
                <div className="card card-body border-0 shadow mb-4">
                <h2 className="h5 my-4">Reviews</h2>
                <div className="row">
                            <div className="card card-body border-0 shadow table-wrapper table-responsive">

                               <table className="table">
                                   <thead>
                                   <tr>
<th className="border-gray-200">Customer name</th><th>Review</th><th>Date</th>
                                   </tr>
                                   </thead>
                                   <tbody>
{stateTab.reviewList.map((item)=>
                                   <tr><td><a href={"/user_detail/"+item.user_id}>{item.full_name}</a></td><td>{item.review_description}</td><td><Moment format="DD/MM/YYYY hh:mm" unix>{item.created}</Moment></td></tr>
)}
                                   </tbody>
                               </table>
                            </div>
                        </div>
                </div>
                : (stateTab.tab == 4) ?
                <div className="card card-body border-0 shadow mb-4">
                <h2 className="h5 my-4">Payments</h2>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Initiated</th>
                            <th class="border-gray-200">Mode Transaction ID</th>
                            <th class="border-gray-200">Payment Mode</th>						
                            <th class="border-gray-200">Shipment #</th>						
                            <th class="border-gray-200">Paid By</th>
                            <th class="border-gray-200">Amount</th>
                            <th class="border-gray-200">Status</th>
                        </tr>
                    </thead>
                    {stateTab.paymentList!="" && stateTab.paymentList.length>0?
                    stateTab.paymentList.map((sub)=>(
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
                                <span class="fw-bold">{sub.mode} </span><br />
                                     
                            </td>
                            <td>
                                <a href={"/shipment_detail/" + sub.shipment_id} class="fw-700 text-info">{sub.shipment_id}</a>
                            </td>
                            <td>
                                <a href="#" class="fw-700 text-info">
                                    {sub.full_name}
                                </a>
                            </td>                        
                            <td>
                                <span class="fw-bold text-danger">
                                {dimensionState.companyDetail.map((sub)=>(sub.set_currency))} {sub.paid_amount} 
                                </span> <br />
                               
                            </td>
                            <td><span className={(sub.status==1) ? "badge rounded-pill bg-success":"badge rounded-pill bg-warning"}>{sub.status==1?"Success":sub.status==3?"Cancelled":sub.status==0?"Pending":""}</span></td>
                        </tr>
                                                    
                    </tbody>
                    )):<h4 className='text-muted'>NO PAYMENTS </h4>}
                </table>
                </div>
                
                </div>
                :""
                }
            </div>
        </div>
    </section>
            </div>
        </div>
    </div>
  )
}

export default Transporter_detail