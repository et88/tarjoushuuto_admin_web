//console.log("api config = ");
let detail = {};
let token = "";
if (localStorage.getItem('admin_login')) {
  detail = JSON.parse(localStorage.getItem('admin_login'));
}
//console.log("->< ", localStorage.getItem('loggedIn'));
//console.log("api detail = ",detail);
//let status = 0;

// if(token && token != '') { 
//   status = 1
// }

const exportValue = {   
 
      
    // host: 'http://localhost:3000',
    host:'https://backend.tarjoushuuto.fi',

          //  host: 'https://backend.equipload.com',


  version: 'v.1.0',
  api: 'query',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    key: 'E09F1280ghjghjg606C3BF43D882F479032F03B2C4172B795F997E03FA356604CA06A2C7090DBD6380454C39FD57BFCC6A24C712795021FB9501DBA54719285AFBC5AE5',
    AUTHORIZATIONKEYFORTOKEN: '',
    LOGINSTATUS: 0,
    DEVICEID: 1234567890,
    VERSION: 2.5,
    DEVICETYPE: 1,
    usertuid: (detail.admin_id) ? detail.admin_id : "",
    token: token
    //device_name:encoded      
  },
};


//console.log("api config => ");
export default exportValue;