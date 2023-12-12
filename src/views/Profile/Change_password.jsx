import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'

const Change_password = () => {
    const [state, setState] = useState({ old_password: "", new_password: "", confirm_password: "" });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const password_change = (e) => {
        e.preventDefault();
        if (state.new_password == state.confirm_password) {
            let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/update_admin_password`;
            let sendData = state;

            console.log("bb", sendData);
            axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
                console.log("res ", res);
                if(!res.data.isPasswordChanged) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,

                })
            }else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: res.data.message,

                })

            }

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
                text: 'Password not match!',

            })
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-3'>
                    <Left_panel />
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
                                        <li class="breadcrumb-item active" aria-current="page">My Profile</li>
                                    </ol>
                                </nav>
                                <h2 class="h4">Welcome Admin!</h2>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">

                            </div>
                        </div>

                    </section>


                    <section id="generalinfo">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4">
                                    <form onSubmit={(e) => password_change(e)}>


                                        <h2 class="h5 my-4">Password Reset</h2>
                                        <div class="row">
                                            <div class="col-sm-6 mb-3">
                                                <div class="form-group">
                                                    <label for="address">Old Password</label>
                                                    <input class="form-control" id="address" type="text" required placeholder="Enter new password" name="old_password" onChange={(e) => handleChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6 mb-3">
                                                <div class="form-group">
                                                    <label for="address">New Password</label>
                                                    <input class="form-control" id="address" type="text" required placeholder="Enter new password" name="new_password" onChange={(e) => handleChange(e)} />
                                                </div>
                                            </div>
                                            <div class="col-sm-6 mb-3">
                                                <div class="form-group">
                                                    <label for="address">New Password again</label>
                                                    <input class="form-control" id="address" type="text" placeholder="Enter new password again" required name="confirm_password" onChange={(e) => handleChange(e)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save</button>
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

export default Change_password