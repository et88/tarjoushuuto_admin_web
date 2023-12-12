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

const Cms_management = () => {
    const [state, setState] = React.useState({
        cms_list: [],
        isLoading: true,
        searchValue:""
         })
   const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   const[editmodals,setEditModals] = React.useState({show:false, cms_id:"" ,cms_name:"",cms_description:"" })
//    console.log("state",editmodals)
   const[modals,setModals] = React.useState({show: false,cms_id:""})

   const axios_get_api = (index=0,onLoad) => {
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/cms_manage_api`;
    let sendData = {
    web_testimonial_list: {},
    dstatus:1,
    indexValue:index,
    limit:otherStates.rowsPerPage
    };
    

    axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
        if(index==0  && onLoad) {
            setOtherState({...otherStates,total_count:res.data.dataCount})         
}
      setState({ ...state,cms_list: res.data.output,isLoading:false });
      setEditModals({...editmodals, cms_id:res.data.cms_id , cms_name:res.data.cms_name , cms_description:res.data.cms_description,show:false})
      
      console.log("response", res);
    }).catch((e) => {

    //   toast.configure()
    //   toast.error("Some thing went wrong")
      console.log("----error:   ", e);
    })
  }
  React.useEffect(() => {
    axios_get_api(0,true)
  }, [])

  const searchcms = (searchValue,index=0) => {
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/cms_find_detail`;
        
    let data= { indexValue:index, limit:otherStates.rowsPerPage , dstatus:1};
    console.log("pv",state.cms_name)
    if ( state.searchValue) {
       data.cms_name = state.cms_name;
     }
     console.log("testimonial_title",data)
    
    axios.post(full_api , data, { headers: exportValue.headers }).then(res => {        
    setState({ ...state,cms_name:res.data.cms_name})
    console.log( "response",res);
    if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
    }  
    setState({ ...state, cms_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
    console.log("res",res)
    


}).catch((e) => {
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
   console.log("----error:   ", e);
})          
}


  const stateHandler = (key, value) => {
    state[key] = value
    setState({ ...state, cms_name:state.searchValue})
    setOtherState({...otherStates,onload:true})
}

const handleEditSubmit = (index=0) => {
   

    if (editmodals.cms_name  == "" || editmodals.cms_description=="") {
        Swal.fire({
            icon: 'error',
            
            text: 'Please Fill All the Inputs!',
            
          })
    }else{


    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/cms_manage_edit_api'

    let data = {}
    data.cms_id = editmodals.cms_id;
    data.cms_name = editmodals.cms_name;
    data.description = editmodals.description
  
    axios.post(full_api, data , { headers: exportValue.headers }).then((res) => {
       console.log("res",res)
      axios_get_api()

       
        setEditModals({show:false})
    
    Swal.fire(
        'Good job!',
        ' Updated  Successfully !',
        'success'
      )
    
    
       
    
    }).catch((e) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
     
      console.log("----error:   ", e);
    })}
}
const handleChange = (event) => {
    // event.persist()
     console.log("event is v",event.target.name);
     setEditModals({
         ...editmodals,
         [event.target.name]: event.target.value,
     })
    
 }

  const handlePageChange = (event,newPage) =>{
    console.log("newpage",newPage)
    setOtherState({...otherStates,page:newPage})
    //console.log("newPage ", newPage);
    axios_get_api(newPage);
    
    // searchUser(state.searchValue,newPage)
}
const handleChangeRowsPerPage = (event,newPage) => {
    console.log("event ", event);
    setOtherState({...otherStates, rowsPerPage:+event.target.value, page:0})
   
}
// const {cms_name,cms_description}=editmodals
  return (
    <div>
         <Modal show={editmodals.show} onHide={()=>setEditModals({show:false})} >
                                    <Modal.Header closeButton>
                                    <h2 class="h6 modal-title">Edit CMS </h2>
                                    </Modal.Header>
                                    <Modal.Body>
                                        
                                   
                  <div class="mb-3">
                    <label for="email" class="form-label">CMS Page Name</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter title" value={editmodals.cms_name} name="cms_name" onChange={handleChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">CMS Page Content</label>
                    <textarea class="form-control" rows="15" id="comment" name="description" value={editmodals.description} onChange={handleChange} required></textarea>
                  </div>
                   </Modal.Body>
                                    <Button variant="primary" className='mb-3 mx-3' 
                                        onClick={() =>
                                            handleEditSubmit(editmodals.cms_id)
                                        } >
                                        Update
                                      </Button>
                                  
                                  
                                  </Modal>
        <div className='row'>
            <div className='col-3'>
                <Left_panel value={20}/>
            </div>
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
                            <li class="breadcrumb-item active" aria-current="page">CMS</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All CMS</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e)=>searchcms(e)}>
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search CMS" value={state.searchValue} onChange={({ target }) => {
                                stateHandler('searchValue', target.value)

                            }} />
                    </div>
                </div>
            </div>
            
            
            <section class="">
                <div class="card card-body border-0 shadow table-wrapper table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="border-gray-200">Page Name</th>	
                                <th class="border-gray-200">Status</th>
                                <th class="border-gray-200">Action</th>
                            </tr>
                        </thead>
                        {state.cms_list.map((sub)=>(
                        <tbody>
                            {/* <!-- Item --> */}
                            <tr>                       
                                <td><span class="fw-normal">{sub.cms_name}</span></td>
                                <td><span class="badge rounded-pill bg-success">{sub.dstatus==1?"Active":"Inactive"}</span></td>
                                <td>
                                    <a  class="btn btn-primary d-inline-flex align-items-center" onClick={()=>setEditModals({show:true , cms_name:sub.cms_name , description:sub.description , cms_id:sub.cms_id})}>
                                        Edit  &nbsp; <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                   
                                </td>
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
                    

    </section>

            </div>
}
        </div>
    </div>
  )
}

export default Cms_management