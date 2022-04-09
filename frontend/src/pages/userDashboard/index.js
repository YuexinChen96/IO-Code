import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';

import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ReactEcharts from 'echarts-for-react';

import axios from 'axios';

import {//dashboard组件
    DashboardWrapper, DashboardNavigator, DashboardLogo, DashboardBox1, DashboardBox2,
    TabBar,
    Boxcircle, Boxcircle2,
    ContentWrapper,
    WelcomeWrapper, WelcomeThreeLines, WelcomeText,
    SelectWrapper, BoxWrapper,
    Context1,
    GraphWrapper, BottomWrapper,
    BottomLeft,
    Box, Box1, Box2, BoxContent, BoxText1, BoxText2, 
    SelectBox, SelectButton, SelectText, 
    GraphContextWrapper, GraphContext, GraphGraph,
    LeftTitleWrapper, BillContextWrapper, PlanTextWrapper, PlanText, BillContent, ColorRed,
    ChangePlanButton
} from './style';

function Dashboard() {
    // temp variables
    const nmi = '2001010596';//;"2001010418"
    const start_time = '2021-11-01' ;//'2021-5-1';
    const end_time= "2021-11-20";//'2021-5-15';]

    //initial const variables

    const NAME_MONTH = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const init_emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };

    //initial all state variables
    const [nmi_id, setNMI] = useState(nmi);
    const [rangeClicked, setRangeClicked] = useState(false);
    const [usageEList, setUsageEList] = useState([]);
    const [usageBlist, setUsageBList] = useState([]);
    const [costList, setCostList] = useState([]);
    const [option, setOption] = useState({});

    // const [startDate, setStartDate] = useState(new Date(start_time));
    const [startDate, setStartDate] = useState(start_time.split('-')[2] + ' ' + NAME_MONTH[parseInt(start_time.split('-')[1])-1]);

    // const [endDate, setEndDate] = useState(new Date(end_time));
    const [endDate, setEndDate] = useState(end_time.split('-')[2] + ' ' + NAME_MONTH[parseInt(end_time.split('-')[1])-1]);


    const[date, setDate] = useState([new Date(), new Date()]);
    const [selectionRange, setSelectionRagne] = useState({startDate: date[0], endDate: date[1], key:'selection'});

    const [billList, setBillList] = useState([]);

    const [totalCharge, setTotalCharge] = useState(0);
    const [avgCharge, setAvgCharge] = useState(0);
    const [totalConsumption, setTotalConsumption] = useState(0);
    const [avgConsumption, setAvgConsumption] = useState(0);
    const [avgConsumptionDay, setAvgConsumptionDay] = useState(0);
    const [currentPlan, setCurrentPlan] = useState('');

    const init_today = new Date()
    var todayString = init_today.getDate() + ' ' + NAME_MONTH[init_today.getMonth()] + ' ' + init_today.getFullYear();
    const [today, setToday] = useState(todayString);
    // const [today, setToday] = useState(new Date());

    const [emphasisStyle, setEmphasisStyle] = useState(init_emphasisStyle);
    
    // Change Plan Button - Open Our Plans in iO Energy Website in the same tab
    const handleChangePlanClick = () => {
        window.open("https://www.ioenergy.com.au/OurPlans/", "_self");
    };

    // Handle whether new range is clicked.
    const handleRangeClick = () => {
        setRangeClicked(!rangeClicked);
    };

    // Select date range in the calendar
    const handleSelect = (date) => {
        const new_range = {
            startDate: date.selection.startDate,
            endDate: date.selection.endDate,
            key: 'selection',
        };
        setSelectionRagne(new_range);
    };

    // Update all data on User Consumption page.
    // console.log("HandleUIupdate defined")
    const handleUIupdate = (init, start_date, end_date) => {
        
        console.log(init);

        if (!init) {
            console.log('initialize');
        } 
        else {
            console.log('request');

            start_date = selectionRange.startDate.getFullYear().toString()+'-'+ (selectionRange.startDate.getMonth()+1).toString() +'-' + selectionRange.startDate.getDate().toString();

            end_date = selectionRange.endDate.getFullYear().toString() + '-'+ (selectionRange.endDate.getMonth()+1).toString() + '-'+ selectionRange.endDate.getDate().toString(); 


        }
        
        const data = {'nmi_id': nmi_id, 'start':start_date, 'end':end_date};

        console.log(selectionRange);
        console.log(data);

        // send request
        axios.post('http://ec2-13-210-76-1.ap-southeast-2.compute.amazonaws.com:8000/page1/', data).then((res) => {
            const result = res;
            console.log(result);

            setOption(
                {
                    legend: {
                        data: ['Cost', 'Usage', 'Solar'],
                        left: '10%',
                    },
                    tooltip : {
                        trigger : 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        left: '5%',
                        bottom: '10%',
                        right: '5%',
                    },
                    toolbox: {
                        feature: {
                            dataView: { show: true, readOnly: true },
                            restore: { show: false },
                            saveAsImage: { show: true }
                        }
                    },
                    xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                        alignWithLabel: true
                        },
                        data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
                        '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
                    }
                    ],
                    yAxis: [
                    {
                        type: 'value',
                        name: 'Usage',
                        min: -res.data.graph_usage_max,
                        max: res.data.graph_usage_max,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: '#81F1C5'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Cost',
                        min: -res.data.graph_abscost_max,
                        max: res.data.graph_abscost_max,
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: '#FF127F'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} $'
                        }
                    },
                    {}
                    ],
                    series: [
                    {
                        name: 'Usage',
                        type: 'bar',
                        stack: 'one',
                        data: res.data.avg_consumption_hour,
                        emphasis: emphasisStyle,
                        itemStyle: {
                            normal: {
                                color: '#81F1C5',
                                borderRadius: '10%',
                            }
                        },
                    },
                    {
                        name: 'Cost',
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        data: res.data.avg_charge_hour,
                        itemStyle: {
                            normal: {
                                color: '#FF127F',
                            }
                        },
                    },
                    {
                        name: 'Solar',
                        type: 'bar',
                        stack: 'one',
                        data: res.data.avg_feedin_hour,
                        emphasisStyle: emphasisStyle,
                        itemStyle: {
                            normal: {
                                color: '#FFFF00',
                                borderRadius: '10%',
                            }
                        },
                    }
                    ],
                });
            
            setAvgCharge(res.data.avg_charge);
            setAvgConsumption(res.data.avg_consumption_hour_avg);
            setAvgConsumptionDay(res.data.avg_consumption_day_avg);
            setTotalCharge(res.data.sum_charge);
            setTotalConsumption(res.data.sum_consumption);
            setCurrentPlan(res.data.current_plan);
        })
        
        // handle rangeClick and display on title
        if (init){
            setRangeClicked(!rangeClicked);
            setStartDate(selectionRange.startDate.getDate().toString() + ' ' + NAME_MONTH[selectionRange.startDate.getMonth()]);
            setEndDate(selectionRange.endDate.getDate().toString() + ' ' + NAME_MONTH[selectionRange.endDate.getMonth()]);

        }
    };
    
    //initialize
    // console.log("handleUIupdate initialised")\
    useEffect(()=>{handleUIupdate(false, start_time, end_time);}, []);
    // handleUIupdate(false, start_time, end_time);
    // console.log("111111111111111111111111111111111111111111111")
    //const greeting = 'Hello Function Component!';
    return (
        <DashboardWrapper>
            <DashboardNavigator>
                <DashboardLogo>
                </DashboardLogo>
                <DashboardBox1>
                    <Boxcircle>
                    </Boxcircle>
                </DashboardBox1>
                <Link to='/dashboard2'>
                <DashboardBox2>
                    <Boxcircle2>
                    </Boxcircle2>
                </DashboardBox2>
                </Link>
            </DashboardNavigator>


            <ContentWrapper>
                <WelcomeWrapper>
                    <WelcomeThreeLines>
                    </WelcomeThreeLines>
                    <WelcomeText style={{fontWeight: '600'}}>Welcome, Yuexin</WelcomeText>
                </WelcomeWrapper>

                <TabBar>NMI: 2001010596</TabBar>

                <SelectWrapper>
                    <SelectText>
                        Usage from <font
                        style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{startDate}</font> to&nbsp;
                        <font style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{endDate}</font>
                    </SelectText>
                    <SelectBox>
                        {rangeClicked?
                        <div>
                            <SelectButton onClick={() => handleUIupdate(true, none, none)}>
                                Search
                            </SelectButton>
                            <DateRange
                                style={{border:'solid', borderWidth:'1px', borderColor:'#E6EEFF'}}
                                editableDateInputs={true}
                                onChange={handleSelect}
                                ranges={[selectionRange]}
                                moveRangeOnFirstSelection={false}/>
                        </div>:
                        <SelectButton onClick={handleRangeClick}>
                            Time range
                        </SelectButton>
                        }
                    </SelectBox>
                </SelectWrapper>
                    
                <BoxWrapper>
                    <Box>
                        <BoxContent>
                            <BoxText1>Your charges</BoxText1>
                            <BoxText2>${totalCharge}</BoxText2>
                            <BoxText1 style={{marginTop: '70px'}}>Your consumption</BoxText1>
                            <BoxText2>{totalConsumption}<BoxText1
                                style={{marginLeft: '10px', marginTop: '18px'}}>kW</BoxText1></BoxText2>
                        </BoxContent>
                    </Box>
                    <Box2>
                        <BoxContent>
                            <BoxText1>Your current plan is</BoxText1>
                            <BoxText2>{currentPlan}<ColorRed>.</ColorRed></BoxText2>
                            <BoxText1 style={{marginTop: '130px'}}>Powered by <font
                                style={{color: '#FF127F', fontWeight: 'bold'}}>io energy</font></BoxText1>
                        </BoxContent>
                    </Box2>
                    <Box1>
                        <BoxContent>
                        <BoxText1>Recommended Plan: </BoxText1>
                            <PlanTextWrapper>
                                <PlanText style={{fontWeight:'bold', fontSize:'40px'}}> Lightning.
                                </PlanText>
                                <PlanText style={{marginTop:'30px', fontSize:'16px'}}>
                                Changing plan can reduce your cost and carbon by <font style={{fontWeight:'bold'}}>17%</font>
                                </PlanText>
                                <Link to={{ pathname: "https://www.ioenergy.com.au/OurPlans/" }} target="_self">
                                <ChangePlanButton onClick={handleChangePlanClick}>
                                    Change Plan
                                </ChangePlanButton>
                                </Link>
                            </PlanTextWrapper>
                        </BoxContent>
                    </Box1>
                </BoxWrapper>

                <Context1>Average hourly usage</Context1>

                <GraphWrapper>
                    <GraphContextWrapper>
                        <GraphContext>
                            <BoxText1>Charges</BoxText1>
                            <BoxText2 style={{fontSize: '30px', marginTop: '12px'}}>${avgCharge}</BoxText2>
                        </GraphContext>
                        <GraphContext>
                            <BoxText1>Consumption(kWh)</BoxText1>
                            <BoxText2 style={{fontSize: '30px', marginTop: '12px'}}>{avgConsumption}</BoxText2>
                        </GraphContext>
                        <GraphContext>
                            <BoxText1>Date</BoxText1>
                            <BoxText2 style={{fontSize: '28px', marginTop: '12px'}}>{today}</BoxText2>
                        </GraphContext>
                        <GraphContext>
                            <BoxText1>Daily avg (kWh)</BoxText1>
                            <BoxText2 style={{color: '#81F1C5', fontWeight: 'bold', fontSize: '30px', marginTop: '12px'}}>{avgConsumptionDay}</BoxText2>
                        </GraphContext>

                    </GraphContextWrapper>
                    <GraphGraph>
                        <ReactEcharts option = {option} style={{height: "600px", }}/>
                    </GraphGraph>
                </GraphWrapper>

                <BottomWrapper>
                    <BottomLeft>
                        <LeftTitleWrapper>
                            <Context1>Electricity bill history&nbsp;<font style={{color:'#FF127F', fontSize:'20px'}}>See all</font>
                            </Context1>
                        </LeftTitleWrapper>
                        <GraphContextWrapper style={{height:'80px'}}>
                            <GraphContext style = {{width:'35%'}}>
                                <BoxText1 style={{fontSize: '13px'}}>Bill period</BoxText1>
                            </GraphContext>
                            <GraphContext>
                                <BoxText1 style={{fontSize: '13px'}}> Consumption(kWh) </BoxText1>
                            </GraphContext>
                            <GraphContext>
                                <BoxText1 style={{fontSize: '13px'}}> Peak usage(kWh) </BoxText1>
                            </GraphContext>
                            <GraphContext>
                                <BoxText1 style={{fontSize: '13px'}}> Amount </BoxText1>
                            </GraphContext>
                            <GraphContext>
                                <BoxText1 style={{fontSize: '13px'}}> Paid </BoxText1>
                            </GraphContext>
                        </GraphContextWrapper>
                        <GraphWrapper>
                            {billList}
                        </GraphWrapper>
                    </BottomLeft>
                </BottomWrapper>

                <TabBar>NMI: 2001010596</TabBar>
            </ContentWrapper>
        </DashboardWrapper>
    );
}



// class Dashboard extends PureComponent {

//     option = {};

//     constructor() {
//         super();
//         // need review
//         let nmi = '2001010596';//;"2001010418"
//         let start_time = '2021-11-01' ;//'2021-5-1';
//         let end_time= "2021-11-20";//'2021-5-15';
//         // const define
//         let emphasisStyle = {
//             itemStyle: {
//                 shadowBlur: 10,
//                 shadowColor: 'rgba(0,0,0,0.3)'
//               }
//         };

//         let usageEList = [];
//         let usageBlist = [];
//         let costList = [];
//         let date = [new Date(), new Date()];
//         let totalCharge = 0;
//         let totalConsumption = 0;
//         let currentPlan = '';
//         let avgCharge = 0;
//         let avgConsumption = 0;
//         let avgConsumptionDay = 0;
//         let today = new Date();
//         var todayString = today.getDate() + ' ' + NAME_MONTH[today.getMonth()] + ' ' + today.getFullYear();
//         let selectionRange = {startDate: date[0], endDate: date[1], key:'selection'};
//         let option = {};

//         let billList = [{period:'29 Apr 21 - 28 Jul 21', consump:'500', Peek:'500', Amount:'500', Paid:'NO'}, 
//                     {period:'29 Apr 21 - 28 Jul 22', consump:'500', Peek:'500', Amount:'500', Paid:'NO'}, 
//                     {period:'29 Apr 21 - 28 Jul 23', consump:'500', Peek:'500', Amount:'500', Paid:'NO'}]; //change later -------
//         // state relation
//         this.state = {
//             nmi_id : nmi,
//             currentPage: 0,
//             rangeClicked: false,
//             usageEList,
//             usageBlist,
//             costList,
//             option,
//             date: date,
//             startDate: '1 Jun',
//             endDate: '20 Aug',
//             selectionRange: selectionRange,
//             billList,
//             totalCharge,
//             avgCharge,
//             totalConsumption,
//             avgConsumption,
//             avgConsumptionDay,
//             currentPlan,
//             today : todayString,
//             emphasisStyle : emphasisStyle,
//             startDate: start_time.split('-')[2] + ' ' + NAME_MONTH[parseInt(start_time.split('-')[1])-1],
//             endDate: end_time.split('-')[2] + ' ' + NAME_MONTH[parseInt(end_time.split('-')[1])-1],
//         }
//         this.handleChangePlanClick = this.handleChangePlanClick.bind(this);
//         this.handleSelect = this.handleSelect.bind(this);
//         this.handleRangeClick = this.handleRangeClick.bind(this);
//         this.handleUIupdate = this.handleUIupdate.bind(this);
        
//         //initialize
//         this.handleUIupdate(false, start_time, end_time);

        
//         //let usageEList =  [{value:4.2980322580645165, itemStyle:{color:'#a90000'}}, 4.173967741935484, 2.3077741935483873, 1.863903225806452, 1.5608387096774194, 1.443967741935484, 1.3176129032258066, 0.8550967741935485, 0.7302580645161291, 1.1535806451612902, 1.0611935483870965, 0.7700645161290322, 2.215129032258065, 4.348451612903226, 4.037354838709677, 1.9469677419354843, 1.3051612903225807, 1.3012903225806451, 0.9675483870967742, 1.6206774193548386, 2.1601290322580637, 3.6261290322580644, 3.888774193548387, 4.219741935483872];
//         //let costList = [1.2150303225806454, 1.1516088709677421, 0.6029812903225806, 0.47014, 0.3854843548387097, 0.3552845161290323, 0.32896596774193554, 0.23883354838709675, 0.21182129032258065, 0.33601709677419356, 0.3108119354838709, 0.23811354838709684, 0.6750351612903226, 1.3033529032258067, 1.1894445161290323, 0.5707135483870968, 0.3788141935483871, 0.3791083870967742, 0.2833374193548387, 0.47184677419354837, 0.6274129032258065, 1.0522432258064518, 1.1280232258064515, 1.2237251612903226];
//         //let usageBlist =  [{value:-4.2980322580645165, itemStyle:{color:'#a90000'}}, -4.173967741935484, -2.3077741935483873, -1.863903225806452, -1.5608387096774194, -1.443967741935484, -1.3176129032258066, -0.8550967741935485, -0.7302580645161291, -1.1535806451612902, -1.0611935483870965, -0.7700645161290322, -2.215129032258065, -4.348451612903226, -4.037354838709677, -1.9469677419354843, -1.3051612903225807, -1.3012903225806451, -0.9675483870967742, -1.6206774193548386, -2.1601290322580637, -3.6261290322580644, -3.888774193548387, -4.219741935483872];      
//     }

//     // Change Plan Button - Open Our Plans in iO Energy Website in the same tab
//     handleChangePlanClick = () => {
//         window.open("https://www.ioenergy.com.au/OurPlans/", "_self");
//     };

//     handleRangeClick(){
//         this.setState((state)=>({
//             rangeClicked: !state.rangeClicked,
//         }));

//         // // When "Time Range" button is clicked, set the Change Plan button z index to -1.
//         // var obj = document.getElementsByClassName('button.ChangePlanButton')
//         // obj.style.zIndex = '-1';

//     };

//     handleSelect(date){
//         const sr = {
//             startDate: date.selection.startDate,
//             endDate: date.selection.endDate,
//             key: 'selection',
//         }
//         this.setState({ selectionRange:sr})
//     };

//     handleUIupdate(init, start_date, end_date){
//         const _this = this;

//         console.log(init);

//         if (!init) {
//             console.log('initialize');
//         } else {
//             console.log('request');
//             start_date = this.state.selectionRange.startDate.getFullYear().toString()+'-'+ (this.state.selectionRange.startDate.getMonth()+1).toString() +'-' + this.state.selectionRange.startDate.getDate().toString();
//             end_date = this.state.selectionRange.endDate.getFullYear().toString() + '-'+ (this.state.selectionRange.endDate.getMonth()+1).toString() + '-'+ this.state.selectionRange.endDate.getDate().toString();
            
//             // // when "Search" button is clicked, set the ChangePlanButton zindex to 2
//             // var obj = document.getElementsByClassName('div.ChangePlanButton');
//             // obj.style.zIndex = '2';
        
//         }
//         //const data = {'truth':'Chloe is da piao liang.', 'good' : 'Wang jingyi tai lan'} // Chloe made this.
        
//         const data = {'nmi_id': this.state.nmi_id, 'start':start_date, 'end':end_date};

//         console.log(this.state.selectionRange);
//         console.log(data);
//         // send request
//         axios.post('http://localhost:8000/page1/', data).then((res) => {
//             const result = res;
//             console.log(result);
//             _this.setState(() => ({
//                 option : 
//                 {
//                     legend: {
//                         data: ['Cost', 'Usage', 'Solar'],
//                         left: '10%',
//                     },
//                     tooltip : {
//                         trigger : 'axis',
//                         axisPointer: {
//                             type: 'cross'
//                         }
//                     },
//                     grid: {
//                         left: '5%',
//                         bottom: '10%',
//                         right: '5%',
//                     },
//                     toolbox: {
//                         feature: {
//                             dataView: { show: true, readOnly: true },
//                             restore: { show: false },
//                             saveAsImage: { show: true }
//                         }
//                     },
//                     xAxis: [
//                     {
//                         type: 'category',
//                         axisTick: {
//                         alignWithLabel: true
//                         },
//                         data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
//                         '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
//                     }
//                     ],
//                     yAxis: [
//                     {
//                         type: 'value',
//                         name: 'Usage',
//                         min: -res.data.graph_usage_max,
//                         max: res.data.graph_usage_max,
//                         position: 'right',
//                         axisLine: {
//                             show: true,
//                             lineStyle: {
//                             color: '#81F1C5'
//                             }
//                         },
//                         axisLabel: {
//                             formatter: '{value} kWh'
//                         }
//                     },
//                     {
//                         type: 'value',
//                         name: 'Cost',
//                         min: -res.data.graph_abscost_max,
//                         max: res.data.graph_abscost_max,
//                         position: 'left',
//                         axisLine: {
//                             show: true,
//                             lineStyle: {
//                             color: '#FF127F'
//                             }
//                         },
//                         axisLabel: {
//                             formatter: '{value} $'
//                         }
//                     },
//                     {}
//                     ],
//                     series: [
//                     {
//                         name: 'Usage',
//                         type: 'bar',
//                         stack: 'one',
//                         data: res.data.avg_consumption_hour,
//                         emphasis: this.state.emphasisStyle,
//                         itemStyle: {
//                             normal: {
//                                 color: '#81F1C5',
//                                 borderRadius: '10%',
//                             }
//                         },
//                     },
//                     {
//                         name: 'Cost',
//                         type: 'line',
//                         smooth: true,
//                         yAxisIndex: 1,
//                         data: res.data.avg_charge_hour,
//                         itemStyle: {
//                             normal: {
//                                 color: '#FF127F',
//                             }
//                         },
//                     },
//                     {
//                         name: 'Solar',
//                         type: 'bar',
//                         stack: 'one',
//                         data: res.data.avg_feedin_hour,
//                         emphasisStyle: this.state.emphasisStyle,
//                         itemStyle: {
//                             normal: {
//                                 color: '#FFFF00',
//                                 borderRadius: '10%',
//                             }
//                         },
//                     }
//                     ],
//                 },
//                 avgCharge : res.data.avg_charge,
//                 avgConsumption : res.data.avg_consumption_hour_avg,
//                 avgConsumptionDay : res.data.avg_consumption_day_avg,
//                 totalCharge : res.data.sum_charge,
//                 totalConsumption : res.data.sum_consumption,
//                 currentPlan : res.data.current_plan,
//             }));
//         })
        
//         // handle rangeClick and display on title
//         if (init){
//             this.setState((state)=>({
//                 rangeClicked: !state.rangeClicked,
//                 startDate: state.selectionRange.startDate.getDate().toString() + ' ' + NAME_MONTH[state.selectionRange.startDate.getMonth()],
//                 endDate: state.selectionRange.endDate.getDate().toString() + ' ' + NAME_MONTH[state.selectionRange.endDate.getMonth()],
//             }));
//         }
//     };

//     render() {
//         // const {currentPage} = this.props;
//         const {rangeClicked, date, selectionRange, billList, totalCharge, totalConsumption, avgCharge, avgConsumption, avgConsumptionDay, currentPlan, today} = this.state;
//         const billlist = [];
//         for (let bill of billList) {
//             billlist.push(<BillContextWrapper color={{}}>
//                 <BillContent> {bill.period} </BillContent>
//                 <BillContent> {bill.consump} </BillContent>
//                 <BillContent> {bill.Peek} </BillContent>
//                 <BillContent> {bill.Amount} </BillContent>
//                 <BillContent> {bill.Paid} </BillContent>
//             </BillContextWrapper>)
//         }
        
//         return (
//             <DashboardWrapper>
//                 <DashboardNavigator>
//                     <DashboardLogo>
//                     </DashboardLogo>
//                     <DashboardBox1>
//                         <Boxcircle>
//                         </Boxcircle>
//                     </DashboardBox1>
//                     <Link to='/dashboard2'>
//                     <DashboardBox2>
//                         <Boxcircle2>
//                         </Boxcircle2>
//                     </DashboardBox2>
//                     </Link>
//                 </DashboardNavigator>


//                 <ContentWrapper>
//                     <WelcomeWrapper>
//                         <WelcomeThreeLines>
//                         </WelcomeThreeLines>
//                         <WelcomeText style={{fontWeight: '600'}}>Welcome, Yuexin</WelcomeText>
//                     </WelcomeWrapper>

//                     <TabBar>NMI: 2001010596</TabBar>

//                     <SelectWrapper>
//                         <SelectText>
//                             Usage from <font
//                             style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{this.state.startDate}</font> to&nbsp;
//                             <font style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{this.state.endDate}</font>
//                         </SelectText>
//                         <SelectBox>
//                             {rangeClicked?
//                             <div>
//                                 <SelectButton onClick={this.handleUIupdate}>
//                                     Search
//                                 </SelectButton>
//                                 <DateRange
//                                     style={{border:'solid', borderWidth:'1px', borderColor:'#E6EEFF'}}
//                                     editableDateInputs={true}
//                                     onChange={this.handleSelect}
//                                     ranges={[selectionRange]}
//                                     moveRangeOnFirstSelection={false}/>
//                             </div>:
//                             <SelectButton onClick={this.handleRangeClick}>
//                                 Time range
//                             </SelectButton>
//                             }
//                         </SelectBox>

//                     </SelectWrapper>
//                     <BoxWrapper>
//                         <Box>
//                             <BoxContent>
//                                 <BoxText1>Your charges</BoxText1>
//                                 <BoxText2>${totalCharge}</BoxText2>
//                                 <BoxText1 style={{marginTop: '70px'}}>Your consumption</BoxText1>
//                                 <BoxText2>{totalConsumption}<BoxText1
//                                     style={{marginLeft: '10px', marginTop: '18px'}}>kW</BoxText1></BoxText2>
//                             </BoxContent>
//                         </Box>
//                         <Box2>
//                             <BoxContent>
//                                 <BoxText1>Your current plan is</BoxText1>
//                                 <BoxText2>{currentPlan}<ColorRed>.</ColorRed></BoxText2>
//                                 <BoxText1 style={{marginTop: '130px'}}>Powered by <font
//                                     style={{color: '#FF127F', fontWeight: 'bold'}}>io energy</font></BoxText1>
//                             </BoxContent>
//                         </Box2>
//                         <Box1>
//                             <BoxContent>
//                             <BoxText1>Recommended Plan: </BoxText1>
//                                 <PlanTextWrapper>
//                                     <PlanText style={{fontWeight:'bold', fontSize:'40px'}}> Lightning.
//                                     </PlanText>
//                                     <PlanText style={{marginTop:'30px', fontSize:'16px'}}>
//                                     Changing plan can reduce your cost and carbon by <font style={{fontWeight:'bold'}}>17%</font>
//                                     </PlanText>
//                                     <Link to={{ pathname: "https://www.ioenergy.com.au/OurPlans/" }} target="_self">
//                                     <ChangePlanButton onClick={this.handleChangePlanClick}>
//                                         Change Plan
//                                     </ChangePlanButton>
//                                     </Link>
//                                 </PlanTextWrapper>
//                             </BoxContent>
//                         </Box1>
//                     </BoxWrapper>

//                     <Context1>Average hourly usage</Context1>

//                     <GraphWrapper>
//                         <GraphContextWrapper>
//                             <GraphContext>
//                                 <BoxText1>Charges</BoxText1>
//                                 <BoxText2 style={{fontSize: '30px', marginTop: '12px'}}>${avgCharge}</BoxText2>
//                             </GraphContext>
//                             <GraphContext>
//                                 <BoxText1>Consumption(kWh)</BoxText1>
//                                 <BoxText2 style={{fontSize: '30px', marginTop: '12px'}}>{avgConsumption}</BoxText2>
//                             </GraphContext>
//                             <GraphContext>
//                                 <BoxText1>Date</BoxText1>
//                                 <BoxText2 style={{fontSize: '28px', marginTop: '12px'}}>{today}</BoxText2>
//                             </GraphContext>
//                             <GraphContext>
//                                 <BoxText1>Daily avg (kWh)</BoxText1>
//                                 <BoxText2 style={{color: '#81F1C5', fontWeight: 'bold', fontSize: '30px', marginTop: '12px'}}>{avgConsumptionDay}</BoxText2>
//                             </GraphContext>

//                         </GraphContextWrapper>
//                         <GraphGraph>
//                             <ReactEcharts option = {this.state.option} style={{height: "600px", }}/>
//                         </GraphGraph>
//                     </GraphWrapper>

//                     <BottomWrapper>
//                         <BottomLeft>
//                             <LeftTitleWrapper>
//                                 <Context1>Electricity bill history&nbsp;<font style={{color:'#FF127F', fontSize:'20px'}}>See all</font>
//                                 </Context1>
//                             </LeftTitleWrapper>
//                             <GraphContextWrapper style={{height:'80px'}}>
//                                 <GraphContext style = {{width:'35%'}}>
//                                     <BoxText1 style={{fontSize: '13px'}}>Bill period</BoxText1>
//                                 </GraphContext>
//                                 <GraphContext>
//                                     <BoxText1 style={{fontSize: '13px'}}> Consumption(kWh) </BoxText1>
//                                 </GraphContext>
//                                 <GraphContext>
//                                     <BoxText1 style={{fontSize: '13px'}}> Peak usage(kWh) </BoxText1>
//                                 </GraphContext>
//                                 <GraphContext>
//                                     <BoxText1 style={{fontSize: '13px'}}> Amount </BoxText1>
//                                 </GraphContext>
//                                 <GraphContext>
//                                     <BoxText1 style={{fontSize: '13px'}}> Paid </BoxText1>
//                                 </GraphContext>
//                             </GraphContextWrapper>
//                             <GraphWrapper>
//                                 {billlist}
//                             </GraphWrapper>
//                         </BottomLeft>
//                     </BottomWrapper>

//                     <TabBar>NMI: 2001010596</TabBar>
//                 </ContentWrapper>
//             </DashboardWrapper>
//         )
        
//     }
// }


export default Dashboard;
