import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { initUpdate, UIUpdate, rangeClick, nmiClick, changePlan } from '../../store/actions/userDashboardAction'

import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ReactEcharts from 'echarts-for-react';

import axios from 'axios';

//dashboard components
import {
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

const formatOption = (graphUsageMax, graphAbscostMax, avgConsumptionHour, avgChargeHour, avgFeedinHour) => {
    return {
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
            min: -graphUsageMax,
            max: graphUsageMax,
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
            min: -graphAbscostMax,
            max: graphAbscostMax,
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
            data: avgConsumptionHour,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.3)'
                }
            },
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
            data: avgChargeHour,
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
            data: avgFeedinHour,
            emphasisStyle: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.3)'
                }
            },
            itemStyle: {
                normal: {
                    color: '#FFFF00',
                    borderRadius: '10%',
                }
            },
        }
        ],
    }
}

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
    const end_time= "2021-11-20"//'2021-5-15';
    //const start_time = '2022-3-22' //'2021-5-1';
    //const end_time= "2022-4-10"//'2021-5-15';]

    // declare redux
    const dispatch = useDispatch()
    const userDashboard = useSelector(state => state.userDashboard)
    const { init, nmi, nmi_id } = userDashboard
    const { rangeClicked, startDateString, endDateString, date, start_date, end_date,
    billList, totalCharge, avgCharge, totalConsumption, avgConsumption, avgConsumptionDay, currentPlan, today,
    graphUsageMax, graphAbscostMax, usageEList, usageBlist, costList } = userDashboard
    
    // for date selector
    const [select, setSelect] = useState([
        {
          startDate: (start_date == '') ? new Date(start_time) : new Date(start_date),
          endDate: (end_date == '') ? new Date(end_time) : new Date(start_date),
          key: 'selection'
        }
    ])
    
    console.log('NMI request. ')
    const option = formatOption(graphUsageMax, graphAbscostMax, usageEList, costList, usageBlist)
    console.log(option)
    useEffect(() => {
        if (!init) {
            dispatch(initUpdate(email, start_time, end_time, NAME_MONTH))
        }
    }, [])

    const nmi_list = ['2001000514', '2001010596', '2002338618']

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

                <div className='TabShow'>
                { Object.keys(nmi_list).map((item, index)=>{
                    return (
                    <div key={index} value={nmi_list[item]}>
                        <TabBar onClick={() => dispatch(nmiClick(nmi_list[index], start_date, end_date, NAME_MONTH))}> NMI: {nmi_list[index]} 
                        </TabBar>
                        { 
                        (nmi_list[index] == nmi_id) ? 
                        <div>
                            <SelectWrapper>
                                <SelectText>
                                    Usage from <font
                                    style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{startDateString}</font> to&nbsp;
                                    <font style={{color: '#FF127F', textDecoration: 'underline', fontWeight: 'bold'}}>{endDateString}</font>
                                </SelectText>
                                <SelectBox>
                                    {rangeClicked?
                                    <div>
                                        <SelectButton onClick={() => dispatch(UIUpdate(nmi_id, select[0], NAME_MONTH))}>
                                            Search
                                        </SelectButton>
                                        <DateRange
                                            style={{border:'solid', borderWidth:'1px', borderColor:'#E6EEFF'}}
                                            editableDateInputs={true}
                                            onChange={item => setSelect([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={select}/>
                                    </div>:
                                    <SelectButton onClick={() => dispatch(rangeClick())}>
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
                                            <ChangePlanButton onClick = {() => dispatch(changePlan())}>
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
                        </div>
                        
                        
                        : <div />
                        }
                    </div>
                    )
                })}
                </div>

            </ContentWrapper>
        </DashboardWrapper>
    );
}


export default Dashboard;
