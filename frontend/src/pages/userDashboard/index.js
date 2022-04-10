import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { initUpdate, UIUpdate } from '../../store/actions/userDashboardAction'

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



const Dashboard = () => {
    // declare const value
    const NAME_MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const init_emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };
    // testing
    const email = 'Usfkz@Xflkv.com'
    const start_time = '2021-11-01' //'2021-5-1';
    const end_time= "2021-11-20"//'2021-5-15';]

    // declare redux
    const dispatch = useDispatch()
    const userDashboard = useSelector(state => state.userDashboard)
    const { init, nmi, nmi_id } = userDashboard
    const { rangeClicked, usageEList, usageBlist, costList, option, startDate, endDate, date, selectionRange, 
    billList, totalCharge, avgCharge, totalConsumption, avgConsumption, avgConsumptionDay, currentPlan, today } = userDashboard

    const [emphasisStyle, setEmphasisStyle] = useState(init_emphasisStyle);

    // console.log(init);
    
    console.log('NMI request. ')
    useEffect(() => {
        if (!init) {
            dispatch(initUpdate(email, start_time, end_time))
        }
    }, [])
    

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


    /*
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
        axios.post('http://localhost:8000/page1/', data).then((res) => {
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
    // useEffect(()=>{handleUIupdate(false, start_time, end_time);}, []);
    // handleUIupdate(false, start_time, end_time);
    // console.log("111111111111111111111111111111111111111111111")
    //const greeting = 'Hello Function Component!';


    */

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
                        <ReactEcharts option={option} style={{height: "600px"}}/>
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


export default Dashboard;
