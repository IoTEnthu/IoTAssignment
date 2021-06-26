# IoTAssignment
Assignment on IoT development

**Problem Statement-:**
_To build a-->_
1.) Server Program --> Expose a route on an HTTP server or a topic on MQTT broker which accepts data. It should randomly give success or failure for the received data. Each new data should append to a CSV file.

2.) Edge Program --> 
a)  Each data point should be read after every 60-sec delay and publish to the cloud(live data)
b)  If the server returns failure or server is stopped the data point is buffered locally(it now becomes buffered data). 
c)  Publish all the buffered data after every 5 seconds. While cleaning the buffered data the live data should not be stopped, i.e. the program should be properly multithreaded.
d)  Expose a function to get the count of successfully transmitted and buffered data at any point in time.

Example --> 1st & 2nd minute, 1st & 2nd data points published successfully, 3rd & 4th minute, 3rd & 4th data points failed and got buffered, 5th min 5th datapoint and all the buffered data published.

Approach and Understanding -->

We are given a datasheet having 3 fields, named : Time Stamp, Value, Sensor 

The Edge program reads the csv file in the form of list and sends this data to the server with 60 seconds delay. We use request library to post the data on the server by applying the above mentioned functionalities. We use threading library so as to send the buffer data and live data without any mix-up(error).

The server program pushes data into data.csv file under the public folder inside server folder. We local-host the server. We used HTTP protocol for communicating with the server. 



