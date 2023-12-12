import React, { useState, useEffect } from "react";
import Left_panel from './Left_panel'
import Sub_header from './Sub_header'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";

const Ck_email_template = () => {

    const { email_template } = useParams();

    const [state, setState] = useState({mail_format:"",title:""});
    const [editorState, editorsetState] = useState({editor:""});
const [otherStates,setOtherState] = useState({dstatus:"",searchKeyword:"",activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
   
    const [extraStates,setExtraStates] = useState({isLoading:true,editorLoaded:false});
    
    useEffect(() => {
        // getTemplateDetail();
         // setTimeout(editorUpload,15000
         //     )
     
       //  editorUpload()
 
         
     },[])


    return (
        <div>
        <div className='row'>
            <div className='col-3'>
            {/* <Left_panel value={13}/> */}
            </div>
            <div className='col-9' style={{ marginLeft: "-60px" }}>
            {/* <Sub_header/> */}
            <section>
            <div className="row">
                            <div className="col-12 col-xl-8">
                                <div className="card card-body border-0 shadow mb-4">
                                <form>
                                        <div className="row">
                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group">
                                                    <label for="address">Title</label>
                                                    <input className="form-control" id="address" type="text" placeholder="Your email subject" name="title"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-3">
                                                <div className="form-group" key="offer-editor">
                                                    <label for="address">Email Template</label>

<CKEditor
                id={"ck-editor-text"}
                editor={ClassicEditor}
                data="hello one"
                onReady={editor => {console.log('Editor is ready to use!', editor)}}    />
                </div>
                </div>
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

export default Ck_email_template