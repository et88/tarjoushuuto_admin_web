import React from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2'
import '../../components/loader.css';


const FormData = require('form-data')


export const Web_management = () => {
    const [state, setState] = React.useState({
        title:"",
        description:"",
        image_url:"",
        status:1,
        web_id:"",
        containId:"",
        isLoading:true
      })

    React.useEffect(() => {
        fetchSocial();
    }, [])
    const [substate, setsubState] = React.useState([])
    
     
    
      React.useEffect(() => {
        WebSubHeaderManagement();
      }, [])
      const [iconstate, seticonState] = React.useState([])
    
      //console.log("state is ",state);
    
      React.useEffect(() => {
        WebIconManagement();
      }, [])
      const [videostate, setvideoState] = React.useState({
        title:"",
        description:"",
        url:"",
        isLoading:true
      })
    
     // console.log("state is ",state);
    
      React.useEffect(() => {
        fetchVideo();
      }, [])
    

    const [isImageSelected, setIsImageSelected] = React.useState(false);
  const [addimg,setAddimg] = React.useState({uploadImage:""});
  

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleChange2 = (event) => {
        event.persist()
        setsubState({
            ...substate,
            [event.target.name]: event.target.value,
        })
    }

    const fileSelectedHandler = (event) => {
        setIsImageSelected(true);
          setState({
              ...state,
              image_url: event.target.files,
            });
            if(event.target.name == "image_url") {
                setAddimg({...addimg,uploadImage:URL.createObjectURL(event.target.files[0])})
               // console.log("updloadImage",addimg.uploadImage)
              }
      };

    const fetchSocial = () => {
        
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
        let d1 = {type:2};
        
        axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
           
           state.isLoading = false
            setState({...state,
              title:res.data.web_data[0].values[0].title,
              description:res.data.web_data[0].values[0].description,
              image_url:res.data.web_data[0].values[0].url,
              status:res.data.web_data[0].values[0].status,
              web_id:res.data.web_data[0].web_id,
              containId:res.data.web_data[0].values[0].containId})
          
        })
      }

    const handleSubmit = () => {
       
        const fd = new FormData();
        fd.append("title", state.title);
        fd.append("description", state.description);
        fd.append("containId", state.containId);
        fd.append("web_id", state.web_id);
        fd.append("type", 2);
        fd.append("status", state.status);
        
  
        if (state.image_url != null && isImageSelected  == false) {
          fd.append('image_url', state.image_url)
        }
        else if (isImageSelected  == true) {
          fd.append("image_url",state.image_url[0],state.image_url.name)
        }

       // console.log("hey man",fd);
  
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_update_api'
        axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
           // console.log("res",res)
           
               if(res.data.status==200)
               { Swal.fire(
                'Good job!',
                'Updated Successfully !',
                'success'
              ) }
              else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    
                  })
              }
               
                  fetchSocial();
              
      }). catch((e)=>{
           
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
      })
    
    }
 
    const WebSubHeaderManagement = () => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
        let d1 = {type : 3};
        axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
          state.isLoading = false
          //if (res.data.status === "200") {
           // console.log("subres",res)
           setsubState(res.data.web_data[0].values)
            // setsubState({...substate,title_zero:res.data.web_data[0].values[0].title,description_zero:res.data.web_data[0].values[0].description,containId_zero:res.data.web_data[0].values[0].containId,web_id:res.data.web_data[0].web_id, title_one:res.data.web_data[0].values[1].title,description_one:res.data.web_data[0].values[1].description,containId_one:res.data.web_data[0].values[1].containId,title_two:res.data.web_data[0].values[2].title,description_two:res.data.web_data[0].values[2].description,containId_two:res.data.web_data[0].values[2].containId})
    
        //  }
        })
      }
      const handleSubmitzero = (event) => {
        event.preventDefault();
        let sendData = {type:3,values:substate};
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_sub_header_box_update_api'
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res =>  ",res);
            WebSubHeaderManagement()
            if(res.data.status==200)
            { Swal.fire(
             'Good job!',
             'Updated Successfully !',
             'success'
           ) }
           else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 
               })
           }
        }).catch((e)=>{
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
        })
    }
    
   
    const WebIconManagement = () => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
        let d1 = {type : 4};
        axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
          state.isLoading = false;
         // console.log("res=>   ",res.data.web_data[0].values);
          //if (res.data.status === "200") {
            seticonState(res.data.web_data[0].values)

           // seticonState({...iconstate,title_zero:res.data.web_data[0].values[0].title,description_zero:res.data.web_data[0].values[0].description,containId_zero:res.data.web_data[0].values[0].containId,web_id:res.data.web_data[0].web_id, title_one:res.data.web_data[0].values[1].title,description_one:res.data.web_data[0].values[1].description,containId_one:res.data.web_data[0].values[1].containId,title_two:res.data.web_data[0].values[2].title,description_two:res.data.web_data[0].values[2].description,containId_two:res.data.web_data[0].values[2].containId , title_three:res.data.web_data[0].values[3].title,description_three:res.data.web_data[0].values[3].description,containId_three:res.data.web_data[0].values[3].containId})
    
        //  }
        })
      }
   
    
      const stateHandler = (e) => {
         // console.log("e is ",e.target.value);
            const newData = { ...state };
            newData[e.target.name] = e.target.value
            setState(newData)
      }
      const handleChangeVideo = (event) => {
        event.persist()
        setvideoState({
            ...videostate,
            [event.target.name]: event.target.value,
        })
    }
    
      const fetchVideo = () => {
        
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
        let d1 = {type:5};
        axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
          state.isLoading = false
          setvideoState({...videostate,title:res.data.web_data[0].values[0].title,description:res.data.web_data[0].values[0].description,url:res.data.web_data[0].values[0].url})
          // if (res.data.status === "200") {
          // setState({...state,getways:res.data.list});        
          // }
        })
      }
      const handleSubmitVideo = (event) => {
        event.preventDefault();
      
        const fd = new FormData();
        fd.append("title", videostate.title);
        fd.append("description", videostate.description);
        fd.append("type", 5);
        fd.append("url", videostate.url);
         
   
      
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_add_api'
        axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
            if(res)
               { Swal.fire(
                'Good job!',
                'Updated Successfully !',
                'success'
              ) }
              else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    
                  })
              }
       
        }). catch((e)=>{
           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
          })
      
    }

    const handleSubmitFooterIcon = (event) => {
        event.preventDefault();
        console.log(iconstate);
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_footer_box_update_api';
        let sendData = {type:4,values:iconstate};
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res =>  ",res);
            if(res.data.status==200)
            { Swal.fire(
             'Good job!',
             'Updated Successfully !',
             'success'
           ) }
           else{
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 
               })
           }
        }).catch((e)=>{
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
        })
       
    }

    const handleIcon = (e,index) =>{
       // console.log(index);
        let iconBox = [...iconstate]
        iconBox[index][e.target.name] = e.target.value;
     //   console.log(e);
      //  console.log(iconBox)
        seticonState(iconBox)
    }
    const handlesubheader = (e,index) =>{
        // console.log(index);
         let subheaderBox = [...substate]
         subheaderBox[index][e.target.name] = e.target.value;
      //   console.log(e);
       //  console.log(iconBox)
         setsubState(subheaderBox)
     }
    
   
    
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={19}/></div>
            {/* {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>: */}

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
                            <li class="breadcrumb-item active" aria-current="page">Web CMS</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Web CMS Settings</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    <div id="header_banner"></div>
    <section>
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 mb-4">Header Management</h2>
                    <form >
                        <div class="row">
                            <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="city">Enter header title</label>
                                    <input class="form-control" id="city" type="text" placeholder="Title" name="title"  onChange={handleChange} value={state.title} required />
                                </div>
                            </div>
                            <div class="col-sm-12 mb-3">
                                <label for="state">Description</label>
                                <textarea class="form-control" rows="5" id="comment" name="description"  onChange={handleChange} value={state.description}></textarea>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="zip">Image <small class="text-muted">Choose Image Size (450px X 450px)</small></label>
                                    <input class="form-control" id="zip" type="file" placeholder="ZIP" name="image_url"  onChange={(event)=>fileSelectedHandler(event)}  />
                                    {state.image_url!=""?
                                    <img src={`https://cdn.tarjoushuuto.fi/web/web_home/${state.image_url}`} alt="img" className="form-control mt-3" style={{width:"72%",height:"40%"}} />
                                  :addimg.uploadImage!=""?
                                 
                                  <img src={addimg.uploadImage} alt="img" className="form-control mt-3" style={{width:"72%",height:"40%"}} />
                                   :""}
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={handleSubmit}>Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <div id="sub_header_banner"></div>
    <section>
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 mb-4">Sub Header Management</h2>
                    <form onSubmit={e=>handleSubmitzero(e)}>

                    
                                {substate.map((sub,index)=>(
                                <div class="row">
                                    <div class="col-sm-12 mb-3">
                                        <div class="form-group">
                                            <label for="city">Enter header title</label>
                                            <input class="form-control" id="city" type="text" placeholder="Title" name="title"
                            value={sub.title }  onChange={e=>handlesubheader(e,index)} required />
                                        </div>
                                    </div>
                                    <div class="col-sm-12 mb-3">
                                        <label for="state">Description</label>
                                        <input class="form-control" id="city" type="text" placeholder="Description" onChange={e=>handlesubheader(e,index)} name="description"
                            value={sub.description} required />
                                    </div>
                                </div>
                                ))}
                            <button class="btn btn-gray-800 mt-2 animate-up-2">Save </button>
                           
                    </form>
                </div>
            </div>
        </div>
    </section>

    <div id="video_box"></div>
    <section>
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 mb-4">Video Box Management</h2>
                    <form>
                        <div class="row">
                            <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="city">Enter header title</label>
                                    <input class="form-control" id="city" type="text" placeholder="Title" name="title" onChange={handleChangeVideo} value={videostate.title} required />
                                </div>
                            </div>
                            <div class="col-sm-12 mb-3">
                                <label for="state">Description</label>
                                <textarea class="form-control" rows="5" id="comment" name="description" value={videostate.description}  onChange={handleChangeVideo} ></textarea>
                            </div>
                            <div class="col-sm-12 mb-3">
                                <div class="form-group">
                                    <label for="">Youtube Video ID</label>
                                    <input class="form-control" id="city" type="text" placeholder="enter youtube video id" value={videostate.url} name="url"  onChange={handleChangeVideo} required />
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={handleSubmitVideo}>Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <div id="footer_icon_box"></div>
    <section>
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 mb-4">Footer Icon Box Management</h2>
                    <form onSubmit={e=>handleSubmitFooterIcon(e)}>
                       
                    {iconstate.map((item,index)=>
                    
                        <div class="row">
                       
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="city">Icon Font Code <a href="https://fontawesome.com/v4/icons/" class="text-danger">Get icon list here</a></label>
                                    <input class="form-control" name="title" type="text" placeholder="eg: fa fa-lock" value={item.title} required onChange={e=>handleIcon(e,index)}/>
                                </div>
                            </div>

                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <input class="form-control" name="description" type="text" placeholder="Enter Description" value={item.description}  required onChange={e=>handleIcon(e,index)}/>
                                </div>
                            </div>
                        </div>
                    

                   ) }
                        {/* <div class="row">
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="city">Icon Font Code <a href="https://fontawesome.com/v4/icons/" class="text-danger">Get icon list here</a></label>
                                    <input class="form-control" id="city" type="text" placeholder="eg: fa fa-lock" value={iconstate.title_one}  required />
                                </div>
                            </div>
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <input class="form-control" id="city" type="text" placeholder="Enter Description" value={iconstate.description_one}  required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="city">Icon Font Code <a href="https://fontawesome.com/v4/icons/" class="text-danger">Get icon list here</a></label>
                                    <input class="form-control" id="city" type="text" placeholder="eg: fa fa-lock" value={iconstate.title_two}  required />
                                </div>
                            </div>
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <input class="form-control" id="city" type="text" placeholder="Enter Description" value={iconstate.description_two}  required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="city">Icon Font Code <a href="https://fontawesome.com/v4/icons/" class="text-danger">Get icon list here</a></label>
                                    <input class="form-control" id="city" type="text" placeholder="eg: fa fa-lock" value={iconstate.title_three}  required />
                                </div>
                            </div>
                            <div class="col-sm-6 mb-3">
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <input class="form-control" id="city" type="text" placeholder="Enter Description" value={iconstate.description_three}  required />
                                </div>
                            </div>
                        </div> */}
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

            </div>
{/* } */}
        </div>
    </div>
  )
}
