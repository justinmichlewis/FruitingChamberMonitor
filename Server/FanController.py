###################################################################
# Fan Controller runs on an infiniate loop to start and stop	  #
# the exhaust fans in the fruiting chamber. Fan controller checks #
# settings.json file to retreive when to run and for how log. 	  #
# settings.json file is defined via the web app and writted to    #
# via restcontroller.js.										  #
#																  #
# June 30, 2020													  #
###################################################################

import RPi.GPIO as gpio
import json
from datetime import datetime
import time
import os
import json

# GPIO SETTINGS
gpio.setmode(gpio.BCM)
FAN1_PIN = 17
FAN2_PIN = 21
gpio.setup(FAN1_PIN, gpio.OUT)
gpio.setup(FAN2_PIN, gpio.OUT)
gpio.setwarnings(False)

os.system('clear')

while 1:
    now = datetime.now()
    print('----------------------')
    print('Running fan controller')
    print(now)
    print('----------------------')

    # LOAD JSON SETTINGS FILE
    with open('settings.json') as f:
        data = json.load(f)

    # OPEN LOGFILE
    logFile = open('Fanlog.log', 'a')
    logLine = ''
    print('Times:', data['times'], 'Duration:', data['duration'])

    # RUN FAN IF CURRENT HOUR MATCHES SETTINGS AN
    hour = 3600  # HOUR IN SECONDS
    currentHour = now.hour
    durationSec = 60 * data['duration']
    for t in data['times']:
        if t == currentHour:
            startTime = datetime.now()

            print('Starting Fan for ',
                  data['duration'], ' min', 'at ', startTime)

            gpio.output(FAN1_PIN, True)
            gpio.output(FAN2_PIN, True)

            time.sleep(durationSec)

            gpio.output(FAN1_PIN, False)
            gpio.output(FAN2_PIN, False)

            print('Fan has Stopped at ', datetime.now())
            timeDiff = str(datetime.now() - startTime)

            logLine = startTime.strftime("%m/%d/%Y %H:%M:%S") + ' | ' + datetime.now().strftime(
                "%m/%d/%Y  %H:%M:%S") + ' | ' + timeDiff + ' | ' + str(data['duration']) + " | " + str(data['times']) + "; \n"

            logFile.write(logLine)
        else:
            p = 1  # BS CODE FOR NOW

    print('Sleeping for 1 hour at', now)
    # ACCOUNT FOR THE TIME ELAPSED DURING FAN ON
    sleepTime = datetime.now()
    time.sleep(hour - durationSec)


################################################
# BELOW THIS IS ANTIQUATED CODE SAVE IF NEEDED #
################################################
    # logLine = {
    #	"start": startTime.strftime("%m/%d/%Y %H:%M:%S"),
    #	"end": datetime.now().strftime("%m/%d/%Y  %H:%M:%S"),
    #	"actualDurr": str(timeDiff)[0:7],
    #	"scheduledDurr": str(data['duration']),
    #	"runTimes": str(data['times'])
    # }
    # print(json.dumps(logLine))
    # logFile.write(json.dumps(logLine))

    # print(writeLog)
    # if writeLog:
    #	sleepDur =  str(datetime.now() - sleepTime) + "\n"
    #	output = logLine + ' | '+ sleepDur + ';'
    #	logFile.write(output)
    #	print("Log W to File")
