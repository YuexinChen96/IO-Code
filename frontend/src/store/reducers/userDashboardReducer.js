import { INITIALIZE, UI_UPDATE, USERS_ERROR } from '../types'

const defaultState = {
	init: false,
    loading : true,
    rangeClick : false,
    usageEList : [], 
    usageBlist : [], 
    costList : [], 
    option : {}, 
    startDate : '',
    endDate : '',
    date : 'today', 
    selectionRange : {}, 
    billList : [], 
    totalCharge : 0, 
    avgCharge : 0, 
    totalConsumption : 0, 
    avgConsumption : 0, 
    avgConsumptionDay : 0, 
    today : '',
    currentPlan : ''
};

export default function(state = defaultState, action){
    switch(action.type){
        case INITIALIZE:
            return {
                ...state,
                init : true,
                nmi : action.ret1.nmi,
                nmi_id : action.ret1.nmi[0],

                option : 
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
                        min: -action.ret2.graph_usage_max,
                        max: action.ret2.graph_usage_max,
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
                        min: -action.ret2.graph_abscost_max,
                        max: action.ret2.graph_abscost_max,
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
                        data: action.ret2.avg_consumption_hour,
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
                        data: action.ret2.avg_charge_hour,
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
                        data: action.ret2.avg_feedin_hour,
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
                },
                avgCharge : action.ret2.avg_charge,
                avgConsumption : action.ret2.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret2.avg_consumption_day_avg,
                totalCharge : action.ret2.sum_charge,
                totalConsumption : action.ret2.totsum_consumption,
                currentPlan : action.ret2.current_plan,
                startDate : action.start_time,
                endDate : action.end_time,

                loading : false,
            }
        case UI_UPDATE:
            return {
                ...state,
            }
        case USERS_ERROR:
            return {
                loading : false,
                error : action.payload
            }
        default: return state
    }

}