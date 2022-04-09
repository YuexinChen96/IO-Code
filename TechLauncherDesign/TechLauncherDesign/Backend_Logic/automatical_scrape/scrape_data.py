import datetime
import pandas as pd
import numpy as np
import csv
from apscheduler.schedulers.blocking import BlockingScheduler
import sys
import psycopg2
from dateutil.relativedelta import relativedelta


def scrape_data():
    # ----------------------------------------------------
    #  Scrape energy data for the last day from 'nemlog.com.au' and insert into database (table 'public.energy_share')
    #  Executed every day
    # ----------------------------------------------------

    # get last day's generation data(each energy share and sum of demand)
    x = (datetime.datetime.now() - relativedelta(days=1)).strftime("%Y%m%d")
    date_range = (x + "/" + x)
    print(date_range)

    # save into csv temporarily
    csv_path = '../data_csv_file/energy_share.csv'
    data = pd.read_csv('http://nemlog.com.au/show/saenergysourcesharesvre/' + date_range + '/NEMLOG.csv?transpose=1')
    data.to_csv(csv_path)
    print('energy share for ' + str(x) + ': csv saved.')

    # insert csv data into database (table 'energy_share')
    conn = psycopg2.connect(database="sandbox", user="techlauncher", password="tl2022ioenergy",
                            host="io-db-dev-core.cluster-cz9fjfdq3ayr.ap-southeast-2.rds.amazonaws.com",
                            port="5432",
                            sslmode='require')
    cur = conn.cursor()
    with open(csv_path, "r", encoding='utf-8') as f:
        reader = csv.reader(f)
        # slice the column name and the last record to avoid duplicate data
        alldata = np.array(list(reader), dtype=object)[1:-1]
        print(len(alldata))
        for i in alldata:
            sql = f"insert into public.energy_share " \
                  f"values('{i[1]}','{i[2]}','{i[3]}','{i[4]}','{i[9]}','{i[10]}','{i[14]}','{i[15]}','{i[17]}')"
            print(sql)
            cur.execute(sql)
            conn.commit()
    cur.close()
    print('energy share for ' + str(x) + ': sql insert finished.')


# ----------------------------------------------------
# crontab for scrape_data, executed on 6 am every day
# ----------------------------------------------------
scheduler = BlockingScheduler()

# add execution log
class Logger(object):
    def __init__(self, filename='default.log', stream=sys.stdout):
        self.terminal = stream
        self.log = open(filename, 'w')

    def write(self, message):
        self.terminal.write(message)
        self.terminal.flush()
        self.log.write(message)
        self.log.flush()

    def flush(self):
        pass


sys.stdout = Logger("cron_job.log", sys.stdout)
sys.stderr = Logger("cron_job.log_err", sys.stderr)

# start crontab
print('execution start.')
scheduler.add_job(scrape_data, 'cron', hour=10, minute='00', second='01')
scheduler.start()


# test code:
# scrape_data()
