import psycopg2
import datetime
import pytz
from pytz import utc
from dateutil import tz
import pandas as pd
from dateutil.relativedelta import relativedelta
import configparser as cp
import os


# ----------------------------------------------------
# read sql configuration and cast into string
# ----------------------------------------------------
def getSQLConfig(filename, dbname):
    cfg = cp.ConfigParser()
    cfg.read(filename)
    _database = cfg.get(dbname, "database")
    _host = cfg.get(dbname, "host")
    _port = cfg.get(dbname, "port")
    _user = cfg.get(dbname, "user")
    _pwd = cfg.get(dbname, "pwd")
    address = "dbname=%s user=%s password=%s host=%s port=%s sslmode=require" % (_database, _user, _pwd, _host, _port)
    return address


# print(getSQLConfig(f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic/LogicCalculation"
#                    f"/encapsulation_functions/SQLConfig.config", "Database_sandbox"))

# ----------------------------------------------------
# cast sql result into list
# ----------------------------------------------------
def dictfetchall(cursor):
    # Return all rows from a cursor as a list
    return [list(row) for row in cursor.fetchall()]


# ----------------------------------------------------
# change time zone into Australia Adelaide time
# ----------------------------------------------------
def changeTimeZone(time, timezone):
    tz = pytz.timezone(timezone)
    new_time = time.astimezone(tz)
    return new_time


# ----------------------------------------------------
# query user basic information based on one email address
# return all_nmi: type=list, all the nmi for one email address
# return userinfo_init: type=dictionary, the first record with nmi, name, title(Mr./Mrs.),
# customer type(business/resident), current plan
# ----------------------------------------------------
def account_to_nmi_init(email):
    # create cursor

    conn = psycopg2.connect(getSQLConfig(f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic"
                                         f"/LogicCalculation/encapsulation_functions/SQLConfig.config",
                                         "Database_sandbox"))
    cur = conn.cursor()

    sql_cmd_nmi = "select nmi, account_name, title, customer_type, " \
                  "case when (regexp_split_to_array(offering_code,'_'))[3] like 'LGHT%' then 'LGHT'" \
                  "when (regexp_split_to_array(offering_code,'_'))[3] like 'MIL%' then 'MIL'" \
                  "when (regexp_split_to_array(offering_code,'_'))[3] like 'SPRK%' then 'SPRK'" \
                  "when (regexp_split_to_array(offering_code,'_'))[3] like 'PLSP%' then 'PLSP'" \
                  "when (regexp_split_to_array(offering_code,'_'))[3] like 'PLS%' then 'PLS'" \
                  "when (regexp_split_to_array(offering_code,'_'))[3] like 'VOLT%' then 'VOLT'" \
                  "else null end as plan " \
                  "from public.customer_account_data " \
                  "where nmi in " \
                  "(select nmi from public.customer_account_data " \
                  "where email_address='" + str(email) + "' and account_status<>'CLOSED') " \
                                                         "and nmi<>'UNKNOWN' " \
                                                         "group by nmi, account_name, title, customer_type, plan " \
                                                         "order by nmi;"
    cur.execute(sql_cmd_nmi)
    df_userinfo = pd.DataFrame(dictfetchall(cur), columns=['nmi', 'account_name', 'title', 'customer_type', 'plan'])
    print(df_userinfo)

    all_nmi = df_userinfo['nmi'].unique().tolist()
    print(all_nmi)
    userinfo_init = df_userinfo.loc[0, :].to_dict()
    print(userinfo_init)

    return all_nmi, userinfo_init


# test code:
# account_to_nmi_init("Wkkpl@Klije.com")


# ----------------------------------------------------
# query user information based on nmi (less duplicates than using email, currently limit to 1)
# return user information: type=list, all results of name, title(Mr./Mrs.),
# customer type(business/resident) and current plan
# ----------------------------------------------------
def get_user_info(nmiID):
    # create cursor
    conn = psycopg2.connect(getSQLConfig(f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic"
                                         f"/LogicCalculation/encapsulation_functions/SQLConfig.config",
                                         "Database_sandbox"))
    cur = conn.cursor()

    sql_userInfo = "select * from " \
                   "(select account_name, title, customer_type, case " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'LGHT%' then 'LGHT' " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'MIL%' then 'MIL' " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'SPRK%' then 'SPRK' " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'PLSP%' then 'PLSP' " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'PLS%' then 'PLS' " \
                   "when (regexp_split_to_array(offering_code,'_'))[3] like 'VOLT%' then 'VOLT' " \
                   "else null end as plan " \
                   "from public.customer_account_data " \
                   "where nmi='" + str(nmiID) + "') A where plan is not null " \
                                                "group by account_name, title, customer_type, plan limit 1"
    print(sql_userInfo)
    cur.execute(sql_userInfo)
    userinfo_nmi = dictfetchall(cur)
    # conn.commit()
    cur.close()
    conn.close()
    print(userinfo_nmi)
    return userinfo_nmi


# test code:
# userinfo_nmi = get_user_info("2001004500")
# print(userinfo_nmi)


# ----------------------------------------------------
# query user consumption based on nmi, start time and end time
# return consumption list separated by suffix and summarized with 1 hour interval: type=list
# ----------------------------------------------------
def get_user_consumption(nmiID, start, end):
    # create cursor
    conn = psycopg2.connect(getSQLConfig(f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic"
                                         f"/LogicCalculation/encapsulation_functions/SQLConfig.config",
                                         "Database_sandbox"))
    cur = conn.cursor()

    # change query time to UTC
    if type(start) == str:
        start = datetime.datetime.strptime(start, "%Y-%m-%d")
    if type(end) == str:
        end = datetime.datetime.strptime(end, "%Y-%m-%d")
    start = start.astimezone(utc)
    end = end.astimezone(utc)

    # query with UTC time
    sql_sumByHour = "select start_time, COALESCE(sum(case when suffix='E1' then interval_sum end),0) as e1_value, " \
                    "COALESCE(sum(case when suffix='E2' then interval_sum end),0) as e2_value, " \
                    "COALESCE(sum(case when suffix='B1' then interval_sum end),0) as b1_value from (" \
                    "select suffix, start_time, sum(interval_value) as interval_sum " \
                    "from (select case when nmi_suffix='E1' then 'E1'" \
                    "when nmi_suffix like 'E%' then 'E2'" \
                    "when nmi_suffix like 'B%' then 'B1' else null end as suffix, " \
                    "to_char(start_time, 'yyyy-mm-dd HH24') as interval_start, min(start_time) as start_time, " \
                    "case when uom='WH' then sum(interval_value)/1000 else sum(interval_value) end as interval_value," \
                    " uom " \
                    "FROM public.veiw_energy_market_data_no_duplicates where nmi='" + str(nmiID) \
                    + "' and nmi_suffix not like 'Q%' and nmi_suffix not like 'K%'" \
                      "and start_time>='" + str(start) + "' and end_time<='" + str(end) \
                    + "' group by nmi_suffix, interval_start, uom) A " \
                      "group by suffix, start_time) kk GROUP BY start_time;"
    print(sql_sumByHour)
    cur.execute(sql_sumByHour)
    data_sum = pd.DataFrame(dictfetchall(cur), columns=['start_time',
                                                        'e1_value',
                                                        'e2_value',
                                                        'b1_value'])

    # change result time to Adelaide
    data_sum['start_time'] = data_sum['start_time'].apply(lambda x: changeTimeZone(x, 'Australia/Adelaide'))
    data_sum_list = data_sum.values.tolist()
    # sumE1 = data_sum.loc[data_sum["suffix"] == 'E1']
    # sumE2 = data_sum.loc[data_sum["suffix"] == 'E2']
    # sumB1 = data_sum.loc[data_sum["suffix"] == 'B1']
    # conn.commit()

    # old version, full data:
    # sql_cmd_1 = "SELECT * FROM public.veiw_energy_market_data_no_duplicates where nmi='" + \
    #             str(nmiID) + "' and start_time>='" + str(start) + "' and end_time>='" + str(
    #     end) + "' and nmi_suffix='E1';"
    # print(sql_cmd_1)
    # cur.execute(sql_cmd_1)
    # data_E1 = dictfetchall(cur)
    # for value in data_E1:
    #     value[3] = datetime.datetime.strftime(value[3], "%Y-%m-%d %H:%M:%S")
    #     value[4] = datetime.datetime.strftime(value[4], "%Y-%m-%d %H:%M:%S")
    # data_E1 = pd.DataFrame(data_E1, columns=['nmi',
    #                                          'meter_serial_number',
    #                                          'nmi_suffix',
    #                                          'start_time',
    #                                          'end_time',
    #                                          'interval_length',
    #                                          'interval_value',
    #                                          'uom',
    #                                          'record_created',
    #                                          'data_source',
    #                                          'source_filename'])

    cur.close()
    conn.close()
    return data_sum_list


# test code:
# data_sum = get_user_consumption("2001010596", "2021-10-12", "2021-10-15")
# print(data_sum)


# ----------------------------------------------------
# query energy share for latest 3 years
# the end time for the results is the day before query time
# return energy share data for latest 3 years: type=list
# ----------------------------------------------------
def get_energy_share_3y():
    conn = psycopg2.connect(getSQLConfig(f"{os.path.abspath(__file__).split('Backend_Logic')[0]}Backend_Logic"
                                         f"/LogicCalculation/encapsulation_functions/SQLConfig.config",
                                         "Database_sandbox"))
    cur = conn.cursor()

    end_date = datetime.datetime.now() - relativedelta(days=10)
    start_date = end_date - relativedelta(days=1)

    sql_energy_3y = "select settlement_date, wind_share, solar_share, rooftop_share, gas_share, import_share, " \
                    "renewable_share, curtailment_share, sum_demand " \
                    "from (select *,row_number() over(partition by settlement_date)as rn " \
                    "from public.energy_share) as t1 " \
                    "where t1.rn=1 and settlement_date>='" + start_date.strftime("%Y-%m-%d") + \
                    "' and settlement_date<'" + end_date.strftime("%Y-%m-%d") + "' "
    print(sql_energy_3y)
    cur.execute(sql_energy_3y)
    energy_share = dictfetchall(cur)
    print(energy_share)

    cur.close()
    conn.close()
    return energy_share


# test code:
# get_energy_share_3y()


def get_carbon(nmi):
    ADE = tz.gettz('Australia/Adelaide')
    conn = psycopg2.connect(getSQLConfig("SQLConfig.config", "Database_sandbox"))
    cur = conn.cursor()

    # query historical time range for an nmi
    sql_timeRange = "SELECT min(start_time), max(end_time) FROM public.veiw_energy_market_data_no_duplicates " \
                    "where nmi='" + str(nmi) + "'"
    cur.execute(sql_timeRange)
    info = dictfetchall(cur)
    start_time = info[0][0]
    end_time = min(info[0][1], datetime.datetime(2022, 1, 1, 0, 0, tzinfo=ADE))
    print(start_time, end_time)

    # get hourly usage for all history
    usage = pd.DataFrame(get_user_consumption(nmi, start_time, end_time), columns=['start_time',
                                                                                   'e1_value',
                                                                                   'e2_value',
                                                                                   'b1_value'])
    usage['import_usage'] = usage['e1_value'] + usage['e2_value']
    usage = usage[['start_time', 'import_usage']]

    start_actual = usage['start_time'].min()
    end_actual = min(usage['start_time'].max(),datetime.datetime(2022, 1, 1, 0, 0, tzinfo=ADE))
    print(start_actual, end_actual)

    # get energy share for all history
    sql_energy_share = "select settlement_date, wind_share+solar_share+gas_share as other_share, import_share " \
                       "from (select *,row_number() over(partition by settlement_date)as rn " \
                       "from public.energy_share) as t1 " \
                       "where t1.rn=1 and settlement_date>='" + start_actual.strftime("%Y-%m-%d %H:%M:%S") + \
                       "' and settlement_date<'" + end_actual.strftime("%Y-%m-%d %H:%M:%S") + "' order by " \
                                                                                              "settlement_date "
    print(sql_energy_share)
    cur.execute(sql_energy_share)
    en = dictfetchall(cur)
    energy = pd.DataFrame(en, columns=['settlement_date',
                                       'other_share',
                                       'import_share'])

    # get SA carbon emission intensity (for wind, solar and gas) for all history
    sql_intensity_SA1 = "select settlement_date, region_id, emissions_intensity " \
                        "from carbon_emission where region_id='SA1' " \
                        "and settlement_date>='" + start_actual.strftime("%Y-%m-%d %H:%M:%S") + \
                        "' and settlement_date<'" + end_actual.strftime("%Y-%m-%d %H:%M:%S") + "' order by " \
                                                                                               "settlement_date "
    print(sql_intensity_SA1)
    cur.execute(sql_intensity_SA1)
    sa1 = dictfetchall(cur)
    carbon_sa1 = pd.DataFrame(sa1, columns=['settlement_date',
                                            'region_id',
                                            'emissions_intensity'])

    # get VIC carbon emission intensity (for import) for all history
    sql_intensity_VIC = "select settlement_date, region_id, emissions_intensity " \
                        "from carbon_emission where region_id='VIC1' " \
                        "and settlement_date>='" + start_actual.strftime("%Y-%m-%d %H:%M:%S") + \
                        "' and settlement_date<'" + end_actual.strftime("%Y-%m-%d %H:%M:%S") + "' order by " \
                                                                                               "settlement_date "
    print(sql_intensity_VIC)
    cur.execute(sql_intensity_VIC)
    vic = dictfetchall(cur)
    carbon_vic = pd.DataFrame(vic, columns=['settlement_date',
                                            'region_id',
                                            'emissions_intensity'])

    return usage, energy, carbon_sa1, carbon_vic


# test code
# u, e, c1, c2 = get_carbon("2002286717")
# print(u)
# print(e)
# print(c1)
# print(c2)
