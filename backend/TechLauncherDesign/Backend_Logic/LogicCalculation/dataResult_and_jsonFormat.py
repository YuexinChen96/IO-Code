import psycopg2
import datetime
import pandas as pd
import json
from dateutil import rrule
from .encapsulation_functions.user_page_cal import getuser_usage_charge,get_recommend_plan
from .encapsulation_functions.get_data_from_database import get_user_consumption, get_user_info, account_to_nmi_init
from .encapsulation_functions.environment_page_cal import get_nem_sa_data


def getPage1data(nmi, start, end):
    # get the data range is >= 00:00:00 of start date and <=  00:00:00 of end date
    plan_name2id = {'LGHT': 1, 'MIL': 2, 'SPRK': 3, 'VOLT': 4, 'PLSP': 5, 'PLS': 6}
    plan_id2name = {1: 'LGHT', 2: 'MIL', 3: 'SPRK', 4: 'VOLT', 5: 'PLSP', 6: 'PLS'}

    # the rate is based on io plan,  and it is used for color distinction on dashboard
    # {planid:[[gorup1],[group2] ]}, group: [time(0am-23pm)]
    # each time in same group have same price in the considered plan.
    planid2rate = {1: [[0, 6, 7, 8, 9, 15, 16, 21, 22, 23], [1, 2, 3, 4, 5], [10, 11, 12, 13, 14], [17, 18, 19, 20]],
                   2: [[0, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23], [1, 2, 3, 4, 5], [10, 11, 12, 13, 14]],
                   3: [[i for i in range(24)]],
                   4: [[0, 1, 2, 3, 4, 5, 6, 21, 22, 23], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20]],
                   5: [[0, 1, 2, 3, 4, 5, 6, 21, 22, 23], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
                   6: [[i for i in range(24)]]}

    # get user type and current plan
    userinfo = get_user_info(nmi)[0]
    plan, usertype = plan_name2id[userinfo[-1]], userinfo[-2]
    print(plan)

    # calculate usage and charge
    dataAll = get_user_consumption(nmi, start, end)  # dataAll: [[datetime, e1, e2,b1],...]
    usageAndcharge_dict, monthdata = getuser_usage_charge(start, end, plan, dataAll)

    # compare plans
    currentcharge = float(usageAndcharge_dict['sum_charge'])
    recommend_plan, best_charge = get_recommend_plan(plan, currentcharge, usertype, monthdata)
    print(plan_id2name[recommend_plan], best_charge)
    plan_info = [userinfo[-1], plan_id2name[recommend_plan], (best_charge - currentcharge) / currentcharge if currentcharge!=0 else 0]
    print(plan_info)
    current_planRate = planid2rate[plan]
    # --------- data format -----------
    # usageAndcharge_dict:
    #       {'sum_consumption': float,  'avg_consumption_day_avg': float, 'avg_consumption_hour': list(float),
    #        'avg_consumption_hour_avg': float, 'avg_charge_hour': list(float), 'sum_charge': float, 'avg_charge': float }
    # plan_info:
    #       [current plan, recommend plan, reduced cost%]
    # current_planRate:
    #       [[time group1],[time group2],...]
    # plan
    #       a number between 1 and 6
    return usageAndcharge_dict, plan_info, current_planRate, plan


def getPage2data():
    renewables, each_energy = get_nem_sa_data()
    return renewables, each_energy


# --------- for testting -----------
# nmi = "2001010596"
# start_str = '2021-5-1'
# end_str = '2021-6-30'
# usageAndcharge_dict, plan_info, current_planRate, plan = getPage1data(nmi, start_str, end_str)
# renewables, each_energy = getPage2data()

# nmi = "2001704865"
# start_str = '2021-11-2'
# end_str = '2021-11-4'
# usageAndcharge_dict, plan_info, current_planRate, plan = getPage1data(nmi, start_str, end_str)
# renewables, each_energy = getPage2data()


# get the cunsumption color based on the planrate
def get_color_consumption(plan):
    color = ['#E6FCF4' for i in range(24)] #green
    if plan == 1:
        for i in range(24):
            if 1 <= i <= 5:
                color[i] = '#E6FCF4' #green
            elif 10 <= i <= 14:
                color[i] = '#F6F5FF' #purple
            elif 17 <= i <= 20:
                color[i] = '#FFF3F8' #red
            else:
                color[i] = '#FFF9CC' #yellow
    elif plan == 2:
        for i in range(24):
            if 1 <= i <= 5:
                color[i] = '#E6FCF4' # green
            elif 10 <= i <= 14:
                color[i] = '#FFF3F8' # red
            else:
                color[i] = '#F6F5FF' # purple
    elif plan == 4:
        for i in range(24):
            if 7 <= i <= 16:
                color[i] = '#E6FCF4' # green
            elif 17 <= i <= 20:
                color[i] = '#FFF3F8' # red
            else:
                color[i] = '#F6F5FF' # purple
    elif plan == 5:
        for i in range(24):
            if 7 <= i <= 20:
                color[i] = '#E6FCF4' #green
            else:
                color[i] = '#FFF3F8' #red
    return color

# get the color based on the planrate
def get_color_feedin(plan):
    color = ['#C0F8E2' for i in range(24)]  # green
    if plan == 1:
        for i in range(24):
            if 1 <= i <= 5:
                color[i] = '#C0F8E2'  # green
            elif 10 <= i <= 14:
                color[i] = '#DCD2FF'  # purple
            elif 17 <= i <= 20:
                color[i] = '#FFCFE5'  # red
            else:
                color[i] = '#FFEC66'  # yellow
    elif plan == 2:
        for i in range(24):
            if 1 <= i <= 5:
                color[i] = '#C0F8E2'  # green
            elif 10 <= i <= 14:
                color[i] = '#FFCFE5'  # red
            else:
                color[i] = '#DCD2FF'  # purple
    elif plan == 4:
        for i in range(24):
            if 7 <= i <= 16:
                color[i] = '#C0F8E2'  # green
            elif 17 <= i <= 20:
                color[i] = '#FFCFE5'  # red
            else:
                color[i] = '#DCD2FF'  # purple
    elif plan == 5:
        for i in range(24):
            if 7 <= i <= 20:
                color[i] = '#C0F8E2'  # green
            else:
                color[i] = '#FFCFE5'  # red
    return color

def get_planname(name):
    full_name = ''
    if name == 'LGHT':
        full_name = 'Lightning'
    elif name == 'MIL':
        full_name = 'Millennium'
    elif name == 'SPRK':
        full_name = 'Spark'
    elif name == 'VOLT':
        full_name = 'Volt'
    elif name == 'PLSP':
        full_name = 'Pulse Plus'
    elif name == 'PLS':
        full_name = 'Pulse'
    return full_name


# package all data in a json data format, which is used for API
def get_userinfo_json(usageAndcharge_dict, plan_info, renewables, each_energy, current_planRate, plan):
    user_info = {}
    data = json.loads(json.dumps(user_info))
    color_cunsumption = get_color_consumption(plan)
    color_feedin = get_color_feedin(plan)

    # data from usageAndcharge_dict
    data['sum_consumption'] = usageAndcharge_dict['sum_consumption']
    data['avg_consumption_day_avg'] = usageAndcharge_dict['avg_consumption_day_avg']

    avg_consumption_hour = []
    for i in range(24):
        one_hour_avg_consumption = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_consumption['value'] = usageAndcharge_dict['avg_consumption_hour'][i]
        one_hour_avg_consumption['itemStyle'] = itemstyle
        avg_consumption_hour.append(one_hour_avg_consumption)
    data['avg_consumption_hour'] = avg_consumption_hour

    avg_charge_hour = []
    for i in range(24):
        one_hour_avg_charge = {}
        itemstyle = {}
        itemstyle['color'] = '#FF127F' #red
        one_hour_avg_charge['value'] = usageAndcharge_dict['avg_charge_hour'][i]
        one_hour_avg_charge['itemStyle'] = itemstyle
        avg_charge_hour.append(one_hour_avg_charge)
    data['avg_charge_hour'] = avg_charge_hour

    data['avg_consumption_hour_avg'] = usageAndcharge_dict['avg_consumption_hour_avg']
    data['sum_charge'] = usageAndcharge_dict['sum_charge']
    data['avg_charge'] = usageAndcharge_dict['avg_charge']

    # data from plan_info

    data['current_plan'] = get_planname(plan_info[0])
    data['recommend_plan'] = get_planname(plan_info[1])
    data['reduced_percent'] = -plan_info[2] * 100

    # data from renewables
    avg_wshr_hour = []
    for i in range(24):
        one_hour_avg_wshr = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_wshr['value'] = renewables['avg_wshr_hour'][i]
        one_hour_avg_wshr['itemStyle'] = itemstyle
        avg_wshr_hour.append(one_hour_avg_wshr)
    data['avg_wshr_hour'] = avg_wshr_hour

    avg_curt_hour = []
    for i in range(24):
        one_hour_avg_curt = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_curt['value'] = renewables['avg_curt_hour'][i]
        one_hour_avg_curt['itemStyle'] = itemstyle
        avg_curt_hour.append(one_hour_avg_curt)
    data['avg_curt_hour'] = avg_curt_hour

    # data from each_energy
    avg_wind_hour = []
    for i in range(24):
        one_hour_avg_wind = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_wind['value'] = each_energy['avg_wind_hour'][i]
        one_hour_avg_wind['itemStyle'] = itemstyle
        avg_wind_hour.append(one_hour_avg_wind)
    data['avg_wind_hour'] = avg_wind_hour

    avg_solar_hour = []
    for i in range(24):
        one_hour_avg_solar = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_solar['value'] = each_energy['avg_solor_hour'][i]
        one_hour_avg_solar['itemStyle'] = itemstyle
        avg_solar_hour.append(one_hour_avg_solar)
    data['avg_solar_hour'] = avg_solar_hour

    avg_rooftop_hour = []
    for i in range(24):
        one_hour_avg_rooftop = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_rooftop['value'] = each_energy['avg_rooftop_hour'][i]
        one_hour_avg_rooftop['itemStyle'] = itemstyle
        avg_rooftop_hour.append(one_hour_avg_rooftop)
    data['avg_rooftop_hour'] = avg_rooftop_hour

    avg_gas_hour = []
    for i in range(24):
        one_hour_avg_gas = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_gas['value'] = each_energy['avg_gas_hour'][i]
        one_hour_avg_gas['itemStyle'] = itemstyle
        avg_gas_hour.append(one_hour_avg_gas)
    data['avg_gas_hour'] = avg_gas_hour

    avg_import_hour = []
    for i in range(24):
        one_hour_avg_import = {}
        itemstyle = {}
        itemstyle['color'] = color_cunsumption[i]
        one_hour_avg_import['value'] = each_energy['avg_import_hour'][i]
        one_hour_avg_import['itemStyle'] = itemstyle
        avg_import_hour.append(one_hour_avg_import)
    data['avg_import_hour'] = avg_import_hour

    avg_feedin_hour = []
    for i in range(24):
        one_hour_avg_feedin = {}
        itemstyle = {}
        itemstyle['color'] = color_feedin[i]
        one_hour_avg_feedin['value'] = - usageAndcharge_dict['avg_feedin_hour'][i]
        one_hour_avg_feedin['itemStyle'] = itemstyle
        avg_feedin_hour.append(one_hour_avg_feedin)
    data['avg_feedin_hour'] = avg_feedin_hour

    # frontend request data
    # usage = E1+E2-B1 = consumption - feedin
    usage = [0 for i in range(24)]
    for i in range(24):
        usage[i] = abs(usageAndcharge_dict['avg_consumption_hour'][i] - usageAndcharge_dict['avg_feedin_hour'][i])
    data['graph_usage_max'] = int(max(usage)) + 1

    data['graph_abscost_max'] = int(max([abs(i) for i in usageAndcharge_dict['avg_charge_hour']])) + 1

    user_info = json.dumps(data, ensure_ascii=False)
    print(user_info)
    return user_info

def get_nmi_json(email):
    all_nmi, userinfo_init = account_to_nmi_init(email)
    nmi_info = {}
    data = json.loads(json.dumps(nmi_info))
    data['nmi'] = all_nmi
    nmi_info = json.dumps(data, ensure_ascii=False)
    return nmi_info



