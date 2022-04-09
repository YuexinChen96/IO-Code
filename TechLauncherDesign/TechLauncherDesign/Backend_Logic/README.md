# Backend_Logic

> Explanations of all files in backend_logic folder
> 
> ( The code is all in the constant update phase ) 

### 1. LogicCalculation folder
* encapsulation_function
    
    * get_data_from_database.py:  get date from database.
      * account_to_nmi_init():  get account information according to email(get from frontend).
      * get_user_info():  get user's plan and type information according to the nmi. 
      * get_user_consumption():  get energy usage data according to the nmi and time range(get from frontend).
    
    * page1_cal.py:  It corresponds to the frontend page1, it contains many values about user's usage and charge, and some plan info.
      * getuser_usage_charge():  according to the usage data and io plans(plans.csv) to calculate user usage and charge on different dimensions, which
        contains sum and average value...
      * get_recommend_plan():  compare all plans to current plan, and give the user better plan.
  
    * page2_cal.py:  It corresponds to the frontend page2, it contains nem data of SA from open source website, page2 many do some compare between user's usage and the whole South Australia energy data.
      * get_nem_sa_data:  get renewables energy share and amount of each energy source (SA).
  
    * plans.csv:  
      - it stores six plan price (each plan have different price in different month, weekday, hour).
      - it is based on the plan information of io energy website.


* dataResult_and_jsonFormat.py:  through those encapsulation functions, we can get calculation result.
    * getPage1data():  get the usage and charge result of the user(nmi), and current and recommend plan.
    * getPage2data():  get renewables and each energy data result.
    * get_info_json():  convert these data result to json format to support the API. 


### 2. automatical_scrape folder
* It's the automated script
* The aim is to update data every night: scrape new one day data and insert into table.


### 3. data_csv_file folder
* energy_share.csv:  store nem data of SA which is scraped from nemlog website (scrape_data.py).
  * now, we are inserting the data of this csv file into energy_share table. After finishing insert, this .csv can be deleted, and we can get data from db to do calculation.


