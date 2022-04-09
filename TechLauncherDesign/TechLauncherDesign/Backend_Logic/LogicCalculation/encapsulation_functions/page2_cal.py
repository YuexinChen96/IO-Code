import csv
import numpy as np

# Analyse the data from opennem about energy generation of SA of recent 3 years.
def get_nem_sa_data():
    '''
    return: tuple(dict,dict)
            first dict: renewable energy {str:list() }
            second dict: each energy  {str:list() }
    '''
    import os
    plan_file_path = f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic/data_csv_file/energy_share.csv"
    with open(plan_file_path, "r",encoding='utf-8') as f:
        reader = csv.reader(f)
        alldata=np.array(list(reader),dtype=object)[1:]
    len_row=len(alldata)
    print(len_row)

    allday_wshr=[]
    allday_curt=[]
    allday_sumDemand=[]
    allday_wind=[]
    allday_solar=[]
    allday_rooftop=[]
    allday_gas=[]
    allday_import=[]

    for d in range((int(len(alldata)/288))):
        aday = []
        aday_wshr = []
        aday_curt = []

        aday_sumDemand=[]
        aday_wind=[]
        aday_solar=[]
        aday_rooftop=[]
        aday_gas=[]
        aday_import=[]

        for i in range(24):
            eachhour_wshr=0
            eachhour_curt=0
            eachhour_sumDemand=0
            eachhour_wind=0
            eachhour_solar=0
            eachhour_rooftop=0
            eachhour_gas=0
            eachhour_import=0
            for j in range(12):
                eachhour_wshr+=float(alldata[i*12+j + d*288][14])
                eachhour_curt += float(alldata[i * 12 + j + d * 288][15])
                eachhour_sumDemand+=float(alldata[i * 12 + j + d * 288][17])
                eachhour_wind+=float(alldata[i * 12 + j + d * 288][2])
                eachhour_solar += float(alldata[i * 12 + j + d * 288][3])
                eachhour_rooftop += float(alldata[i * 12 + j + d * 288][4])
                eachhour_gas += float(alldata[i * 12 + j + d * 288][9])
                eachhour_import+=float(alldata[i * 12 + j + d * 288][10])

            aday_wshr.append(eachhour_wshr/12)
            aday_curt.append(eachhour_curt/12)
            aday_sumDemand.append(eachhour_sumDemand/12)
            aday_wind.append(eachhour_wind / 12*0.01)
            aday_solar.append(eachhour_solar / 12*0.01)
            aday_rooftop.append(eachhour_rooftop/ 12*0.01)
            aday_gas.append(eachhour_gas / 12*0.01)
            aday_import.append(eachhour_import/12*0.01)
        allday_wshr.append(aday_wshr)
        allday_curt.append(aday_curt)
        allday_sumDemand.append(aday_sumDemand)
        allday_wind.append(aday_wind)
        allday_solar.append(aday_solar)
        allday_rooftop.append(aday_rooftop)
        allday_gas.append(aday_gas)
        allday_import.append(aday_import)


    avg_wshr_hour=np.average(np.array(allday_wshr),axis=0)
    avg_curt_hour=np.average(np.array(allday_curt),axis=0)


    avg_wind_hour=np.average(np.array(allday_wind)*np.array(allday_sumDemand),axis=0)
    avg_solor_hour=np.average(np.array(allday_solar)*np.array(allday_sumDemand),axis=0)
    avg_rooftop_hour=np.average(np.array(allday_rooftop)*np.array(allday_sumDemand),axis=0)
    avg_gas_hour=np.average(np.array(allday_gas)*np.array(allday_sumDemand),axis=0)
    avg_import_hour=np.average(np.array(allday_import)*np.array(allday_sumDemand),axis=0)


    
    print(list(avg_wshr_hour))
    print(list(avg_curt_hour))

    print("--------------------------------")
    print(list(avg_wind_hour))
    print(list(avg_solor_hour))
    print(list(avg_rooftop_hour))
    print(list(avg_gas_hour))
    print(list(avg_import_hour))
    
    
    
    
    # Draw these diagrams in order to see if the data is normal
    '''
    # Corresponding to the first graph on the page2 of dashboard 
    import matplotlib.pyplot as plt
    times = [t for t in range(24)]
    plt.plot(times, avg_wshr_hour,marker = "o",markersize=1,linewidth=1.5,label='wshrShare(renewables)')
    plt.plot(times, avg_curt_hour,marker = "o",markersize=1,linewidth=1.5,label='curtShare(curtailment)')
    plt.ylabel('share(%)')
    plt.xticks([i*1 for i in range(24)], [str(i)+':00' for i in range(24)],color='blue',rotation=60)
    plt.title('Average Percent of Renewable Energy(opennem data)\n(over the last 3 years)')
    plt.legend()
    plt.show()

    # Corresponding to the first graph on the page2 of dashboard
    times = [t for t in range(24)]
    plt.plot(times, avg_wind_hour,marker = "o",markersize=1,linewidth=1.5,label='wind')
    plt.plot(times, avg_solor_hour,marker = "o",markersize=1,linewidth=1.5,label='solar')
    plt.plot(times, avg_rooftop_hour,marker = "o",markersize=1,linewidth=1.5,label='rooftop')
    plt.plot(times, avg_gas_hour,marker = "o",markersize=1,linewidth=1.5,label='gas')
    plt.plot(times, avg_import_hour,marker = "o",markersize=1,linewidth=1.5,label='import')
    plt.ylabel('generation(MW)')
    plt.xticks([i for i in range(24)], [str(i)+':00' for i in range(24)],color='blue',rotation=60)
    plt.title('Average Level of Energy Generation(opennem data)\n(over the last 3 years)')
    plt.legend()
    plt.show()
    '''
    
    
    # first diagram
    avg_wshr_hour=[i if i>=0 else 0 for i in avg_wshr_hour]
    avg_curt_hour=[i if i>=0 else 0 for i in avg_curt_hour]
    renewables_energy={'avg_wshr_hour':avg_wshr_hour,'avg_curt_hour':avg_curt_hour}
    
    # second diagram
    avg_wind_hour=[i if i>=0 else 0 for i in avg_wind_hour]
    avg_solor_hour = [i if i >= 0 else 0 for i in avg_solor_hour]
    avg_rooftop_hour = [i if i >= 0 else 0 for i in avg_rooftop_hour]
    avg_gas_hour = [i if i >= 0 else 0 for i in avg_gas_hour]
    avg_import_hour=[i if i >= 0 else 0 for i in avg_import_hour]
    each_energy = {'avg_wind_hour':avg_wind_hour,'avg_solor_hour':avg_solor_hour,\
                   'avg_rooftop_hour':avg_rooftop_hour,'avg_gas_hour':avg_gas_hour,'avg_import_hour':avg_import_hour}
    return renewables_energy,each_energy


# calculate carbon emission per day for one nmi across all historical time range
def get_carbon_data(usage, energy, carbon_sa1, carbon_vic):
    # for (24h):
    #     day_sum=0
    #     usg = usage['import_usage'][]


    return

