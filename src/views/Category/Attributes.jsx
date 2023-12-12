import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import TablePagination from '@mui/material/TablePagination';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import '../../components/loader.css';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header';
import Select from 'react-select'

var FormData = require('form-data');


const Attributes = () => {
    const { subcategory_id,category_id } =  useParams();
    let navigate = useNavigate();
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')

    const [state, setState] = useState([]);
    const [otherStates, setOtherState] = useState({ dstatus: "", searchKeyword: "", activePage: 1, rowsPerPage: 10, page: 0, total_count: 0, onload: true,editImageShow :"",isLoading:true });
    const [modalState, setModalState] = useState({ show: false, user_id: "", action: "" });
    const[editmodals,setEditModals] = React.useState({show: false, attribute_id:"" ,attribute_name:""})
   
    const [newState, setNewState] = useState({ attribute_name:"",attribute_type:"",isLoading:true });
    const [updateState, setUpdateState] = useState({ category_name: "", category_img: "",category_id:"" });
    const [updateStateImage, setupdateStateImage] = useState({ image: ""});
   const[addImg,setAddImg]=React.useState({uploadPhoto:""})
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })


    useEffect(() => {
        getAttributeList(10,0,"");
    }, [])

    const getAttributeList = (rowsPerPage = 10,page = 0,keyword="") => {
       
       // setOtherState(setValues)
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/attribute_list`;
        let sendData = {limit:rowsPerPage,indexValue:page,find:"",subcategory_id:subcategory_id};
        if(search!=null && search.length>0){
            sendData.find= search
        }
         console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            let setValues = {...otherStates};
            setState(res.data.output);
            setValues.isLoading = false;
            setValues.page = page;
            if(page == 0 && setValues.onload){
                setValues.total_count = res.data.count;
                setValues.onload = false;
            //setOtherState({ ...otherStates, total_count: res.data.count,onload:false });
            }
            console.log("setValues ", setValues);
            setOtherState(setValues)
            console.log("otherStates ", otherStates);
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
         
          console.log("----error:   ", e);

        });
    }

    const newCategorysave = () => {
        if(newState.category_name != "") {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/add_category`;
        let bodyFormData = new FormData()
        console.log("bb", newState);
        bodyFormData.append("category_name", newState.category_name)
        if (newState.category_img != '') {
            bodyFormData.append("category_img", newState.category_img[0]);
        }
        console.log("bb", bodyFormData);
        axios.post(full_api, bodyFormData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Content-Type": "multipart/form-data",
                // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",

            }
        }).then((res) => {
            console.log("res ", res);
            setModalState({ show: false });
            if(res){
                Swal.fire(
                    'Good job!',
                    ' Added Successfully !',
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
                getAttributeList()
            // navigate('/categories')
            // let newCategory = res.data.category;
            //setState(state.concat([newCategory]))
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
         
          console.log("----error:   ", e);

        });
    }else {

    }
    }

    const updateCategory = () => {
        if(updateState.category_name != "" && updateState.category_id != "") {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_category`;
        let bodyFormData = new FormData()
        console.log("bb", updateState);
        bodyFormData.append("category_name", updateState.category_name)
        bodyFormData.append("category_id", updateState.category_id)
        if (updateStateImage.image && updateStateImage.image != '') {
            bodyFormData.append("category_img", updateStateImage.image[0]);
        }
        console.log("bb", bodyFormData);
        axios.post(full_api, bodyFormData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Content-Type": "multipart/form-data",
                // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",

            }
        }).then((res) => {
            console.log("res ", res);
            setEditModals({ show: false });
            if(res){
                Swal.fire(
                    'Good job!',
                    ' Updated  Successfully !',
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
                getAttributeList()
            // navigate('/categories')
            // let newCategory = res.data.category;
            //setState(state.concat([newCategory]))
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
         
          console.log("----error:   ", e);

        });
    }else {

    }

    }

    const handlePageChange = (event,newPage) => {
        console.log(newPage);
        
        getAttributeList(10,newPage);
        setOtherState({...otherStates,page:newPage})
    }
    const handleChangeRowsPerPage = () => {

    }

    const modalClose = () => {
        setModalState({ show: false });

    }

    const inputHandleChange = (e) => {
        console.log("e", e);
        console.log("type", e.target.type);
        console.log("name", e.target.name);
        console.log("value", e.target.value);
        console.log("file", e.target.files);
        if (e.target.type == "file") {
            setNewState({ ...newState, [e.target.name]: e.target.files });
        } else {
            setNewState({ ...newState, [e.target.name]: e.target.value });
        }
    }

    const inputEditHandleChange = (e) => {
        console.log("e", e);
        console.log("type", e.target.type);
        console.log("name", e.target.name);
        console.log("value", e.target.value);
        console.log("file", e.target.files);
        if (e.target.type == "file") {
            setupdateStateImage({ ...updateStateImage, image: e.target.files });
            setOtherState({...updateState,editImageShow:URL.createObjectURL(e.target.files[0])})
        } else {
            setUpdateState({ ...updateState, [e.target.name]: e.target.value });
        }
    }

    const attributeDelete = (attribute_id) => {

        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/delete_attribute_api`;
        let sendData = {attribute_id:attribute_id,dstatus:2};
         console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            Swal.fire(
                'Success!',
                'Attribute Successfully Deleted!',
                'success'
              )
              getAttributeList()
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

    const searchCategory = (e) => {
        console.log("e ",e );
        setOtherState({ ...otherStates, searchKeyword: e.target.value,onload:true});
        getAttributeList(10,0,e.target.value)
    }

    

    

    const searchUser = ( index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/attribute_find_name`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,attribute_name:"",subcategory_id:subcategory_id};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.attribute_name= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        

   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
   setState( res.data.output );
     
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

const handleChangeCategories = (event) => {
        
    setNewState({
        ...newState,
        attribute_type: event.value,
    })

    console.log("event value is ",event.value);
}
const handleChange = (event) => {
    // event.persist()
     console.log("event is v",event.target.name);
     setNewState({
         ...newState,
         [event.target.name]: event.target.value,
     })
 }
 let groupsList = [{value:1,label:"Checkbox"},{value:2,label:"Dropdown"},{value:3,label:"RadioButton"},{value:4,label:"InputType"}];

 const handleSubmit = (e) => {
        
    e.preventDefault();
    console.log("submit1");
    newState.isLoading = false
   
    let attribute_detailes = {category_id:category_id,subcategory_id:subcategory_id,attribute_name:newState.attribute_name,attribute_type:newState.attribute_type};

    console.log("attributes details is ",attribute_detailes);
   
    axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_attribute`,  attribute_detailes , { headers: exportValue.headers }).then((result)=>{
                console.log("result is i ",result);
                newState.isLoading = false
                if(result){
                    Swal.fire(
                        'Good job!',
                        ' Added Successfully !',
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
                    setModalState({...modalState,show:false}) 
                    setNewState({...newState,attribute_name:"",attribute_type:""})  

                    getAttributeList()
                // toast.configure()
                // toast(result.data.message) 
                // history.push(`/category/attributeLists/${sub_category_id}/${category_id}`);
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
 const handleEditSubmit = () => {
        
 
    console.log("submit1");
    editmodals.isLoading = false
   
    let attribute_detailes = {attribute_id:editmodals.attribute_id,attribute_name:editmodals.attribute_name};

    console.log("attributes details is ",attribute_detailes);
         if(editmodals.attribute_name!=''){
    axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/edit_attribute`,  attribute_detailes , { headers: exportValue.headers }).then((result)=>{
                console.log("result is i ",result);
                editmodals.isLoading = false
                if(result){
                    Swal.fire(
                        'Good job!',
                        ' Added Successfully !',
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
                    setEditModals({...editmodals,show:false}) 
                    // setNewState({...newState,attribute_name:"",attribute_type:""})  

                    getAttributeList()
                // toast.configure()
                // toast(result.data.message) 
                // history.push(`/category/attributeLists/${sub_category_id}/${category_id}`);

    })}else{
        Swal.fire({
            icon: 'error',
            
            text: 'Please Fill Attribute Name!',
            
          })
    }
    
}
const deleteConfirm = (attribute_id) => {
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
            attributeDelete(attribute_id)
        }       
    })

}
    return (
        <div>
            <Modal show={modalState.show} onHide={() => setModalState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>New Attribute</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-12 mb-5">
                            <label for="email">Attrbute Name</label>
                            <input class="form-control" id="first_name" type="text" placeholder="Enter attribute name"  onChange={handleChange}
                            name="attribute_name"
                            value={newState.attribute_name || ''}/>
                          
                        </div>
                        <div class="col-md-12 mb-5">
                        <label for="email">Select Group</label>

                        {(groupsList && groupsList.length > 0) ? 
                              <Select label="Category" onChange={(e)=>handleChangeCategories(e)} options={groupsList}  />
                              :<Select label="Category" />}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalState({ show: false })}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={(e) =>
                            handleSubmit(e)
                        }
                        >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editmodals.show} onHide={()=>setEditModals({...editmodals,show:false})}  style={{top:"70%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%,-50%)"}}>
            <Modal.Header>
           
                  <h2 class="h6 modal-title">Edit Attributes</h2>
                  <button type="button" class="btn-close" onClick={()=>setEditModals({...editmodals,show:false})} aria-label="Close"></button>
             
            </Modal.Header>
            <Modal.Body>
            <div class="mb-3">
                    <label for="email" class="form-label">Attribute Name</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter attribute heading" onChange={handleChange1}name="attribute_name" value={editmodals.attribute_name}/>
                  </div>
            </Modal.Body>
            <Button variant="primary" className='mb-3 mx-3' 
                                        onClick={(e) =>
                                            handleEditSubmit(editmodals.attribute_id)
                                        }>
                                        Update
                                      </Button>
        </Modal>
            
            
            <div className='row'>
                <div className='col-3'><Left_panel value={10}/></div>
                {(otherStates.isLoading)?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:
                <div className='col-9' style={{ marginLeft: "-60px" }}>
                    <Sub_header />
                   
                    <section>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                            <div class="d-block mb-4 mb-md-0">
                                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                                    <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
                                        <li class="breadcrumb-item">
                                            <a href="/categories">
                                                <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                            </a>
                                        </li>
                                        {/* <a href="/categories"> */}
                                            <li class="breadcrumb-item active" aria-current="page">Categories</li>
                                        {/* <a href="/subcategories">  */}
                                        <li class="breadcrumb-item active" aria-current="page">Sub Categories</li>
                                    </ol>
                                </nav>
                                <h2 class="h4">All Attributes</h2>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="input-group me-2 me-lg-3 fmxw-400">
                                    <span class="input-group-text">
                                        <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Search Attributes"  name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)}/>
                                </div>
                                <a class="btn btn-sm btn-gray-800 d-inline-flex align-items-center" onClick={() => setModalState({ ...modalState, show: true })}>
                                    <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    New Attributes
                                </a>
                            </div>
                        </div>

                        <div class="card card-body border-0 shadow table-wrapper table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        {/* <th class="border-gray-200">#</th> */}
                                        <th class="border-gray-200">Attribute Name</th>
                                        <th class="border-gray-200">Category Name</th>
                                        <th class="border-gray-200">Sub Category Name</th>
                                        <th class="border-gray-200"> Value Type</th>
                                        <th class="border-gray-200">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                {/* <td>
                                                    {index + 1}
                                                </td> */}
                                                <td>
                                                {item.attribute_name}
                                                </td>
                                                <td>
                                                   
                                                    {item.category_name}
                                                    
                                                </td>
                                                <td>
                                                {item.subcategory_name}

                                                </td>
                                                <td>
                                                {(item.attribute_type == 1) ? 'CheckBox' : (item.attribute_type == 2) ? 'DropDown' : (item.attribute_type == 3) ? 'RadioButton' : 'InputType'}
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

                                                            <a class="dropdown-item" onClick={()=>setEditModals({...editmodals,show:true,attribute_id:item.attribute_id,attribute_name:item.attribute_name})}><span class="fa fa-edit me-2"></span>Edit</a>
                                                            
                                                            <a class="dropdown-item text-danger rounded-bottom"onClick={()=>deleteConfirm(item.attribute_id)} ><span class="fa  fa-trash me-2"></span>Remove</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                <a href={`/addGroupValue/${subcategory_id}/${category_id}/${item.attribute_id}`} className="btn btn-sm btn-gray-800 d-inline-flex align-items-center">  
                                           Add/Edit Value  
                                        </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div >
                            <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[5, 10]}
                                    count={otherStates.total_count}
                                    page={otherStates.page}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={otherStates.rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}

                                />
                            </div>
                            {/* <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination mb-0">
                            <li class="page-item">
                                <a class="page-link" href="#">Previous</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">4</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">5</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                    <div class="fw-normal small mt-4 mt-lg-0">Showing <b>5</b> out of <b>25</b> entries</div>
                </div> */}
                        </div>


                    </section>

                </div>
}
            </div>


        </div>
    )


}
export default Attributes