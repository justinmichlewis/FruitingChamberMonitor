import RPi.GPIO as gpio
import json
from datetime import datetime
import time
import os

#GPIO SETTINGS
gpio.setmode(gpio.BCM)
FAN1_PIN = 3
FAN2_PIN = 21
gpio.setup(FAN1_PIN,gpio.OUT)
gpio.setup(FAN2_PIN,gpio.OUT)
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
	currentHour = 12#now.hour
	durationSec = 15#60 * data['duration']
	for t in data['times']:
		if t == currentHour:
			print('Starting Fan for ', data['duration'], ' min', 'at ', now)
			gpio.output(FAN1_PIN, True)
			gpio.output(FAN2_PIN, True)
			#SLEEP FOR DURATOIN OF FAN TO RUN THEN STOP
			##print("1", gpio.input(FAN1_PIN))
			#print("2", gpio.input(FAN2_PIN))
			time.sleep(durationSec)
			gpio.output(FAN1_PIN, False)
			gpio.output(FAN2_PIN, False)
			#print("1", gpio.input(FAN1_PIN))
			#print("2", gpio.input(FAN2_PIN))
			print('Fan has Stopped at ', now)
			#SLEEP FOR 1 HOUR AND CHECK AND RUN AGAIN IF APPLICABLE

		else: 
			x = 1
			#print('Not Time')
	print('Sleeping for 1 hour at', now)
	#ACCOUNT FOR THE TIME ELAPSED DURING FAN ON
	time.sleep(hour - durationSec)
			
#gpio.output(FAN_PIN, True)
