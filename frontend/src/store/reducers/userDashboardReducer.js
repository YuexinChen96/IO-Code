import { INITIALIZE, UI_UPDATE, RANGECLICK, NMI_CLICK, USERS_ERROR, CHANGE_PLAN } from '../types'

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
    avgGas : [],
    avgImport : [],
    avgRooftop : [],
    avgSolar : [],
    avgWind : [],
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
                avgGas : action.ret2.avg_gas_hour,
                avgImport : action.ret2.avg_import_hour,
                avgRooftop : action.ret2.avg_rooftop_hour,
                avgSolar : action.ret2.avg_solar_hour,
                avgWind : action.ret2.avg_wind_hour,

                avgCharge : action.ret2.avg_charge,
                avgConsumption : action.ret2.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret2.avg_consumption_day_avg,
                totalCharge : action.ret2.sum_charge,
                totalConsumption : action.ret2.sum_consumption, //totsum_consumption
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
                avgWshr : action.ret.avg_wshr_hour,
                avgCurt : action.ret.avg_curt_hour,
                avgGas : action.ret.avg_gas_hour,
                avgImport : action.ret.avg_import_hour,
                avgRooftop : action.ret.avg_rooftop_hour,
                avgSolar : action.ret.avg_solar_hour,
                avgWind : action.ret.avg_wind_hour,

                avgCharge : action.ret.avg_charge,
                avgConsumption : action.ret.avg_consumption_hour_avg,
                avgConsumptionDay : action.ret.avg_consumption_day_avg,
                totalCharge : action.ret.sum_charge,
                totalConsumption : action.ret.sum_consumption, //totsum_consumption
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
                totalConsumption : action.ret.sum_consumption, //totsum_consumption
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
                error : action.payload,
            }
        case CHANGE_PLAN:
            return {
                ...state,
            }
        default: return state
    }

}