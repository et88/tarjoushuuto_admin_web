import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Store } from '../src/redux/Store'

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Categories from './views/Category/Categories';
import Subcategories from './views/Category/Subcategories';
import Attributes from './views/Category/Attributes';
import Left_panel from './views/Left_panel';
import Index from './views/Index';
import Login from './views/Login';
import Forgot_password from './views/Forgot_password';
import Sub_header from './views/Sub_header';
import Country_list from './views/location/Country_list';
import { Master_settings } from './views/General_Settings/Master_settings';
import Payment_settings from './views/General_Settings/Payment_settings';
import Social_settings from './views/General_Settings/Social_settings';
import System_settings from './views/General_Settings/System_settings';
import Smtp_settings from './views/General_Settings/Smtp_settings';
import Shipments from './views/Shipments/Shipments';
import Shipment_detail from './views/Shipments/Shipment_detail';
import Payments from './views/Payments/Payments';
import Transporter_detail from './views/Transporter/Transporter_detail';
import Transporters from './views/Transporter/Transporters';
import Transporter_wallet from './views/Transporter/Transporter_wallet';
import Users from './views/Users/Users';
import User_detail from './views/Users/User_detail';
import Vehicle_attributes from './views/Vehicle/Vehicle_attributes';
import Email_template from './views/Email_template/Email_template';
import Edit_global_email_template from './views/Email_template/Edit_global_email_template';
import Edit_email_template from './views/Email_template/Edit_email_template';
import Spam_report from './views/Spam_Report/Spam_report';
import Tickets from './views/Support_tickets/Tickets';
import { Web_management } from './views/Web_Management/Web_management';
import Home_content from './views/Web_Management/Home_content';
import Cms_management from './views/CMS_Management/Cms_management';
import My_profile from './views/Profile/My_profile';
import Change_password from './views/Profile/Change_password';
import Models_pop from './views/Models_pop';
import Cms_edit from './views/CMS_Management/Cms_edit';
import Testimonials from './views/Web_Management/Testimonials';
import Vehicle_sub_attributes from './views/Vehicle/Vehicle_sub_attributes';

import Ck_email_template from './views/Ck_email_template';


import Admin_payments from './views/Payments/Admin_payments';
import Transporter_payments from './views/Payments/Transporter_payments';
import Add_group_value from './views/Category/Add_group_value';


function App() {
  return (
    <Provider store={Store}>
    <Router>
    <Routes>
      <Route exact path='/' element={<Index />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/forgot-password' element={<Forgot_password />} />

      <Route exact path='/categories' element={<Categories />} />
      <Route exact path='/subcategories/:category_id' element={<Subcategories />} />
      <Route exact path='/attributes/:subcategory_id/:category_id' element={<Attributes />} />
      <Route exact path='/addgroupvalue/:subcategory_id/:category_id/:attribute_id' element={<Add_group_value />} />

      
      <Route exact path='/left_panel' element={<Left_panel />} />
      <Route exact path='/sub_header' element={<Sub_header />} />
      <Route exact path='/country_list' element={<Country_list />} />
      <Route exact path='/master_settings' element={<Master_settings />} />
      <Route exact path='/payment_settings' element={<Payment_settings />} />
      <Route exact path='/social_settings' element={<Social_settings />} />
      <Route exact path='/system_settings' element={<System_settings />} />
      <Route exact path='/smtp_settings' element={<Smtp_settings />} />
      <Route exact path='/shipments' element={<Shipments />} />
      <Route exact path='/shipment_detail/:invoice_id' element={<Shipment_detail />} />
      <Route exact path='/payments' element={<Payments />} />
      <Route exact path='/admin_payments' element={<Admin_payments />} />
      <Route exact path='/transporter_payments' element={<Transporter_payments />} />

      <Route exact path='/transporter_detail/:transporter_id' element={<Transporter_detail />} />
      <Route exact path='/transporters' element={<Transporters/>} />
      <Route exact path='/transporter_wallet' element={<Transporter_wallet/>} />
      <Route exact path='/users' element={<Users/>} />
      <Route exact path='/user_detail/:user_id' element={<User_detail/>} />
      <Route exact path='/vehicle_attributes' element={<Vehicle_attributes/>} />
      <Route exact path='/vehicle_sub_attributes/:category_id' element={<Vehicle_sub_attributes/>} />

      <Route exact path='/email_template' element={<Email_template/>} />
      <Route exact path='/edit_global_email_template' element={<Edit_global_email_template/>} />
      <Route exact path='/edit_email_template/:email_template' element={<Edit_email_template/>} />
      <Route exact path='/spam_report' element={<Spam_report/>} />
      <Route exact path='/tickets' element={<Tickets/>} />
      <Route exact path='/web_settings' element={<Web_management/>} />
      <Route exact path='/home_content' element={<Home_content/>} />
      <Route exact path='/cms_settings' element={<Cms_management/>} />
      <Route exact path='/my_profile' element={<My_profile/>} />
      <Route exact path='/change_password' element={<Change_password/>} />
      <Route exact path='/models_pop' element={<Models_pop/>} />
      <Route exact path='/edit_cms/:cms_id' element={<Cms_edit/>} />
      <Route exact path='/testimonial' element={<Testimonials/>} />
      <Route exact path='/ckemail' element={<Ck_email_template />} />

 
    </Routes>
  </Router>
  </Provider>
  );
}

export default App;
