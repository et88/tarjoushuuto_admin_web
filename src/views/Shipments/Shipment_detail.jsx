import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Moment from 'react-moment';
import ReactStarsRating from 'react-awesome-stars-rating';
import '../../components/loader.css';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';






const Shipment_detail = () => {
  const [value, setValue] = React.useState('1')
    const {invoice_id} = useParams();
  const [state, setState] = React.useState({ shipmentDetail: { item_imgs: [], driver_detail:[] },quotes:[],shipment_status:[],customer_payment:[],admin_payment:[],transporter_payment:[], isLoading: true,detailFound:false  })
  const [addstate, setaddState] = React.useState({mode:"",transaction_id:""})
  const [editstate, seteditState] = React.useState({show:false,shipment_id:"",paid_to:""})
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
    ShipmentDetail()
   
   
  }, [])

    const ShipmentDetail = () => {

        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/shipment_detail`;
        let sendData = { invoice_id: invoice_id };
        console.log("bb",sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
          console.log("res -> ",res);
         
         
            setState({ ...state, shipmentDetail: res.data.output[0], quotes:res.data.quotes, shipment_status:res.data.shipment_status , customer_payment:res.data.customer_payment,admin_payment:res.data.admin_payment,transporter_payment:res.data.transporter_payment,isLoading:false})
          
     
        }).catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
          console.log("----error:   ", e);
        });
      };
      React.useEffect(() => {
        ShipmentDetail();
      }, [])

      const nameFormat = (name)=> {
        
        if(name) {
            let nameArray =  name.split(" ");
           // console.log("nameArray  ",nameArray);
            if(nameArray.length > 1) {
                let n1 = nameArray[0].substring(0,1).toUpperCase();
                let n2 = nameArray[1].substring(0,1).toUpperCase();
                name = n1+n2;
            }else {
                name = nameArray[0].substring(0,2).toUpperCase();
            }
        }else{
            name = "NO";
        }
        return name;
    }
    const pay_to_transporter=(data_array)=>{
      if(addstate.mode!="" && addstate.transaction_id!=""){
      let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/pay_to_transporter`;
      let sendData={
        data_array,mode:addstate.mode,transaction_id:addstate.transaction_id
      }
      axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
        console.log("res -> ",res);
        if(res.data.status==200){
          Swal.fire(
              'Good job!',
              ' Payment Sent Successfully !',
              'success'
            )
            ShipmentDetail()
            seteditState({...editstate,show:false,shipment_id:"",paid_to:""})
          

       }
       else if (res.data.status==201){
        Swal.fire({
          icon: 'error',
        
          text: res.data.message,
          
        })
        ShipmentDetail()
        seteditState({...editstate,show:false,shipment_id:"",paid_to:""})
       }
      
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })
        console.log("----error:   ", e);
      });}
      else{
        Swal.fire({
          icon: 'error',
        
          text: "Please Fill All Inputs",
          
        })
      }
     
    


    }
    const handleChange = (event) => {
      // event.persist()
       console.log("event is v",event.target.name);
       setaddState({
           ...addstate,
           [event.target.name]: event.target.value,
       })
   }
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={6}/></div>
            <div className='col-9' style={{marginLeft:"-60px"}}>
           
            {state.isLoading==false?  
<>
                <Sub_header/>
                
                <section>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div class="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                        <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li class="breadcrumb-item">
                                <a href="/shipments">
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Shipment</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Shipment# {state.shipmentDetail.invoice_id}</h2>
                    
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    {state.shipmentDetail.dstatus==1?<span class="badge rounded-pill bg-success">Active</span>:<span class="badge rounded-pill bg-danger">Inactive</span>}
                </div>
            </div>
            
    </section>

    

    
    <section class="">
        <div class="row">
          <div class="col-md-8">
                <p>
                    {state.shipmentDetail.pickup_address} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> {state.shipmentDetail.delivery_address}
                    <span class="text-end"><small class="text-muted"></small></span>
                </p>
              
  
              <section class="mt-3 mb-5">
                <h2>{state.shipmentDetail.current_shipment_status==1?"Start":state.shipmentDetail.current_shipment_status==2?"Pickup in Progress":state.shipmentDetail.current_shipment_status==3?"Picked Up":state.shipmentDetail.current_shipment_status==4?"In Transit":state.shipmentDetail.current_shipment_status==5?"Delivered":state.shipmentDetail.current_shipment_status==6?"Returned":state.shipmentDetail.current_shipment_status==7?"Cancelled":""}</h2>
              <p>Delivery ETA - <span className="text-muted"><Moment format="DD-MMMM-YYYY" unix>{state.shipmentDetail.pickup_datetime_to }</Moment> </span> | Scheduled Delivery - <span className="text-muted"><Moment format="DD-MMMM-YYYY" unix>{state.shipmentDetail.delivery_datetime_to }</Moment> </span></p>
               
                {/* <p>Delivery ETA - <span class="text-muted">03-02-2022 @ 23:29</span> | Scheduled Delivery - <span class="text-muted">03-02-2022 @ 23:29</span></p> */}
              </section>
  
             
              <section>
              {state.shipmentDetail.current_shipment_status>0?<h4>Tracking Status</h4>:""}
              {state.shipment_status.map((item,index)=>(

              
          (item.current_status==1)?
                 
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Start</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order has been confirmed by Carrier and assigned</p>
                  </div>
                  
                </div>
                :

                (item.current_status==2)?          
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Pickup in Progress</h3> 
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order Pickup In Progress </p>
                  </div>
                  
                </div>
                :
 
                (item.current_status==3)? 
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Pickedup</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order has been Pickedup by Driver</p>
                  </div>
                </div>
                :

                (item.current_status==4)?            
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">In Transit</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order In Transit </p>
                  </div>
                  
                </div>
                :
                (item.current_status==5)? 
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Delivered</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order has been Delivered by Driver</p>
                  </div>
                </div>
                :

                (item.current_status==6)?             
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Returned</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order has been Returned </p>
                  </div>
                  
                </div>
                :

                (item.current_status==7)?            
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h3 className="fs-5 ">Cancelled</h3>
                    <small className="text-muted">{item.current_date} {item.time} {item.current_location}</small>
                    <p>Order has been Cancelled </p>
                  </div>
                  
                </div>
                :""
                ))}
            </section>
              <section>
                {state.quotes.length>0?<h4>Quotes</h4>:""}
                
                {state.quotes.map((quote)=>(
                  <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-2">
                       
                               {
                                !quote.logo?  <img src={"https://dummyimage.com/50/004ba0/ffffff&text="+nameFormat(quote.full_name)} class=" rounded-circle"  height="80%" width="80%" />
                            :<img src={"https://cdn.tarjoushuuto.fi/web/"+quote.logo}class=" rounded-circle" height="100%" width="100%"/>}</div>
                            
                            <div class="col-12 col-md-6">
                                <h6><a href="" class="text-info">{quote.branch_name}</a></h6>
                  <ReactStarsRating value={quote.total_ratings!==0 && quote.total_reviews!==0?(quote.total_ratings/ quote.total_reviews):"0"} isEdit={false} isHalf={true} className="tab-content"/> <br/>

                                <small class="text-muted">{quote.date} {quote.time}</small>
                            </div>
                            <div class="col-12 col-md-4">
                               
                                {quote.status==2?<h2>{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{quote.cost}</h2>:quote.status==1?<h2>{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{quote.cost}</h2>:
                                 <h2 class="text-muted"><del class="text-muted">{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{quote.cost}</del></h2>}
                               {quote.status==2? <span class="badge rounded-pill bg-success">Accepted</span>:
                               quote.status==3?
                                <span class="badge rounded-pill bg-danger">Rejected</span>
                              :""}
                            </div>
                        </div>
                        <hr />
                        {/* <div class="row">
                            <div class="col-12 col-md-2">
                                <img src="https://dummyimage.com/60/1976d2/ffffff&amp;text=NH" class="img-fluid rounded-circle" />
                            </div>
                            <div class="col-12 col-md-6">
                                <h6><a href="" class="text-info">PARAS TRANSPORT</a></h6>
                                <small class="text-muted">28 March 2022 21:29</small>
                            </div>
                            <div class="col-12 col-md-4">
                                <h2 class="text-muted"><del class="text-muted">USD881</del></h2>
                                <span class="badge rounded-pill bg-danger">Rejected</span>
                            </div>
                        </div> */}
                    </div>
                  </div>
                ))}
              </section>
              {state.customer_payment.length > 0 ?
              state.customer_payment.map((pay)=>(
              <section>
                <h4>Payment Info</h4>
                  <div class="card shadow-sm mb-3">
                    <div class="card-body table-wrapper table-responsive">
                      <div class="text-end"><h3 class="fs-5 "><a href="" class="text-info">Customer Invoice #{pay.invoice_id}</a></h3></div>
                      <p>Transcation ID #<a href="">{pay.transaction_id}</a></p>
                      <p>Payment Mode : <a>{pay.payment_method}</a></p>
                      <hr />
                      <table class="table  table-hover">
                        <thead>
                          <tr>
                            <th colspan="2">Particulars</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Shipment #<a href="" class="text-info">{pay.shipment_id}</a> bid amount + Service Charge</td>
                            <td></td>
                           
                            <td class=""><h6> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{state.shipmentDetail.cost + pay.service_charge}</h6></td>
                          </tr>
                          
                          <tr>
                            <td>Less: Total paid by customer
                                <table class="">
                                    <tbody>
                                        <tr>
                                            <td>Advance for Transporter</td>
                                            <td> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.transporter_advance}</td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>Admin Fee</td>
                                            <td> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.admin_advance}</td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>Service Charge</td>
                                            <td> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.service_charge}</td>
                                            <td></td>
                                          </tr>
                                    </tbody>
                                  </table>
                            </td>
                            <td></td>
                            <td class="text-success"><h6> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.paid_amount}</h6></td>
                          </tr>
                          <tr>
                            <td class="fw-700 text-end">To be paid by customer</td>
                            <td></td>
                            <td class="text-danger"><h5> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.remaining_amount}</h5></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </section>)):""}

              <section>
              {state.transporter_payment.length > 0 ?
              state.transporter_payment.map((paid)=>(
                  <div class="card shadow-sm mb-3">
                    <div class="card-body table-wrapper table-responsive">
                      <div class="text-end"><h3 class="fs-5 "><a href="" class="text-info">Transporter Invoice #{paid.invoice_id}</a></h3></div>
                      <p>Transcation ID #<a href="">{paid.transaction_id}</a></p>
                      <p>Payment Mode <a href="">{paid.mode}</a></p>
                      <hr />
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th colspan="2">Particulars</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Shipment  #<a href="" class="text-info">{paid.shipment_id}</a> Transporter Advance</td>
                            <td></td>
                            <td class=""><h6> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{state.shipmentDetail.transporter_advance}</h6></td>
                          </tr>
                          
                          <tr>
                            <td>Less: Paid to transporter Transcation ID #<a href="">{paid.transaction_id}</a></td>
                            <td></td>
                            <td class="text-success"><h6> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{paid.paid_amount}</h6></td>
                          </tr>
                          <tr>
                            <td class="fw-700 text-end">Balance</td>
                            <td></td>
                            <td class="text-danger"><h5> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{state.shipmentDetail.transporter_advance - paid.paid_amount}</h5></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  )):""}
              </section>
            </div>

          <div class="col-md-4">
          {state.admin_payment.length > 0 ?
              state.admin_payment.map((pay)=>(
            <section class="bg-white p-3 mb-3"> 
                 <div class="d-flex justify-content-between">
                    <div class="p-2">
                        <p>Transporter Balance</p>
                    </div>
                    <div class="p-2">
                  
                        <h5 class="text-danger"> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{pay.transporter_advance!=0?pay.transporter_advance:"Paid"}</h5>
                    </div>
                </div>
                
               {pay.transporter_advance!=0? <button onClick={()=>seteditState({...editstate,show:true,shipment_id:state.shipmentDetail.invoice_id,paid_to:state.shipmentDetail.transporter_id})} class="btn btn-primary">Pay to Transporter</button>:""}
            </section>)):""}
            <Modal show={editstate.show} onHide={()=>seteditState({...editstate,show:false})} >
           
            <div class="modal-header">
                <h2 class="h6 modal-title">Transporter Payout</h2>
                <button  class="btn-close" onClick={()=>seteditState({...editstate,show:false})} aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        {/* <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Date</label>
                                <input type="date" class="form-control" id="email" placeholder="" name="email" />
                              </div>
                        </div> */}
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Shipment</label>
                                <input className='form-control' value={editstate.shipment_id} disabled></input>
                              
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Mode</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter Mode eg. Paypal, Bank etc." value={addstate.mode} name="mode" onChange={handleChange} />
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Mode Transcation ID</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter Mode eg. Paypal, Bank etc." name="transaction_id" value={addstate.transaction_id}onChange={handleChange} />
                              </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3 text-end text-danger">
                                {state.admin_payment.map((sub)=>(<h3> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{sub.transporter_advance}</h3>))}
                              </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
            {state.admin_payment.map((sub)=>(  <button  class="btn btn-secondary" onClick={()=>pay_to_transporter({shipment_id:editstate.shipment_id,paid_to:editstate.paid_to,paid_amount:sub.transporter_advance})}>Paid</button>))}
                <button type="button" class="btn btn-link text-gray-600 ms-auto"  onClick={()=>seteditState({...editstate,show:false})}>Close</button>
            </div>
            </Modal>
       


            <section class="bg-white">
                <section class="ps-4 pt-3">
                    <h3 class="fs-5 pb-3">Basic information</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <small class="text-muted">Shipment Tracking #</small>
                        <h4 class="fs-5">{state.shipmentDetail.invoice_id}</h4>
                      </div>
                      {/* <div class="col-md-6">
                        <small class="text-muted">PO/Refernce #</small>
                        <h4 class="fs-5">293848</h4>
                      </div> */}
                      <div class="col-md-6">
                        <small class="text-muted">Pickup</small>
                        <h4 class="fs-6">{state.shipmentDetail.pickup_address}</h4>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Delivery</small>
                        <h4 class="fs-6">{state.shipmentDetail.delivery_address}</h4>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Shipper</small>
                        <h4 class="fs-5"><a href="">{state.shipmentDetail.full_name}</a></h4>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Item(s)</small>
                        <h4 class="fs-5">{state.shipmentDetail.qty}</h4>
                      </div>
                      <small class="text-muted">Noted: {state.shipmentDetail.description} </small>
                    </div>
                  </section>
        
                  <hr class="m-4" />
        
        
                  <section class="ps-4">
                    <h3 class="fs-5 pb-3">Order details</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <small class="text-muted">Carrier</small>
                        <h4 class="fs-5">{state.shipmentDetail.branch_name!=undefined && state.shipmentDetail.branch_name!=''?<a href="">{state.shipmentDetail.branch_name}</a>:"Not Booked"}</h4>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Order on</small>
                        <h4 class="fs-5"><Moment format="MMMM DD , YYYY" unix>{state.shipmentDetail.created}</Moment>

<small className="text-muted">{state.shipmentDetail.time}</small></h4>
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Total Price #</small>
                        <div>
                        {state.shipmentDetail.products.map((item,index)=>
                        <>
                        Item {index+1}
                        <h4 class="fs-5"> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{item.dimensions[0].item_value}</h4>
                        </>)}
                        </div>
                        
                      </div>
                      <div class="col-md-6">
                        <small class="text-muted">Total Weight</small>
                        <h4 class="fs-5">{state.shipmentDetail.item_weight} {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_weight
                                   ))}</h4>
                      </div>
                    </div>
                  </section>
        
                  <hr class="m-4" />
        
                  <section class="ps-4">
                    <h3 class="fs-5 pb-3">Shipping Items</h3>
                    <div class="row">
                   
                      <div class="col-md-12">
                        <h4 class="fs-6">{state.shipmentDetail.title}</h4>
                        {state.shipmentDetail.products.map((item,index)=>
                        <>
                        Item {index+1}
                        <div><small class="text-muted">{item.dimensions[0].item_weight}   {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_weight
                                   ))} - {item.dimensions[0].item_height} x{item.dimensions[0].item_length} x{item.dimensions[0].item_width}  {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_dimension
                                   ))}</small></div>
                        
                      </>  )}
                      </div>
                  
                      
                    </div>
                  </section>
                  
                  <hr class="m-4" />
        
                  <section class="ps-4">
                    <h3 class="fs-5 pb-3">Shipping Equipments</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <small class="text-muted">Truck Type</small>
                        <h4 class="fs-6">{state.shipmentDetail.service_type}</h4>
                      </div>
                      {state.shipmentDetail.driver_detail.map((item,index)=>
                      <div class="col-md-6">
                        <small class="text-muted">Truck Number</small>
                        <h4 class="fs-6">{item.vehicle_number}</h4>
                      </div>)}
                      {state.shipmentDetail.driver_detail.map((item,index)=>
                      <div class="col-md-6 ">
                        <small class="text-muted">Driver Name</small>
                        <h4 class="fs-6">{item.driver_name}</h4>
                      </div>)}
                      {state.shipmentDetail.driver_detail.map((item,index)=>
                      <div class="col-md-6 ">
                        <small class="text-muted">Driver Mobile Number</small>
                        <h4 class="fs-6">{item.mobile_number}</h4>
                      </div>)}
                       
                    </div>
                  </section>
            </section>
  
          </div>
        </div>
      </section></>:<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
}
            </div>
        </div>
    </div>
  )
}

export default Shipment_detail