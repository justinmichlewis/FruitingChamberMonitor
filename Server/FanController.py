import RPi.GPIO as gpio
import json
from datetime import datetime
import time
import os

#GPIO SETTINGS
gpio.setmode(gpio.BCM)
FAN_PIN = 3
gpio.setup(FAN_PIN,gpio.OUT)
gpio.setwarnings(False)

os.system('clear')

while 1:
	now = datetime.now()
	print('----------------------')
	print('Running fan controller')
	print(now)
	print('----------------------')
	#TIME

	print('Current Hour',now.hour)

	#LOAD JSON SETTINGS FILE
	with open('settings.json') as f:
		data = json.load(f)

	print('Times:', data['times'], 'Duration:', data['duration'])

	#RUN FAN IF CURRENT HOUR MATCHES SETTINGS AN
	hour = 3600 #HOUR IN SECONDS
	currentHour = 18#now.hour
	durationSec =  10#60 * data['duration']
	for t in data['times']:
		if t == currentHour:
			print('Starting Fan for ', data['duration'], ' min', 'at ', now)
			gpio.output(FAN_PIN, True)
			#SLEEP FOR DURATOIN OF FAN TO RUN THEN STOP
			time.sleep(durationSec)
			gpio.output(FAN_PIN, False)
			print('Fan has Stopped at ', now)
			#SLEEP FOR 1 HOUR AND CHECK AND RUN AGAIN IF APPLICABLE

		else: 
			print('Not Time')
	print('Sleeping for 1 hour at', now)
	#ACCOUNT FOR THE TIME ELAPSED DURING FAN ON
	time.sleep(hour - durationSec)
			
#gpio.output(FAN_PIN, True)
