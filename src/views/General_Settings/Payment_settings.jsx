import React, { useState, useEffect } from "react";
import axios from "axios";
import exportValue from "../../apiconfig";

import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';

const Payment_settings = () => {
    const [state, setState] = useState({isLoading:true},[{details:"",pid:"",dstatus:0},{key:"",pid:"",dstatus:0}]);
    useEffect(() => {
        getPaymentListing();


    }, [])

    const getPaymentListing = () => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/payment_setting_api`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
             console.log("res ", res);            
             setState(res.data.output,{isLoading:false})

        }).catch((e) => {


        });
    }

    const paymentUpdate = (updateData) => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/payment_setting_update_api`;
        let sendData = updateData;
         console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
             console.log("res ", res);         
            
            

        }).catch((e) => {


        });
    }
    const inputHandleChange = (e) => {
        console.log("e ", e.target.name);
        console.log("e ", e.target.value);
        let mediaList = [...state];
        let indexP = state.findIndex(item => item.pid == e.target.name);
        console.log("indexP ", indexP);
        if(e.target.name == "165432255560"){
        mediaList[indexP].key = e.target.value;
        }else {
            mediaList[indexP].details = e.target.value;
        }
        console.log("mediaList ", mediaList);
            setState(mediaList)
    
    }

    const handleChange = (e) =>{
        console.log("e ", e.target.name);
        console.log("e ", e.target.checked);
        let mediaList = [...state];
        paymentUpdate({pid:e.target.name,dstatus:(e.target.checked)? 1 : 0})
        let indexP = state.findIndex(item => item.pid == e.target.name);
        mediaList[indexP].dstatus = (e.target.checked)? 1 : 0;
        setState(mediaList)
        console.log("index ",indexP);
        
    }
    const updatePayment= () =>{
        paymentUpdate(state)
    }
  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={4}/></div>
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
                    <h2 class="h4">Payment Gateway Settings</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    <section id="payment_gateway_info">
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <form>
                        <div class="row">
                            <div class="col-md-12 mb-5">
                             <label for="email">Paypal Settings</label>
                                <div>
                                    <input class="form-control" id="first_name" type="text" placeholder="Enter your Paypal Email Address" value={state[1].key} name={state[1].pid} onChange={(e)=>inputHandleChange(e)}/>
                                </div>
                                <div class="mt-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="mySwitch" name={state[1].pid} checked={state[1].dstatus} onChange={(e)=>handleChange(e)} />
                                        <label class="form-check-label" for="mySwitch"></label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <label for="email">Bank/Swift Account Settings</label>
                                   <div>
                                    <textarea class="form-control" rows="5" id="comment" name={state[0].pid} placeholder="Enter your Bank account details i.e. Account number" value={state[0].details} onChange={(e)=>inputHandleChange(e)}></textarea>
                                   </div>
                                   <div class="mt-2">
                                       <div class="form-check form-switch">
                                           <input class="form-check-input" type="checkbox" id="mySwitch" name={state[0].pid} checked={state[0].dstatus} onChange={(e)=>handleChange(e)} />
                                           <label class="form-check-label" for="mySwitch"></label>
                                       </div>
                                   </div>
                               </div>
                            
                        </div>
                        
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button"  onClick={updatePayment}>Save</button>
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

export default Payment_settings