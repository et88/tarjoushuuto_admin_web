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


const Spam_report = () => {

    const [state, setState] = React.useState({
        report_list: [],
        isLoading: true,
        searchValue:"",dataCount:""
         })
         const [shipmentstate, setshipStatus] = React.useState({ status: null });
         const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
         
         const[editmodals,setEditModals] = React.useState({show: false,report_id:"" ,reportBy_transporterId:"",reportOn_shipmentId:"",report_type:"",reason:"",description:"",created:"",ticket_branch_name:"",full_name:"",reportOn_transporterId:"",reportBy_userId:"",onbrach_name:"",By_full_name:"",reportOn_userId:""})
         const [reply, setReply] = React.useState({  reply_content:"",reply_id:"",ticket_id:"" })
         

         const axios_get_api = (status,index=0,onLoad) => {
    
            let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/report_list`;
            let sendData = {
            report_list: {},
            dstatus:1,
            indexValue:index,
            limit:otherStates.rowsPerPage,
            status:status
            };
            console.log("status=====>",sendData)
            
        
            axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
                console.log("index",index)
                console.log("onLoad",onLoad)
                if(index==0  && onLoad) {
                    setOtherState({...otherStates,total_count:res.data.dataCount}) 
                        
        }
              setState({ ...state,report_list: res.data.output,dataCount: res.data.dataCount,isLoading:false });
              console.log("countstate",otherStates)   
              console.log("response", res);
            }).catch((e) => {
        
            //   toast.configure()
            //   toast.error("Some thing went wrong")
              console.log("----error:   ", e);
            })
          }
          React.useEffect(() => {
            axios_get_api(null,0,true)
          }, [])

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

          const shipmentFilter = (status) => {
            console.log("action ",status);
            setshipStatus({ ...shipmentstate, status: status })
          
            axios_get_api(status,0,true)
            
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
          

  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={14}/></div>
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
                            <li class="breadcrumb-item active" aria-current="page">Spam Reporting</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Spam Reporting</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            <section>
                <ul class="nav nav-tabs justify-content-end">
                    <li class="nav-item">
                      <a class={(shipmentstate.status == null) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(null)} >All</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 0) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(0)}>Shipment</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 1) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(1)}>Customer</a>
                    </li>
                    <li class="nav-item">
                      <a class={(shipmentstate.status == 2) ? 'nav-link active' : 'nav-link'} onClick={() => shipmentFilter(2)}>Transporter</a>
                    </li>
                </ul>
            </section>
            <div class="card card-body border-0 shadow table-wrapper table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-gray-200">Date</th>
                            <th class="border-gray-200">Report ID</th>						
                            <th class="border-gray-200">Shipment #</th>						
                            <th class="border-gray-200">Transporter</th>					
                            <th class="border-gray-200">Customer</th>
                            <th class="border-gray-200">Reported By</th>
                        </tr>
                    </thead>
                    {state.report_list.map((sub)=>(
                    <tbody>
                        {/* <!-- Item --> */}
                        <tr>
                            <td>
                                <span class="fw-normal">{sub.created}
                                </span>
                            </td>
                            <td>
                                <a  onClick={()=>setEditModals({...editmodals,show:true,report_id:sub.report_id ,reportBy_transporterId:sub.reportBy_transporterId,reportOn_shipmentId:sub.reportOn_shipmentId,report_type:sub.report_type,reason:sub.reason,description:sub.description,created:sub.created,ticket_branch_name:sub.ticket_branch_name,full_name:sub.full_name,reportBy_userId:sub.reportBy_userId,reportOn_transporterId:sub.reportOn_transporterId,onbrach_name:sub.onbrach_name,By_full_name:sub.By_full_name,reportOn_userId:sub.reportOn_userId})} class="fw-700 text-info">{sub.report_id}</a>
                            </td>
                            <td>
                                <a  class="fw-700 text-info">{sub.reportOn_shipmentId!="" && sub.reportOn_shipmentId!=undefined? sub.reportOn_shipmentId:""}</a>
                            </td>
                            <td>
                                <a class="fw-700 text-info">
                                   {sub.reportBy_transporterId!="" && sub.reportBy_transporterId!=undefined? sub.ticket_branch_name:
                                   sub.reportOn_transporterId!="" && sub.reportOn_transporterId!=undefined? sub.onbrach_name:""}
                                </a>
                            </td>   
                            <td>
                                <a class="fw-700 text-info">
                                    {sub.reportBy_userId!="" && sub.reportBy_userId!=undefined?sub.By_full_name:
                                    sub.reportOn_userId!="" && sub.reportOn_userId!=undefined?sub.full_name:""}
                                </a>
                            </td>  
                            <td>
                                {sub.reportBy_transporterId!="" && sub.reportBy_transporterId!=undefined? <span class="badge rounded-pill bg-danger">Transporter</span>:
                                sub.reportBy_userId!="" && sub.reportBy_userId!=undefined? <span class="badge rounded-pill bg-danger">Customer</span>:""}</td>
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
                    
       
        {/* <!-- Modal Content --> */}
        <Modal show={editmodals.show} onHide={()=>setEditModals({...editmodals,show:false})} size="lg">
       
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="h6 modal-title">Report #{editmodals.report_id}</h2>
                        <button type="button" class="btn-close" onClick={()=>setEditModals({show:false})} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                              <tr>
                                <td class="fw-700 text-dark">Date</td>
                                <td>{editmodals.created}</td>
                              </tr>
                              {editmodals.reportOn_shipmentId !='' && editmodals.reportOn_shipmentId!=undefined?
                              <tr>
                                <td class="fw-700 text-dark">Shipment #</td>
                                <td>{editmodals.reportOn_shipmentId!='' && editmodals.reportOn_shipmentId!=undefined ? editmodals.reportOn_shipmentId:""}</td>
                              </tr>:""}
                              {editmodals.reportBy_transporterId!="" && editmodals.reportBy_transporterId!=undefined ||  editmodals.reportOn_transporterId!="" && editmodals.reportOn_transporterId!=undefined?
                              <tr>
                                <td class="fw-700 text-dark">Transporter #</td>
                                <td>{editmodals.reportBy_transporterId!="" && editmodals.reportBy_transporterId!=undefined? editmodals.ticket_branch_name:
                                   editmodals.reportOn_transporterId!="" && editmodals.reportOn_transporterId!=undefined? editmodals.onbrach_name:""}</td>
                              </tr>:""}
                              {editmodals.reportBy_userId!="" && editmodals.reportBy_userId!=undefined ||  editmodals.reportOn_userId!="" && editmodals.reportOn_userId!=undefined?
                              <tr>
                                <td class="fw-700 text-dark">User name</td>
                                <td>{editmodals.reportBy_userId!="" && editmodals.reportBy_userId!=undefined?editmodals.By_full_name:
                                    editmodals.reportOn_userId!="" && editmodals.reportOn_userId!=undefined?editmodals.full_name:""}</td>
                              </tr>:""}
                            </tbody>
                          </table>

                          <h4>Rerpoted By</h4>
                          <div class="mb-3">
                            <div class="d-flex p-3 ">
                                <div class="p-2">
                                {editmodals.reportBy_transporterId!="" && editmodals.reportBy_transporterId!=undefined?<img src={"https://dummyimage.com/50/1976d2/ffffff&text="+nameFormat(editmodals.ticket_branch_name)} class="img-fluid rounded-circle w-50px" />:
                               editmodals.reportBy_userId!="" && editmodals.reportBy_userId!=undefined?<img src={"https://dummyimage.com/50/1976d2/ffffff&text="+nameFormat(editmodals.By_full_name)} class="img-fluid rounded-circle w-50px" />: ""}
                                  
                                </div>
                                <div class="p-2">
                                    <h6>{editmodals.reason}</h6>
                                  <p>{editmodals.description}</p>
                                  <div class="">
                                 {editmodals.reportBy_transporterId!="" && editmodals.reportBy_transporterId!=undefined? <small class="text-muted"><a href="">{editmodals.ticket_branch_name}</a> (Transporter) </small>
                                 :editmodals.reportBy_userId!="" && editmodals.reportBy_userId!=undefined? <small class="text-muted"><a href="">{editmodals.full_name}</a> {editmodals.By_full_name}(Customer) </small>:""}<br/>
                                  <small class="text-muted">{editmodals.created}</small>
                                  </div>
                                </div>
                              </div>
                          </div>
                         

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link text-gray-600 ms-auto" onClick={()=>setEditModals({show:false})}>Close</button>
                    </div>
                
        </div>
        {/* <!-- End of Modal Content --> */}
        </Modal>
    
    </div>
  )
}

export default Spam_report