# from django.http import HttpResponse
# import json
import psycopg2
# from datetime import datetime
def dictfetchall(cursor):
    # Return all rows from a cursor as a dict
    columns = [col[0] for col in cursor.description]
    return [
        list(row)
        for row in cursor.fetchall()
    ]
# create cursor
# conn = psycopg2.connect(database="ioenergy_tech", user="postgres", password="Pass2020!", host="localhost", port="5432")
conn = psycopg2.connect(database="sandbox", user="techlauncher", password="tl2022ioenergy",
                        host="io-db-dev-core.cluster-cz9fjfdq3ayr.ap-southeast-2.rds.amazonaws.com", port="5432", sslmode='require')
print(conn)
cur = conn.cursor()

print(cur)

time_start = "2021-06-14"
time_end = "2021-08-30"
cur.execute("select date_start, time_start, workday, e2, e1, b1 from new_user_usage where date_start between '"+ time_start+ "' and '" + time_end + "'")
data = dictfetchall(cur)
print(data)

# datadict = JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})
# cur.execute("select date_start, time_start, workday, e2, e1, b1 from new_user_usage where date_start between '"+ time_start+ "' and '" + time_end + "'")

# account_number = 9035887
# cur.execute("select customer_type, nmi, price_plan_code from account where account_number = "+str(account_number))
# userInfo = dictfetchall(cur)[0]
# customer_type = userInfo['customer_type']
# nmi = userInfo['nmi']
# plan = userInfo['price_plan_code']
# print(customer_type, nmi, plan)

# cur.execute("select sum(e2) as e2_sum, sum(e1) as e1_sum, sum(b1) as b1_sum from new_user_usage where date_start between '" + time_start + "' and '" + time_end + "'")
# data = dictfetchall(cur)[0]
# total_consum = round(data['e2_sum']+data['e1_sum'] - data['b1_sum'], 2)
# print(data)
# print(total_consum)

