import React, { useEffect } from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import '../../components/loader.css';
import TablePagination from '@mui/material/TablePagination';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'





const Shipments = () => {
    let navigate = useNavigate();
    const [state, setState] = React.useState({
        transporter_list: [{item_imgs:[]}],
        dataCount: 0,
        isLoading: true,
        dialogOpen: false,
        searchValue: "",
       

    })
    const search = window.location.search;
    // console.log("search -   ",search);
    const params = new URLSearchParams(search);
    let title= params.get('title')
    let juu = search.split("?status=");
    // console.log("params 00  -- - -  - - -  ",juu)
    let shipmetFilterUrl = [];
    if(juu[1]) {
    // console.log("params  -- - -  - - -  ",juu[1].split('%26'))
     shipmetFilterUrl = juu[1].split('%26');
    }
    //let status = params.get('status');
    //console.log("status====",status)
   

  const [shipmentstate, setshipStatus] = React.useState({ shipment_status: null });
const[modals,setModals] = React.useState({show: false,invoice_id:""})
const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
const [statusfilters, setstatusFilters] = React.useState({ current_status: shipmetFilterUrl })
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

    const axios_get_api = (shipment_status,index=0,onLoad) => {
         console.log("dstatus--->",shipment_status)
      
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/shipment_list`;
        let sendData = {
            find:"",
            shipment_status: shipment_status,
            current_status:"",
            indexValue: index,
            limit:otherStates.rowsPerPage
        };
        console.log("sendData",sendData)
        if(statusfilters.current_status.length>0){
            sendData.current_status = statusfilters.current_status
        }
        if(title!=null && title.length>0){
            sendData.find= title
        }
       
         console.log("send",sendData)
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            // console.log("index",index)
            // console.log("onLoad",onLoad)

            if(index==0  && onLoad) {
                setOtherState({...otherStates,total_count:res.data.dataCount})         
    }
           
         setState({ ...state, transporter_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
          
          console.log( "response",res);
        //      if (status != null) {
        //     console.log("loct - -   ", JSON.parse(status));
        //      setstatusFilters({...statusfilters, current_status:JSON.parse(status)})
        // }



        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
            console.log("----error:   ", e);
        })

    }
    const searchUser = ( shipment_status,index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/shipment_find_detail`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,title:"", shipment_status: shipment_status,};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.title=  searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        
//    setState({ ...state,searchValue:res.data.title})
   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
   setState({ ...state, transporter_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
       
   
   

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
    if (e.target.name == "stitle") {
      
            params.delete('title')
            title= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
            //   navigate({ search: params.toString() })

        }
//    setsearchFilters({ ...searchfilters, searchtitle:searchfilters.searchtitle})
    setOtherState({...otherStates,onload:true})
}
const filter=()=>{
   title=null
    params.delete('title')
    if (searchfilters.searchtitle !== "") {           
        params.append('title', searchfilters.searchtitle)
    }
    searchUser(null,0)
    // setState({ ...state, isLoading: true })
    navigate({ search: params.toString() })

}
React.useEffect(()=>{
    if (title) {
        setsearchFilters({...searchfilters,searchtitle:title})
    }
searchUser(null,0)
// axios_get_api(null,0,true);


},[])
React.useEffect(()=>{
    if (statusfilters.current_status.length > 0) {   
        params.delete('status');
        // console.log("current_status ===========>    ",statusfilters.current_status); 
        // console.log("current_status ===========>    ",statusfilters.current_status.join('&'));        
        params.append('status', statusfilters.current_status.join('&'))
      
    }
    else{
        
         
    }
    
    axios_get_api(null,0,true);

    navigate({ search: params.toString() })
  
},[statusfilters])

    
    const shipmentFilter = (dstatus) => {
         console.log("action ",dstatus);
        setshipStatus({ ...shipmentstate, shipment_status: dstatus })
      
        axios_get_api(dstatus,0,true)
        
      }
   
    function deleteship(invoice_id) {
        let userdata = {invoice_id:invoice_id}
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/shipment_remove` , userdata ,{ headers: exportValue.headers }).then((res)=>{
       
         setState({...state,invoice_id:invoice_id});
         setModals({...modals, show:false})
         console.log("res",res)
         axios_get_api();
         if(res.data.status==200){
            Swal.fire(
                'Good job!',
                'Shipment is Deleted Successfully !',
                'success'
              )
         }
         else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
         }
         }).catch((e) => {
   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
           
         })
     }
     function shipment_active_inactive(invoice_id,dstatus) {
        let userdata = {invoice_id:invoice_id, dstatus:dstatus}
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/shipment_status` , userdata ,{ headers: exportValue.headers }).then((res)=>{
       
         setState({...state,invoice_id:invoice_id});
         console.log("res",res)
         axios_get_api();
         if(res.data.status==200){
            Swal.fire(
                'Good job!',
                'Status Changed Successfully !',
                'success'
              )
         }
         else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
         }
         }).catch((e) => {
   
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
           
         })
     }
     const handlePageChange = (event,newPage) =>{
        // console.log("newpage",newPage)
        setOtherState({...otherStates,page:newPage})
        //console.log("newPage ", newPage);
        axios_get_api(shipmentstate.shipment_status,newPage);
        
        searchUser(state.searchValue,newPage)
    }
    const handleChangeRowsPerPage = (event,newPage) => {
        // console.log("event ", event);
        setOtherState({...otherStates, rowsPerPage:+event.target.value, page:0})
       
    }
    const deleteConfirm = (invoice_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            //console.log("result  ",result);
            if(result.isConfirmed) {
                deleteship(invoice_id)
            }       
        })

    }
  
    const handleStatusChange = (e) => {
        const checked = e.target.checked;
        console.log("checked",checked)
        const selectedStatus = e.target.value;
        console.log("selectedStatus",selectedStatus)

        if (checked) {
            setstatusFilters(prevState => ({
                current_status: [...prevState.current_status, selectedStatus]
            }));
        } else {
            setstatusFilters(prevState => ({
                current_status: prevState.current_status.filter(current_status => current_status !== selectedStatus)
            }));
        }

        // status=null
        // params.delete('status')
        // if (statusfilters.current_status.length > 0) {           
        //     params.append('status', JSON.stringify(statusfilters.current_status))
        // }
        // axios_get_api();
        // navigate({ search: params.toString() })

        // status=null
        // params.delete('status')
        // if (statusfilters.current_status.length > 0) {           
        //     params.append('status', JSON.stringify(statusfilters.current_status))
        // }
        // axios_get_api();
        // navigate({ search: params.toString() },{ replace: true })


        //ShipmentList()
    }

    const currentStatusIschecked = (value) => {
        // console.log("current_status",value)       
        let index = statusfilters.current_status.indexOf(value);
        // console.log("index",index)
       
        return (index != -1) ? true : false;
       
    }

  

  return (
    <div>
        
            {/* <div className='col-3'><Left_panel value={6}/></div> */}
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:
            <div className='' >
               <Sub_header/>
               <Modal show={modals.show} onHide={()=>setModals({show:false})} >
                                    <Modal.Header closeButton>
                                      <Modal.Title>Remove Shipment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you really want to remove this shipment ?</Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={() => setModals({ show: false })}>
                                        Cancel
                                      </Button>
                                      <Button variant="primary" 
                                        onClick={() =>
                                            deleteship(modals.invoice_id)
                                        }>
                                        Remove
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
           
               <section>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div class="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" class="d-md-inline-block">
                        <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li class="breadcrumb-item">
                                <a href="/">
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Shipments</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Shipments</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search Shipments" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)}/>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"><i class="fa fa-filter" aria-hidden="true"></i> &nbsp;
                            Filter <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu">
                            <section class="p-2">
                            <h6>Filter</h6>
                            <hr />
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="Booked" value="1"   checked={  currentStatusIschecked("1")} onChange={(e)=>handleStatusChange(e)}/>
                                    <label class="form-check-label">Booked</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="Picked Up" value="3" checked={  currentStatusIschecked("3")} onChange={(e)=>handleStatusChange(e)}/>
                                    <label class="form-check-label">Picked Up</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="In Transit" value="4" checked={  currentStatusIschecked("4")} onChange={(e)=>handleStatusChange(e)}/>
                                    <label class="form-check-label">In Transit</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="Delivered" value="5"checked={  currentStatusIschecked("5")} onChange={(e)=>handleStatusChange(e)} />
                                    <label class="form-check-label">Delivered</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="check1" name="Out for delivery" value="8"checked={  currentStatusIschecked("8")} onChange={(e)=>handleStatusChange(e)} />
                                    <label class="form-check-label">Out For Delivery</label>
                                </div>
                            </section>
                          
                        </div>
                      </div>

                </div>
            </div>
            
            <section>
                <ul class="nav nav-tabs justify-content-end">
                    <li class="nav-item">
                     
                  <a className={(shipmentstate.shipment_status == null) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(null)}>All</a>

                    </li>
                    <li class="nav-item">
                    <a className={(shipmentstate.shipment_status == 1) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(1)}>Active</a>
                      
                    </li>
                    <li class="nav-item">
                    <a className={(shipmentstate.shipment_status == 2) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(2)}>Inactive</a>
                    </li>
                </ul>
            </section>
            <div class="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Shipment ID</th>	
                            <th class="border-gray-200">Particulars</th>	
                            <th class="border-gray-200 ship_pickup">Pickup</th>
                            <th class="border-gray-200">Delivery</th>
                            <th class="border-gray-200">Status</th>
                            <th class="border-gray-200">Action</th>
                        </tr>
                    </thead>
                    {state.transporter_list.map((sub)=>(
                    <tbody>
                  
                      
                        <tr>
                            <td>
                                <a href={"/shipment_detail/" + sub.invoice_id} class="text-info fw-700">{sub.invoice_id}</a> <br />
                                <span class="fw-normal">  {sub.date} <small>{sub.time}</small></span>
                            </td>                        
                            <td>
                            <div class="d-flex shipment_list">
                                <div class="">
                                {sub.item_imgs.length>0? 
     <img src={`https://cdn.tarjoushuuto.fi/web/${sub.item_imgs[0]}`} className="img-fluid " width="70%"  /> :(sub.item_imgs.length==0)?<img src={`https://cdn.tarjoushuuto.fi/web/${sub.subcategory_img}`}  width="70%"/>:(sub.subcategory_img.length==0)?<img src={`https://cdn.tarjoushuuto.fi/web/${sub.category_img}`}  width="70%"/>:
     <img src="../../../assets/img/image.png" />}
   
                             <br />
                                {/* <span class="badge rounded-pill bg-warning">+2 Items</span> */}
                                </div>
                                <div class="p-1">
                                    <a href={"/shipment_detail/" + sub.invoice_id} class="fw-bold text-info fw-700 fs-normal" >
                                        {sub.title}
                                    </a>
                                    <p>
                                        <span class="badge rounded-pill bg-primary">Type: {sub.service_type}</span> 
                                        <span class="badge rounded-pill bg-danger">Total quotes {sub.total_quotes}</span>
                                        {sub.lowest_quote!='' && sub.lowest_quote!=undefined?   <span class="badge rounded-pill bg-info">Lowest bid {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{sub.lowest_quote}</span>:""}<br />
                                    </p> 
                                </div>
                            </div>
                                
                            </td>
                            <td class="">
                                <span class="fw-bold">{sub.pickup_address} <br /></span><br />
                                <small>{sub.pickup_address_type}</small>
                            </td>
                            <td>
                                <span class="fw-bold">{sub.delivery_address}</span><br />
                                <small>{sub.delivery_address_type}</small>
                            </td>
                            <td>
                                <span class="badge rounded-pill bg-success">{sub.dstatus==1?"Active":"Inactive"}</span><br />
                           
                               
                                {sub.current_shipment_status==1? <span class="badge rounded-pill bg-success">Booked</span>:sub.current_shipment_status==2?<span class="badge rounded-pill bg-primary">Pickup In Progress</span>:sub.current_shipment_status==3?<span class="badge rounded-pill bg-info">Picked Up</span>:sub.current_shipment_status==4?<span class="badge rounded-pill bg-primary">In Transit</span> :sub.current_shipment_status==5?<span class="badge rounded-pill bg-warning">Delieverd</span>:sub.current_shipment_status==6?<span class="badge rounded-pill bg-primary">Returned</span>:sub.current_shipment_status==7?<span class="badge rounded-pill bg-primary">Cancelled</span>:sub.current_shipment_status==8?<span class="badge rounded-pill bg-danger">Out For Delivery</span>:<span class="badge rounded-pill bg-primary">Not Booked</span>}
                                
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon icon-sm">
                                            <span class="fa fa-ellipsis-h icon-dark"></span>
                                        </span>
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu py-0">
                                        <a class="dropdown-item rounded-top" href={"/shipment_detail/" + sub.invoice_id}><span class="fa fa-eye me-2"></span>View</a>
                                        {sub.status==0?
                                        <div>
                                         {sub.dstatus==2?<a class="dropdown-item rounded-top" onClick={() => shipment_active_inactive(sub.invoice_id, 1)}><span class="fa fa-eye-slash me-2"></span>Active</a>
                                        
                                        :
                                         <a class="dropdown-item rounded-top" onClick={() => shipment_active_inactive(sub.invoice_id, 2)}><span class="fa fa-eye-slash me-2"></span>Inactive</a>}
                           

                                        
                                        {/* <a class="dropdown-item text-danger rounded-top" href="#"><span class="fa fa-ban me-2"></span>Suspend User</a> */}
                                        <a class="dropdown-item text-danger rounded-bottom" data-bs-target="#modal-transaction-payment"  data-bs-toggle="modal"  onClick={()=>deleteConfirm(sub.invoice_id)}><span class="fa  fa-trash me-2"></span>Remove</a>
                                        </div>:""}
                                    </div>
                                 
                                </div>
                            </td>
                        </tr>
                                           
                    </tbody>
                    
                ))}
                </table>
                
              
            </div> 
            <TablePagination
                component="div"
                rowsPerPageOptions={[5,10]}
                count={otherStates.total_count}
                page={otherStates.page}
                onPageChange={handlePageChange}
                rowsPerPage={otherStates.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
               
                        />
                    

    </section>
    
    


                </div>
                
                                
        
                                        }
                                

    </div>
  )
}

export default Shipments