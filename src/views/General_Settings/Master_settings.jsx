import React, { useState, useEffect } from "react";
import axios from "axios";
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';
import Swal from 'sweetalert2'


export const Master_settings = () => {

    const [state, setState] = useState({ isLoading: true }, [{ details: "", pid: "", dstatus: 0 }, { key: "", pid: "", dstatus: 0 }]);
    const [stateAdmin, setStateAdmin] = useState([{ start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }]);

    const [stateTransporter, setStateTransporter] = useState([{ start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }, { start: 0, end: 0, commission: 0 }]);
    const [stateService, setStateService] = useState([{ commission: 0 }]);

    useEffect(() => {
        getCommissionListing();
    }, [])

    const getCommissionListing = () => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/payment_commission_api`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            setStateAdmin(res.data.output.admin);
            setStateTransporter(res.data.output.transporter)
            setStateService(res.data.output.service_charge)

        }).catch((e) => {


        });
    }

    const updateCommission = (type) => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/payment_commission_update_api`;
        let sendData = (type == 1) ? { list: stateAdmin } : (type==2)?{ list: stateTransporter }:{list:stateService};
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            if(res){
                Swal.fire(
                    'Success!',
                    'Updated Successfully !',
                    'success'
                  )
            }


        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })


        });
    }

    const handleChange = (e, index) => {
        let adminCList = [...stateAdmin]
        console.log("e =  ", e.target.name)
        console.log("value =  ", e.target.value)
        console.log("index =  ", index);
        console.log("adminCList =  ", adminCList[index]);
        // if (adminCList[index].start < e.target.value) {
        adminCList[index][e.target.name] = e.target.value;
        if (e.target.name == "end") {
            adminCList[index + 1].start = parseInt(e.target.value) + 1;
        }


        setStateAdmin(adminCList)
        // }
    }

    const transporterHandleChange = (e, index) => {
        let adminCList = [...stateTransporter]
        console.log("e =  ", e.target.name)
        console.log("value =  ", e.target.value)
        console.log("index =  ", index);
        console.log("adminCList =  ", adminCList[index]);
        // if (adminCList[index].start < e.target.value) {
        adminCList[index][e.target.name] = e.target.value;
        if (e.target.name == "end") {
            adminCList[index + 1].start = parseInt(e.target.value) + 1;
        }


        setStateTransporter(adminCList)
        // }
    }
    const handleChange1 = (e,index) => {
        // event.persist()
        let SerivceList = [...stateService]
        console.log("e =  ", e.target.name)
        console.log("value =  ", e.target.value)
        console.log("index =  ", index);
        console.log("adminCList =  ", SerivceList[index]);
        SerivceList[index][e.target.name] = e.target.value;
        setStateService(SerivceList)
     }

     function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
    
        React.useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    
        return windowDimensions;
    }
    
    const { height, width } = useWindowDimensions();
    
    return (
        <div>
            <div className='row'>
                <div className='col-3'>
                    <Left_panel value={2} />
                </div>

                <div className='col-9' style={{ marginLeft: "-60px" }}>
                    <Sub_header />
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
                                <h2 class="h4">Master Payment Settings</h2>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">

                            </div>
                        </div>

                    </section>

                    <section id="payment_gateway_info">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4 table-wrapper table-responsive">

                                    <h4>Admin Commission 
                                    <a data-bs-toggle="collapse" data-bs-target="#admin"><i class="fa fa-question-circle" aria-hidden="true"></i></a></h4>

                        <div id="admin" class="collapse">
                       <small>
                       Admin can set commission on shipments from here .. If Shipment price lies between Start and End Amount then Customer will have to pay the amount set by Admin as Admin Commission .. e.g. if admin set commission as USD1 for price between USD0 to USD101 customer will pay USD1 to Admin as Admin's Commission ..
                                    Admin can change its end amount and  commission amount anytime ..</small>    
                        </div>
                                                            <form>


                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Start</th>
                                                    <th>End</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} name="start" type="number" placeholder="Set amount" value={stateAdmin[0].start}  disabled required />
                                                    </td>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} name="end" type="number" placeholder="Set amount" value={stateAdmin[0].end} required onChange={(e) => handleChange(e, 0)} />
                                                    </td>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} name="commission" type="number" placeholder="Set amount" value={stateAdmin[0].commission} required onChange={(e) => handleChange(e, 0)} />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <input class="form-control" name="start" type="number" placeholder="Set amount" value={stateAdmin[1].start} disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateAdmin[1].end} required onChange={(e) => handleChange(e, 1)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateAdmin[1].commission} required onChange={(e) => handleChange(e, 1)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" name="start" type="number" placeholder="Set amount" value={stateAdmin[2].start} disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateAdmin[2].end} required onChange={(e) => handleChange(e, 2)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateAdmin[2].commission} required onChange={(e) => handleChange(e, 2)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" name="start" type="number" placeholder="Set amount" value={stateAdmin[3].start} disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateAdmin[3].end} required onChange={(e) => handleChange(e, 3)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateAdmin[3].commission} required onChange={(e) => handleChange(e, 3)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" name="start" type="number" placeholder="Set amount" value={stateAdmin[4].start} disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateAdmin[4].end} required onChange={(e) => handleChange(e, 4)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateAdmin[4].commission} required onChange={(e) => handleChange(e, 4)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" name="start" type="number" placeholder="Set amount" value={stateAdmin[5].start} disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="text" placeholder="Set amount" value="&infin;" disabled required />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateAdmin[5].commission} required onChange={(e) => handleChange(e, 5)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={() => updateCommission(1)}>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

            </div>
            
    </section>

    


   


                    <section id="payment_gateway_info">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4 table-wrapper table-responsive">
                                    <h4>Transporter Advance <a data-bs-toggle="collapse" data-bs-target="#transporter"><i class="fa fa-question-circle" aria-hidden="true"></i></a></h4>

<div id="transporter" class="collapse">
<small>
Admin can set Transporter Advance on shipments from here .. If Shipment price lies between Start and End Amount then Customer will have to pay the amount set by Admin as Transporter Advance .. e.g. if admin set Transporter Advance as USD1 for price between USD0 to USD101 customer will have to pay USD1 to Admin as Transporter Advance ..
            Admin can change end amount and transporter advance amount anytime ..</small>    
</div>
                                    <form>

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Start</th>
                                                    <th>End</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} id="first_name" type="number" placeholder="Set amount" disabled value={stateTransporter[0].start} />
                                                    </td>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} name="end" type="number" placeholder="Set amount" value={stateTransporter[0].end} onChange={(e) => transporterHandleChange(e, 0)} />
                                                    </td>
                                                    <td>
                                                        <input class={width>=800?"form-control":"master"} name="commission" type="number" placeholder="Set amount" value={stateTransporter[0].commission} onChange={(e) => transporterHandleChange(e, 0)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="number" placeholder="Set amount" value={stateTransporter[1].start} disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateTransporter[1].end} onChange={(e) => transporterHandleChange(e, 1)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateTransporter[1].commission} onChange={(e) => transporterHandleChange(e, 1)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="number" placeholder="Set amount" value={stateTransporter[2].start} disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateTransporter[2].end} onChange={(e) => transporterHandleChange(e, 2)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateTransporter[2].commission} onChange={(e) => transporterHandleChange(e, 2)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="number" placeholder="Set amount" value={stateTransporter[3].start} disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateTransporter[3].end} onChange={(e) => transporterHandleChange(e, 3)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateTransporter[3].commission} onChange={(e) => transporterHandleChange(e, 3)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="number" placeholder="Set amount" value={stateTransporter[4].start} disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="end" type="number" placeholder="Set amount" value={stateTransporter[4].end} onChange={(e) => transporterHandleChange(e, 4)} />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateTransporter[4].commission} onChange={(e) => transporterHandleChange(e, 4)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="number" placeholder="Set amount" value={stateTransporter[5].start} disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" id="first_name" type="text" placeholder="Set amount" value="&infin;" disabled />
                                                    </td>
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set amount" value={stateTransporter[5].commission} onChange={(e) => transporterHandleChange(e, 5)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={() => updateCommission(2)}>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="payment_gateway_info">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4">
                                    <h4>Service Charge <a data-bs-toggle="collapse" data-bs-target="#transporter"><i class="fa fa-question-circle" aria-hidden="true"></i></a></h4>

<div id="transporter" class="collapse">
<small>
Admin can set service charge on shipments from here .. Admin can charge on every transaction according to amount of payment as service charge .. e.g if admin set service charge as 5% then customer will have to pay 5% of payment to admin as service charge ..
            Admin can change service charge % anytime ..</small>    
</div>
                                    <form>

                                        <table class="table">
                                            <thead>
                                                <tr>
                                                
                                                    <th>Charge (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                   
                                                    <td>
                                                        <input class="form-control" name="commission" type="number" placeholder="Set percentage" value={stateService[0].commission} onChange={(e) => handleChange1(e,0 )} />
                                                    </td>
                                                </tr>
                                              
                                              
                                            </tbody>
                                        </table>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={() => updateCommission(3)}>Update</button>
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
