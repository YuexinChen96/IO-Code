import { INITIALIZE, UI_UPDATE, RANGECLICK, NMI_CLICK, USERS_ERROR } from '../types'

const defaultState = {
	init: false,
    loading : true,
    rangeClicked : false,
    usageEList : [], 
    usageBlist : [], 
    costList : [], 
    startDateString : '',
    endDateString : '',
    date : 'today',
    start_date : '',
    end_date : '',
    billList : [], 
    totalCharge : 0, 
    avgCharge : 0, 
    totalConsumption : 0, 
    avgConsumption : 0, 
    avgConsumptionDay : 0, 
    today : '',
    currentPlan : '',
    graphUsageMax : 5, 
    graphAbscostMax : 5,
    avgCurt: [],
    avgWshr: [],
};

export default function(state = defaultState, action){
    switch(action.type){
        case INITIALIZE:
            return {
                ...state,
                init : true,
                nmi : action.ret1.nmi,
                nmi_id : action.ret1.nmi[0],

                usageEList : action.ret2.avg_consumption_hour,
                costList : action.ret2.avg_charge_hour,
                usageBlist : action.ret2.avg_feedin_hour,
                graphUsageMax : action.ret2.graph_usage_max,
                graphAbscostMax : action.ret2.graph_abscost_max,
                avgWshr : action.ret2.avg_wshr_hour,
                avgCurt : action.ret2.avg_curt_hour,

                avgCharge : action.ret2.avg_charge,
                avgConsumption : action.ret2.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret2.avg_consumption_day_avg,
                totalCharge : action.ret2.sum_charge,
                totalConsumption : action.ret2.totsum_consumption,
                currentPlan : action.ret2.current_plan,

                startDateString : action.start_time_str,
                endDateString : action.end_time_str,
                start_date : action.start_date,
                end_date : action.end_date,

                loading : false,
            }
        case RANGECLICK:
            return {
                ...state,
                rangeClicked : !state.rangeClicked
            }
        case UI_UPDATE:
            return {
                ...state,
                rangeClicked : !state.rangeClicked,

                usageEList : action.ret.avg_consumption_hour,
                costList : action.ret.avg_charge_hour,
                usageBlist : action.ret.avg_feedin_hour,
                graphUsageMax : action.ret.graph_usage_max,
                graphAbscostMax : action.ret. graph_abscost_max,
                avgWshr : action.ret2.avg_wshr_hour,
                avgCurt : action.ret2.avg_curt_hour,

                avgCharge : action.ret.avg_charge,
                avgConsumption : action.ret.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret.avg_consumption_day_avg,
                totalCharge : action.ret.sum_charge,
                totalConsumption : action.ret.totsum_consumption,
                currentPlan : action.ret.current_plan,

                startDateString : action.start_time_str,
                endDateString : action.end_time_str,
                start_date : action.start_date,
                end_date : action.end_date,

                loading : false,
            }
        case NMI_CLICK:
            return {
                ...state,
                nmi_id : action.nmi_id,

                usageEList : action.ret.avg_consumption_hour,
                costList : action.ret.avg_charge_hour,
                usageBlist : action.ret.avg_feedin_hour,
                graphUsageMax : action.ret.graph_usage_max,
                graphAbscostMax : action.ret. graph_abscost_max,

                avgCharge : action.ret.avg_charge,
                avgConsumption : action.ret.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret.avg_consumption_day_avg,
                totalCharge : action.ret.sum_charge,
                totalConsumption : action.ret.totsum_consumption,
                currentPlan : action.ret.current_plan,

                startDateString : action.start_time_str,
                endDateString : action.end_time_str,
                start_date : action.start_date,
                end_date : action.end_date,

                loading : false,

            }
        case USERS_ERROR:
            return {
                loading : false,
                error : action.payload
            }
        default: return state
    }

}