from django.http import HttpResponse
from django.http import JsonResponse
import json
import psycopg2
from datetime import datetime
from .Backend_Logic.LogicCalculation.dataResult_and_jsonFormat import *

# create cursor
'''
conn = psycopg2.connect(database="ioenergy_tech", user="postgres", password="Pass2020!", host="localhost", port="5432")
cur = conn.cursor()

def dictfetchall(cursor):
    # Return all rows from a cursor as a dict
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns,row))
        for row in cursor.fetchall()
    ]
def array2dfetchall(cursor):
    # Return all rows from a cursor as a dict
    columns = [col[0] for col in cursor.description]
    return [
        list(row)
        for row in cursor.fetchall()
    ]
'''


# API for page1: user consumption
def Page2_getData(request):
    if request.method == 'POST':
        dic = {}
        return request.body
    ''' 
        if request.body:
            json_str = request.body 
            json_dict = json.loads(json_str)
        # get entry parameters
            account_number = json_dict.gett("acc_num")
            time_startStr = json_dict.get("start")
            time_start = datetime.datetime.strptime(time_startStr, "%Y-%m-%d")
            time_endStr = json_dict.get("end")
            time_end = datetime.datetime.strptime(time_endStr, "%Y-%m-%d")
            if account_number and time_start and time_end:
                # data_search = time_start + ' ' + time_end
                # dic['data'] = data_search
                # charges_amount = '62.05'
                # charges_percent = '25%'
                # dic['charges'] = [charges_amount, charges_percent]
                # consumption_amount = '147.16'
                # consumption_percent = '24.3%'
                # dic['consumption'] = [consumption_amount, consumption_percent]
                # dic['current_plan'] = 'Millennium'
                # charges_detail_list = []
                # for i in range(0, 25, 2):
                #     charges_list = {}
                #     charges_list['time'] = i
                #     charges_list['charges'] = 3.57
                #     charges_list['consumption'] = 3.57
                #     charges_list['date'] = '21 Aug 2021'
                #     charges_list['daily_avg'] = '6.31'
                #     charges_detail_list.append(charges_list)
                # dic['charges_detail'] = charges_detail_list
                #
                # dic = json.dumps(dic)
                # return HttpResponse(dic)

                # get user plan
                cur.execute("select customer_type, nmi, price_plan_code from account where account_number = " + str(
                    account_number))
                userInfo = dictfetchall(cur)[0]
                customer_type = userInfo['customer_type']
                nmi = userInfo['nmi']
                plan = userInfo['price_plan_code']

                # get consumption data from sql
                cur.execute(
                    "select date_start, time_start, workday, e2, e1, b1 from new_user_usage where date_start "
                    "between '" + time_startStr + "' and '" + time_endStr + "'")
                data = array2dfetchall(cur)

                # rst1 = get_userAvgConsumption(time_start, time_end, plan)
                rst = getuser_allinfo(time_start, time_end, plan, data)
                rst['plan'] = plan
                dic = json.dumps(rst)
                return HttpResponse(dic)

            else:
                return HttpResponse('input error')
        else:
            return HttpResponse('empty input')

    else:
        # test db connection
        cur.execute('SELECT * FROM energy_renewables')
        results = cur.fetchall()
        return HttpResponse(results)
        '''


# API for page2: energy
def Page1_getData(request):
    if request.method == 'POST':
        dic = {}
        if request.body:
            json_str = request.body
            json_dict = json.loads(json_str)
            nmi_id = json_dict.get("nmi_id", 0)
            time_start = json_dict.get("start", 0)
            time_end = json_dict.get("end", 0)
            usageAndcharge_dict, plan_info, current_planRate, plan = getPage1data(nmi_id, time_start, time_end)
            renewables, each_energy = getPage2data()
            ret_json = get_userinfo_json(usageAndcharge_dict, plan_info, renewables, each_energy, current_planRate,
                                         plan)
            if time_start and time_end:
                #     data_search = time_start + ' ' + time_end
                #     dic['data'] = data_search
                #     charges_amount = '62.05'
                #     charges_percent = '25%'
                #     dic['charges'] = [6 for i in range(24)]
                #     consumption_amount = '147.16'
                #     consumption_percent = '24.3%'
                #     dic['consumption'] = [consumption_amount, consumption_percent]
                #     dic['current_plan'] = 'Millennium'
                #     charges_detail_list = []
                #     for i in range(0, 25, 2):
                #         charges_list = {}
                #         charges_list['time'] = i
                #         charges_list['charges'] = 3.57
                #         charges_list['consumption'] = 3.57
                #         charges_list['date'] = '21 Aug 2021'
                #         charges_list['daily_avg'] = '6.31'
                #         charges_detail_list.append(charges_list)
                #     dic['charges_detail'] = charges_detail_list

                #     dic = json.dumps(dic)

                # request.session['nmi_name'] = nmi_name
                # print(request.session.get('nmi_name'))
                return HttpResponse(ret_json)
            else:
                return HttpResponse('input error')
        else:
            return HttpResponse('empty input')

    else:
        return HttpResponse('method error')


def Nmi_getData(request):
    if request.method == 'POST':
        dic = {}
        if request.body:
            json_str = request.body
            json_dict = json.loads(json_str)
            email = json_dict.get("email", 0)
            nmi_json = get_nmi_json(email)
            return HttpResponse(nmi_json)
        else:
            return HttpResponse('empty input')

    else:
        return HttpResponse('method error')





