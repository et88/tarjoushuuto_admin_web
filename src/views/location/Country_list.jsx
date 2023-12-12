import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel';
import Sub_header from '../Sub_header';
import '../../components/loader.css';
import { useNavigate } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';




const Country_list = () => {
    let navigate = useNavigate();
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')
    const [state, setState] = useState([]);
    const [countryList, setcountryList] = useState([]);
    const [modalState, setModalState] = useState({ show: false });
    const [editModalState, setEditModalState] = useState({ show: false });
    const [newState, setNewState] = useState({ country_name: "", flag: "", mob_country_code: "" });
    const [editState, setEditState] = useState({ country: "", flag: "", mob_country_code: "", t_country_id: "" });
    const [otherStates,setOtherState] = useState({dstatus:"",activePage:1,rowsPerPage:5,page:0,total_count:0,onload:true});
  console.log("otherState ==== " , otherStates)
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })



useEffect(() => {
    getCountryList(0, true); // Call your function here
  }, [otherStates.rowsPerPage]);

    const getCountryList = (index=0,onLoad) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/country_list`;
        let sendData = {find:"",dstatus:otherStates.dstatus,limit:otherStates.rowsPerPage,indexValue:index};
        if(search!=null && search.length>0){
            sendData.find= search
        }
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            if(index == 0 && onLoad) {
                setOtherState({...otherStates,total_count:res.data.count})         

    }
            setState(res.data.output,{isLoading:false})
            setcountryList(res.data.output)


        }).catch((e) => {


        });
    }
    const handlePageChange = (event,newPage) =>{
        setOtherState({...otherStates,page:newPage})
        console.log("newPage ", newPage);
        getCountryList(newPage);
    }
    const handleChangeRowsPerPage = (event , newPage) => {
        console.log("event ", event.target.value);
        setOtherState({ ...otherStates, rowsPerPage: event.target.value })
         

    }

    const searchCountry = (e) => {
        console.log(e.target.value);
        let countryBackup = countryList;
        if (e.target.value != "") {
            let countryArray = [];
            countryBackup.map((item) => {
                if (item.country.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                    console.log(item.country.search(e.target.value));

                    countryArray.push(item)

                }
                setState(countryArray)
            })
        } else {
            setState(countryList)
        }
    }

    const inputHandleChange = (e) => {
        console.log("e", e);
        console.log("type", e.target.type);
        console.log("name", e.target.name);
        console.log("value", e.target.value);
        console.log("file", e.target.files);
        if (e.target.type == "file") {
            setNewState({ ...newState, [e.target.name]: e.target.files });
        } else {
            setNewState({ ...newState, [e.target.name]: e.target.value });
        }
    }

    const inputEditHandleChange = (e) => {
        console.log("e", e);
        console.log("type", e.target.type);
        console.log("name", e.target.name);
        console.log("value", e.target.value);
        console.log("file", e.target.files);
        if (e.target.type == "file") {
            setEditState({ ...editState, [e.target.name]: e.target.files });
        } else {
            setEditState({ ...editState, [e.target.name]: e.target.value });
        }
    }

    const newCountrysave = () => {
        try {
            if (newState.country_name != "") {
                let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/add_country`;
                let bodyFormData = new FormData()
                console.log("bb", newState);
                bodyFormData.append("country", newState.country_name)
                bodyFormData.append("mob_country_code", newState.mob_country_code)

                if (newState.flag != '') {
                    bodyFormData.append("country_flage", newState.flag[0]);
                }
                console.log("bb", bodyFormData);
                axios.post(full_api, bodyFormData, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Content-Type": "multipart/form-data",
                        // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",

                    }
                }).then((res) => {
                    console.log("res ", res);

                    setModalState({ show: false });
                    setNewState({ ...newState, country_name: "", flag: "" })

                    setTimeout(
                        getCountryList(0,true), 5000);
                    if (res) {
                        Swal.fire(
                            'Good job!',
                            ' Added Successfully !',
                            'success'
                        )
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',

                        })
                    }

                    // navigate('/categories')
                    // let newCategory = res.data.category;
                    //setState(state.concat([newCategory]))
                }).catch((e) => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',

                    })
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill fields!',

                })

            }
        } catch (e) {
            console.log(e);
        }
    }

    const deleteConfirm = (t_country_id) => {
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
            if (result.isConfirmed) {
                countryDelete(t_country_id)
            }
        })

    }

    const edit_country = (data) => {
        setEditState({ country: data.country, mob_country_code: data.mob_country_code, t_country_id: data.t_country_id });
        setEditModalState({ show: true })

    }

    const countryDelete = (t_country_id) => {
        try {
            if (t_country_id != "") {
                let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/delete_country_api`;
                let bodyFormData = { t_country_id: t_country_id }

                console.log("bb", bodyFormData);
                axios.post(full_api, bodyFormData, { headers: exportValue.headers }).then((res) => {
                    console.log("res ", res);



                    setTimeout(
                        getCountryList(0,true), 5000);
                    if (res) {
                        Swal.fire(
                            'Good job!',
                            ' Deleted Successfully !',
                            'success'
                        )
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',

                        })
                    }

                    // navigate('/categories')
                    // let newCategory = res.data.category;
                    //setState(state.concat([newCategory]))
                }).catch((e) => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',

                    })
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something went wrong!',

                })

            }
        } catch (e) {
            console.log(e);
        }
    }

    const newCountryModel = () => {
        setNewState({ country_name: "", flag: "", mob_country_code: "" });
        setModalState({ show: true })
    }

    const countryUpdate = () => {

        if (editState.country != "" && editState.t_country_id != "") {
            let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_country`;
            let bodyFormData = new FormData()
            console.log("bb", editState);
            bodyFormData.append("country", editState.country)
            bodyFormData.append("t_country_id", editState.t_country_id)
            bodyFormData.append("mob_country_code", editState.mob_country_code)

            if (editState.flag != undefined &&editState.flag != '') {
                bodyFormData.append("country_flage", editState.flag[0]);
            }
            console.log("bb", bodyFormData);
            axios.post(full_api, bodyFormData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Content-Type": "multipart/form-data",
                    // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",

                }
            }).then((res) => {
                console.log("res ", res);

                setEditModalState({ show: false });
                setEditState({ ...editState, country: "", flag: "" })

                setTimeout(
                    getCountryList(0,true), 5000);
                if (res) {
                    Swal.fire(
                        'Good job!',
                        ' Added Successfully !',
                        'success'
                    )
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',

                    })
                }

                // navigate('/categories')
                // let newCategory = res.data.category;
                //setState(state.concat([newCategory]))
            }).catch((e) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                })
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill fields!',

            })

        }

    }
    const searchUser = ( index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/country_find_name`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,country:""};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.country= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        
//    setState({ ...state,searchValue:res.data.title})
   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
setState(res.data.output,{isLoading:false})
setcountryList(res.data.output)

       
   
   

   }).catch((e) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
       console.log("----error:   ", e);
   })          
  }

const stateHandler = (e) => {
    // state[key] = value
    if (e.target.name == "stitle") {
      
            params.delete('search')
            search= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
            //   navigate({ search: params.toString() })

        }
//    setsearchFilters({ ...searchfilters, searchtitle:searchfilters.searchtitle})
    setOtherState({...otherStates,onload:true})
}
const filter=()=>{
    search=null
    params.delete('search')
    if (searchfilters.searchtitle !== "") {           
        params.append('search', searchfilters.searchtitle)
    }
    searchUser(0)
    // setState({ ...state, isLoading: true })
    navigate({ search: params.toString() })

}
React.useEffect(()=>{
    if (search) {
        setsearchFilters({...searchfilters,searchtitle:search})
    }



},[])

const changeActiveInactive =(data , status)=>{
    console.log("data ", data);
    let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/location_active_edit`;
    let sendData = {t_country_id:data.t_country_id,active:status};
    
    console.log("bb", sendData);
    axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
        console.log("res ", res);
        // console.log("state ", state); 
       
            let country_list = [...state];
            let indexT = country_list.findIndex(item => item.t_country_id == data.t_country_id);
           // data.dstatus = status;
           country_list[indexT].active = status;
           console.log("country_list ", country_list[indexT]);
           // transporters[data].dstatus = status;
            //
             setState(country_list) 
        
     
    }).catch((e) => {


    });
}


    return (
        <div>
            <Modal show={modalState.show} onHide={() => setModalState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>New Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="email">Country Name</label>
                            <input class="form-control" id="first_name" type="text" placeholder="Enter name" name="country_name" onChange={(e) => inputHandleChange(e)} required />
                            <span>*Please fill </span>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label for="email">Mobile country Code</label>
                            <input class="form-control" id="first_name" type="number" placeholder="Enter code" name="mob_country_code" onChange={(e) => inputHandleChange(e)} required />

                        </div>
                        <div class="col-md-12 mb-3">
                            <label for="email">Country Flag</label>
                            <input class="form-control" id="first_name" type="file" name="flag" onChange={(e) => inputHandleChange(e)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalState({ show: false })}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() =>
                            newCountrysave()
                        }>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editModalState.show} onHide={() => setEditModalState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="email">Country Name</label>
                            <input class="form-control" id="first_name" type="text" placeholder="Enter name" name="country" onChange={(e) => inputEditHandleChange(e)} required value={editState.country} />
                            <span>*Please fill </span>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label for="email">Mobile country Code</label>
                            <input class="form-control" id="first_name" type="number" placeholder="Enter code" name="mob_country_code" onChange={(e) => inputEditHandleChange(e)} required value={editState.mob_country_code} />

                        </div>
                        <div class="col-md-12 mb-3">
                            <label for="email">Country Flag</label>
                            <input class="form-control" id="first_name" type="file" name="flag" onChange={(e) => inputEditHandleChange(e)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditModalState({ show: false })}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() =>
                            countryUpdate()
                        }>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='row'>

               

                <div className='col-3'><Left_panel value={12}/></div>
            {state.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:


                <div className='col-9' style={{ marginLeft: "-60px" }}>

                    <Sub_header />

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
                                        <li className="breadcrumb-item active" aria-current="page">Country</li>
                                    </ol>
                                </nav>
                                <h2 className="h4">All Countries</h2>
                            </div>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="input-group me-2 me-lg-3 fmxw-400">
                                    <span className="input-group-text">
                                        <svg className="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Search Country" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)} />
                                </div>
                                <a className="btn btn-sm btn-gray-800 d-inline-flex align-items-center" onClick={() => newCountryModel()}>
                                    <svg className="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    New Country
                                </a>
                            </div>
                        </div>

                        <div className="card card-body border-0 shadow table-wrapper table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="border-gray-200">Flag</th>
                                        <th className="border-gray-200">Country Name</th>
                                        <th className="border-gray-200">Code</th>
                                        <th className="border-gray-200">Status</th>
                                        <th className="border-gray-200">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {state.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <a href="#" className="fw-bold">
                                                        <img src={"https://cdn.tarjoushuuto.fi/flags/" + item.country_flage} className="img-fluid country_flg" />
                                                    </a>
                                                </td>
                                                <td><span className="fw-bold"><a href="">{item.country}</a></span></td>
                                                <td><span className="fw-bold">{item.mob_country_code}</span></td>
                                                <td>{(item.active == 1) ? <span className="badge rounded-pill bg-success">Active</span> : <span className="badge rounded-pill bg-warning">Inactive</span>}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span className="icon icon-sm">
                                                                <span className="fa fa-ellipsis-h icon-dark"></span>
                                                            </span>
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu py-0">
                                                            {/* <a className="dropdown-item rounded-top" href="#"><span className="fa fa-eye me-2"></span>View Details</a> */}
                                                            <a className="dropdown-item" onClick={() => edit_country(item)}><span className="fa fa-edit me-2"></span>Edit</a>
                                                            {item.active==1?   <a class="dropdown-item text-danger rounded-bottom" onClick={()=>changeActiveInactive(item,0)} ><span class="fa  fa-eye-slash me-2"></span>Inactive</a>: <a class="dropdown-item text-danger rounded-bottom" onClick={()=>changeActiveInactive(item,1)} ><span class="fa  fa-eye-slash me-2"></span>Active</a>}
                                                            <a className="dropdown-item text-danger rounded-bottom" onClick={() => deleteConfirm(item.t_country_id)}><span className="fa  fa-trash me-2"></span>Remove</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                               
                            </table>
                            <TablePagination
                component="div"
                rowsPerPageOptions={[5,10,15,20,25,50,100]}
                count={otherStates.total_count}
                page={otherStates.page}
                onPageChange={handlePageChange}
                rowsPerPage={otherStates.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
               
                        />
                            {/* <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination mb-0">
                                        <li className="page-item">
                                            <a className="page-link" href="#">Previous</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">1</a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">4</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">5</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="fw-normal small mt-4 mt-lg-0">Showing <b>5</b> out of <b>25</b> entries</div>
                            </div> */}
                        </div>


                    </section>
                </div>
}
            </div>
        </div>

    )
}
export default Country_list