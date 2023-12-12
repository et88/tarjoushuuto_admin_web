import React, { useEffect, useState } from 'react'

import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import { useHistory, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import Axios from 'axios';
import exportValue from '../../apiconfig';
const Add_group_value = () => {
    let navigate = useNavigate()
    const { category_id,subcategory_id,attribute_id , attribute_type } =  useParams();
    console.log("attribute_id is ",attribute_id);
    console.log("attribute_type is ",attribute_type);
 
    // let history = useHistory();
    const [state, setState] = useState([
          {group_value:""},
          {attribute_type:""}
     ])
 
     useEffect(() => {
         group_detail(attribute_id)
     }, [])
 
     const group_detail = (attribute_id) => {
 
             let group_data = { attribute_id:attribute_id }
             console.log("grp",group_data)
     
             Axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/group_detail`, group_data , { headers: exportValue.headers }).then((result)=>{
     
                 console.log("attribute detaill is ",result);
                 state.isLoading = false;
                
                 if(result.data.output.length > 0){
                     let result_data = result.data.output[0];
                     console.log("result is result data is ",result_data.attribute_value);
                     if(result_data.attribute_value.length > 0){
                         setState(result_data.attribute_value)
                     } else {
                         setState([ 
                             {
                                 "group_id" : "",
                                 "group_value" : "",
                             }
                         ])
                     }
                     
                 } else {
                     setState([ 
                         {
                             "group_id" : "1649423981172",
                             "group_value" : "vik",
                         }, 
                         {
                             "group_id" : "1649423981173",
                             "group_value" : "paras",
                         }
                     ])
                 }
             })
         }
 
     console.log("state is ",state);
 
     const handleChange = (e, index) => {
           const { name, value } = e.target;
           const list = [...state];
           list[index][name] = value;
           setState(list)
     }
 
     const handleAddInput = () => {
         console.log("hi vikdf");
         setState([...state,{group_value:""}])
     }
 
     const handleRemoveInput = (index) => {
         const list = [...state]
         list.splice(index,1);
         setState(list);
     }
 
     const handleSubmit = () =>{
        // e.preventdefault()
         
         let group_detailes = {attribute_id:attribute_id,group_value:state};
 
         console.log("attributes details is ",group_detailes);
        
         Axios.post(exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_attribute_group`,  group_detailes , { headers: exportValue.headers }).then((result)=>{
                     console.log("result is i ",result);
                     state.isLoading = false
                    //  toast.configure()
                    //  toast(result.data.message) 
                    navigate(`/attributes/${subcategory_id}/${category_id}`);
         })
     }
  return (
    <div>
         <div className='row'>
                <div className='col-3'><Left_panel value={10}/></div>
             
                <div className='col-9' style={{ marginLeft: "-60px" }}>
                    <Sub_header />

                 
                    <div className='row' >
                        {/* <div className='col-1'></div> */}
                        <div className='col-10 mt-5'>
                            <div className='card'>
                                <div className='card-body'>
                                     <h2 class="h4 mt-2">Add Value</h2>
                                     {state.map((item,i) => {
                        return(
                                     <div className='row' key={i}>
                                        <div className='col-6 mt-4'>
                                            <small>Add Value</small>
                                            <input className='form-control'   onChange={e => handleChange(e, i)}
                               type="text"
                               name="group_value"
                               value={item.group_value || ''}/>
                                        </div>
                                        <div className='col-6 mt-5'>
                                        {state.length !== 1 &&
                                         <button className="btn btn-sm btn-gray-800 d-inline-flex align-items-center" onClick={() => handleRemoveInput(i)}   >
                                
                                 <span className="pl-2 capitalize" >Remove</span>
                               </button>
                             } 
                               {state.length -1 === i && 
                                <button className="btn btn-sm btn-gray-800 d-inline-flex align-items-center mx-3"  onClick={handleAddInput} >
                               
                               <span className="pl-2 capitalize" >Add</span>
                             </button>
                             } 
                                     
                             
                                        </div>
                                       
                                       
                                       

                                    </div> 
                                    )})}
                                </div>
                                
                            </div>
                            <button className="btn btn-sm btn-gray-800 d-inline-flex align-items-center mt-3 " onClick={handleSubmit}  >
                  
                    <span className="pl-2 capitalize" >Submit</span>
                   </button>
                        </div>
                        
                        {/* <div className='col-1'></div> */}

                    </div>

                    </div>
                    </div>
    </div>
  )
  }

export default Add_group_value