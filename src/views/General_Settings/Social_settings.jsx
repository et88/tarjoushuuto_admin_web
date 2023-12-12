import React, { useState, useEffect } from "react";
import axios from "axios";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import exportValue from "../../apiconfig";
import '../../components/loader.css';


const Social_settings = () => {
    const [state, setState] = useState({isLoading:true},[]);
    useEffect(() => {
        getSocialListing();


    }, [])

    const getSocialListing = () => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/social_media_list_api`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
             console.log("res ", res);           
            
             setState(res.data.media_list,{isLoading:false})

        }).catch((e) => {


        });
    }

    const socialMediaUpdate = (updateData) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/social_media_update_api`;
        let sendData = updateData;
         console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
             console.log("res ", res);           
            
            

        }).catch((e) => {


        });
    }

    const handleChange = (e) =>{
        console.log("e ", e.target.name);
        console.log("e ", e.target.checked);
        socialMediaUpdate({social_media_id:e.target.name,dstatus:(e.target.checked)? 1 : 0})
        let indexP = state.findIndex(item => item.social_media_id == e.target.name);
        state[indexP].dstatus = (e.target.checked)? 1 : 0;
        console.log("index ",indexP);
        
    }

const inputHandleChange = (e) => {
    console.log("e ", e.target.name);
    console.log("e ", e.target.value);
    let mediaList = [...state];
    let indexP = state.findIndex(item => item.social_media_id == e.target.name);
    console.log("indexP ", indexP);
    mediaList[indexP].media_url = e.target.value;
    console.log("mediaList ", mediaList);
        setState(mediaList)

}
const updateMedia = () =>{
    socialMediaUpdate(state)
}

  return (
    <div>
        <div className='row'>
            <div className='col-3'><Left_panel value={3}/></div>
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
                    <h2 class="h4">Social Settings</h2>
                </div>
                <div class="btn-toolbar mb-2 mb-md-0">
                    
                </div>
            </div>
            
    </section>

    

    <section id="social_info">
        <div class="row">
            <div class="col-12 col-xl-12">
                <div class="card card-body border-0 shadow mb-4">
                    <form>
                        <div class="row">
                            {state.map((item,index)=>{
                                return (
                            <div class="col-md-6 mb-3">
                             <label for="">{item.media_name}</label>
                                <div>
                                    <input class="form-control"  type="text" placeholder="Please Enter" name={item.social_media_id} onChange={(e)=>inputHandleChange(e)} value={item.media_url}/>
                                </div>
                                <div class="mt-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"  name={item.social_media_id} defaultChecked={item.dstatus} onChange={(e)=>handleChange(e)} />
                                        <label class="form-check-label" for="mySwitch"></label>
                                    </div>
                                </div>
                            </div>
                                )
                            })}
                            {/* <div class="col-md-6 mb-3">
                                <label for="">Facebook</label>
                                   <div>
                                       <input class="form-control" id="first_name" type="text" placeholder="Enter your Facebook Page ID" required />
                                   </div>
                                   <div class="mt-2">
                                       <div class="form-check form-switch">
                                           <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked />
                                           <label class="form-check-label" for="mySwitch"></label>
                                       </div>
                                   </div>
                            </div>
                            <div class="col-md-6 mb-3 mt-3">
                                <label for="">Youtube</label>
                                   <div>
                                       <input class="form-control" id="first_name" type="text" placeholder="Enter your Youtube Page ID" required />
                                   </div>
                                   <div class="mt-2">
                                       <div class="form-check form-switch">
                                           <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked />
                                           <label class="form-check-label" for="mySwitch"></label>
                                       </div>
                                   </div>
                            </div>
                            <div class="col-md-6 mb-3 mt-3">
                                <label for="">Twitter</label>
                                   <div>
                                       <input class="form-control" id="first_name" type="text" placeholder="Enter your Twitter Page ID" required />
                                   </div>
                                   <div class="mt-2">
                                       <div class="form-check form-switch">
                                           <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked />
                                           <label class="form-check-label" for="mySwitch"></label>
                                       </div>
                                   </div>
                            </div>
                            <div class="col-md-6 mb-3 mt-3">
                                <label for="email">Instagram</label>
                                   <div>
                                       <input class="form-control" id="first_name" type="text" placeholder="Enter your Instagram Page ID" required />
                                   </div>
                                   <div class="mt-2">
                                       <div class="form-check form-switch">
                                           <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked />
                                           <label class="form-check-label" for="mySwitch"></label>
                                       </div>
                                   </div>
                            </div> */}
                        </div>
                        
                        <div class="mt-3">
                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={updateMedia}>Save</button>
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

export default Social_settings