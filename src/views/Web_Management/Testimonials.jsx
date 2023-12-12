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


const Testimonials = () => {
    const [state, setState] = React.useState({
        web_testimonial_list: [],
        isLoading: true,
        searchValue:""
         })
   const [otherStates,setOtherState] = React.useState({activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   const [addstate, setaddState] = React.useState({web_testimonial_id:"",testimonial_title:"",testimonial_description:"",testimonial_img:""})
   const[editmodals,setEditModals] = React.useState({show: false, web_testimonial_id:"" ,testimonial_title:"",testimonial_description:"",testimonial_img:""})
   const[modals,setModals] = React.useState({show: false,web_testimonial_id:""})
   const[addImg,setAddImg]=React.useState({uploadPhoto:""})
  const [stateSave, setSaveState] = React.useState({ uploadimg: ""});
   


   const [isImageSelected, setIsImageSelected] = React.useState(false);

      
    
     
      const axios_get_api = (index=0) => {
    
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/web_testimonial_list`;
        let sendData = {
        web_testimonial_list: {},
        dstatus:1,
        indexValue:index,
        limit:otherStates.rowsPerPage
        };
        
    
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
            if(index==0  && otherStates.onload) {
                setOtherState({...otherStates,total_count:res.data.dataCount})         
    }
          setState({ ...state,web_testimonial_list: res.data.output,isLoading:false });
          setEditModals({...editmodals, web_testimonial_id:res.data.web_testimonial_id , testimonial_title: res.data.testimonial_title , testimonial_description: res.data.testimonial_description , testimonial_img: res.data.testimonial_img , show : false})
          console.log("response", res);
        }).catch((e) => {
    
        //   toast.configure()
        //   toast.error("Some thing went wrong")
          console.log("----error:   ", e);
        })
      }
      React.useEffect(() => {
        axios_get_api()
      }, [])

      const handleSubmit = (event) => {
        event.preventDefault();
       

        const fd = new FormData();
          fd.append("web_testimonial_id", addstate.web_testimonial_id);
          fd.append("testimonial_title", addstate.testimonial_title);
          fd.append("testimonial_description", addstate.testimonial_description);
          fd.append("testimonial_img", addstate.testimonial_img);
       
          if (addstate.testimonial_img != null && isImageSelected  == false) {
            fd.append('testimonial_img', addstate.testimonial_img)
          }
          else if (isImageSelected  == true) {
            fd.append("testimonial_img",addstate.testimonial_img[0],addstate.testimonial_img.name)
          }

          console.log("hey man",fd);
       
          if(addstate.testimonial_title!="" &&  addstate.testimonial_description!="" && addstate.testimonial_img!=""  ){
            axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_web_testimonial`,  fd , { headers: exportValue.headers }).then((result)=>{
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
                          setaddState({web_testimonial_id:"",testimonial_title:"",testimonial_description:"",testimonial_img:""})
                      
                      
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
              testimonial_img: event.target.files,
            });
      };


       
      const handleEditSubmit = (web_testimonial_id) => {
        console.log("id",editmodals.web_testimonial_id)
      
         console.log("submit1",{web_testimonial_id:editmodals.web_testimonial_id, web_testimonial_id:editmodals.web_testimonial_id , testimonial_title: editmodals.testimonial_title , testimonial_description: editmodals.testimonial_description , testimonial_img: stateSave.uploadimg});
     

        const fd = new FormData();
        fd.append("web_testimonial_id", editmodals.web_testimonial_id);
        fd.append("testimonial_title", editmodals.testimonial_title);
        fd.append("testimonial_img", stateSave.uploadimg);
        fd.append("testimonial_description", editmodals.testimonial_description);
       

       
        
  
        if (stateSave.uploadimg!= null && isImageSelected  == false) {
          fd.append('testimonial_img',stateSave.uploadimg)
        }
        else if (isImageSelected  == true) {
          fd.append("testimonial_img",stateSave.uploadimg[0],stateSave.uploadimg.name)
        }

        console.log("hey man",fd);
       if(web_testimonial_id!=undefined){
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/edit_web_testimonial`,  fd , { headers: exportValue.headers }).then((result)=>{
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
            if(event.target.name == "testimonial_img") {
                setAddImg({...addImg,uploadPhoto:URL.createObjectURL(event.target.files[0])})
                console.log("Add",addImg)
              }

      }};

      const removeImage = () => {
        console.log("on cick");
        setEditModals({...editmodals,testimonial_img:""})
        setAddImg({...addImg,uploadPhoto:""})
        setSaveState({...stateSave,uploadimg:""})
        
      }

      function remove_testimonial(web_testimonial_id) {
        let userdata = { web_testimonial_id: web_testimonial_id }
        axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/web_testimonial_delete`, userdata, { headers: exportValue.headers }).then((res) => {
            setState({ ...state, web_testimonial_id: web_testimonial_id });
            setModals({...modals,show:false})
            axios_get_api();
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

        const searchtestimonial = (searchValue,index=0) => {
            let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/testimonial_find_detail`;
                
            let data= { indexValue:index, limit:otherStates.rowsPerPage , dstatus:1};
            console.log("pv",state.testimonial_title)
            if ( state.searchValue) {
               data.testimonial_title = state.testimonial_title;
             }
             console.log("testimonial_title",data)
           
        axios.post(full_api , data, { headers: exportValue.headers }).then(res => {        
       setState({ ...state,testimonial_title:res.data.testimonial_title})
       console.log( "response",res);
       if(index==0 && otherStates.onload) {
        setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
    }  
       setState({ ...state, web_testimonial_list: res.data.output, dataCount: res.data.dataCount,isLoading:false });
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
        setState({ ...state, testimonial_title:state.searchValue})
        setOtherState({...otherStates,onload:true})
    }
    
        React.useEffect(() => {
            axios_get_api(0,true)
        }, [])
        

    const { testimonial_title,testimonial_description,testimonial_img } = addstate

    
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
    const deleteConfirm = (web_testimonial_id) => {
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
            remove_testimonial(web_testimonial_id)
          }       
      })

  }

  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={18}/></div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:

            <div className='col-9'  style={{marginLeft:"-60px"}}>
                <Sub_header/>
             <Modal show={modals.show} onHide={()=>setModals({show:false})} >
                                    <Modal.Header closeButton>
                                      <Modal.Title>Remove Testimonial</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you really want to remove this testimonial ?</Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={() => setModals({ show: false })}>
                                        Cancel
                                      </Button>
                                      <Button variant="primary" 
                                        onClick={() =>
                                            remove_testimonial(modals.web_testimonial_id)
                                        }>
                                        Remove
                                      </Button>
                                    </Modal.Footer>
                                     </Modal> 

                                 {/* edit modal */}
                                     <Modal show={editmodals.show} onHide={()=>setEditModals({...editmodals,show:false})} >
                                    <Modal.Header closeButton>
                                    <h2 class="h6 modal-title">Testimonials</h2>
                                    </Modal.Header>
                                    <Modal.Body>
                                   
                  <div class="mb-3">
                    <label for="email" class="form-label">Customer Name</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter Customer Name" name="testimonial_title" onChange={handleEditChange} value={editmodals.testimonial_title}/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Content</label>
                    <textarea class="form-control" rows="5" id="comment" name="testimonial_description" value={editmodals.testimonial_description} onChange={handleEditChange}></textarea>
                  </div>
                  <div class="mb-3">
                  
                 {(editmodals.testimonial_img == "" && addImg.uploadPhoto == "") ? 
                    <>
                    <label for="email" class="form-label">Image <small class="text-muted">(750px x 750px max)</small></label>
                       <input type="file" class="form-control" id="email" placeholder="Enter email" name="testimonial_img" onChange={(event)=>fileSelectedHandleredit(event)
                      }/>
                      </>
                   

                       
                        
                         :
                         <div style={{width:"170px",marginRight:"7px"}} className="imageLogo1">
                           <div className="overlay1"> 
                           <i className="fa fa-trash-o icon1" onClick={()=>removeImage()}></i>
                           </div>
                           {(editmodals.testimonial_img != '') ?
                        <img src={`https://cdn.tarjoushuuto.fi/web/${editmodals.testimonial_img}`} style={{width:"100%",height:"200px"}} className="mt-3"/> 
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
                                            handleEditSubmit(editmodals.web_testimonial_id)
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
                                    <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  onClick={(e) => searchtestimonial(e)} ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Testimonials</li>
                        </ol>
                    </nav>
                    <h2 class="h4">All Testimonials</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e)=>searchtestimonial(e)}>
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search Testimonials" value={state.searchValue} onChange={({ target }) => {
                                stateHandler('searchValue', target.value)

                            }} />
                    </div>
                    <a href="#" class="btn btn-sm btn-gray-800 d-inline-flex align-items-center"  data-bs-toggle="modal" data-bs-target="#modal-addtestimonials" >
                        <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        New Testimonial
                    </a>
                    <section>
  <div class="modal fade" id="modal-addtestimonials" tabindex="-1" role="dialog" aria-labelledby="modal-addtestimonials" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h2 class="h6 modal-title">Testimonials</h2>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="mb-3">
                    <label for="email" class="form-label">Customer Name</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter Customer Name" name="testimonial_title" onChange={handleChange} value={testimonial_title}/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Content</label>
                    <textarea class="form-control" rows="5" id="comment" name="testimonial_description" value={testimonial_description} onChange={handleChange}></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Image <small class="text-muted">(750px x 750px max)</small></label>
                    <input type="file" class="form-control" id="email" placeholder="Enter email" name="testimonial_img" onChange={(event)=>fileSelectedHandler(event)
                      }/>
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
                            {/* <th class="border-gray-200">#</th>	 */}
                            <th class="border-gray-200">Image</th>	
                            <th class="border-gray-200">Customer Name</th>
                            <th class="border-gray-200">Status</th>
                            <th class="border-gray-200">Action</th>
                        </tr>
                    </thead>
                    {state.web_testimonial_list.map((subscriber)=>(
                    <tbody>
                        {/* <!-- Item --> */}
                        <tr>
                            {/* <td>
                                01
                            </td> */}
                            <td>
                                <img src={`https://cdn.tarjoushuuto.fi/web/${subscriber.testimonial_img}`} style={{width: "60px",height: "30px !important"}}  class="img-fluid rounded-circle" /> 
                            </td>                        
                            <td>
                                <a href="#" class="fw-bold">
                                   {subscriber.testimonial_title}
                                </a>
                            </td>
                            <td><span class="badge rounded-pill bg-success">{subscriber.dstatus==1?"Active":"Inactive"}</span></td>
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
                                        <a class="dropdown-item" onClick={() => setEditModals({ show: true ,testimonial_title:subscriber.testimonial_title,testimonial_description:subscriber.testimonial_description, testimonial_img:subscriber.testimonial_img,web_testimonial_id:subscriber.web_testimonial_id })}><span class="fa fa-edit me-2"  ></span>Edit</a>
                                        <a class="dropdown-item text-danger rounded-bottom"  onClick={()=>deleteConfirm(subscriber.web_testimonial_id)}><span class="fa  fa-trash me-2"></span>Remove</a>
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

export default Testimonials

