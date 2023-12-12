import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from 'react-moment';
import TablePagination from '@mui/material/TablePagination';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Transporters = () => {
    let navigate = useNavigate();
    const search1 = window.location.search;
    const params = new URLSearchParams(search1);
    let search= params.get('search')
 
    const [state,setState] = useState([]);
    const [otherStates,setOtherState] = useState({dstatus:"",searchKeyword:"",activePage:1,rowsPerPage:10,page:0,total_count:0,onload:true});
    const [extraStates,setExtraStates] = useState({isLoading:true});
const [searchfilters, setsearchFilters] = React.useState({ searchtitle: "" })
const[dimensionState,setdimensionState] = React.useState({companyDetail:[]})



  const dimension_detail = () =>{
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/company_info_api`;
    let sendData = {};
  
    axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
      setdimensionState({...dimensionState,companyDetail:res.data.companyDetail});
      console.log("rnmmmmm", res);
    }).catch((e) => {
      // toast.configure()
       //toast.error("Some thing went wrong")
      console.log("----error:   ", e);
    })
  }
  React.useEffect(() => {
    dimension_detail();
    getTransporterList()
   
   
  }, [])

    useEffect(() => {
        getTransporterList();
    },[])

    useEffect(() => {
        getTransporterList();
    },[otherStates.dstatus])

    const getTransporterList = () => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/transport_list`;
        let sendData = {indexValue:otherStates.page,status:otherStates.dstatus,find:""};
        if(search!=null && search.length>0){
            sendData.find= search
        }
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            if(otherStates.onload){
                setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})
            }
            setState(res.data.output)
            setExtraStates({isLoading:false})
           
        }).catch((e) => {
        });
    }

    const searchTransport = (e) =>{
       // setOtherState({...otherStates,searchKeyword:e.target.value})
        getTransporterList(e.target.value);
    }
    const handlePageChange = (event,newPage) =>{
        setOtherState({...otherStates,page:newPage})
        console.log("newPage ", newPage);
        getTransporterList();
    }
    const handleChangeRowsPerPage = (event) => {
        console.log("event ", event);
    }
    const activeInactive = (data,status) => {
        console.log("data ", data);
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/transporter_edit`;
        let sendData = {transporter_id:data.transporter_id,dstatus:status};
        
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            console.log("state ", state); 
           let transporters = [...state];
           let indexT = transporters.findIndex(item => item.transporter_id == data.transporter_id);
          // data.dstatus = status;
          transporters[indexT].dstatus = status;
          console.log("trans ", transporters[indexT]);
          // transporters[data].dstatus = status;
           //
            setState(transporters) 
           // setOtherState({...otherStates,})
          
        }).catch((e) => {


        });

    }
    const searchUser = ( index=0) => {
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/transporter_find_name`;
            
        let transporter_data= { indexValue:index, limit:otherStates.rowsPerPage, dstatus:1,branch_name:""};
        // console.log("pv",state.title)
        if ( searchfilters.searchtitle) {
           transporter_data.branch_name= searchfilters.searchtitle;
         }
         console.log("transporter",transporter_data)
       
    axios.post(full_api,transporter_data, { headers: exportValue.headers }).then(res => {        

   console.log( "response123",res);
   if(index==0 && otherStates.onload) {
    setOtherState({...otherStates,total_count:res.data.dataCount,onload:false})         
}  
   setState( res.data.output );
     
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
   
    if (e.target.name == "stitle") {
      
            params.delete('search')
            search= null;
          setsearchFilters({ ...searchfilters, searchtitle: e.target.value })
           

        }

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

  return (
    <div>
        <div className='row' >
            <div className='col-3'><Left_panel value={8}/></div>
            {extraStates.isLoading==true?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:

            <div className='col-9' style={{marginLeft:"-60px"}}>
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
                            <li className="breadcrumb-item active" aria-current="page">Transporters</li>
                        </ol>
                    </nav>
                    <h2 className="h4">All Transporters</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="input-group me-2 me-lg-3 fmxw-400">
                        <span className="input-group-text">
                            <svg className="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" onClick={(e) => filter(e)}>
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" className="form-control" placeholder="Search Transporters" name="stitle" value={searchfilters.searchtitle} onChange={(e)=>stateHandler(e)}/>
                    </div>
                </div>
            </div>
            
            <section>
                <ul className="nav nav-tabs justify-content-end">
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:""})}>
                      <a className={"nav-link "+(otherStates.dstatus == "" ? "active" : "")} >All</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:1})}>
                      <a className={"nav-link "+(otherStates.dstatus == 1 ? "active" : "")} >Active</a>
                    </li>
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:2})}>
                      <a className={"nav-link "+(otherStates.dstatus == 2 ? "active" : "")} >Inactive</a>
                    </li>
                    {/* <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:4})}>
                      <a className={"nav-link "+(otherStates.dstatus == 4 ? "active" : "")} >Deleted</a>
                    </li> */}
                    <li className="nav-item" onClick={()=>setOtherState({...otherStates,dstatus:3})}>
                      <a className={"nav-link "+(otherStates.dstatus == 3 ? "active" : "")} >Suspeded</a>
                    </li>
                </ul>
            </section>
            <div className="card card-body border-0 shadow table-wrapper table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                         
                            <th className="border-gray-200">Date</th>		
                            <th className="border-gray-200">Transporters Name</th>	
                            <th className="border-gray-200">Payout Bal.</th>
                            <th className="border-gray-200">Status</th>
                            <th className="border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((item,index)=>{
                            return(
                        <tr>
                           
                            <td>
                                <span className="fw-normal"><Moment format="DD/MM/YYYY hh:mm" unix>{item.created}</Moment></span>
                            </td>                        
                            <td>
                            <div className="d-flex">
                                <div className="">
                               {!item.logo? <img src="../../../assets/img/image.png" className="rounded-circle" style={{width:"80px",height:"80px"}}/>:<img src={"https://cdn.tarjoushuuto.fi/web/"+item.logo} className="rounded-circle" style={{width:"80px",height:"80px"}}/> }
                                </div>
                                <div className="p-1">
                                <a href={"/transporter_detail/"+item.transporter_id} className="fw-bold text-info fw-700">
                                     {item.branch_name}
                                </a><br/>
                                    <small className="text-muted">{item.contact_no} </small>
                                </div>
                            </div>
                                
                            </td>
                            <td><span className="fw-bold"><a href="transporter_wallet.php">{dimensionState.companyDetail.map((sub)=>(sub.set_currency))}{item.transporter_wallet!="" && item.transporter_wallet!=undefined?item.transporter_wallet:0}</a></span></td>
                            <td>
                                {(item.dstatus == 1)?<span className="badge rounded-pill bg-success">Active</span>:(item.dstatus == 2) ? <span className="badge rounded-pill bg-warning">Inactive</span>:(item.dstatus == 3) ?<span className="badge rounded-pill bg-danger">Suspended</span>:<span className="badge rounded-pill bg-danger">Deleted</span>}
                                </td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="icon icon-sm">
                                            <span className="fa fa-ellipsis-h icon-dark"></span>
                                        </span>
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu py-0">
                                        {/* <a className="dropdown-item rounded-top" href="#"><span className="fa fa-eye me-2"></span>View/Update</a> */}
                        {(item.dstatus == 1)?
                                        <a className="dropdown-item rounded-top" onClick={()=>activeInactive(item,2)}>
                                            <span className="fa fa-eye-slash me-2"></span>Inactive User</a>:<a className="dropdown-item rounded-top" onClick={()=>activeInactive(item,1)}>
                                            <span className="fa fa-eye-slash me-2"></span>Active User</a>}
                                        <a className="dropdown-item text-danger rounded-top" onClick={()=>activeInactive(item,3)}><span className="fa fa-ban me-2"></span>Suspend User</a>
                                        <a className="dropdown-item text-danger rounded-bottom" onClick={()=>activeInactive(item,0)}><span className="fa  fa-trash me-2"></span>Remove</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                            )
                        })}
                                                    
                    </tbody>
                </table>
                <div >
                <TablePagination
                component="div"
                rowsPerPageOptions={[5,10]}
                count={otherStates.total_count}
                page={otherStates.page}
                onPageChange={handlePageChange}
                rowsPerPage={otherStates.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
               
    />
                   
                     {/* <Pagination
          activePage={otherStates.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange()}
        /> */}

                     {/* <nav aria-label=" ">
                    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </nav> */}
                {/* <CPagination
                      activePage={1}
                      pages={5}
                      onActivePageChange={(value) => {
                        handlePageChange(value == 0 ? value : value - 1);
                      }}
                      arrows={false}
                      align={"end"}
                    /> */}
                </div>
                <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
               
                  
                        {/* <ul className="pagination mb-0">
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
                    
                    <div className="fw-normal small mt-4 mt-lg-0">Showing <b>5</b> out of <b>25</b> entries</div> */}
                </div>
            </div> 
                    

    </section>

            </div>
}
        </div>
    </div>
  )
}

export default Transporters