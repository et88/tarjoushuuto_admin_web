import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import '../../components/loader.css';
import TablePagination from '@mui/material/TablePagination';
import { Container, Row, Col, Form, Button, ProgressBar, ModalFooter } from "react-bootstrap"



const Tickets = () => {

  const [state, setState] = React.useState({
    ticket_list:[],
    dataCount: 0,
    isLoading: true,
    dialogOpen: false,
    searchValue: "",
   

})
const [shipmentstate, setshipStatus] = React.useState({ status: null });
const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
const[editmodals,setEditModals] = React.useState({show: false, ticket_id:"" ,subject:"",ticket_createdById:"",shipment_id:"",date:"",time:"",details:"",full_name:"",ticket_branch_name:"",reply_detail:[],transporter_id:"",user_id:"", full_name_transporter:""})
const [reply, setReply] = React.useState({  reply_content:"",reply_id:"",ticket_id:"" })

let admindata = {};
if (localStorage.getItem('admin_login')) {
  admindata = JSON.parse(localStorage.getItem('admin_login'));
  console.log("admindata------>  -  ",admindata);
  //navigate('/home') 
}
let admin = admindata.admin_id
console.log("admin_id",admin)
const axios_get_api = (status,index=0,onLoad) => {
     console.log("dstatus--->",status)
  
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/ticket_list`;
    let sendData = {
        find: state.searchValue,
        status: status,
        
        indexValue: index,
        limit:otherStates.rowsPerPage
    };
     console.log("send",sendData)
    axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
        console.log("index",index)
        console.log("onLoad",onLoad)

        if(index==0  && onLoad) {
            setOtherState({...otherStates,total_count:res.data.dataCount})         
}
       
     setState({ ...state, ticket_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
    //  setEditModals({...editmodals,ticket_id:res.data.ticket_id ,subject:res.data.subject,ticket_createdById:res.data.ticket_createdById,shipment_id:res.data.shipment_id,date:res.data.date,time:res.data.time,details:res.data.details,reply:res.data.reply,ticket_branch_name:res.data.ticket_branch_name ,full_name:res.data.full_name})
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

React.useEffect(() => {
  axios_get_api(null,0,true)
}, [])

const shipmentFilter = (status) => {
  console.log("action ",status);
  setshipStatus({ ...shipmentstate, status: status })

  axios_get_api(status,0,true)
  
}

const handlePageChange = (event,newPage) =>{
  console.log("newpage",newPage)
  setOtherState({...otherStates,page:newPage})
  //console.log("newPage ", newPage);
  axios_get_api(shipmentstate.status,newPage);
  
  // searchUser(state.searchValue,newPage)
}
const handleChangeRowsPerPage = (event,newPage) => {
  console.log("event ", event);
  setOtherState({...otherStates, rowsPerPage:+event.target.value, page:0})
 
}

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

const handleChange = (event) => {
  console.log(event);  
  setReply({
      ...reply,
      [event.target.name]: event.target.value,
    });
  
}

const handleSupportReply = (ticket_id) => {
  console.log("ticket_id",ticket_id)
    
  console.log("submit1");
 
  let state_detailes = {reply_content:reply.reply_content,reply_id:"", ticket_id:editmodals.ticket_id}
 
  if(admindata.admin_id) {
    state_detailes.reply_id = admindata.admin_id;
  }
 

  console.log("report detailes is ",state_detailes);
 
  axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_reply`,  state_detailes , { headers: exportValue.headers }).then((result)=>{
          console.log("result is i ",result);
         
          if(result && result.data != undefined){
             
            Swal.fire(
              'Good job!',
              ' Reply Sent  Successfully !',
              'success'
            )
               setEditModals({...editmodals,show:false})
               setReply({...reply,reply_content:""})
              axios_get_api()
                  
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
        console.log("----error:   ", e);
      });
}
const closeTicket = (ticket_id) => {

  let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/closeTicket`;
  let sendData = {ticket_id:ticket_id};
  // console.log("bb", sendData);
  axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
      console.log("res ", res);
      Swal.fire(
          'Success!',
          'Ticket Successfully Closed!',
          'success'
        )
        setEditModals({...editmodals,show:false})
       axios_get_api()
    //  setState(res.data.output)
     // setOtherState({ ...otherStates, total_count: res.data.count });
  }).catch((e) => {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })
   
    console.log("----error:   ", e);

  });

}
const deleteConfirm = (ticket_id) => {
  Swal.fire({
      title: 'Are you sure?',
      text: "You want to close this ticket!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
  }).then((result) => {
      //console.log("result  ",result);
      if(result.isConfirmed) {
          closeTicket(ticket_id)
      }       
  })

}
    

  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={15}/></div>
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
                            <li class="breadcrumb-item active" aria-current="page">Tickets</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Tickets</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            <section>
                <ul class="nav nav-tabs justify-content-end">
                    <li class="nav-item">
                      <a class={(shipmentstate.status == null) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(null)}>All</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 0) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(0)}>Pending</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 1) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(1)}>Answered</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 2) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(2)}>Closed</a>
                    </li>
                </ul>
            </section>
            <div class="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Date</th>
                            <th class="border-gray-200">Ticket ID</th>						
                            <th class="border-gray-200">Shipment #</th>						
                            <th class="border-gray-200">Transporter</th>					
                            <th class="border-gray-200">Customer</th>
                            <th class="border-gray-200">Status</th>
                        </tr>
                    </thead>
                    {state.ticket_list.map((sub)=>(
                      
                    <tbody>
                        {/* <!-- Item --> */}
                        <tr>
                            <td>
                                <span class="fw-normal">{sub.date} {sub.time}
                                </span>
                            </td>
                            <td>
                               <a onClick={()=>setEditModals({show:true , ticket_id:sub.ticket_id, ticket_createdById : sub.ticket_createdById ,subject:sub.subject, shipment_id:sub.shipment_id,details:sub.details,ticket_branch_name:sub.ticket_branch_name,full_name:sub.full_name,status:sub.status,date:sub.date,time:sub.time,reply_detail:sub.reply,transporter_id:sub.transporter_id , user_id:sub.user_id , full_name_transporter:sub.full_name_transporter })} class="fw-700 text-info">{sub.ticket_id}</a>
                            </td>
                            <td>
                                <a  class="fw-700 text-info">{sub.shipment_id!="" && sub.shipment_id!=undefined? sub.shipment_id:""}</a>
                            </td>
                            <td>
                                <a  class="fw-700 text-info">
                                    {sub.ticket_branch_name!="" && sub.ticket_branch_name!=undefined?sub.ticket_branch_name:""}
                                </a>
                            </td>   
                            <td>
                                <a  class="fw-700 text-info">
                                   {sub.full_name!="" && sub.full_name!=undefined? sub.full_name:""}
                                </a>
                            </td>  
                            <td><span class={sub.status==0?"badge rounded-pill bg-warning":sub.status==1?"badge rounded-pill bg-success":sub.status==2?"badge rounded-pill bg-danger":""}>{sub.status==0?"Pending":sub.status==1?"Answered":sub.status==2?"Closed":""}</span></td>
                        </tr>
                                                    
                    </tbody>
                    ))}
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


   

            </div>
}
        </div>
        <section>
        {/* <!-- Modal Content --> */}
        <Modal show={editmodals.show} onHide={()=>setEditModals({...editmodals,show:false})} size="lg">
        
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="h6 modal-title">Ticket ID #{editmodals.ticket_id}<span class="badge rounded-pill bg-danger">{editmodals.status==0?"Pending":editmodals.status==1?"Answered":"Closed"}</span></h2>
                        
                        <button type="button" class="btn-close" onClick={()=>setEditModals({...editmodals,show:false})}></button>
                    </div>
                    <div class="modal-body">
                        <section class="bg-light ">
                          <div className='row'>
                            <div className='col-6'>  <h3>{editmodals.subject}</h3></div>
                            <div className='col-6'>
                              {editmodals.status!=2?
                              <p className='text-end text-dark' style={{marginTop:"-1px",cursor:"pointer"}} onClick={()=>deleteConfirm(editmodals.ticket_id)}>Close Ticket</p>
                              :""}
                            </div>

                          </div>
                          
                            <p>
                                <small>{editmodals.time} {editmodals.date} | {editmodals.shipment_id!=""?"Shipment #":""}<a >{editmodals.shipment_id!=""?editmodals.shipment_id:""}</a> | {editmodals.ticket_branch_name!=""?"Transporter #":""}<a href="">{editmodals.ticket_branch_name!=""?(editmodals.ticket_createdById):""}</a> | {editmodals.full_name!=""?"Customer #":""}<a href="">{editmodals.full_name!=""?(editmodals.ticket_createdById):""}</a>
                                </small>
                            </p>
                        </section>
            
                        <hr/>
                        {editmodals.reply_detail.map((item)=>(
                        <section>
                        {item.reply_id==editmodals.user_id?
                            <div class="card shadow-sm mb-3">
                              <div class="card-body">
                                <div class="d-flex p-3 ">
                                  <div class="p-2">
                                    <img src={"https://dummyimage.com/50/1976d2/ffffff&text="+nameFormat(editmodals.full_name)}class="img-fluid rounded-circle" style={{minWidth: "50px"}} />
                                  </div>
                                  
                                  <div class="p-2">
                                  <p>{item.reply_content}</p>
                                    <div class="">
                                    <small class="text-muted"><a >{editmodals.full_name}</a> (Customer) </small>
                                  <br/>
                                    <small class="text-muted">{item.date} {item.time}</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            : item.reply_id==editmodals.transporter_id?
                            <div class="card shadow-sm mb-3">
                              <div class="card-body">
                                <div class="d-flex p-3 ">
                                  <div class="p-2">
                                    <img src={"https://dummyimage.com/50/1976d2/ffffff&text="+nameFormat(editmodals.full_name_transporter)} class="img-fluid rounded-circle" style={{minWidth: "50px"}} />
                                  </div>
                                  <div class="p-2">
                                    <p>{item.reply_content}</p>
                                    <div class="text-end">
                                      <small class="text-muted"><a >{editmodals.full_name_transporter} ({editmodals.ticket_branch_name})</a> (Transporter) </small><br/>
                                      <small class="text-muted">{item.date} {item.time}</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                           :item.reply_id!=editmodals.transporter_id && item.reply_id!=editmodals.user_id?
                            <div class="card shadow-sm mb-3">
                              <div class="card-body">
                                <div class="d-flex p-3 ">
                                  <div class="p-2">
                                    <p>{item.reply_content}</p>
                                    <div class="text-end">
                                      <small class="text-muted"><a >Admin </a> (System Admin) </small><br/>
                                      <small class="text-muted">{item.date} {item.time}</small>
                                    </div>
                                  </div>
                                  <div class="p-2">
                                    <img src="https://dummyimage.com/50/63a4ff/ffffff&text=AD" class="img-fluid rounded-circle" style={{minWidth: "50px"}} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            :""} 
                        </section>
                           ))}
            
            {editmodals.status!=2 ?
                        <section class="bg-light p-5">
                          <label for="comment">Reply:</label>
                          <textarea class="form-control" rows="5" id="comment" name="reply_content" placeholder="Please enter details" onChange={(e) => handleChange(e)} value={reply.reply_content}></textarea>
                          <button type="button" class="btn btn-primary mt-3" onClick={()=>handleSupportReply({ticket_id:editmodals.ticket_id})}>Reply</button>
                        </section>
:""}
                    </div>
                    <ModalFooter>
                   
                        <button type="button" class="btn btn-link text-white ms-auto bg-black" onClick={()=>setEditModals({...editmodals,show:false})}>Close</button>
                   
                    </ModalFooter>
                    
                </div>
            
        </Modal>
        {/* <!-- End of Modal Content --> */}
    </section>
    </div>
  )
}

export default Tickets