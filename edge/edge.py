import csv
import time
import requests as req
import os
import json
import threading


class Edge:

    def __init__(self):
        self.count = 0
        self.file_path = os.getcwd()+"/dataset.csv"
        self.topicurl = "http://localhost:3001/topic"
        self.bufferurl = "http://localhost:3001/buffer"
        self.payload = {}
        self.header = {"Content-Type":"application/json"}
        self.buffer = []


    def readData(self):
        with open(self.file_path, mode ='r')as file:
            csvFile = csv.reader(file)
            for lines in csvFile:
                self.payload["timestamp"]= lines[0]
                self.payload["value"] = lines[1]
                self.payload["sensor"]=lines[2]
                try:
                    post_res = req.post(self.topicurl, json=self.payload,headers=self.header)
                    status = json.loads(post_res.text)
                    if status["status"] == 200:
                        print(status)
                    else:
                        self.buffer.append(self.payload)
                except:
                    self.buffer.append(self.payload)
                    print("error in readData function")
                time.sleep(60)
    def buffer_send(self):
        while True:
            if len(self.buffer) > 0:
                try:
                    post_res = req.post(self.bufferurl, json=self.buffer,headers=self.header)
                    status = json.loads(post_res.text)
                    if status["status"] != 200:
                        print("some error in server")
                    else:
                        self.buffer= []
                        print("buffer send successfully")
                except:
                    self.buffer= []
                    print("some error in server")
            time.sleep(5)

obj = Edge()

t1 = threading.Thread(target=obj.readData, name='t1')
t2 = threading.Thread(target=obj.buffer_send, name='t2')  

t1.start()
t2.start()

t1.join()
t2.join()