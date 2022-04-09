import numpy as np
from datetime import datetime

def getuser_usage_charge(start,end,plan_id,datadict):
    '''->tuple(list,float)'''

    # datadict=np.insert(datadict[:,1:].astype(float),0,datadict[:,0],axis=1)
    # print(datadict[0])
    for onedata in datadict:
        onedata[0]=str(onedata[0])[:13]
    firstdayhour = int(datadict[0][0].split(' ')[-1])
    firstday = datadict[0][0].split(' ')[0]
    for i in range(firstdayhour-1,-1,-1):
        datadict.insert(0,[firstday + ' ' + ('0' + str(i))[-2:], '0', '0','0'])
    # print(datadict)
    print('============================     Start Calculation     =====================================')
    # ====================== consumption ===============================
    alldaysCspt=[] # (day_number x 24)
    alldaysFdin=[]
    allmonths_e2=np.zeros([12,7,24],dtype=float) # (12 x 24)
    allmonths_e1=np.zeros([12,7,24],dtype=float)
    allmonths_b1=np.zeros([12,7,24],dtype=float)

    # processing some special cases, like the time start at 14:00
    i=0
    adayconsumption = []
    adayfeedin=[]
    adaye2 = []
    adaye1 = []
    adayb1 = []
    for atime,e1,e2,b1 in datadict:
        atime=datetime.strptime(atime,"%Y-%m-%d %H")
        i+=1
        e1 = float(e1) if e1 is not None else 0.0
        e2=float(e2) if e2 is not None else 0.0
        b1 = float(b1) if b1 is not None else 0.0
        adaye1.append(e1)
        adaye2.append(e2)
        adayb1.append(b1)
        adayconsumption.append(e1+e2)
        adayfeedin.append(b1)
        if i%24==0:
            # print("----------------")
            alldaysCspt.append(adayconsumption)
            alldaysFdin.append(adayfeedin)
            this_month = atime.month
            this_week = int(atime.strftime("%w"))
            # print(this_month,this_week)
            allmonths_e1[this_month - 1, this_week] += adaye1
            allmonths_e2[this_month - 1, this_week] += adaye2
            allmonths_b1[this_month - 1, this_week] += adayb1
            adayconsumption = []
            adayfeedin=[]
            adaye1 = []
            adaye2 = []
            adayb1 = []



    # ================== Consumption =====================
    ad_csmp = np.array(alldaysCspt)
    sum_csmp = float(np.sum(ad_csmp))
    avg_day_csmp = float(np.average(np.sum(ad_csmp, axis=1)))
    avg_hour_list_csmp = [float(i) for i in np.average(ad_csmp, axis=0)]
    avg_hour_avg_csmp = np.average(np.average(ad_csmp, axis=0))

    ad_fdin = np.array(alldaysFdin)
    sum_fdin = float(np.sum(ad_fdin))
    avg_day_fdin = float(np.average(np.sum(ad_fdin, axis=1)))
    avg_hour_list_fdin = [float(i) for i in np.average(ad_fdin, axis=0)]
    avg_hour_avg_fdin = np.average(np.average(ad_fdin, axis=0))

    # print(sum_csmp,avg_day_csmp,avg_hour_list_csmp,avg_hour_avg_csmp)
    # print(sum_fdin,avg_day_fdin,avg_hour_list_fdin,avg_hour_avg_fdin)

    # ================== Charge (according plan) =============================
    # residential
    if plan_id==1: rows=[4,16,18,20]
    elif plan_id==2: rows=[28,40,42,44]
    elif plan_id==3:rows=[48,60,62,64]
    # business
    elif plan_id==4: rows=[72,87,89,91]
    elif plan_id==5: rows=[98,105,107,109]
    else: rows=[115,127,129,131]

    # other row
    gen_row=rows[0]
    supply_row = rows[1]
    feedin_row = rows[2]
    controlled_row = rows[3]

    import csv
    import os
    plan_file_path=f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic/LogicCalculation/encapsulation_functions/plans.csv"
    with open(plan_file_path, "r", newline="",encoding='utf-8') as f:
        rd = csv.reader(f)
        alldata = np.array(list(rd), dtype=object)
        if plan_id in [1,2,3,6]:
            plan_general_use=alldata[gen_row:gen_row+12,1:25].astype(np.float64)
            plan_general_use_mwh = np.expand_dims(plan_general_use, axis=1).repeat(7, axis=1)  # 3d array
        elif plan_id==4:
            plan_general_use=alldata[gen_row:gen_row+7,1:25].astype(np.float64)
            plan_general_use2=alldata[gen_row+8:gen_row+8+7,1:25].astype(np.float64)
            plan_general_use_mwh = np.expand_dims(plan_general_use, axis=0).repeat(12, axis=0)
            print(plan_general_use_mwh.shape)
            for m in [3,4,5,6,7,8]:
                plan_general_use_mwh[m]=plan_general_use2
        else:# plan=5
            plan_general_use = alldata[gen_row:gen_row + 7, 1:25].astype(np.float64)
            plan_general_use_mwh = np.expand_dims(plan_general_use, axis=0).repeat(12, axis=0)

        plan_feed_in=alldata[feedin_row,1:25].astype(np.float64)
        plan_controlled_load=alldata[controlled_row,1:25].astype(np.float64)
        plan_supply=float(alldata[supply_row][1])
        # print(plan_general_use)
    f.close()

    numberOfDays = len(alldaysCspt)

    sum_general_use=np.sum(allmonths_e1 * plan_general_use_mwh) * 0.01
    sum_feed_in=np.sum(np.sum(allmonths_b1,axis=(0,1)) * plan_feed_in) * 0.01
    sum_ctrl_load = np.sum(np.sum(allmonths_e2, axis=(0,1)) * plan_controlled_load) * 0.01
    sum_supply_charge=plan_supply*numberOfDays*0.01
    sum_charge=sum_general_use+sum_supply_charge +sum_ctrl_load
    sum_credit=sum_feed_in
    # Sum of Charge= General use - Feed-in tariff + Controlled load + Supply charge
    # 1998.07418
    # 0.1976523355248385


    # 24 points average in one day
    avg_general_use = np.sum(allmonths_e1 * plan_general_use_mwh, axis=(0,1))/numberOfDays * 0.01
    avg_feed_in = np.sum(allmonths_b1, axis=(0,1)) * plan_feed_in /numberOfDays* 0.01
    avg_ctrl_load = np.sum(allmonths_e2, axis=(0,1)) * plan_controlled_load /numberOfDays*0.01
    avg_supply_charge = np.array([plan_supply*0.01/len([j for j in avg_hour_list_csmp if j!=0]) if i!=0 else 0 for i in avg_hour_list_csmp]) # ??
    avg_charge_hour=avg_general_use+avg_ctrl_load+avg_supply_charge
    avg_credit_hour =avg_feed_in
    # print(avg_charge_hour,avg_credit_hour)
    # print(sum_charge,sum_credit)


    # TIPs:
    #   Waiting for the completion of frontend design, I will provide separately date to frontend
    #   (But now, I give them together data)
    # '''
    # print('---------------If Separate usage(E1+E2) from feed_in solar(B1)----------------')
    # userinfo_e1e2 = {}
    # userinfo_e1e2['sum_usage'] = "%.2f"%(sum_csmp)  # float
    # userinfo_e1e2['avg_usage_day_avg'] = "%.2f"%(avg_day_csmp) # float
    # userinfo_e1e2['avg_usage_hour'] = [i for i in avg_hour_list_csmp]  # list(float), length=24
    # userinfo_e1e2['avg_usage_hour_avg']="%.2f"%(avg_hour_avg_csmp)
    # userinfo_e1e2['avg_charge_hour']= [i for i in list(avg_charge_hour)]
    # userinfo_e1e2['sum_charge']="%.2f"%(sum_charge) #flaot
    # userinfo_e1e2['avg_charge']="%.2f"%(sum_charge/sum_csmp)
    # print("E1+E2,  Charge")
    # print(userinfo_e1e2)
    #
    # userinfo_b1={}
    # userinfo_b1['sum_feedin'] = "%.2f" % (sum_fdin)  # float
    # userinfo_b1['avg_feedin_day_avg'] = "%.2f" % (avg_day_fdin)  # float
    # userinfo_b1['avg_feedin_hour'] = [i for i in avg_hour_list_fdin]  # list(float), length=24
    # userinfo_b1['avg_feedin_hour_avg'] = "%.2f" % (avg_hour_avg_fdin)
    # userinfo_b1['avg_credit_hour'] = [i for i in list(avg_credit_hour)]
    # userinfo_b1['sum_credit'] = "%.2f" % (sum_credit)  # flaot
    # userinfo_b1['avg_credit'] = "%.2f" % (sum_credit / sum_fdin)
    # print('B1,  Credit')
    # print(userinfo_b1)
    # '''

    print('------------------ Together ---------------------')
    print('E1+E2-B1,  amount')
    userinfo_all={}
    userinfo_all['sum_consumption'] = "%.2f" % (sum_csmp-sum_fdin)  # float
    userinfo_all['avg_consumption_day_avg'] = "%.2f" % (avg_day_csmp-avg_day_fdin)  # float
    userinfo_all['avg_consumption_hour'] = [j for j in avg_hour_list_csmp]  # list(float), length=24
    userinfo_all['avg_feedin_hour']=[i for i in avg_hour_list_fdin]
    userinfo_all['avg_consumption_hour_avg'] = "%.2f" % (avg_hour_avg_fdin)
    userinfo_all['avg_charge_hour'] = [j-i for j,i in zip(list(avg_charge_hour),list(avg_credit_hour))]
    userinfo_all['sum_charge'] = "%.2f" % (sum_charge-sum_credit)  # flaot
    userinfo_all['avg_charge'] = "%.2f" % ((sum_charge-sum_credit) / (sum_csmp-sum_fdin) )
    print(userinfo_all)

    # for i in userinfo:
    #     print(i,userinfo[i])
    # # print(userinfo)
    return userinfo_all, (allmonths_e1,allmonths_e2,allmonths_b1,numberOfDays)






def get_recommend_plan(currentPlanId,currentSumCharge,usertype,monthdata):

    allmonths_e1 = monthdata[0]
    allmonths_e2 = monthdata[1]
    allmonths_b1 = monthdata[2]
    numberOfDays = monthdata[-1]
    print("================ Compare Plans, get Best Plan ==============")
    # ==================Compare plans according their Charge  =============================
    import csv
    import os
    plan_file_path = f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic/LogicCalculation/encapsulation_functions/plans.csv"
    with open(plan_file_path, "r", newline="", encoding='utf-8') as f:
        rd = csv.reader(f)
        alldata = np.array(list(rd), dtype=object)
        bestplanid=0
        if usertype=='RESIDENT': planlist=[1,2,3]
        else: planlist=[4,5,6]
        bestcharge=currentSumCharge
        for plan_id in planlist:
            if plan_id==currentPlanId: continue
            # residential
            if plan_id == 1:
                rows = [4, 16, 18, 20]
            elif plan_id == 2:
                rows = [28, 40, 42, 44]
            elif plan_id == 3:
                rows = [48, 60, 62, 64]
            # business
            elif plan_id == 4:
                rows = [72, 87, 89, 91]
            elif plan_id == 5:
                rows = [98, 105, 107, 109]
            else:
                rows = [115, 127, 129, 131]

            # other row
            gen_row = rows[0]
            supply_row = rows[1]
            feedin_row = rows[2]
            controlled_row = rows[3]
            if plan_id in [1, 2, 3, 6]:
                plan_general_use = alldata[gen_row:gen_row + 12, 1:25].astype(np.float64)
                plan_general_use_mwh = np.expand_dims(plan_general_use, axis=1).repeat(7, axis=1)  # 3d array
            elif plan_id == 4:
                plan_general_use = alldata[gen_row:gen_row + 7, 1:25].astype(np.float64)
                plan_general_use2 = alldata[gen_row + 8:gen_row + 8 + 7, 1:25].astype(np.float64)
                plan_general_use_mwh = np.expand_dims(plan_general_use, axis=0).repeat(12, axis=0)
                print(plan_general_use_mwh.shape)
                for m in [3, 4, 5, 6, 7, 8]:
                    plan_general_use_mwh[m] = plan_general_use2
            else:  # plan=5
                plan_general_use = alldata[gen_row:gen_row + 7, 1:25].astype(np.float64)
                plan_general_use_mwh = np.expand_dims(plan_general_use, axis=0).repeat(12, axis=0)

            plan_feed_in = alldata[feedin_row, 1:25].astype(np.float64)
            plan_controlled_load = alldata[controlled_row, 1:25].astype(np.float64)
            plan_supply = float(alldata[supply_row][1])
            # print(plan_general_use)

            sum_general_use = np.sum(allmonths_e1 * plan_general_use_mwh) * 0.01
            sum_feed_in = np.sum(np.sum(allmonths_b1, axis=(0, 1)) * plan_feed_in) * 0.01
            sum_ctrl_load = np.sum(np.sum(allmonths_e2, axis=(0, 1)) * plan_controlled_load) * 0.01
            sum_supply_charge = plan_supply * numberOfDays * 0.01
            sum_charge = float(sum_general_use + sum_supply_charge + sum_ctrl_load-sum_feed_in)
            if sum_charge<bestcharge:
                bestplanid=plan_id
                bestcharge=sum_charge

    f.close()
    return bestplanid,bestcharge
