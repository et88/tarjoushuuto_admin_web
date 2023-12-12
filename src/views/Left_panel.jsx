import React from 'react'

import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { useParams } from 'react-router-dom';


const Left_panel = (props) => {
  let value = props.value
 // console.log("values",value)
 // console.log("props",props)
  let navigate = useNavigate();
  let loginDetail = localStorage.getItem('admin_login');
 // const [state, setState] = useState({ full_name: "" });
 
  //console.log("e => ", loginDetail);
  if(loginDetail == null) {
    navigate('/login')
  }

 
 
  // React.useEffect(() => {
  //   localStorage.setItem("count", JSON.stringify(menustate));
  // }, [menustate]);
  // React.useEffect(() => {
  //   setmenuState(JSON.parse(localStorage.getItem("count")));
  // }, []);
  // console.log("menustate",menustate)
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
    <>
   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
              <span className={width<=800?"navbar-toggler-icon mt-3":"d-none"}><i className="fa fa-bars" aria-hidden="true"></i></span>
            </button>
<nav id="sidebarMenu" className={width<=800?"sidebar d-lg-block  bg-gray-800 text-white collapse":"sidebar d-block  bg-gray-800 text-white collapse"} data-simplebar>
  <div className="sidebar-inner px-4 pt-3">
    <div className="p-3">
      {width<=800?
      <div className='row'>
        <div className='col-8'>
        <h4><a href="/">Admin Panel</a></h4>
        </div>
        <div className='col-2'></div>
        <div className='col-2'><i className='fa fa-close  close navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu"></i></div>
        </div>
      :<h4><a href="/">Admin Panel</a></h4>}
    </div>
    <div>
    <ul className="nav flex-column pt-3 pt-md-0">
      <li className={value==0?"nav-item  active ":"nav-item"}>
        <Link to="/" className="nav-link">
          <span className="sidebar-icon">
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
          </span> 
          <span className="sidebar-text">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item" >
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#settings_gen">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">General Setting</span>
          </span>
          <span className="link-arrow ">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==1 || value==2 || value==3 || value==4 || value==5 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="settings_gen" aria-expanded="false">
          <ul className="flex-column nav ">
            <li className={value==1?"nav-item active":"nav-item"} >
              <Link className="nav-link " to="/system_settings" >
                <span className="sidebar-text "  ><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> System Settings</span>
              </Link>
            </li>
            <li className={value==2?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/master_settings">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Master Settings</span>
              </Link>
            </li>
            <li className={value==3?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/social_settings">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Social Settings</span>
              </Link>
            </li>
            <li className={value==4?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/payment_settings">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Payment Settings</span>
              </Link>
            </li>
            <li className={value==5?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/smtp_settings">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> SMTP Email Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-111">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-cubes" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Shipments</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==6 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-111" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==6?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/shipments">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> All Shipments</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-1117">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-money" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Payment</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==7 || value==22 || value==23?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-1117" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==7?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/payments">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Shipment Payments</span>
              </Link>
              
            </li>
            <li className={value==22?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/admin_payments">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Admin Payment</span>
              </Link>
              
            </li>
            <li className={value==23?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/transporter_payments">
                <span className="sidebar-text"><i className="fa fa-angle-right icon_list" aria-hidden="true"></i> Transporter Payment</span>
              </Link>
              
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-112">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-truck" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Transporters</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==8 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-112" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==8?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/transporters">
                <span className="sidebar-text">All Transporters</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-113">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-users" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Users</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==9 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-113" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==9?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/users">
                <span className="sidebar-text">All Users</span>
              </Link>
            </li>
            {/* <li className="nav-item ">
              <Link className="nav-link" to="/users">
                <span className="sidebar-text">Deleted Users</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/users">
                <span className="sidebar-text">Suspended Users</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-114">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-paw" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Category</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==10 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-114" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==10?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/categories">
                <span className="sidebar-text">All Categories</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-115">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-diamond" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Vehicle Atrributes</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==11 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-115" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==11?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/vehicle_attributes">
                <span className="sidebar-text">Vehicle Atrributes</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-116">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-map" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Location</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==12 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-116" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==12?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/country_list">
                <span className="sidebar-text">Country List</span>
              </Link>
            </li>

          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-117">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Email Template</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==13 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-117" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==13?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/email_template">
                <span className="sidebar-text">Templates</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-1181">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-support" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Spam Report</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==14 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-1181" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==14?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/spam_report">
                <span className="sidebar-text">All Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-1182">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-support" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Support Tickets</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==15 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-1182" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==15?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/tickets">
                <span className="sidebar-text">Tickets</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      {/* <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-1183">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-support" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Reports</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className="multi-level collapse "
          role="list" id="leftmenubar-1183" aria-expanded="false">
          <ul className="flex-column nav">
            <li className="nav-item ">
              <Link className="nav-link" to="">
                <span className="sidebar-text">xxxxxxxxxxxx</span>
              </Link>
            </li>
          </ul>
        </div>
      </li> */}
      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-119">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-globe" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">Web Management</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==17 || value==18 || value==19 ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-119" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==19?"nav-item active":"nav-item"}>
              <a className="nav-link" href="/web_settings#header_banner">
                <span className="sidebar-text">Header Banner</span>
              </a>
            </li>
            <li className={value==19?"nav-item active":"nav-item"}>
              <a className="nav-link" href="/web_settings#sub_header_banner">
                <span className="sidebar-text">Sub Header Banner</span>
              </a>
            </li>
            <li className={value==19?"nav-item active":"nav-item"}>
              <a className="nav-link" href="/web_settings#video_box">
                <span className="sidebar-text">Video Box</span>
              </a>
            </li>
            <li className={value==19?"nav-item active":"nav-item"}>
              <a className="nav-link" href="/web_settings#footer_icon_box">
                <span className="sidebar-text">Footer Icons</span>
              </a>
            </li>
            <li className={value==17?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/home_content">
                <span className="sidebar-text">Home Content</span>
              </Link>
            </li>
            <li className={value==18?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/testimonial">
                <span className="sidebar-text">Testimonials</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li className="nav-item">
        <span
          className="nav-link  collapsed  d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse" data-bs-target="#leftmenubar-120">
          <span>
            <span className="sidebar-icon">
              <i className="fa fa-universal-access" aria-hidden="true"></i>
            </span> 
            <span className="sidebar-text">CMS Management</span>
          </span>
          <span className="link-arrow">
            <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
        </span>
        <div className={value==20  ?"multi-level collapse show":"multi-level collapse"}
          role="list" id="leftmenubar-120" aria-expanded="false">
          <ul className="flex-column nav">
            <li className={value==20?"nav-item active":"nav-item"}>
              <Link className="nav-link" to="/cms_settings">
                <span className="sidebar-text">CMS Management</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li role="separator" className="dropdown-divider mt-4 mb-3 border-gray-700"></li>
      
    </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Left_panel