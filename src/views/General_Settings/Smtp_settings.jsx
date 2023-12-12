import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';


const Smtp_settings = () => {
    let navigate = useNavigate();
    const [state, setState] = useState({isLoading:true},[]);
    useEffect(() => {
        getSmtpSetting();


    }, [])

    const getSmtpSetting = () => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/smtp_setting_api`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("res ", res);            
             setState(res.data.output[0],{isLoading:false})
        }).catch((e) => {


        });
    }
    const handleChange = (e) => {
        
        setState({...state,[e.target.name]:e.target.value})
    }

    const updateSmtp = (e) => {
        
       // console.log(state);
        let sendData = {sid:state.sid,data:state};
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_smtp_configure_api`;
       
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("res ", res);            
            // navigate('/smtp_settings')
        }).catch((e) => {


        });
    }
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={5}/></div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:

            <div className='col-9' style={{ marginLeft: "-60px" }}>
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
                            <li class="breadcrumb-item active" aria-current="page">Settings</li>
                        </ol>
                    </nav>
                    <h2 class="h4">Email SMTP Settings</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    <section>
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <form >
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Port</label>
                                    <input class="form-control"  type="text" placeholder="i.e. 587" required onChange={(e)=>handleChange(e)} value={state.port} name="port"/>
                                    <div class="text-danger small">(Sets SMTP Port. Default Port is 25)</div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Host</label>
                                    <input class="form-control" id="email" type="text" placeholder="hostname" required onChange={(e)=>handleChange(e)} value={state.host} name="host"/>
                                    <div class="text-danger small">(SMTP server)</div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Secure</label>
                                    <select class="form-select" onChange={(e)=>handleChange(e)} value={state.secure} name="secure">
                                        <option value="">Please Select</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                      </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Username/email</label>
                                    <input class="form-control" id="email" type="text" placeholder="email@domain.com" required onChange={(e)=>handleChange(e)} value={state.user_name} name="user_name"/>
                                    <div class="text-danger small">(SMTP username)</div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Password</label>
                                    <input class="form-control" id="phone" type="text" placeholder="*******" required onChange={(e)=>handleChange(e)} value={state.password} name="password"/>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Sender ID</label>
                                    <input class="form-control" id="phone" type="text" placeholder="Your sender ID" required onChange={(e)=>handleChange(e)} value={state.sender_email} name="sender_email"/>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={(e)=>updateSmtp(e)}>Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
            </div>
}
        </div>
    </div>
  )
}

export default Smtp_settings