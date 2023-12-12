import React, { useEffect } from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import '../../components/loader.css';
import TablePagination from '@mui/material/TablePagination';
import { Container, Row, Col, Form, Button, ProgressBar, ModalFooter } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'



const Admin_payments = () => {
    let navigate = useNavigate();
    const [state, setState] = React.useState({
        transaction_list: [],
        dataCount: 0,
        isLoading: true,
        dialogOpen: false,
        searchValue: "",
       

    })
    const search = window.location.search;
    // console.log("search -   ",search);
    const params = new URLSearchParams(search);
    let transaction= params.get('transaction')
 
   
  const [shipmentstate, setshipStatus] = React.useState({ status: null });
const[modals,setModals] = React.useState({show: false,transaction_id:"",shipment_id:"",created:"",date:"",merchant_id:"",full_name:"",payer_email:"",payer_id:"",paid_amount:"",currency_code:"",t_uid:"",payment_method:"",status:"",service_charge:"",invoice_id:"",remaining_amount:"",transporter_advance:"",admin_advance:""})
const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});

const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })
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
    axios_get_api()
   
   
  }, [])


    const axios_get_api = (index=0,onLoad) => {
        //  console.log("dstatus--->",shipment_status)
      
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/admin_payment_transaction_list`;
        let sendData = {
            find:"",
            // status: status,
            indexValue: index,
            limit:otherStates.rowsPerPage
        };
       
        if(transaction!=null && transaction.length>0){
            sendData.find= transaction
        }
       
         console.log("send",sendData)
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            

            if(index==0  && onLoad) {
                setOtherState({...otherStates,total_count:res.data.dataCount})         
    }
           
         setState({ ...state, transaction_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
          
          console.log( "response",res);
       


        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
            console.log("----error:   ", e);
        })

    }
    React.useEffect(()=>{
       axios_get_api(0,true)
    },[])

    const searchUser = (index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/admin_transaction_find_detail`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,transaction_id:"",};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle!="") {
           transporter_data.transaction_id=  searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        
//    setState({ ...state,searchValue:res.data.title})
   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
   setState({ ...state, transaction_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
       
   
   

   }).catch((e) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
       console.log("----error:   ", e);
   })          
  }

const stateHandler = (e) => {
    // state[key] = value
    if (e.target.name == "stransaction") {
      
            params.delete('transaction')
            transaction= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
            //   navigate({ search: params.toString() })

        }
//    setsearchFilters({ ...searchfilters, searchtitle:searchfilters.searchtitle})
    setOtherState({...otherStates,onload:true})
}
const filter=()=>{
    transaction=null
    params.delete('transaction')
    if (searchfilters.searchtitle !== "") {           
        params.append('transaction', searchfilters.searchtitle)
    }
    searchUser(0)
    // setState({ ...state, isLoading: true })
    navigate({ search: params.toString() })

}
React.useEffect(()=>{
    if (transaction) {
        setsearchFilters({...searchfilters,searchtitle:transaction})
    }
// searchUser(null,0)
// axios_get_api(null,0,true);


},[])

    
    // const shipmentFilter = (status) => {
    //     // console.log("action ",dstatus);
    //     setshipStatus({ ...shipmentstate, status: status })
      
    //     axios_get_api(0,true)
        
    //   }
   
   
     const handlePageChange = (event,newPage) =>{
        // console.log("newpage",newPage)
        setOtherState({...otherStates,page:newPage})
        //console.log("newPage ", newPage);
        axios_get_api(newPage);
        
        searchUser(state.searchValue,newPage)
    }
    const handleChangeRowsPerPage = (event,newPage) => {
        // console.log("event ", event);
        setOtherState({...otherStates, rowsPerPage:+event.target.value, page:0})
       
    }
  return (
    <div>
         <Modal show={modals.show} onHide={()=>setModals({show:false})}>
         <div class="modal-content">
       <div class="modal-header">
         <h2 class="h6 modal-title">Invoice #{modals.invoice_id}</h2> 
           <button type="button" class="btn-close" onClick={()=>setModals({...modals,show:false})} aria-label="Close"></button>
       </div>
       <div class="modal-body">
           <table class="table">
               <tbody>
                 <tr>
                   <td class="fw-700 text-dark">Date</td>
                   <td><Moment format="MMMM DD , YYYY  HH:MM:ss A" unix>{modals.created}</Moment></td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Transaction ID</td>
                   <td>{modals.transaction_id}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">User name</td>
                   <td>{modals.full_name}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Method</td>
                   <td>{modals.payment_method}</td>
                 </tr>
               
                 <tr>
                   <td class="fw-700 text-dark">Total Amount</td>
                   <td>{modals.currency_code}{modals.admin_advance + modals.transporter_advance}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Admin Fees</td>
                   <td>{modals.currency_code}{modals.admin_advance}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Transporter Advance</td>
                   <td>{modals.currency_code}{modals.transporter_advance}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Service Charge</td>
                   <td>{modals.currency_code}{modals.service_charge}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Amount To Be Paid To Transporter</td>
                   <td>{modals.currency_code}{modals.transporter_advance}</td>
                 </tr>
                 <tr>
                   <td class="fw-700 text-dark">Status</td>
                   <td><span class="badge bg-warning">{modals.status==1?"Success":modals.status==3?"Cancelled":modals.status==2?"Pending":""}</span></td>
                 </tr>
               </tbody>
             </table>
       </div>
       <ModalFooter>
       <button type="button" class="btn btn-link text-gray-600 ms-auto" onClick={()=>setModals({...modals,show:false})}>Close</button>

       </ModalFooter>
   
   </div>
</Modal>
    <div className='row'>
            <div className='col-3'><Left_panel value={22}/></div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:
            <div className='col-9' style={{marginLeft:"-60px"}}>
                <Sub_header/>
                  
    <section>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div class="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                        <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li class="breadcrumb-item">
                                <a href="#">
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Payments</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Admin Payments</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"  onClick={(e) => filter(e)}>
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search Transaction"name="stransaction" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)} />
                    </div>
                </div>
            </div>
           
            <div class="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Initiated</th>
                            <th class="border-gray-200">Transaction ID</th>
                            <th class="border-gray-200">Amount</th>
                            {/* <th class="border-gray-200">Transporter Amount</th>						 */}
                            <th class="border-gray-200">Shipment #</th>						
                            <th class="border-gray-200">Paid By</th>
                           
                            <th class="border-gray-200">Status</th>
                        </tr>
                    </thead>
                    {state.transaction_list.length>0?
                    state.transaction_list.map((sub)=>(
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
                                <a onClick={()=>setModals({...modals,show:true,transaction_id:sub.transaction_id,shipment_id:sub.shipment_id,invoice_id:sub.invoice_id,created:sub.created,date:sub.date,full_name:sub.full_name,paid_amount:sub.paid_amount,currency_code:sub.currency_code,t_uid:sub.t_uid,payment_method:sub.payment_method,status:sub.status,service_charge:sub.service_charge,remaining_amount:sub.remaining_amount,transporter_advance:sub.transporter_advance,admin_advance:sub.admin_advance})}   class="fw-700 text-info">{sub.transaction_id}</a>
                            </td>
                            <td>
                               
                                <small class="fw-bold text-danger">
                                {sub.currency_code}{sub.admin_advance} 
                                </small>
                            </td>
                            <td>
                                <a href="" class="fw-700 text-info">{sub.shipment_id}</a>
                            </td>
                            <td>
                                <a href="#" class="fw-700 text-info">
                                    {sub.full_name}
                                </a>
                            </td>                        
                           
                            <td><span class="badge rounded-pill bg-success">{sub.status==1?"Success":sub.status==3?"Cancelled":sub.status==2?"Pending":""}</span></td>
                        </tr>
                                                    
                    </tbody>
                    )):<h4 className='text-muted'>NO PAYMENTS </h4>}
                </table>
                <TablePagination
                component="div"
                rowsPerPageOptions={[5,10]}
                count={otherStates.total_count}
                page={otherStates.page}
                onPageChange={handlePageChange}
                rowsPerPage={otherStates.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
               
                        />
               </div>
                    

    </section>

    <section>
            
         {/* <!-- End of Modal Content --> */}
    </section>
            
            </div>
}
        </div>
  </div>
  )
}

export default Admin_payments