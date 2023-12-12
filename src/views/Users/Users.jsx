import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from 'react-moment';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import TablePagination from '@mui/material/TablePagination';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'




const Users = () => {
    let navigate = useNavigate();
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')
    const [state,setState] = useState({isLoading:true,user_list:[]});
    const [otherStates,setOtherState] = useState({dstatus:"",activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
    const [modalState,setModalState] = useState({show:false,user_id:"",action:""});
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })

    useEffect(() => {
        getUsersList(0,true);
    },[])
    
    useEffect(() => {
        // setOtherState({...otherStates,searchKeyword:""}) 
        getUsersList(0,true);
    },[otherStates.dstatus]);

    const getUsersList = (index=0,onLoad) => {
        
        
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/user_list`;
        let sendData = {find:"",dstatus:otherStates.dstatus,limit:otherStates.rowsPerPage,indexValue:index};
       
        if(search!=null && search.length>0){
            sendData.find= search
        }
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {

            console.log("response ", res);
            console.log("otherStates ", otherStates);
            if(index == 0 && onLoad) {
                        setOtherState({...otherStates,total_count:res.data.count})         

            }
                        setState({...state,user_list:res.data.output,isLoading:false})
           
            

        }).catch((e) => {


        });
    }

    const usersAction = () => {
        
        
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/user_list`;
        let sendData = {dstatus:otherStates.dstatus};
       // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
           // console.log("res ", res);
           
            setState(res.data.output)
           
            

        }).catch((e) => {


        });
    }

    const userActions = (value) => {
        console.log("value ",value);
       
        usersAction(value);
        setModalState({ ...modalState,show: false });
    }

    const modalClose = () => {
        setModalState({ show: false });
        
    }

    const handlePageChange = (event,newPage) =>{
        setOtherState({...otherStates,page:newPage})
        //console.log("newPage ", newPage);
        getUsersList(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        console.log("event ", event);
    }
    // const searchUser = (e) =>{
    //      setOtherState({...otherStates,searchKeyword:e.target.value})
    //     getUsersList(0,e.target.value,true);
    //  }
    // const modalClose = (value) => {
    //     setModalState({ show: false });
    //     console.log("value ",value);
    // }
    function deleteship(user_id,dstatus) {
        let userdata = {user_id:user_id,dstatus:dstatus}
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_remove` , userdata ,{ headers: exportValue.headers }).then((res)=>{
          
         setState({...state,user_id:user_id});
         getUsersList(0,true);
        //  setModals({...modals, show:false})
         console.log("res",res)
        
         if(res.data.status==200){
            Swal.fire(
                'Good job!',
                'USer is Deleted Successfully !',
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
     function suspend(user_id,dstatus) {
        let userdata = {user_id:user_id,dstatus:dstatus}
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_remove` , userdata ,{ headers: exportValue.headers }).then((res)=>{
          
         setState({...state,user_id:user_id});
         getUsersList(0,true);
        //  setModals({...modals, show:false})
         console.log("res",res)
        
         if(res.data.status==200){
            Swal.fire(
                'Good job!',
                'User is Suspended Successfully !',
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
     function activeInactive(user_id,dstatus) {
        let userdata = {user_id:user_id,dstatus:dstatus}
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_remove` , userdata ,{ headers: exportValue.headers }).then((res)=>{
          
         setState({...state,user_id:user_id});
         getUsersList(0,true);
        //  setModals({...modals, show:false})
         console.log("res",res)
        
         if(res.data.status==200){
            Swal.fire(
                'Good job!',
                'User status changed Successfully !',
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
    const deleteConfirm = (user_id,dstatus) => {
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
                deleteship(user_id,dstatus)
            }       
        })

    }
    const suspendUser = (user_id,dstatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Suspend it!'
        }).then((result) => {
            //console.log("result  ",result);
            if(result.isConfirmed) {
                suspend(user_id,dstatus)
            }       
        })

    }
    const activeUser = (user_id,dstatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Active it!'
        }).then((result) => {
            //console.log("result  ",result);
            if(result.isConfirmed) {
                activeInactive(user_id,dstatus)
            }       
        })

    }
    const inactiveUser = (user_id,dstatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Inactive it!'
        }).then((result) => {
            //console.log("result  ",result);
            if(result.isConfirmed) {
                activeInactive(user_id,dstatus)
            }       
        })

    }
    const searchUser = ( index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_find_detail`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,full_name:""};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.full_name= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        
//    setState({ ...state,searchValue:res.data.title})
   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
   setState({ ...state, user_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
       
   
   

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
      
            params.delete('search')
            search= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
            //   navigate({ search: params.toString() })

        }
//    setsearchFilters({ ...searchfilters, searchtitle:searchfilters.searchtitle})
    setOtherState({...otherStates,onload:true})
}
const filter=()=>{
    search=null
    params.delete('search')
    if (searchfilters.searchtitle !== "") {           
        params.append('search', searchfilters.searchtitle)
    }
    searchUser(0)
    // setState({ ...state, isLoading: true })
    navigate({ search: params.toString() })

}
React.useEffect(()=>{
    if (search) {
        setsearchFilters({...searchfilters,searchtitle:search})
    }
// searchUser(0)
// axios_get_api(null,0,true);


},[])

  return (
    <div>
          <Modal show={modalState.show} onHide={modalClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>User Actions</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you really want to  {modalState.action} ?</Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={() => setModalState({ show: false })}>
                                        No
                                      </Button>
                                      <Button variant="primary" 
                                        onClick={() =>
                                            userActions(modalState.user_id)
                                        }>
                                        Yes
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
        <div className='row'>
            <div className='col-3'><Left_panel value={9}/></div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:

            <div className='col-9' style={{marginLeft:"-60px"}}>
                <Sub_header/>
                <section>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                        <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
                            <li className="breadcrumb-item">
                                <a href="#">
                                    <svg className="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Users</li>
                        </ol>
                    </nav>
                    <h2 className="h4">All Users</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="input-group me-2 me-lg-3 fmxw-400">
                        <span className="input-group-text">
                            <svg className="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" className="form-control" placeholder="Search users" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)}/>
                    </div>
                </div>
            </div>
            
            <section>
                <ul className="nav nav-tabs justify-content-end">
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:""})}>
                      <a className={"nav-link "+(otherStates.dstatus == "" ? "active" : "")} >All</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:1})}>
                      <a className={"nav-link "+(otherStates.dstatus == 1 ? "active" : "")} >Active</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:2})}>
                      <a className={"nav-link "+(otherStates.dstatus == 2 ? "active" : "")} >Inactive</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:4})}>
                      <a className={"nav-link "+(otherStates.dstatus == 4 ? "active" : "")} >Deleted</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:3})}>
                      <a className={"nav-link "+(otherStates.dstatus == 3 ? "active" : "")} >Suspended</a>
                    </li>
                </ul>
            </section>
            <div className="card card-body border-0 shadow table-wrapper table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {/* <th className="border-gray-200">#</th> */}
                            <th className="border-gray-200">Date</th>
                            <th className="border-gray-200">Name</th>						
                            <th className="border-gray-200">Email</th>
                            <th className="border-gray-200">Mobile #</th>
                            <th className="border-gray-200">Status</th>
                            <th className="border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- Item --> */}
                        
                        {state.user_list.map((item,index)=>{
                            return(
                        <tr key={index}>
                            {/* <td>
                                {index + 1}
                            </td> */}
                            <td>
                                <span className="fw-normal"> <Moment format="DD/MM/YYYY hh:mm" unix>{item.created}</Moment>
                                 {/* <small>12:23</small> */}
                                 </span>
                            </td>
                            <td>
                                <a href={"/user_detail/"+ item.user_id} className="fw-bold text-info">
                                    {item.full_name} {item.user_type==2?"(Transporter)":item.user_type==1?"(Customer)":""}
                                </a>
                            </td>                        
                            <td><span className="fw-normal">{item.email}</span></td>
                            <td><span className="fw-bold">{item.mob_number}</span></td>
                            <td>{(item.dstatus == 1) ? <span className="badge rounded-pill bg-success">Active</span>:(item.dstatus == 2) ? <span className="badge rounded-pill bg-warning">Inactive</span> : (item.dstatus == 3) ? <span className="badge rounded-pill bg-primary">Suspended</span> : (item.dstatus == 4) ? <span className="badge rounded-pill bg-danger">Deleted</span> : ""}</td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="icon icon-sm">
                                            <span className="fa fa-ellipsis-h icon-dark"></span>
                                        </span>
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu py-0">
                                        <a className="dropdown-item rounded-top" href={"/user_detail/"+ item.user_id}><span className="fa fa-eye me-2"></span>View</a>
                                       {item.dstatus==2? <a className="dropdown-item rounded-top" onClick={()=>activeUser(item.user_id,1)} ><span class="fa fa-eye-slash me-2"></span>Active User</a>:item.dstatus==1? <a className="dropdown-item  rounded-top" onClick={()=>inactiveUser(item.user_id,2)} ><span class="fa fa-eye-slash me-2"></span>Inactive User</a>:"" }
                                       {item.dstatus==1 || item.dstatus==2? <a className="dropdown-item text-danger rounded-top" onClick={()=>suspendUser(item.user_id,3)} ><span className="fa fa-ban me-2"></span>Suspend User</a>:item.dstatus==3?<a className="dropdown-item rounded-top" onClick={()=>activeUser(item.user_id,1)} ><span class="fa fa-eye-slash me-2"></span>Active User</a>:""}
                                        <a className="dropdown-item text-danger rounded-bottom"  onClick={()=>deleteConfirm(item.user_id,4)}><span className="fa  fa-trash me-2"></span>Remove</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                            )
                          })}                          
                    </tbody>
                </table>
                <div >
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
                {/* <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <a className="page-link" href="#">Previous</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">4</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">5</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="fw-normal small mt-4 mt-lg-0">Showing <b>5</b> out of <b>25</b> entries</div>
                </div> */}
            </div> 
                    

    </section>
            </div>
}
        </div>
    </div>
  )
}

export default Users