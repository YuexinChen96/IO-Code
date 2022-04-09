import requests

res = requests.post('http://127.0.0.1:8000/page1/', json={'acc_num': '9035887',
                                                          'start': '2021-06-14', 'end': '2021-06-16'})
print(res.text)

