import React, { useState, useEffect } from "react";

import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";

import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
// import {CKEditor} from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKEditor from "react-ckeditor-component";
import { CKEditor } from 'ckeditor4-react';
import { height, style } from "@mui/system";


const Edit_email_template = () => {
    const { email_template } = useParams();
let flagCheck = true;
const editorConfiguration = {
    toolbar: {
        items: [
            'heading', '|',
            'fontfamily', 'fontsize', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
            'link', '|',
            'outdent', 'indent', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'code', 'codeBlock', '|',
            'insertTable', '|',
            'uploadImage', 'blockQuote', '|',
            'undo', 'redo'
        ],
        shouldNotGroupWhenFull: true
    },
    image: {
        toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
        ]
    }
};

let config = {
   // extraPlugins: [DNXCustomUploadAdapterPlugin],
    table: {
      customClass: ["ui", "table", "celled"], // Important!!! need to be array
    },
    image: {
      customClass: ["ui", "fluid", "image"], // Use whatever class names defined in your theme
    },
    toolbar: {
    toolbar: [
      //customize your toolbar
      'heading', '|',
      'alignment', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'bulletedList', 'numberedList', 'todoList',
      '-', // break point
      'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
      'code', 'codeBlock', '|',
      'insertTable', '|',
      'outdent', 'indent', '|',
      'uploadImage', 'blockQuote', '|',
      'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true
},
    link: {
      decorators: {
        addTargetToExternalLinks: {
          mode: "automatic",
          callback: (url) => /^(https?:)?\/\//.test(url),
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
  }
  let ckConfig = {
    
    minHeight:500,
  
    
  }
    const [state, setState] = useState({mail_format:"",title:""});
    const [editorState, editorsetState] = useState({editor:""});
const [otherStates,setOtherState] = useState({dstatus:"",searchKeyword:"",activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   
    const [extraStates,setExtraStates] = useState({isLoading:false,editorLoaded:false});


    useEffect(() => {
        if(flagCheck){
            flagCheck = false;
       // console.log('useEffect ==> ');
        
            getTemplateDetail();
        }
        // setTimeout(editorUpload,15000
        //     )
    
       // editorUpload()

        
    },[])

    const editorUpload = () => {
        console.log('lodeddd');
        // const editor = (
        //     <CKEditor
        //         id={"ck-editor-text"}
        //         editor={ClassicEditor}
        //         data={state.mail_format}
        //         onReady={editor => {console.log('Editor is ready to use!', editor)}}
        //     />
        // )
       
        //  editorsetState({editor: editor})
    }

    const getTemplateDetail = () => {
        
        
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/detail_email`;
        let sendData = {mail_id:email_template};
       
       // console.log("bb113", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
           // console.log("res ", res);
           
                
            if(res.data.output.length == 1) {
                setState(res.data.output[0])
            }
            
            //setExtraStates({...extraStates,editorLoaded:true})
            
           
            

        }).catch((e) => {


        });
    }

    const handleChange = (e) => { 

        setState({...state,[e.target.name]:e.target.value})
    }

    const templateUpdate = () => {
        
        
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/update_email`;
        let sendData = state;
       
        console.log("bb update ", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: "Updated successfully",

            })
                
            
            setExtraStates({...extraStates,isLoading:false})
           
            

        }).catch((e) => {


        });
    }

    const handle_one = (e, editor) =>{
       // console.log(" handle_one ");
       // console.log(" handle_one ", editor.getData());
       const newdata = { ...state };
       console.log("1 newdata ", newdata);
      
       newdata.mail_format = editor.getData();
      //  console.log("2= newdata ", newdata);
       setState(newdata);

    }

    function onBlur(evt) {
       // console.log("onBlur event called with event info: ", evt.editor.getData());

       // const newdata = { ...state };
      //  console.log("1 newdata ", newdata);
       
       // newdata.mail_format = evt.editor.getData();
       let editorData = evt.editor.getData();
        // console.log("editorData ", editorData);
         setState((prevState) => ({...prevState,mail_format:editorData}))
       // setState(newdata);
      }
    
     const afterPaste = (evt)=> {
        console.log("afterPaste event called with event info: ", evt);
      }

    return (
        <div>
            <div className='row'>
                <div className='col-3'>
                <Left_panel value={13}/>
                </div>
                <div className='col-9' style={{ marginLeft: "-60px" }}>
                <Sub_header/>
                    <section>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                            <div className="d-block mb-4 mb-md-0">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <svg className="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Email Templates</li>
                                    </ol>
                                </nav>
                                <h2 className="h4">Email Template</h2>
                            </div>
                            <div className="btn-toolbar mb-2 mb-md-0">

                            </div>
                        </div>

                    </section>


                    <section id="generalinfo">
                        <div className="row">
                            <div className="col-12 col-xl-8">
                                <div className="card card-body border-0 shadow mb-4">
                                  
                                        <div className="row">
                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group">
                                                    <label for="address">Title</label>
                                                    <input className="form-control" id="" type="text" placeholder="Your email title" name="title" value={state.title} onChange={(e)=>handleChange(e)}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-3">
                                                <div className="" key="offer-editor">
                                                    <label for="address">Email Template</label>
                                                    {/* <textarea className="form-control" value={state.mail_format}></textarea> */}
                                                    {/* <div id="editor"></div> */}
                                                    {/* <CKEditor
                    editor={ ClassicEditor }
                    onChange={ ( event, editor ) => console.log( { event, editor } ) }
                    
                    data="<p>Hello from CKEditor 5's decoupled editor!</p>"
                   
                /> */}


{/* {editorState.editor} */}


                                                                    {/* <CKEditor
                                                                     editor={ ClassicEditor }
                                                                     data = {state.mail_format}
                                                                    config={ config }
                                                                  
                                                                   
                                                                   
                                                                    onChange={ ( event, editor ) => handle_one(  event, editor  ) }
                                                                  
                                                                    onReady={editor => {console.log('Editor is ready to use!', editor)}}    /> */}

                                                                    {/* <CKEditor
        activeClass="p10"
        config={config}
        content={state.mail_format}       
        events={{            
            "change":onBlur
        }}
                                                               
             />                                                */}
{(state.mail_format != "")?
<CKEditor
 
 name="mail_format"
                config={ckConfig}

                initData={state.mail_format}
                onInstanceReady={ (ed) => {
                    //ed.editor.setData(<p>hello 123</p>)
                   // console.log("ready=>   ",ed.editor)
                } }
                onChange={(e)=>{onBlur(e)}}
                onCustomEvent={ ( { editor } ) => {
                   // console.log(editor)
                }}
                style={ { borderColor: 'grey',height:"100%" } }
                readOnly={false}
                type="classic"
            /> :""
                                                          
                                                                    
            }                                               
                                                           
                                                              
{/* <div className={"w-64"} id={"ck-editor-text"}>
                                                            {editorState.editor}
                                                                </div> */}

                                                          
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={templateUpdate}>Save</button>
                                        </div>
                                   
                                </div>
                            </div>

                            <div className="col-12 col-xl-4">
                                <div className="card card-body border-0 shadow mb-4">
                                    <form>
                                        <div className="row">
                                            <h4>Shortcodes</h4>
                                            <hr />
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Shortcode</th>
                                                        {/* <th>Use</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@OTP@</span>
                                                        {/* <div>hello1</div> */}
                                                        </td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@USERNAME@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@SHIPMENT_NAME@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@TRANSPORTER_NAME@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@PICKUP_ADDRESS@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@DELIVERY_ADDRESS@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@NEWQUOTE_AMOUNT@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@PAID_TRANSPORTER_AMOUNT@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@PAID_SYSTEMCOMMISSION_AMOUNT@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@PAID_SERVICE_CHARGE_AMOUNT@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@PAID_TOTAL_AMOUNT@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@COMPANY_NAME@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@SHIPMENT_STATUS@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><span className="badge rounded-pill bg-info fs-7 p-2">@SHIPMENT_ID@</span></td>
                                                        {/* <td>OTP code</td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
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
// window.ClassicEditor=ClassicEditor;
export default Edit_email_template