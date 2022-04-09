import sqlite3,os

# create cursor
conn = sqlite3.connect("lhrtest.db")
cur = conn.cursor()

# create table
# create consumptionE1
cur.execute("CREATE TABLE IF NOT EXISTS u2021023123981(\
	date_time timestamp NOT NULL,\
	date_start date NOT NULL,\
	time_start time NOT NULL,\
	workday boolean NOT NULL,\
	E1 FLOAT NOT NULL,\
	E2 FLOAT NOT NULL,\
	B1 FLOAT NOT NULL;\
	")
# create energy
cur.execute("CREATE TABLE IF NOT EXISTS energy_generation (\
    energy_type text PRIMARY KEY NOT NULL,\
    time1 FLOAT NOT NULL,\
    time2 FLOAT NOT NULL,\
    time3 FLOAT NOT NULL,\
    time4 FLOAT NOT NULL,\
    time5 FLOAT NOT NULL,\
    time6 FLOAT NOT NULL,\
    time7 FLOAT NOT NULL,\
    time8 FLOAT NOT NULL,\
    time9 FLOAT NOT NULL,\
    time10 FLOAT NOT NULL,\
    time11 FLOAT NOT NULL,\
    time12 FLOAT NOT NULL,\
    time13 FLOAT NOT NULL,\
    time14 FLOAT NOT NULL,\
    time15 FLOAT NOT NULL,\
    time16 FLOAT NOT NULL,\
    time17 FLOAT NOT NULL,\
    time18 FLOAT NOT NULL,\
    time19 FLOAT NOT NULL,\
    time20 FLOAT NOT NULL,\
    time21 FLOAT NOT NULL,\
    time22 FLOAT NOT NULL,\
    time23 FLOAT NOT NULL,\
    time24 FLOAT NOT NULL);\
    ")

cur.execute("CREATE TABLE IF NOT EXISTS energy_user(\
    energy_type text PRIMARY KEY NOT NULL,\
    bill_period1 bigint NOT NULL,\
    bill_period2 bigint NOT NULL,\
    bill_period3 bigint NOT NULL,\
    bill_period4 bigint NOT NULL);\
    ")

cur.execute("CREATE TABLE IF NOT EXISTS energy_renewables(\
	account_number bigint NOT NULL,\
    time_step time PRIMARY KEY NOT NULL,\
    solar_share FLOAT NOT NULL,\
    wind_share FLOAT NOT NULL,\
    rooftop_share FLOAT NOT NULL,\
    vre_share FLOAT NOT NULL);\
    ")

# cur.execute("create table IF NOT EXISTS test(\
#     column1 bigint not null primary key, column2 date not null, column3 float not null);")

# cur.execute("CREATE TABLE student(id integer,name varchar,sex varchar);")
# cur.execute("CREATE TABLE student(id integer,name varchar,sex varchar);")

# insert
# cur.execute("INSERT INTO student(id,name,sex)VALUES(%s,%s,%s)",(1,'Aspirin','M'))
# cur.execute("INSERT INTO student(id,name,sex)VALUES(%s,%s,%s)",(2,'Taxol','F'))
# cur.execute("INSERT INTO student(id,name,sex)VALUES(%s,%s,%s)",(3,'Dixheral','M'))
#
## get the result
# cur.execute('SELECT * FROM student')
# results=cur.fetchall()
# print (results)

# close cursor
conn.commit()
cur.close()
conn.close()

