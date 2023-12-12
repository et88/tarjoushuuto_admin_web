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






const Home_content = () => {
    const [state, setState] = React.useState({
        web_body_list: [],
        isLoading: true,
      })
   const[modals,setModals] = React.useState({show: false,web_body_id:""})
   const[editmodals,setEditModals] = React.useState({show: false, web_body_id:"" ,body_heading:"",pic:"right",body_sub_heading:"",body_img:"",body_content:"",body_link_title:"",})
   console.log("web_id=====?>",editmodals)

   const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   const [addstate, setaddState] = React.useState({web_body_id:"",body_heading:"",pic:"right",body_sub_heading:"",body_img:"",body_content:"",body_link_title:"",isLoading:true})
//    console.log("state is 2 ",state);
   const [isImageSelected, setIsImageSelected] = React.useState(false);
   const[addImg,setAddImg]=React.useState({uploadPhoto:""})
   const [stateSave, setSaveState] = React.useState({ uploadimg: ""});
    
   React.useEffect(() => {
      
   }, [])
 
 
//    React.useEffect(() => {
//        web_body_detail()
//    }, [])
      
    
     
      const axios_get_api = (index=0,onLoad) => {
    
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/web_body_list`;
        let sendData = {
        web_body_list: {},
        dstatus:1,
        indexValue: index,
        limit:otherStates.rowsPerPage
        };
        
    
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            if(index==0  && otherStates.onload) {
                setOtherState({...otherStates,total_count:res.data.dataCount})         
    }
          setState({ ...state,web_body_list: res.data.output ,isLoading:false });
          setEditModals({...editmodals,body_heading:res.data.body_heading ,web_body_id:res.data.web_body_id ,body_img:res.data.body_img ,body_sub_heading:res.data.body_sub_heading ,body_content:res.data.body_content ,body_link_title:res.data.body_link_title,pic:res.data.pic,show:false})
         
        }).catch((e) => {
    
        //   toast.configure()
        //   toast.error("Some thing went wrong")
        //   console.log("----error:   ", e);
        })
      }
      React.useEffect(() => {
        axios_get_api()
      }, [])

      function remove_web_body(web_body_id) {
        let userdata = { web_body_id: web_body_id }
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/web_body_delete`, userdata, { headers: exportValue.headers }).then((res) => {
        //   console.log("re", res)
          setState({ ...state, web_body_id: web_body_id });
          setModals({...modals,show:false})
          axios_get_api(null);
          if(res){
            Swal.fire(
                'Good job!',
                ' Content Removed Successfully !',
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
      
    
      
  
  
      const handleSubmit = (event) => {
          event.preventDefault();
         
  
          const fd = new FormData();
            fd.append("web_body_id", addstate.web_body_id);
            fd.append("body_heading", addstate.body_heading);
            fd.append("body_sub_heading", addstate.body_sub_heading);
  
            fd.append("body_img", addstate.body_img);
            fd.append("body_content", addstate.body_content);
            fd.append("body_link_title", addstate.body_link_title);
            fd.append("pic", addstate.pic);
  
  
           
            
      
            if (addstate.body_img != null && isImageSelected  == false) {
              fd.append('body_img', addstate.body_img)
            }
            else if (isImageSelected  == true) {
              fd.append("body_img",addstate.body_img[0],addstate.body_img.name)
            }
  
            console.log("hey man",fd);
         if(addstate.body_heading!="" &&  addstate.body_sub_heading!="" && addstate.body_img!=""  && addstate.body_content!="" && addstate.body_link_title!=""){
          axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_web_body`,  fd , { headers: exportValue.headers }).then((result)=>{
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
                        setaddState({web_body_id:"",body_heading:"",pic:"right",body_sub_heading:"",body_img:"",body_content:"",body_link_title:""})
                    
                    
                    }).catch((e) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            
                          })
                     
                      console.log("----error:   ", e);
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        
                        text: 'Please Fill All the Inputs!',
                        
                      })
                }
          
      }
  
      const handleChange = (event) => {
         // event.persist()
          console.log("event is v",event.target.name);
          setaddState({
              ...addstate,
              [event.target.name]: event.target.value,
          })
      }
  
      const fileSelectedHandler = (event) => {
          setIsImageSelected(true);
      
          setaddState({
                ...addstate,
                body_img: event.target.files,
              });
        };


      
        
        const handleEditSubmit = (web_body_id) => {
            console.log("id",editmodals.web_body_id)
          
             console.log("submit1",{web_body_id:editmodals.web_body_id, body_heading:editmodals.body_heading,body_img:editmodals.body_img,body_sub_heading:editmodals.body_sub_heading,body_content:editmodals.body_content,body_link_title:editmodals.body_link_title,pic:editmodals.pic});
         
    
            const fd = new FormData();
            fd.append("web_body_id", editmodals.web_body_id);
            fd.append("body_heading", editmodals.body_heading);
            fd.append("body_img",stateSave.uploadimg);
            fd.append("body_sub_heading", editmodals.body_sub_heading);
            fd.append("body_content", editmodals.body_content);
            fd.append("body_link_title", editmodals.body_link_title);
            fd.append("pic", editmodals.pic);
    
    
           
            
      
            if (stateSave.uploadimg != null && isImageSelected  == false) {
              fd.append('body_img', stateSave.uploadimg)
            }
            else if (isImageSelected  == true) {
              fd.append("body_img",stateSave.uploadimg[0],stateSave.uploadimg.name)
            }
    
            console.log("hey man",fd);
           if(web_body_id!=undefined){
            axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/edit_web_body`,  fd , { headers: exportValue.headers }).then((result)=>{
                        console.log("result is i ",result);
                        state.isLoading = false
                        setEditModals({...editmodals,show:false})
                        if(result){
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
                            axios_get_api()
                            // setaddState({web_body_id:"",body_heading:"",pic:"right",body_sub_heading:"",body_img:"",body_content:"",body_link_title:""})
                        
                        
                        }).catch((e) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                                
                              })
                         
                          console.log("----error:   ", e);
                        })}
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                                
                              }) 
                        }
        
        }
    
        const handleEditChange = (event) => {
           // event.persist()
            console.log("event is v",event.target.name);
            setEditModals({
                ...editmodals,
                [event.target.name]: event.target.value,
            })
        }
    
        const fileSelectedHandleredit = (event) => {
          setIsImageSelected(true);
          if (event.target.type == "file") {
          setSaveState({
                ...stateSave,
                uploadimg: event.target.files,
              });
              if(event.target.name == "body_img") {
                  setAddImg({...addImg,uploadPhoto:URL.createObjectURL(event.target.files[0])})
                  console.log("Add",addImg)
                }
  
        }};
  
      const { body_heading ,body_sub_heading , body_content, body_link_title ,pic} = addstate
    //   const { body_heading , body_sub_heading ,body_content, body_link_title ,pic} = editstate



    const removeImage = () => {
      console.log("on cick");
      setEditModals({...editmodals,body_img:""})
      setAddImg({...addImg,uploadPhoto:""})
      setSaveState({...stateSave,uploadimg:""})
      
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
    const deleteConfirm = (web_body_id) => {
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
            remove_web_body(web_body_id)
          }       
      })

  }

  return (
    <div>
        <div className='row'>
            <div className='col-3'>
                <Left_panel value={17}/>
            </div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:
            <div className='col-9' style={{marginLeft:"-60px"}}>
                <Sub_header/>
                <Modal show={modals.show} onHide={()=>setModals({show:false})} >
                                    <Modal.Header closeButton>
                                      <Modal.Title>Remove Content</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you really want to remove this content ?</Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={() => setModals({ show: false })}>
                                        Cancel
                                      </Button>
                                      <Button variant="primary" 
                                        onClick={() =>
                                            remove_web_body(modals.web_body_id)
                                        }>
                                        Remove
                                      </Button>
                                    </Modal.Footer>

                                    {/* edit modal */}
                                  </Modal>
                                  <Modal show={editmodals.show} onHide={()=>setEditModals({show:false})} >
                                    <Modal.Header closeButton>
                                    <h2 class="h6 modal-title">Home content Box</h2>
                                    </Modal.Header>
                                    <Modal.Body>
                                        
                                    <div class="mb-3">
                    <label for="email" class="form-label">Heading</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter heading" name="body_heading" value={editmodals.body_heading} onChange={handleEditChange} required/>
                  </div>
                  
                  <div class="mb-3">
                    <label for="email" class="form-label">Sub Heading</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter sub heading" value={editmodals.body_sub_heading} name="body_sub_heading" onChange={handleEditChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Link title</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter title" value={editmodals.body_link_title} name="body_link_title" onChange={handleEditChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Content</label>
                    <textarea class="form-control" rows="5" id="comment" name="body_content" value={editmodals.body_content} onChange={handleEditChange} required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Image Position</label>
                    <select class="form-select" onChange={handleEditChange} name="pic"  value={editmodals.pic}>
                    <option value={editmodals.pic}>{editmodals.pic}</option>
                    {editmodals.pic!=="" && editmodals.pic=="right"? 
                          <option value="left">left </option>
                          :
                          <option value="right">right </option>
                          
                          }
                    
                    </select>
                  </div>
                  <div class="mb-3">
                  {(editmodals.body_img == "" && addImg.uploadPhoto == "") ? 
                    <>
                    <label for="email" class="form-label">Image <small class="text-muted">(750px x 750px max)</small></label>
                       <input type="file" class="form-control" id="email" placeholder="Enter email" name="body_img" onChange={(event)=>fileSelectedHandleredit(event)
                      }/>
                      </>
                   

                       
                        
                         :
                         <div style={{width:"170px",marginRight:"7px"}} className="imageLogo1">
                           <div className="overlay1"> 
                           <i className="fa fa-trash-o icon1" onClick={()=>removeImage()}></i>
                           </div>
                           {(editmodals.body_img != '') ?
                        <img src={`https://cdn.tarjoushuuto.fi/web/${editmodals.body_img}`} style={{width:"100%",height:"200px"}} className="mt-3"/> 
                        :(addImg.uploadPhoto!= '')?
                        <img src={addImg.uploadPhoto} style={{width:"100%",height:"200px"}} className="mt-3"/> 
                        :""
                           }
                        </div>

                      }

                  </div>
                
                                     
                                    </Modal.Body>
                                    <Button variant="primary" className='mb-3 mx-3' 
                                        onClick={() =>
                                            handleEditSubmit(editmodals.web_body_id)
                                        }>
                                        Update
                                      </Button>
                                  
                                  
                                  </Modal>
          


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
                            <li class="breadcrumb-item active" aria-current="page">Web Management</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Home Web Content</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <a  class="btn btn-sm btn-gray-800 d-inline-flex align-items-center" data-bs-target="#modal-addhomecontent"  data-bs-toggle="modal" >
                        <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        New 
                    </a>
                    <section>
  <div class="modal fade" id="modal-addhomecontent" tabindex="-1" role="dialog" aria-labelledby="modal-addhomecontent" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h2 class="h6 modal-title">Home content Box</h2>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="mb-3">
                    <label for="email" class="form-label">Heading</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter heading" name="body_heading" value={body_heading} onChange={handleChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Sub Heading</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter sub heading" value={body_sub_heading} name="body_sub_heading" onChange={handleChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Link title</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter title" value={body_link_title} name="body_link_title" onChange={handleChange} required/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Content</label>
                    <textarea class="form-control" rows="5" id="comment" name="body_content" value={body_content} onChange={handleChange} required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Image Position</label>
                    <select class="form-select" onChange={handleChange} name="pic"  value={pic}>
                    
                      <option value="right">Right align</option>
                      <option value="left">Left align</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Image <small class="text-muted">(750px x 750px max)</small></label>
                    <input type="file" class="form-control" id="email" placeholder="Enter email" name="body_img"  onChange={(event)=>fileSelectedHandler(event)
                      } required/>
                  </div>
                  <div class="d-grid">
                    <button type="button" class="btn btn-secondary btn-block" data-bs-dismiss="modal" onClick={handleSubmit}>Add</button>
           
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
                            <th class="border-gray-200">Image</th>
                            <th class="border-gray-200">Heading</th>	
                            <th class="border-gray-200">Sub heading</th>
                            <th class="border-gray-200">Link Title</th>
                            <th class="border-gray-200">Status</th>
                            <th class="border-gray-200">Action</th>
                        </tr>
                    </thead>
                    {state.web_body_list.map((sub)=>(
                    <tbody>
                      
                        {/* <!-- Item --> */}
                        <tr>                       
                            <td>
                                <a href="#" class="fw-bold">
                                    <img src = {`https://cdn.tarjoushuuto.fi/web/${sub.body_img}`} class="img-fluid" />
                                </a>
                            </td>
                            <td><span class="fw-bold">{sub.body_heading}</span></td>
                            <td><span class="fw-bold">{sub.body_sub_heading}</span></td>
                            <td class="w-50 td_set"><span class="fw-bold">{sub.body_link_title}</span></td>
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
                                        <a class="dropdown-item" onClick={() => setEditModals({ show: true , body_heading:sub.body_heading,body_sub_heading:sub.body_sub_heading, body_link_title:sub.body_link_title , body_content:sub.body_content, pic:sub.pic , body_img:sub.body_img,web_body_id:sub.web_body_id })} ><span class="fa fa-edit me-2" ></span>Edit</a>
                                        <a class="dropdown-item text-danger rounded-bottom" data-bs-target="#modal-transaction-payment"  data-bs-toggle="modal"  onClick={()=>deleteConfirm(sub.web_body_id)}><span class="fa  fa-trash me-2"></span>Remove</a>
                                    </div>
                                  
                                </div>
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

            </div>
}
        </div>
    </div>
  )
}

export default Home_content