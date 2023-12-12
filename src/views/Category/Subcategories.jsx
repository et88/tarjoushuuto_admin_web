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
var FormData = require('form-data');


const SubCategories = () => {
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')
    const { category_id } = useParams();
    console.log("category_id = ",category_id);
    let navigate = useNavigate();
    const [state, setState] = useState([]);
    const [otherStates, setOtherState] = useState({ dstatus: "", searchKeyword: "", editImageShow :"",isLoading:true });
    const [paginate,setPaginate] = useState({activePage: 1, rowsPerPage: 10, page: 0, total_count: 0, onload: true});
    const [newState, setNewState] = useState({ subcategory_name: "", subcategory_img: "",category_id:category_id });
    const [modalState, setModalState] = useState({ show: false, user_id: "", action: "" });
    const [editModalState, setEditModalState] = useState({ show: false, user_id: "", action: "" });
    const [updateState, setUpdateState] = useState({ subcategory_name: "", subcategory_img: "",category_id:"" ,subcategory_id:""});
    const [updateStateImage, setupdateStateImage] = useState({ image: ""});
   const[addImg,setAddImg]=React.useState({uploadPhoto:""})
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })
// const [otherstates, setotherState] = useState({ dstatus: "", searchKeyword: "", activePage: 1, rowsPerPage: 10, page: 0, total_count: 0, onload: true,editImageShow :"",isLoading:true });





    useEffect(() => {
        getSubcategoryList(10,0,"");
    }, [])

   const getSubcategoryList = (rowsPerPage = 10,page = 0) => {
       
       // setOtherState(setValues)
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/subcategory_list`;
        let sendData = {limit:rowsPerPage,indexValue:page,find:""};
         console.log("bb", sendData);
         if(search!=null && search.length>0){
            sendData.find= search
        }
         if(category_id) {
            sendData.category_id = category_id;
         }
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            let setValues = {};
            setState(res.data.output);
           // setValues.isLoading = false;
           // setValues.page = page;
            if(page == 0 && paginate.onload){
                //setValues.total_count = res.data.count;
               // setValues.onload = false;
                setPaginate({...paginate,total_count:res.data.count,onload:false})
            //setOtherState({ ...otherStates, total_count: res.data.count,onload:false });
            }
            console.log("setValues ", setValues);
            setOtherState({...otherStates,isLoading:false})
            console.log("otherStates ", otherStates);
        }).catch((e) => {


        });
    }

    const newSubcategorysave = () => {
        if(newState.subcategory_name != "") {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/create_subcategory`;
        let bodyFormData = new FormData()
        console.log("bb", newState);
        bodyFormData.append("subcategory_name", newState.subcategory_name)
        bodyFormData.append("category_id", newState.category_id)
        if (newState.subcategory_img != '') {
            bodyFormData.append("subcategory_img", newState.subcategory_img[0]);
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
            setPaginate({...paginate,onload:true})
            setModalState({ show: false });
            setNewState({...newState,subcategory_name:"",subcategory_img:""})
            
            setTimeout(
            getSubcategoryList(),5000);
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

            // navigate('/categories')
            // let newCategory = res.data.category;
            //setState(state.concat([newCategory]))
        }).catch((e) => {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
        });
    }else {

    }
    }

    const updatesubcategory = () => {
        if(updateState.subcategory_name != "" && updateState.category_id != "") {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_subcategory`;
        let bodyFormData = new FormData()
        console.log("bb", updateState);
        bodyFormData.append("subcategory_name", updateState.subcategory_name)
        bodyFormData.append("category_id", updateState.category_id)
        bodyFormData.append("subcategory_id", updateState.subcategory_id)
        if (updateStateImage.image && updateStateImage.image != '') {
            bodyFormData.append("subcategory_img", updateStateImage.image[0]);
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
            setEditModalState({ show: false });
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

            getSubcategoryList()
            // navigate('/categories')
            // let newCategory = res.data.category;
            //setState(state.concat([newCategory]))
        }).catch((e) => {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
        });
    }else {

    }

    }
    
    const subcategoryDelete = (category_id,subcategory_id) => {

        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/remove_subcategory`;
        let sendData = {category_id:category_id,subcategory_id:subcategory_id};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            Swal.fire(
                'Success!',
                'Category Successfully Deleted!',
                'success'
              )
              getSubcategoryList()
          //  setState(res.data.output)
           // setOtherState({ ...otherStates, total_count: res.data.count });
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })

        });

    }

    const searchSubcategory = (e) => {
        console.log("e ",e );
        setOtherState({ ...otherStates, searchKeyword: e.target.value,onload:true});
        getSubcategoryList(10,0,e.target.value)
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

    const deleteConfirm = (category_id,subcategory_id) => {
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
                subcategoryDelete(category_id,subcategory_id)
            }       
        })

    }

    const handlePageChange = (event,newPage) => {
        console.log(newPage);
        
        getSubcategoryList(10,newPage);
        setPaginate({...paginate,page:newPage})
       // setOtherState({...otherStates,page:newPage})
    }
    const handleChangeRowsPerPage = () => {

    }

    const editSubcategoty = (category) =>{
        console.log(category);
        setUpdateState(category)
        if(category.subcategory_img && category.subcategory_img != "") {
        setOtherState({...updateState,editImageShow:"https://cdn.tarjoushuuto.fi/web/"+category.subcategory_img})
        }else {
            setOtherState({...updateState,editImageShow:""})
        }
        setEditModalState({ show: true })
    }

    const removeImage = () => {
        console.log("on cick");
        setOtherState({...otherStates,editImageShow:""})
        setAddImg({...addImg,uploadPhoto:""})
        // setSaveState({...stateSave,uploadimg:""})
    }
    const searchUser = ( rowsPerPage = 10,page = 0,) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/sub_category_find_name`;
            
        let transporter_data= { indexValue:page, limit:rowsPerPage, dstatus:1,subcategory_name:"",category_id:category_id};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.subcategory_name= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        

   console.log( "response123",res);
   if(page == 0 && paginate.onload) {
    setPaginate({...paginate,total_count:res.data.dataCount,onload:false})         
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

    setPaginate({...paginate,onload:true})
}
const filter=()=>{
    search=null
    params.delete('search')
    if (searchfilters.searchtitle !== "") {           
        params.append('search', searchfilters.searchtitle)
    }
    searchUser(10,0)
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
            <Modal show={modalState.show} onHide={() => setModalState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>New Subcategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-12 mb-5">
                            <label for="email">SubCategory Name</label>
                            <input class="form-control" id="first_name" type="text" placeholder="Enter category name" name="subcategory_name" onChange={(e) => inputHandleChange(e)} required value={newState.subcategory_name}/>
                            <span>*Please fill </span>
                        </div>
                        <div class="col-md-12 mb-5">
                            <label for="email">SubCategory Image</label>
                            <input class="form-control" id="first_name" type="file" placeholder="Enter your Paypal Email Address" name="subcategory_img" onChange={(e) => inputHandleChange(e)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalState({ show: false })}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() =>
                            newSubcategorysave()
                        }>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editModalState.show} onHide={() => setEditModalState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subcategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-12 mb-5">
                            <label for="email">SubCategory Name</label>
                            <input class="form-control" id="first_name" type="text" placeholder="Enter category name" name="subcategory_name" onChange={(e) => inputEditHandleChange(e)} required value={updateState.subcategory_name}/>
                            {updateState.subcategory_name==""?<span>*Please fill </span>:""}
                        </div>
                        <div class="col-md-12 mb-5">
                        {(otherStates.editImageShow== "" && addImg.uploadPhoto == "") ? 
                    <>
                    <label for="email" class="form-label"> Category Image <small class="text-muted">(750px x 750px max)</small></label>
                       <input type="file" class="form-control" id="email" placeholder="Enter email" name="testimonial_img" onChange={(event)=>inputEditHandleChange(event)
                      }/>
                      </>
                   
                         :
                         <div style={{width:"170px",marginRight:"7px"}} className="imageLogo1">
                           <div className="overlay1"> 
                           <i className="fa fa-trash-o icon1" onClick={()=>removeImage()}></i>
                           </div>
                           {(otherStates.editImageShow!= '') ?
                        <img src={otherStates.editImageShow}  style={{width:"100%",height:"200px"}} className="mt-3"/> 
                        :(addImg.uploadPhoto!= '')?
                        <img src={addImg.uploadPhoto} style={{width:"100%",height:"200px"}} className="mt-3"/> 
                        :""
                           }
                        </div>

                      }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditModalState({ show: false })}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() =>
                            updatesubcategory()
                        }>
                        Save
                    </Button>
                </Modal.Footer>
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
                                        <li class="breadcrumb-item active" aria-current="page">Categories</li>
                                    </ol>
                                </nav>
                                <h2 class="h4">All Subcategories</h2>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="input-group me-2 me-lg-3 fmxw-400">
                                    <span class="input-group-text">
                                        <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Search Subcategories" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)}/>
                                </div>
                                <a class="btn btn-sm btn-gray-800 d-inline-flex align-items-center" onClick={() => setModalState({ ...modalState, show: true })}>
                                    <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    New Subcategory
                                </a>
                            </div>
                        </div>

                        <div class="card card-body border-0 shadow table-wrapper table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        {/* <th class="border-gray-200">#</th> */}
                                        <th class="border-gray-200">Icon</th>
                                        <th class="border-gray-200">Name</th>
                                        <th class="border-gray-200">Attributes</th>
                                        <th class="border-gray-200">Status</th>
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
                                                    <div style={{ width: "150px", height: "150px" }}>
                                                   {(item.subcategory_img && item.subcategory_img != "")? <img src={"https://cdn.tarjoushuuto.fi/web/" + item.subcategory_img} class="rounded-circle" style={{ width: "150px", height: "150px" }} />
                                                   :""}
                                                   </div>
                                                </td>
                                                <td>
                                                    <a href={`/attributes/${item.subcategory_id}/${item.category_id}`} class="fw-bold">  
                                                        {item.subcategory_name}
                                                    </a>
                                                </td>
                                                <td><span class="fw-bold">
                                                {(item.attrubutes) ? item.attrubutes.map((sub, index) => 
                                                   sub.attribute_name+", "
                                                ):""}
                                                    
                                                    </span></td>
                                                <td>
                                                    {(item.dstatus == 1) ?
                                                        <span class="badge rounded-pill bg-success">Active</span> : <span class="badge rounded-pill bg-warning">Inactive</span>
                                                    }
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

                                                            <a class="dropdown-item" onClick={()=>editSubcategoty(item)}><span class="fa fa-edit me-2"></span>Edit</a>
                                                            
                                                            <a class="dropdown-item text-danger rounded-bottom" onClick={()=>deleteConfirm(item.category_id,item.subcategory_id)}><span class="fa  fa-trash me-2"></span>Remove</a>
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
                                    rowsPerPageOptions={[5, 10]}
                                    count={paginate.total_count}
                                    page={paginate.page}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={paginate.rowsPerPage}
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
export default SubCategories