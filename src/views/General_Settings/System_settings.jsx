import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import exportValue from "../../apiconfig";
import Left_panel from '../Left_panel'
import Sub_header from '../Sub_header'
import '../../components/loader.css';

var FormData = require('form-data');
const System_settings = (props) => {
   
    let navigate = useNavigate();
    const [countryList, setcountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [state, setstate] = useState({});
    const [stateLoad, setstateLoad] = useState({isLoading:true});
    const [addimg, setAddimg] = useState({ showLogo: "", uploadLogo: "", showIcon: "", uploadIcon: "" });
    useEffect(() => {
        getCompanyDetail();


    }, [])

    const getCountryList = () => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/country_list`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("res ", res);           
            setcountryList(res.data.output)


        }).catch((e) => {


        });
    }

    const getStateList = (country_id) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/state_list`;
        let sendData = { t_country_id: country_id, limit: 1000 };
        //  console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("state ", res);           
            setStateList(res.data.output)


        }).catch((e) => {


        });
    }

    const getCityList = (t_state_id) => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/city_list`;
        let sendData = { t_state_id: t_state_id, limit: 10000 };
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            // console.log("city  ", res);           
            setCityList(res.data.output)


        }).catch((e) => {


        });
    }

    const getCompanyDetail = () => {


        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/company_info_api`;
        let sendData = {};
        // console.log("bb", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
              console.log("companyData ", res);
            if (res.data.companyDetail.length > 0) {
                let companyData = res.data.companyDetail[0];
                setAddimg({ ...addimg, showLogo: "https://cdn.tarjoushuuto.fi/web/" + companyData.logo,showIcon:(companyData.favicon != "")?"https://cdn.tarjoushuuto.fi/web/" + companyData.favicon :"" })
                getCountryList();
                setstate(companyData);
                setstateLoad({isLoading:false})
                getStateList(companyData.country)
                getCityList(companyData.state)
            }



        }).catch((e) => {


        });
    }

    const companySettingUpdate = (UpdateData) => {
        let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_company_api`;
        let sendData = { company_id: state.company_id, data: UpdateData };
        //console.log("sendData   ", sendData);
        axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
            //console.log("res ", res);        
            navigate('/system_settings')

        }).catch((e) => {

        });
    }

    const generalSettingUpdate = (e) => {

        //console.log("state  ", state);
        let generalInfo = { company_name: state.company_name, email: state.email, mob_number: state.mob_number, company_address: state.company_address, country: state.country, state: state.state, city: state.city, latitude: state.latitude, longitude: state.longitude }
        companySettingUpdate(generalInfo)

    }
    const System_setting_update = (e) => {
        let systemSetting = { google_map_key: state.google_map_key, time_format: state.time_format, date_format: state.date_format, set_weight: state.set_weight, set_distance: state.set_distance, set_dimension: state.set_dimension, set_currency: state.set_currency, set_time_zone: state.set_time_zone,chat_now:state.chat_now }
        console.log(systemSetting);
        companySettingUpdate(systemSetting)
        
    }

    const onChangeHandlerGeneral = (e) => {
       // console.log("e general name ",e.target.name);
         console.log("e general value ",e.target.type);
        const newdata = { ...state };
        newdata[e.target.name] = (e.target.type != "checkbox") ? e.target.value : e.target.checked;
        setstate(newdata);
    }

    const onChangeHandlerSystem = (e) => {

    }

    const onChangeLocationGeneral = (e) => {
         console.log("e general name ",e.target.name);
         console.log("e general value ",e.target.value);
        const newdata = { ...state };
        newdata[e.target.name] = e.target.value;
        setstate(newdata);
        if (e.target.name == "country") {            
            getStateList(e.target.value)
            setStateList([]);
            setCityList([]);
        }
        else if (e.target.name == "state") {
           
            getCityList(e.target.value);
            setCityList([])
        }
    }

    const onImageSelect = (e) => {
        console.log("event  ", e.target.name);
        if(e.target.name == "logo") {
        setAddimg({ ...addimg, showLogo: URL.createObjectURL(e.target.files[0]), uploadLogo: e.target.files[0] })
        }else if(e.target.name == "favicon") {
            setAddimg({ ...addimg, showIcon: URL.createObjectURL(e.target.files[0]), uploadIcon: e.target.files[0] })
        }

    }
    const systemLogoUpdate = () => {
        if (addimg.uploadLogo != "" || addimg.uploadIcon != "") {
            let full_api = exportValue.host + "/" + exportValue.version + "/" + exportValue.api + `/edit_company_logo_api`;
            let bodyFormData = new FormData()
            if(addimg.uploadLogo != "") {
                bodyFormData.append("fileImage", addimg.uploadLogo)
                bodyFormData.append("imageType", "logo");
            }else if(addimg.uploadIcon != "") {
                bodyFormData.append("fileImage", addimg.uploadIcon)
                bodyFormData.append("imageType", "favicon");
            }
            bodyFormData.append("company_id", state.company_id);

            // let sendData = {};
            console.log("bodyFormData ", bodyFormData);
            axios.post(full_api, bodyFormData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Content-Type": "multipart/form-data",
                    // "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",

                }
            }).then((res) => {
                console.log("res ", res);

                navigate('/system_settings')   

            }).catch((e) => {

            });
        }
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
                <div className='col-3'><Left_panel value={1}/></div>
            {stateLoad.isLoading==true?   <div class="lds-ring" ><div></div><div></div><div></div><div></div></div>:

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
                                <h2 class="h4">Company Settings</h2>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">

                            </div>
                        </div>

                    </section>

                    <section id="generalinfo">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4">
                                    <h2 class="h5 mb-4">General information</h2>
                                    <form>
                                        <div class="row">
                                            <div class="col-md-12 mb-3">
                                                <div>
                                                    <label for="first_name">Company Name</label>
                                                    <input class="form-control" type="text" placeholder="Enter your company name" required value={state.company_name} onChange={(e) => onChangeHandlerGeneral(e)} name="company_name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input class="form-control" id="email" type="email" placeholder="name@company.com" required value={state.email} onChange={(e) => onChangeHandlerGeneral(e)} name="email" />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <div class="form-group">
                                                    <label for="phone">Phone</label>
                                                    <input class="form-control" id="phone" type="number" placeholder="+12-345 678 910" required value={state.mob_number} onChange={(e) => onChangeHandlerGeneral(e)} name="mob_number" />
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="h5 my-4">Location</h2>
                                        <div class="row">
                                            <div class="col-sm-12 mb-3">
                                                <div class="form-group">
                                                    <label for="address">Address</label>
                                                    <input class="form-control" id="address" type="text" placeholder="Enter your home address" required value={state.company_address} onChange={(e) => onChangeHandlerGeneral(e)} name="company_address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4 mb-3">
                                                <label for="state">Country</label>
                                                <select class="form-select w-100 mb-0" id="state" name="country" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={state.country}>
                                                    <option>Select</option>
                                                    {countryList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_country_id}>{item.country}</option>
                                                        )
                                                    })}
                                                </select >
                                            </div>
                                            <div class="col-sm-4 mb-3">
                                                <label for="state">State</label>
                                                <select class="form-select w-100 mb-0" id="state" name="state" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={state.state}>
                                                    <option >Select</option>
                                                    {stateList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_state_id}>{item.state_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div class="col-sm-4 mb-3">
                                                <label for="state">City</label>
                                                <select class="form-select w-100 mb-0" id="state" name="city" aria-label="State select example" onChange={(e) => onChangeLocationGeneral(e)} value={state.city}>
                                                    <option>Select</option>
                                                    {cityList.map((item, index) => {
                                                        return (
                                                            <option value={item.t_city_id}>{item.city_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div class="col-sm-12 mb-3">
                                                <div class="form-group">
                                                    <label for="address">Google Map Location</label>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text">Lat/Long</span>
                                                        <input type="text" class="form-control" placeholder="Lat" value={state.latitude} onChange={(e) => onChangeHandlerGeneral(e)} name="latitude" />
                                                        <input type="text" class="form-control" placeholder="Long" value={state.longitude} onChange={(e) => onChangeHandlerGeneral(e)} name="longitude" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={(e) => generalSettingUpdate(e)}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section id="system_info">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4">
                                    <h2 class="h5 mb-4">System Settings</h2>
                                    <form >
                                        <div class="row">
                                            <div class="col-12 col-sm-6 mb-3">
                                                <label for="state">Default Time Zone</label>
                                                <select class="form-select w-100 mb-0" id="state" name="set_time_zone" aria-label="State select example" value={state.set_time_zone} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                   
                                                    <option value="Kwajalein">(GMT -12:00) Eniwetok, Kwajalein</option>
                                            <option value="Pacific/Midway">(GMT -11:00) Midway Island, Samoa</option>
                                            <option value="Pacific/Honolulu">(GMT -10:00) Hawaii</option>
                                            <option value="America/Anchorage">(GMT -9:00) Alaska</option>
                                            <option value="America/Los_Angeles">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
                                            <option value="America/Denver">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
                                            <option value="America/Tegucigalpa">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
                                            <option value="America/New_York">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
                                            <option value="America/Halifax">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
                                            <option value="America/St_Johns">(GMT -3:30) Newfoundland</option>
                                            <option value="America/Argentina/Buenos_Aires">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
                                            <option value="Atlantic/South_Georgia">(GMT -2:00) Mid-Atlantic</option>
                                            <option value="Atlantic/Azores">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
                                            <option value="Europe/Dublin">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
                                            <option value="Europe/Belgrade">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
                                            <option value="Europe/Minsk">(GMT +2:00) Kaliningrad, South Africa</option>
                                            <option value="Asia/Kuwait">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
                                            <option value="Asia/Tehran">(GMT +3:30) Tehran</option>
                                            <option value="Asia/Muscat">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
                                            <option value="Asia/Kabul">(GMT +4:30) Kabul</option>
                                            <option value="Asia/Yekaterinburg">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
                                            <option value="Asia/Kolkata" >(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
                                            <option value="Asia/Dhaka">(GMT +6:00) Almaty, Dhaka, Colombo</option>
                                            <option value="Asia/Krasnoyarsk">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                                            <option value="Asia/Brunei">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
                                            <option value="Asia/Seoul">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
                                            <option value="Australia/Darwin">(GMT +9:30) Adelaide, Darwin</option>
                                            <option value="Australia/Canberra">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
                                            <option value="Asia/Magadan">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
                                            <option value="Pacific/Fiji">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                                            <option value="Pacific/Fiji">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                                            <option value="Pacific/Fiji">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <label for="state">Default Currency Code</label>
                                                <select class="form-select w-100 mb-0" id="state" name="set_currency" aria-label="State select example" value={state.set_currency} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                   
                                                    <option value="USD" label="US dollar">USD</option>
                                                <option value="EUR" label="Euro">EUR</option>
                                                <option value="JPY" label="Japanese yen">JPY</option>
                                                <option value="GBP" label="Pound sterling">GBP</option>
                                                <option value="AED" label="United Arab Emirates dirham">AED</option>
                                                <option value="AFN" label="Afghan afghani">AFN</option>
                                                <option value="ALL" label="Albanian lek">ALL</option>
                                                <option value="AMD" label="Armenian dram">AMD</option>
                                                <option value="ANG" label="Netherlands Antillean guilder">ANG</option>
                                                <option value="AOA" label="Angolan kwanza">AOA</option>
                                                <option value="ARS" label="Argentine peso">ARS</option>
                                                <option value="AUD" label="Australian dollar">AUD</option>
                                                <option value="AWG" label="Aruban florin">AWG</option>
                                                <option value="AZN" label="Azerbaijani manat">AZN</option>
                                                <option value="BAM" label="Bosnia and Herzegovina convertible mark">BAM</option>
                                                <option value="BBD" label="Barbadian dollar">BBD</option>
                                                <option value="BDT" label="Bangladeshi taka">BDT</option>
                                                <option value="BGN" label="Bulgarian lev">BGN</option>
                                                <option value="BHD" label="Bahraini dinar">BHD</option>
                                                <option value="BIF" label="Burundian franc">BIF</option>
                                                <option value="BMD" label="Bermudian dollar">BMD</option>
                                                <option value="BND" label="Brunei dollar">BND</option>
                                                <option value="BOB" label="Bolivian boliviano">BOB</option>
                                                <option value="BRL" label="Brazilian real">BRL</option>
                                                <option value="BSD" label="Bahamian dollar">BSD</option>
                                                <option value="BTN" label="Bhutanese ngultrum">BTN</option>
                                                <option value="BWP" label="Botswana pula">BWP</option>
                                                <option value="BYN" label="Belarusian ruble">BYN</option>
                                                <option value="BZD" label="Belize dollar">BZD</option>
                                                <option value="CAD" label="Canadian dollar">CAD</option>
                                                <option value="CDF" label="Congolese franc">CDF</option>
                                                <option value="CHF" label="Swiss franc">CHF</option>
                                                <option value="CLP" label="Chilean peso">CLP</option>
                                                <option value="CNY" label="Chinese yuan">CNY</option>
                                                <option value="COP" label="Colombian peso">COP</option>
                                                <option value="CRC" label="Costa Rican colón">CRC</option>
                                                <option value="CUC" label="Cuban convertible peso">CUC</option>
                                                <option value="CUP" label="Cuban peso">CUP</option>
                                                <option value="CVE" label="Cape Verdean escudo">CVE</option>
                                                <option value="CZK" label="Czech koruna">CZK</option>
                                                <option value="DJF" label="Djiboutian franc">DJF</option>
                                                <option value="DKK" label="Danish krone">DKK</option>
                                                <option value="DOP" label="Dominican peso">DOP</option>
                                                <option value="DZD" label="Algerian dinar">DZD</option>
                                                <option value="EGP" label="Egyptian pound">EGP</option>
                                                <option value="ERN" label="Eritrean nakfa">ERN</option>
                                                <option value="ETB" label="Ethiopian birr">ETB</option>
                                                <option value="EUR" label="EURO">EUR</option>
                                                <option value="FJD" label="Fijian dollar">FJD</option>
                                                <option value="FKP" label="Falkland Islands pound">FKP</option>
                                                <option value="GBP" label="British pound">GBP</option>
                                                <option value="GEL" label="Georgian lari">GEL</option>
                                                <option value="GGP" label="Guernsey pound">GGP</option>
                                                <option value="GHS" label="Ghanaian cedi">GHS</option>
                                                <option value="GIP" label="Gibraltar pound">GIP</option>
                                                <option value="GMD" label="Gambian dalasi">GMD</option>
                                                <option value="GNF" label="Guinean franc">GNF</option>
                                                <option value="GTQ" label="Guatemalan quetzal">GTQ</option>
                                                <option value="GYD" label="Guyanese dollar">GYD</option>
                                                <option value="HKD" label="Hong Kong dollar">HKD</option>
                                                <option value="HNL" label="Honduran lempira">HNL</option>
                                                <option value="HKD" label="Hong Kong dollar">HKD</option>
                                                <option value="HRK" label="Croatian kuna">HRK</option>
                                                <option value="HTG" label="Haitian gourde">HTG</option>
                                                <option value="HUF" label="Hungarian forint">HUF</option>
                                                <option value="IDR" label="Indonesian rupiah">IDR</option>
                                                <option value="ILS" label="Israeli new shekel">ILS</option>
                                                <option value="IMP" label="Manx pound">IMP</option>
                                                <option value="INR" label="Indian rupee">INR</option>
                                                <option value="IQD" label="Iraqi dinar">IQD</option>
                                                <option value="IRR" label="Iranian rial">IRR</option>
                                                <option value="ISK" label="Icelandic króna">ISK</option>
                                                <option value="JEP" label="Jersey pound">JEP</option>
                                                <option value="JMD" label="Jamaican dollar">JMD</option>
                                                <option value="JOD" label="Jordanian dinar">JOD</option>
                                                <option value="JPY" label="Japanese yen">JPY</option>
                                                <option value="KES" label="Kenyan shilling">KES</option>
                                                <option value="KGS" label="Kyrgyzstani som">KGS</option>
                                                <option value="KHR" label="Cambodian riel">KHR</option>
                                                <option value="KID" label="Kiribati dollar">KID</option>
                                                <option value="KMF" label="Comorian franc">KMF</option>
                                                <option value="KPW" label="North Korean won">KPW</option>
                                                <option value="KRW" label="South Korean won">KRW</option>
                                                <option value="KWD" label="Kuwaiti dinar">KWD</option>
                                                <option value="KYD" label="Cayman Islands dollar">KYD</option>
                                                <option value="KZT" label="Kazakhstani tenge">KZT</option>
                                                <option value="LAK" label="Lao kip">LAK</option>
                                                <option value="LBP" label="Lebanese pound">LBP</option>
                                                <option value="LKR" label="Sri Lankan rupee">LKR</option>
                                                <option value="LRD" label="Liberian dollar">LRD</option>
                                                <option value="LSL" label="Lesotho loti">LSL</option>
                                                <option value="LYD" label="Libyan dinar">LYD</option>
                                                <option value="MAD" label="Moroccan dirham">MAD</option>
                                                <option value="MDL" label="Moldovan leu">MDL</option>
                                                <option value="MGA" label="Malagasy ariary">MGA</option>
                                                <option value="MKD" label="Macedonian denar">MKD</option>
                                                <option value="MMK" label="Burmese kyat">MMK</option>
                                                <option value="MNT" label="Mongolian tögrög">MNT</option>
                                                <option value="MOP" label="Macanese pataca">MOP</option>
                                                <option value="MRU" label="Mauritanian ouguiya">MRU</option>
                                                <option value="MUR" label="Mauritian rupee">MUR</option>
                                                <option value="MVR" label="Maldivian rufiyaa">MVR</option>
                                                <option value="MWK" label="Malawian kwacha">MWK</option>
                                                <option value="MXN" label="Mexican peso">MXN</option>
                                                <option value="MYR" label="Malaysian ringgit">MYR</option>
                                                <option value="MZN" label="Mozambican metical">MZN</option>
                                                <option value="NAD" label="Namibian dollar">NAD</option>
                                                <option value="NGN" label="Nigerian naira">NGN</option>
                                                <option value="NIO" label="Nicaraguan córdoba">NIO</option>
                                                <option value="NOK" label="Norwegian krone">NOK</option>
                                                <option value="NPR" label="Nepalese rupee">NPR</option>
                                                <option value="NZD" label="New Zealand dollar">NZD</option>
                                                <option value="OMR" label="Omani rial">OMR</option>
                                                <option value="PAB" label="Panamanian balboa">PAB</option>
                                                <option value="PEN" label="Peruvian sol">PEN</option>
                                                <option value="PGK" label="Papua New Guinean kina">PGK</option>
                                                <option value="PHP" label="Philippine peso">PHP</option>
                                                <option value="PKR" label="Pakistani rupee">PKR</option>
                                                <option value="PLN" label="Polish złoty">PLN</option>
                                                <option value="PRB" label="Transnistrian ruble">PRB</option>
                                                <option value="PYG" label="Paraguayan guaraní">PYG</option>
                                                <option value="QAR" label="Qatari riyal">QAR</option>
                                                <option value="RON" label="Romanian leu">RON</option>
                                                <option value="RON" label="Romanian leu">RON</option>
                                                <option value="RSD" label="Serbian dinar">RSD</option>
                                                <option value="RUB" label="Russian ruble">RUB</option>
                                                <option value="RWF" label="Rwandan franc">RWF</option>
                                                <option value="SAR" label="Saudi riyal">SAR</option>
                                                <option value="SEK" label="Swedish krona">SEK</option>
                                                <option value="SGD" label="Singapore dollar">SGD</option>
                                                <option value="SHP" label="Saint Helena pound">SHP</option>
                                                <option value="SLL" label="Sierra Leonean leone">SLL</option>
                                                <option value="SLS" label="Somaliland shilling">SLS</option>
                                                <option value="SOS" label="Somali shilling">SOS</option>
                                                <option value="SRD" label="Surinamese dollar">SRD</option>
                                                <option value="SSP" label="South Sudanese pound">SSP</option>
                                                <option value="STN" label="São Tomé and Príncipe dobra">STN</option>
                                                <option value="SYP" label="Syrian pound">SYP</option>
                                                <option value="SZL" label="Swazi lilangeni">SZL</option>
                                                <option value="THB" label="Thai baht">THB</option>
                                                <option value="TJS" label="Tajikistani somoni">TJS</option>
                                                <option value="TMT" label="Turkmenistan manat">TMT</option>
                                                <option value="TND" label="Tunisian dinar">TND</option>
                                                <option value="TOP" label="Tongan paʻanga">TOP</option>
                                                <option value="TRY" label="Turkish lira">TRY</option>
                                                <option value="TTD" label="Trinidad and Tobago dollar">TTD</option>
                                                <option value="TVD" label="Tuvaluan dollar">TVD</option>
                                                <option value="TWD" label="New Taiwan dollar">TWD</option>
                                                <option value="TZS" label="Tanzanian shilling">TZS</option>
                                                <option value="UAH" label="Ukrainian hryvnia">UAH</option>
                                                <option value="UGX" label="Ugandan shilling">UGX</option>
                                                <option value="USD" label="United States dollar">USD</option>
                                                <option value="UYU" label="Uruguayan peso">UYU</option>
                                                <option value="UZS" label="Uzbekistani soʻm">UZS</option>
                                                <option value="VES" label="Venezuelan bolívar soberano">VES</option>
                                                <option value="VND" label="Vietnamese đồng">VND</option>
                                                <option value="VUV" label="Vanuatu vatu">VUV</option>
                                                <option value="WST" label="Samoan tālā">WST</option>
                                                <option value="XAF" label="Central African CFA franc">XAF</option>
                                                <option value="XCD" label="Eastern Caribbean dollar">XCD</option>
                                                <option value="XOF" label="West African CFA franc">XOF</option>
                                                <option value="XPF" label="CFP franc">XPF</option>
                                                <option value="ZAR" label="South African rand">ZAR</option>
                                                <option value="ZMW" label="Zambian kwacha">ZMW</option>
                                                <option value="ZWB" label="Zimbabwean bonds">ZWB</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <label for="state">Default Dimension</label>
                                                <select class="form-select w-100 mb-0" id="state" name="set_dimension" aria-label="State select example" value={state.set_dimension} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                    <option value="M">M</option>
                                                    <option value="CM">CM</option>
                                                    <option value="INCHES">INCHES</option>

                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <label for="state">Default Distance Code</label>
                                                <select class="form-select w-100 mb-0" id="state" name="set_distance" aria-label="State select example" value={state.set_distance} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                    
                                                    <option value="KM" >KM</option>
                                            <option value="MILES" >MILES</option>
                                            <option value="CM" >CM</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <label for="state">Default Weight Code</label>
                                                <select class="form-select w-100 mb-0" id="state" name="set_weight" aria-label="State select example" value={state.set_weight} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                    <option value="KG">KG</option>
                                                    <option value="LBS">LBS</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <div class="form-group">
                                                    <label for="city">Date Format</label>
                                                    <select class="form-select w-100 mb-0" id="state" name="date_format" aria-label="State select example" value={state.date_format} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                        <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                                                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>

                                                        
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <div class="form-group">
                                                    <label for="city">Time Format</label>
                                                    <select class="form-select w-100 mb-0" id="state" name="time_format" aria-label="State select example" value={state.time_format} onChange={(e) => onChangeHandlerGeneral(e)}>
                                                    <option >Please Select </option>
                                                        <option value="12">12 Hours </option>
                                                        <option value="24">24 Hours</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                            <div class="form-group">
                                            <label for="city">Chat now</label>
                                                    </div>
                                            <div class="form-check form-switch">
                                                   
                                                    <input class="form-check-input" type="checkbox"  name="chat_now" defaultChecked={state.chat_now} onChange={(e)=>onChangeHandlerGeneral(e)} />
                                                    <label class="form-check-label" for="mySwitch"></label>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-12 mb-3">
                                                <div class="form-group">
                                                    <label for="city">Google Map Key</label>
                                                    <input class="form-control" id="city" type="text" placeholder="Google Map Key" name="google_map_key"  value={state.google_map_key} onChange={(e) => onChangeHandlerGeneral(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={(e) => System_setting_update(e)}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <section id="system_info">
                        <div class="row">
                            <div class="col-12 col-xl-12">
                                <div class="card card-body border-0 shadow mb-4">
                                    <h2 class="h5 mb-4">System Logo & Favicon</h2>
                                    <form>
                                        <div class="row">
                                            <div class="col-12 col-sm-6 mb-3">
                                                <div class="">
                                                    <label for="email" class="form-label">Logo</label>
                                                    <div>
                                                        <img src={addimg.showLogo} class="" style={{ width: "140px" }} />
                                                    </div>
                                                    <input type="file" class="form-control" id="email" placeholder="Enter email" name="logo" onChange={(e) => onImageSelect(e)} />
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 mb-3">
                                                <div class="">
                                                    <label for="email" class="form-label">Favicon</label>
                                                    <div>
                                                        <img src={addimg.showIcon} class="" style={{ width: "140px" }}/>
                                                    </div>
                                                    <input type="file" class="form-control" id="email" placeholder="Enter email" name="favicon" onChange={(e) => onImageSelect(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <button class="btn btn-gray-800 mt-2 animate-up-2" type="button" onClick={(e) => systemLogoUpdate(e)}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section> */}

                                                
                </div>
}                             
            </div>
                                                
        </div>
    )
}

export default System_settings