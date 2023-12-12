import React, { useState, useEffect } from "react";
import axios from "axios";
import { Notyf } from 'notyf';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import exportValue from "../apiconfig";
import Left_panel from './Left_panel';
import Sub_header from './Sub_header';
import EChartsReact from "echarts-for-react";
import { useTheme } from '@material-ui/core/styles';
import {useSelector, useDispatch } from "react-redux";
import { DashboardLists } from "../redux/actions/DashboardActions";
import {CanvasJSChart} from 'canvasjs-react-charts'
import { BarChart, XAxis , YAxis,Legend,Bar, CartesianGrid ,Tooltip,LineChart, Line,} from "recharts";
// import { Tooltip } from "react-bootstrap";
const Index = () => {
    const { palette } = useTheme()
    let navigate = useNavigate();
    const loginDetail = localStorage.getItem('admin_login');  
    console.log("e => ", loginDetail);
    if(loginDetail == null) {
        console.log(" not valid ");
       // window.location.href = '/login';
        //navigate('/login',{ replace: true })
    }
    const notyf = new Notyf();
    
    const [state, setState] = useState({admin:[{total_amount:""}],users_find_count:"", count_vehicle_lists:"", count_transporterList: "", count_shipment: "",count_shipment_bids:"",count_spamReport:"" , graph:[] ,week_amount:""});
    const [states,setStates] = useState({isLoading:true});
  const[dimensionState,setdimensionState] = useState({companyDetail:[]})
  const [setDate,setDateState] = useState({date:""})

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(DashboardLists())
    }, [])
   // dashboardData
    const getDashboardCount = useSelector((state)=> state.dashboardData.dashboardTotalCount)
  
    console.log("one",getDashboardCount);
    if(getDashboardCount && states.isLoading == true){
         setStates({isLoading:false})
        setState(getDashboardCount)
    }

    const GetDays = (d,Mention_today=false)=>{
        //Mention today mean the array will have today date 
        var DateArray = [];
        var days=d;
        for(var i=0;i<days;i++){
        if(!Mention_today && i==0){i=1;days+=1}
        var date = new Date();
        var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
        var day =last.getDate();
        var month=last.getMonth()+1;
        var year=last.getFullYear();
        const fulld = (Number(month)+'-'+Number(day)) // Format date as you like
        DateArray.push(fulld);
        // 
        }
        return DateArray.reverse().join("      ");
         }
        console.log("aa",GetDays(7)) //Will get the past 5 days formated YY-mm-dd
       

        
        const GetDays1 = (d,Mention_today=false)=>{
        //Mention today mean the array will have today date 
        var DateArray = [];
        var days=d;
        for(var i=0;i<days;i++){
        if(!Mention_today && i==0){i=1;days+=1}
        var date = new Date();
        var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
        var day =last.getDate();
        var month=last.getMonth()+1;
        var year=last.getFullYear();
        const fulld = (Number(year)+'-'+Number(month)+'-'+Number(day)) // Format date as you like
        DateArray.push(fulld);
        }
        return DateArray.reverse().join("        ");
        }
       console.log("aa",GetDays1(7)) //Will get the past 5 days formated YY-mm-dd

    // function formatDate(date){
    //     var dd = date.getDate();
    //     var mm = date.getMonth()+1;
    //     var yyyy = date.getFullYear();
    //     if(dd<10) {dd='0'+dd}
    //     if(mm<10) {mm='0'+mm}
    //     date = mm+'/'+dd+'/'+yyyy;
    //     return date
    //  }
    
    
    
    // function Last7Days () {
    //     var result = [];
    //     for (var i=0; i<7; i++) {
    //         var d = new Date();
    //         d.setDate(d.getDate() - i);
    //         result.push( formatDate(d) )
    //     }
    
    //     return(result.reverse().join("   "));
    //  }
    
    

    

      
    const dimension_detail = () =>{
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/company_info_api`;
        let sendData = {};
      
        axios.post(full_api, sendData, { headers: exportValue.headers }).then(res => {
          setdimensionState({...dimensionState,companyDetail:res.data.companyDetail});
        //   console.log("rnmmmmm", res);
        }).catch((e) => {
          // toast.configure()
           //toast.error("Some thing went wrong")
          console.log("----error:   ", e);
        })
      }
      React.useEffect(() => {
        dimension_detail();
    
       
       
      }, [])
      

   


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
const option = {
    grid: {
        left: '6%',
        bottom: '10%',
        right: '1%',
    },
    legend: {
        itemGap: 20,
        icon: 'circle',
        textStyle: {
            color: palette.text.secondary,
            fontSize: 13,
            fontFamily: 'Nunito',
        },
    },
    color: [
       '#050505',
        '#f0b87d'
       
    ],
    barMaxWidth: '10px',
    tooltip: {},
    dataset: {
        source: [
            ['Days','',''],
            [GetDays(7),state.graph_shipments,state.graph_users]
          
        ],
    },
    xAxis: {
        type: 'category',
        axisLine: {
            show: false,
        },
        splitLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: '#050505',
            fontSize: 13,
            justifyContent: 'space-between',
            
            fontFamily: 'Nunito',
        },
    },
    yAxis: {
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            // show: false
            lineStyle: {
                color: palette.text.secondary,
                opacity: 0.15,
            },
        },
        axisLabel: {
            color: palette.text.secondary,
            fontSize: 8,
            fontFamily: 'Nunito',
        },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
       
        {
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0],
            },
        },
        {
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0],
            },
        },
    ],
}
const option1 = {
   
        xAxis: {
          type: "category",
        //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        data:[GetDays1(7)]
        },
        color: [
            
             '#f0b87d'
            
         ],
        yAxis: {},
        series: [
       
            {
                type: 'line',
                data: [state.graph_payments],
            },
           
        ],
      }



      const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const { height, width } = useWindowDimensions();
const leftpanel =()=>{
    console.log("onclick");
    <Left_panel/>
}
  return (
    <div>
        
       <div className='row'>
      
        <div className='col-3'>
            <Left_panel value={0} />
            </div>
        <div className='col-9' style={{marginLeft:"-60px"}}>

       
        <Sub_header/>
        
    <section class="pt-5">
        <div class="row">
            <div class="col-12  col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-6 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-success rounded me-4 me-sm-0">
                                    <i class="fa fa-cube fa-2x" aria-hidden="true"></i>
                                </div>
                            </div>
                            
                            <div class="col-6 col-xl-7 px-xl-0">
                            <a href="/shipments">
                                <div class="d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0">Shipments</h2>
                                    <h3 class="fw-extrabold mb-2">{state.count_shipment}</h3>
                                </div>
                                </a>
                                <small class="d-flex align-items-center text-gray-500">
                                    {/* Last 3 months */}
                                </small> 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-secondary rounded me-4 me-sm-0">
                                    <i class="fa fa-2x fa-users" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-12 col-xl-7 px-xl-0">
                            <a href="/users">
                                <div class=" d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0">Users</h2>
                                    <h3 class="fw-extrabold mb-2">{state.users_find_count}</h3>
                                </div>
                                </a>
                                <small class="d-flex align-items-center text-gray-500">
                                    {/* Last 3 months */}
                                </small> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-4 mb-4">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-block d-xl-flex align-items-center">
                            <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                <div class="icon-shape icon-shape-info rounded me-4 me-sm-0">
                                    <i class="fa fa-2x fa-credit-card" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-12 col-xl-7 px-xl-0">
                            <a href="/payments">
                                <div class=" d-sm-block">
                                    <h2 class="h6 text-gray-400 mb-0"> Payments</h2>
                                   <h3 class="fw-extrabold mb-2"> {dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{state.admin[0].total_amount}</h3>
                                </div>
                                </a>
                                <small class="text-gray-500">
                                  {/* Last 3 months */}
                                </small> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
            <div class="row mb-3">
                   <div class="col mb-4">
                    <div class="card border-0 shadow">
                        <div class="card-header custom_heade d-flex flex-row align-items-center flex-0 border-bottom">
                            <div class="d-block">
                                <div class="h6 fw-normal text-gray mb-2">Summary <small>(last 7 days)</small></div>
                            </div>
                            <div class="d-block ms-auto">
                                <div class="d-flex align-items-center text-end mb-2">
                                    <span class="dot rounded-circle bg-gray-800 me-2"></span>
                                    <span class="fw-normal small">Shipments</span> &nbsp;
                                    <span class="dot rounded-circle bg-secondary me-2"></span>
                                    <span class="fw-normal small">Users</span>
                                </div>
                            </div>
                        </div>
                        <BarChart width={1000} height={350} data={
                            state.graph.map((sub)=>(
                                
                                {name:sub.date,Shipments:sub.shipment_count,Users:sub.user_count}
                            ))
                        } barSize={10} margin={{top:5,right:10,left:10,bottom:5}}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" scale="point" padding={{left:20 ,right:20}}/>
    <YAxis/>
    <Tooltip/>
    {/* <Legend/> */}
    {/* <CartesianGrid strokeDasharray='2'/>s */}
    <Bar dataKey="Shipments" barSize={20} fill='#050505'
        
      />
       <Bar dataKey="Users" barSize={20} fill='#f0b87d'
      />
  </BarChart>
                      
                    </div>
                </div>
                <div class="card bg-yellow-100 border-0 shadow ">
                        <div class="card-header d-sm-flex flex-row align-items-center flex-0">
                            <div class="d-block mb-3 mb-sm-0">
                                <div class="fs-5 fw-normal mb-2">Payments <small>(last 7 days)</small></div>
                                <div class="small mt-2"> 
                                    {/* <span class="fw-normal me-2">Last three months</span>                                     */}
                                    {/* <span class="text-success fw-bold">10.57%</span> */}
                                </div>
                            </div>
                            <div class="d-flex ms-auto">
                                <h2 class="fs-3 fw-extrabold">{dimensionState.companyDetail.map((sub)=>(
                                    sub.set_currency
                                   ))}{state.week_amount} <small>(last 7 days)</small></h2>
                            </div>
                        </div>
                        <div class="card-body p-2">
                       
                        <LineChart width={1000} height={350} data={
                            state.graph.map((sub)=>(
                                
                                {date:sub.date,Payments:sub.payment_count}
                            ))
                        } margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
   
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip/>
    
    <Line type="monotone" dataKey="Payments" stroke="#050505" />
  </LineChart>
                        <small style={{marginLeft:"290px"}} ></small>
                           
                        </div>
                    </div>
            </div>

            <section class="pt-1">
                <div class="row">
                    <div class="col-12 col-sm-6 col-xl-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body">
                                <div class="row d-block d-xl-flex align-items-center">
                                    <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                        <div class="icon-shape icon-shape-primary rounded me-4 me-sm-0">
                                            <i class="fa fa-truck fa-2x" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-7 px-xl-0">
                                    <a href="/transporters">
                                        <div class="d-sm-block">
                                            <h2 class="h6 text-gray-400 mb-0">Transporters</h2>
                                            <h3 class="fw-extrabold mb-2">{state.count_transporterList}</h3>
                                        </div>
                                        </a>
                                        <small class="d-flex align-items-center text-gray-500">
                                            {/* Last 3 months */}
                                        </small> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-xl-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body">
                                <div class="row d-block d-xl-flex align-items-center">
                                    <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                        <div class="icon-shape icon-shape-danger rounded me-4 me-sm-0">
                                            <i class="fa fa-2x fa-gavel" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-7 px-xl-0">
                                        <div class=" d-sm-block">
                                            <h2 class="h6 text-gray-400 mb-0">Bids</h2>
                                            <h3 class="fw-extrabold mb-2">{state.count_shipment_bids}</h3>
                                        </div>
                                        <small class="d-flex align-items-center text-gray-500">
                                            {/* Last 3 months */}
                                        </small> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-xl-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body">
                                <div class="row d-block d-xl-flex align-items-center">
                                    <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                        <div class="icon-shape icon-shape-info rounded me-4 me-sm-0">
                                            <i class="fa fa-2x fa-exclamation-triangle" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-7 px-xl-0">
                                    <a href="/spam_report">
                                        <div class=" d-sm-block">
                                            <h2 class="h6 text-gray-400 mb-0"> Spams</h2>
                                            <h3 class="fw-extrabold mb-2">{state.count_spamReport}</h3>
                                        </div>
                                        </a>
                                        <small class="text-gray-500">
                                          {/* Last 3 months */}
                                        </small> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            
            
           
                    

            </section>
            </div>
            </div>
    </div>
  )
}

export default Index