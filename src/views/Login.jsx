import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf';
import exportValue from "../apiconfig";
const Login = () => {
    let navigate = useNavigate();
    const notyf = new Notyf();
    const [state, setState] = useState({ email: "", password: "" });


    const handleChange = (e) => {
        console.log("e => ", e.target.name);

        setState({ ...state, [e.target.name]: e.target.value })
    }
    const submitButton = (e) => {
        e.preventDefault()
        console.log("state => ", state);
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/admin_login_api`;
        let sendData = state;
        console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            console.log("res ", res);
            if (res.data.isValid) {
                localStorage.setItem('admin_login', JSON.stringify(res.data.adminDetail));
                navigate('/')
            }else {
                notyf.error("Email or password incorrct");
            }

        }).catch((e) => {


        });
    }
    return (
        <div>
            <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center form-bg-image" data-background-lg="assets/img/illustrations/signin.svg">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h1 className="mb-0 h3">Sign in to platform</h1>
                                </div>
                                <form action="#" className="mt-4" onSubmit={submitButton}>

                                    <div className="form-group mb-4">
                                        <label htmlFor="email">Your Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                            </span>
                                            <input type="email" className="form-control" onChange={handleChange} placeholder="example@company.com" name="email" autoFocus required />
                                        </div>
                                    </div>

                                    <div className="form-group">

                                        <div className="form-group mb-4">
                                            <label htmlFor="password">Your Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text" id="basic-addon2">
                                                    <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                                </span>
                                                <input className="form-control" name="password" type="password" onChange={handleChange} placeholder="Enter password" required />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-top mb-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="remember" />
                                                <label className="form-check-label mb-0" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                            <div><a href="./forgot-password" className="small text-right">Lost password?</a></div>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Sign In</button>
                                        {/* <a type="submit" href="index.php" className="btn btn-gray-800">Sign in</a> */}
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Login