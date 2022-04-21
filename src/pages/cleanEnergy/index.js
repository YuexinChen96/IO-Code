import React, {PureComponent, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { changePlan } from '../../store/actions/userDashboardAction'


// Dashboard Component
import {
    DashboardWrapper,
    DashboardNavigator,
    DashboardLogo,
    DashboardBox1,
    DashboardBox2,
    Boxcircle,
    Boxcircle2,
    ContentWrapper,
    WelcomeWrapper,
    WelcomeThreeLines,
    SelectWrapper,
    BoxWrapper,
    Context1,
    SelectBox,
    SelectButton,
    WelcomeText,
    SelectText,
    RecommmendWrapper, PlanTextWrapper, PlanText,
    ChangePlanButton, GraphGraph,
    EnergySourcesWrapper, Context2, EnergySourceGraph, UsageText,
    LayoutWrapper,ContentLeft,ContentRight

} from './style';
 
const formatOption1 = (usageList, costList) => {
    return {
        title: {
          text: 'Average Percent of Renewable Energy'
        },
        tooltip : {
            trigger : 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top:'30%',
            width: 'auto',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: true },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['curtShare(curtailment)', 'wshrShare(renewables)']
        },
        xAxis: [
        {
            type: 'category',
            axisTick: {
            alignWithLabel: true
            },
            
          // prettier-ignore
            data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
            '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
        }
        ],
        yAxis: [
        {
            type: 'value',
            // name: 'Hourly electricity usage',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
                show: true,
                lineStyle: {
                // color: '#81F1C5'
                }
            },
            axisLabel: {
                formatter: ''
            }
        },
        {
            type: 'value',
            name: 'Share(%)',
            min: 0,
            max: 100,
            position: 'left',
            axisLine: {
                show: true,
                lineStyle: {
                color: '#FF127F'
                }
            },
            axisLabel: {
                formatter: '{value} %'
            }
        }
        ],
        series: [
        {
            name: 'curtShare(curtailment)',
            type: 'bar',
            data: usageList,
            itemStyle: {
                normal: {
                    color: '#FFF3F8',
                    borderRadius: '20px',
                }
            },
        },
        {
            name: 'wshrShare(renewables)',
            type: 'line',
            yAxisIndex: 1,
            data: costList,
            itemStyle: {
                normal: {
                    color: '#FF127F',
                }
            },
        }
        ],
    }
}

const formatOption2 = (avgGas, avgImport, avgRooftop, avgSolar, avgWind) => {
    return {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: 'Average Level of Energy Generation'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        legend: {
            data: ['Wind', 'Solar', 'Gas', 'Import', 'Rooftop']
        },
        toolbox: {
            feature: {
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'30%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            boundaryGap: false,
            data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
            '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
            }
        ],
        yAxis: [
            {
            type: 'value',
            name: 'Generation(MW)',
            min: 0,
            // max: 1200,
            position: 'left',
            axisLine: {
                show: true,
            },
            axisLabel: {
                formatter: '{value} MW'
            }
        }
        ],
        series: [
            {
            name: 'Wind',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                },
                {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: avgWind
            },
            {
            name: 'Solar',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                },
                {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: avgSolar
            },
        
            {
            name: 'Gas',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(255, 0, 135)'
                },
                {
                    offset: 1,
                    color: 'rgb(135, 0, 157)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: avgGas
            },
            {
            name: 'Import',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(255, 191, 0)'
                },
                {
                    offset: 1,
                    color: 'rgb(224, 62, 76)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: avgImport
            },
            {
            name: 'Rooftop',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                // Need to change colour
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: 'rgb(0, 189, 255)'
                //   },
                //   {
                //     offset: 1,
                //     color: 'rgb(77, 119, 255)'
                //   }
                // ])
            },
            emphasis: {
                focus: 'series'
            },
            data: avgRooftop
        },
        ]
    }
}

const formatOption3 = () => {
    return {
        title: {
          text: 'Carbon intensity CO\u2082'//'Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: {show: true}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'30%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }]
    }
}

const formatOption4 = () => {
    return {
        tooltip: {
          trigger: 'item',
        },
        grid: {
            // top: '5%',
            // height: "450px", //width: '100%',
            top:"top",
            left:'center',
            containLabel: true,
        },
        color:['#81F1C5', '#facfeb', '#FF127F','#ffffff'], // green, light pink, dark pink and white
        legend: [// Define legend positions
            {
                data: ['Solar'],
                top: '95%',
                left:'22%',
                icon: "circle",
            },
            {
        data: ['Import'],
            top: '85%',
            left:'22%', icon: "circle",
        },  {
                data: ['Natural Gas'],
                top: '85%',
                left: '60%', icon: "circle",
            }, {
                data: ['Wind'],
                top: '95%',
                left: '60%', icon: "circle",
            }],
            series: [
                {
                    name: 'Energy Sources',
                    type: 'pie',
                    radius: ['55%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        show:false ,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        { value: 1048, name: 'Solar' },
                        { value: 735, name: 'Import' },
                        { value: 580, name: 'Natural Gas' },
                        { value: 484, name: 'Wind' },
                    ]
                }
            ],
            graphic: [
            {
                type: 'text',
                left: 'center',
                top: '43%',
                style: {
                    text: "72%",
                    textAlign: 'center',
                    fill: '#000',
                    width: 30,
                    height: 30,
                    fontSize: 40,
                    color: "#4d4f5c",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                }
            }, {
                type: 'text',
                left: 'center',
                top: '53%',
                style: {
                text: 'Green Energy',
                    textAlign: 'center',
                    fill: '#000',
                    width: 30,
                    height: 30,
                    fontSize: 20,
                    fontFamily: "Montserrat",
            }
        }],
    }
}

const CleanEnergy = () => {
    //reducer variables
    const dispatch = useDispatch()
    const cleanEnergy = useSelector(state => state.userDashboard)
    const { avgCurt, avgWshr, avgGas, avgWind, avgRooftop, avgImport, avgSolar } = cleanEnergy
    const option1 = formatOption1(avgCurt, avgWshr)
    const option2 = formatOption2(avgGas, avgImport, avgRooftop, avgSolar, avgWind)
    const option3 = formatOption3()
    const option4 = formatOption4()

    return(
        <DashboardWrapper>
            <DashboardNavigator>
                    <DashboardLogo>
                    </DashboardLogo>
                    <Link to='/userDashboard'>
                    <DashboardBox2>
                        <Boxcircle2>
                        </Boxcircle2>
                    </DashboardBox2>
                    </Link>
                    <DashboardBox1>
                        <Boxcircle>
                        </Boxcircle>
                    </DashboardBox1>
            </DashboardNavigator>
            <ContentWrapper>
                <WelcomeWrapper>
                    <WelcomeThreeLines>
                    </WelcomeThreeLines>
                    <WelcomeText style={{fontWeight: '600'}}>Welcome, Yuexin </WelcomeText>
                </WelcomeWrapper>
                <LayoutWrapper>
                    <ContentLeft>
                    <SelectText>
                        Environment details 
                    </SelectText>
                        <GraphGraph>
                            <ReactEcharts option = {option1} />
                        </GraphGraph>
                        <GraphGraph>
                            <ReactEcharts option = {option2} />
                        </GraphGraph>
                        <GraphGraph>
                            <ReactEcharts option = {option3} />
                        </GraphGraph>
                    </ContentLeft>
                    <ContentRight>
                    <Context1 style={{color:'#FF127F'}}>Recommended plan</Context1>
                    <RecommmendWrapper>
                        <PlanTextWrapper>
                        <PlanText style={{fontWeight:'bold', fontSize:'40px'}}> Lightning
                        </PlanText>
                        <PlanText style={{marginTop:'30px', fontSize:'18px'}}>
                        Changing plan can reduce your cost and carbon by <font style={{fontWeight:'bold'}}>17%</font>
                        </PlanText>
                        </PlanTextWrapper>
                        <ChangePlanButton onClick = {() => dispatch(changePlan())}>
                            Change Plan
                        </ChangePlanButton>
                    </RecommmendWrapper>
                    <EnergySourcesWrapper>
                        <Context2>Energy Sources</Context2>
                        {/*<UsageText>*/}
                        {/*    Usage from <font*/}
                        {/*    style={{color: '#FF127F', textDecoration: 'underline'}}>{data.startDate}</font> to&nbsp;*/}
                        {/*    <font style={{color: '#FF127F', textDecoration: 'underline'}}>{data.endDate}</font>*/}
                        {/*</UsageText>*/}
                        <EnergySourceGraph>
                            <ReactEcharts option = {option4} style={{height: "450px", }} />
                        </EnergySourceGraph>
                    </EnergySourcesWrapper>
                    </ContentRight>
                </LayoutWrapper>
            </ContentWrapper>

        </DashboardWrapper>
    );
}

export default CleanEnergy;
