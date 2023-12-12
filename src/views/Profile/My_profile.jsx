import React, { useEffect } from 'react'
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import axios from 'axios'
import exportValue from '../../apiconfig'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import '../../components/loader.css';
import TablePagination from '@mui/material/TablePagination';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'


const My_profile = () => {

let admindata = {};
if (localStorage.getItem('admin_login')) {
  admindata = JSON.parse(localStorage.getItem('admin_login'));
  console.log("admindata------>  -  ",admindata);
  //navigate('/home') 
}
let admin = admindata.admin_id
const [state, setState] = React.useState({full_name:"",email:"",phone:"",admin_id:""})
// const[editstate,setEditState]= React.useState({full_name:"",email:"",phone:""})
const axios_get_api = () => {
   
   let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/admin_profile`;
   let sendData = {
     admin_id : admindata.admin_id
   };
  
    console.log("send",sendData)
   axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
         let setdetails = res.data.output[0]
    setState({ ...state, full_name:setdetails.full_name,email:setdetails.email , phone:setdetails.phone , admin_id:setdetails.admin_id});
     
     console.log( "response",res);
 
   }).catch((e) => {
       Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Something went wrong!',
           
         })
       console.log("----error:   ", e);
   })

}

        React.useEffect(()=>{
            axios_get_api()
        },[])


     const Update_profile=(admin_id)=>{
              let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/update_admin_profile`;
    let sendData = {
      admin_id : state.admin_id,
      full_name:state.full_name,email:state.email,phone:state.phone
    };
  
     console.log("send",sendData)
    axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
        console.log( "responseupdate",res);
        if(res.status==200)
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
       axios_get_api()
    
 
    }).catch((e) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           
          })
        console.log("----error:   ", e);
    })

     }   

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }


  return (
    <div>
        <div className='row'>
            <div className='col-3'>
                <Left_panel/>
            </div>
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
                            <li class="breadcrumb-item active" aria-current="page">My Profile</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Welcome {state.full_name}!</h2>
                    </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    
    <section id="generalinfo">
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    
                    <form>
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <div>
                                    <label for="first_name">Full Name</label>
                                    <input class="form-control" id="first_name" type="text" placeholder="name" name="full_name" value={state.full_name} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" id="email" type="email" placeholder="name@company.com" name="email" value={state.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input class="form-control" id="phone" type="number" placeholder="+12-345 678 910" name="phone" value={state.phone} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div class="mt-3">
                            <a href="" class="btn btn-gray-800 mt-2 animate-up-2"  onClick={(e)=>Update_profile(e)}>Save</a>
                           
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </section>



            </div>
        </div>
    </div>
  )
}

export default My_profile