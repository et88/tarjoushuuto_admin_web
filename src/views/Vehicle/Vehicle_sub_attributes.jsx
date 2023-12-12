import React from 'react'
import { useParams } from 'react-router-dom'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2';
import TablePagination from '@mui/material/TablePagination';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Form, Button, ProgressBar, ModalHeader, ModalBody } from "react-bootstrap"
import '../../components/loader.css';
import { useNavigate } from "react-router-dom";


const Vehicle_sub_attributes = () => {
    let navigate = useNavigate();
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')
    const {category_id} = useParams();
    const [state, setState] = React.useState({
        transporter_list: [],
        dataCount: 0,
        isLoading: true,
        dialogOpen: false,
        searchValue: ""

    })
   const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   const [addstate, setaddState] = React.useState({vehicle_subcategory_name:"",isLoading:true})
   const[editmodals,setEditModals] = React.useState({show: false,category_id:"", subcategory_id:"" ,subcategory_name:""})
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })

  

   

    const axios_get_api = (index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/vehicle_subcategory_list`;
        let sendData = {
            find: "",
            dstatus: 2,
            indexValue:index,
        limit:otherStates.rowsPerPage,
        category_id:category_id
        };
        if(search!=null && search.length>0){
            sendData.find= search
        }
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            console.log(res);
            if(index==0  && otherStates.onload) {
                setOtherState({...otherStates,total_count:res.data.dataCount})         
    }
         setState({ ...state, transporter_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
         
        }).catch((e) => {
            //setState({...state,isLoading: false});
        console.log("----error:   ", e);
        })

    }
    React.useEffect(() => {
        axios_get_api()
    }, [])

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log("submit1");
        // state.isLoading = false
       
        let attribute_detailes = {category_id:category_id,subcategory_name:addstate.vehicle_subcategory_name};

        console.log("attributes details is ",attribute_detailes);
       if(addstate.vehicle_subcategory_name!=""){
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/create_vehicle_subcategory`,  attribute_detailes , { headers: exportValue.headers }).then((result)=>{
                    console.log("result is i ",result);
                    if(result){
                        Swal.fire(
                            'Good job!',
                            ' Added  Successfully !',
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
                        axios_get_api()
                        setaddState({vehicle_subcategory_name:""})
                    
                    
                    }).catch((e) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            
                          })
                     
                      console.log("----error:   ", e);
                    })
    }
    else{
        Swal.fire({
            icon: 'error',
            
            text: 'Please Fill the Input!',
            
          })
    }
}


const handleEditSubmit = (index=0) => {
   

    if (editmodals.subcategory_name == "" ) {
        Swal.fire({
            icon: 'error',
            
            text: 'Please Fill All the Inputs!',
            
          })
    }else{


    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/vehicle_subcategory_edit_api'

    let data = {}
    data.subcategory_id = editmodals.subcategory_id;
    data.subcategory_name = editmodals.subcategory_name;
   
  
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
        setaddState({
            ...addstate,
            [event.target.name]: event.target.value,
        })
    }
    const handleChange1 = (event) => {
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

    function remove(subcategory_id) {
        let userdata = { subcategory_id: subcategory_id }
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/vehicle_subcategory_delete`, userdata, { headers: exportValue.headers }).then((res) => {
            setState({ ...state, subcategory_id: subcategory_id });
            // setModals({...modals,show:false})
            axios_get_api();
            if(res){
              Swal.fire(
                  'Good job!',
                  ' Sub Attribute Removed Successfully !',
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
           
            console.log("----error:   ", e);
          })
        }
    const deleteConfirm = (subcategory_id) => {
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
              remove(subcategory_id)
            }       
        })
  
    }


    const searchUser = ( index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/vehicle_subcategory_find_name`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,subcategory_name:"",category_id:category_id};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.subcategory_name= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        

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
   
    if (e.target.name == "stitle") {
      
            params.delete('search')
            search= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
           

        }

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

},[])


  return (
    <div>
    <Modal show={editmodals.show} onHide={()=>setEditModals({...editmodals,show:false})}  style={{top:"70%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%,-50%)"}}>
        <ModalHeader>
       
              <h2 class="h6 modal-title">Edit Attributes</h2>
              <button type="button" class="btn-close" onClick={()=>setEditModals({...editmodals,show:false})} aria-label="Close"></button>
         
        </ModalHeader>
        <ModalBody>
        <div class="mb-3">
                <label for="email" class="form-label">Sub Attribute Lable Name</label>
                <input type="text" class="form-control" id="email" placeholder="Enter attribute heading" onChange={handleChange1} name="subcategory_name" value={editmodals.subcategory_name}/>
              </div>
        </ModalBody>
        <Button variant="primary" className='mb-3 mx-3' 
                                    onClick={() =>
                                        handleEditSubmit(editmodals.subcategory_id)
                                    }>
                                    Update
                                  </Button>
    </Modal>
    <div className='row'>
        <div className='col-3'><Left_panel value={11}/></div>
        {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:

        <div className='col-9' style={{marginLeft:"-60px"}}>
            <Sub_header/>
            <section>
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div class="d-block mb-4 mb-md-0">
                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                        <li class="breadcrumb-item">
                            <a href="/vehicle_attributes">
                                <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            </a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Atrributes</li>
                    </ol>
                </nav>
                <h2 class="h4">Vehicle Sub Atrributes</h2>
            </div>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="input-group me-2 me-lg-3 fmxw-400">
                    <span class="input-group-text">
                        <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <input type="text" class="form-control" placeholder="Search Atrributes" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)} />
                </div>
                <a href="#" class="btn btn-sm btn-gray-800 d-inline-flex align-items-center" data-bs-toggle="modal" data-bs-target="#modal-add_attribute">
                    <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    New Atrributes
                </a>
                <section>
<div class="modal fade" id="modal-add_attribute" tabindex="-1" role="dialog" aria-labelledby="modal-add_attribute" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h2 class="h6 modal-title">Add Sub Attributes</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <label for="email" class="form-label"> Sub Attribute Lable Name</label>
                <input type="text" class="form-control" id="email" placeholder="Enter attribute heading" onChange={handleChange} name="vehicle_subcategory_name" value={addstate.vehicle_subcategory_name}/>
              </div>
              <div class="d-grid">
                <button type="button" class="btn btn-secondary btn-block" data-bs-dismiss="modal" onClick={handleSubmit} >Add</button>
              </div>
          </div>
      </div>
  </div>
</div>
</section>
            </div>
        </div>
        
        <div class="card card-body border-0 shadow table-wrapper table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>	
                        {/* <th class="border-gray-200">Atrributes Name</th>	 */}
                        <th class="border-gray-200">Sub Atrributes Name</th>
                        <th class="border-gray-200">Status</th>
                        <th class="border-gray-200">Action</th>
                    </tr>
                </thead>
                {state.transporter_list.map((sub)=>(
                <tbody>
                    {/* <!-- Item --> */}
                    <tr>                       
                        <td>
                            <a  class="fw-bold">
                                {sub.subcategory_name}
                            </a>
                        </td>
                        {/* <td><span class="fw-bold">2 Wheel, 4 Wheel</span></td> */}
                        <td><span class="badge rounded-pill bg-success">{sub.dstatus==1?"Active":"Inactive"}</span></td>
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
                                    <a class="dropdown-item" onClick={()=>setEditModals({...editmodals,show:true,category_id:sub.category_id,subcategory_id:sub.subcategory_id,subcategory_name:sub.subcategory_name})}><span class="fa fa-edit me-2" ></span>Edit</a>
                                    <a class="dropdown-item text-danger rounded-bottom" onClick={()=>deleteConfirm(sub.subcategory_id)}><span class="fa  fa-trash me-2"></span>Remove</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                                                
                </tbody>))}
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
</div>
)
}

export default Vehicle_sub_attributes