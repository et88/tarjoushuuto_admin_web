import React, { useState, useEffect } from "react";
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

const Email_template = () => {

    const [state,setState] = useState([]);
    const [otherStates,setOtherState] = useState({dstatus:1,searchKeyword:"",activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
    const [extraStates,setExtraStates] = useState({isLoading:true});
    
    useEffect(() => {
        getTemplateList();
    },[])

    useEffect(() => {
        getTemplateList();
    },[otherStates.dstatus])

    const getTemplateList = (searchKeyword) => {
        
        
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/admin_mail_list`;
        let sendData = {indexValue:otherStates.page,status:otherStates.dstatus};
        if(searchKeyword && searchKeyword != "") {
            sendData.searchText = searchKeyword;
        }
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            if(otherStates.onload){
                setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})
            }
            setState(res.data.output)
            setExtraStates({isLoading:false})
           
            

        }).catch((e) => {


        });
    }

    const changeActiveInactive =(data , status)=>{
        console.log("data ", data);
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/email_template_edit`;
        let sendData = {mail_id:data.mail_id,dstatus:status};
        
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            // console.log("state ", state); 
           
                let mail = [...state];
                let indexT = mail.findIndex(item => item.mail_id == data.mail_id);
               // data.dstatus = status;
               mail[indexT].dstatus = status;
               console.log("mail ", mail[indexT]);
               // transporters[data].dstatus = status;
                //
                 setState(mail) 
            
         
        }).catch((e) => {


        });
    }
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={13}/></div>
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
                            <li class="breadcrumb-item active" aria-current="page">Templates</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Email Templates</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search Templates" />
                    </div>
                </div>
            </div>
            
            {/* <section>
                <h5>Global Template</h5>
                <div class="card card-body border-0 shadow table-wrapper table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="border-gray-200">Name</th>
                                <th class="border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            <tr>                       
                                <td><span class="fw-normal">Global Email Template</span></td>
                                <td>
                                    <a href="/edit_global_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                                                        
                        </tbody>
                    </table>
                    
                </div> 
            </section> */}
            <section class="mt-4">
                <h5>All Templates</h5>
                <div class="card card-body border-0 shadow table-wrapper table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="border-gray-200">Sno</th>	
                                <th class="border-gray-200">Title</th>						
                                <th class="border-gray-200">Activity</th>
                                <th class="border-gray-200">Status</th>
                                <th class="border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((item,index)=>
                            <tr> 
                                <td><span class="fw-normal">{item.type}</span></td>                      
                                <td><span class="fw-normal">{item.title}</span></td>
                                <td><div style={{width:"400px"}}><span class="fw-bold">{item.name}</span></div></td>
                                <td>{(item.dstatus == 1)?<span class="badge rounded-pill bg-success">Active</span>:<span class="badge rounded-pill bg-danger">Inactive</span>}</td>
                              
                                <td>
                                <div class="btn-group">
                                    <button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="icon icon-sm">
                                            <span class="fa fa-ellipsis-h icon-dark"></span>
                                        </span>
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu py-0">
                                        {/* <a class="dropdown-item rounded-top" href="#"><span class="fa fa-eye me-2"></span>View Details</a> */}
                                        <a class="dropdown-item" href={"/edit_email_template/"+item.mail_id} ><span class="fa fa-edit me-2"  ></span>Edit</a>
                                     {item.dstatus==1?   <a class="dropdown-item text-danger rounded-bottom" onClick={()=>changeActiveInactive(item,2)} ><span class="fa  fa-eye-slash me-2"></span>Inactive</a>: <a class="dropdown-item text-danger rounded-bottom" onClick={()=>changeActiveInactive(item,1)} ><span class="fa  fa-eye-slash me-2"></span>Active</a>}
                                    </div>
                                </div>
                            </td>
                            </tr>
                            )}
                            {/* <tr>                       
                                <td><span class="fw-normal">Password Reset</span></td>
                                <td><span class="fw-bold">Password Reset</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Recevied new bid/quote</span></td>
                                <td><span class="fw-bold">when receive new quote request from any transporter</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Quote confirmed (transporter)</span></td>
                                <td><span class="fw-bold">when shipment quote confirmed by customer</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Shipment Update: In transit (Customer)</span></td>
                                <td><span class="fw-bold">when shipment status updated to In transit</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Shipment Update: Delivered (Customer)</span></td>
                                <td><span class="fw-bold">when shipment status updated to Delivered</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Rating from customer (transporter)</span></td>
                                <td><span class="fw-bold">when shipment receive review rating from customer</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Payment Recevied</span></td>
                                <td><span class="fw-bold">Payment Recevied</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>                       
                                <td><span class="fw-normal">Password Reset</span></td>
                                <td><span class="fw-bold">Password Reset</span></td>
                                <td><span class="badge rounded-pill bg-success">Active</span></td>
                                <td>
                                    <a href="/edit_email_template" class="btn btn-primary d-inline-flex align-items-center">
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr> */}
                                                        
                        </tbody>
                    </table>
                    
                </div> 
            </section>
                    

    </section>
            </div>
        </div>
    </div>
  )
}

export default Email_template