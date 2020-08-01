#this example reads and prints CO2 equiv. measurement, TVOC measurement, and temp every 2 seconds

from time import sleep
from Adafruit_CCS811 import Adafruit_CCS811
import RPi.GPIO as gpio
from datetime import datetime
import json


# GPIO FAN SETTINGS
gpio.setmode(gpio.BCM)
FAN1_PIN = 17
FAN2_PIN = 21
gpio.setwarnings(False)
gpio.setup(FAN1_PIN, gpio.OUT)
gpio.setup(FAN2_PIN, gpio.OUT)
#on start ensure fans are in off state
gpio.output(FAN1_PIN, False)
gpio.output(FAN2_PIN, False)

ccs =  Adafruit_CCS811()



while not ccs.available():
	pass

errorValueUpper = 3000
errorValueLower = 0
threshold = 500 #deault


while 1:
	if ccs.available():
		# LOAD JSON SETTINGS FILE
		with open('settings.json') as f:
			data = json.load(f)
		print(data["threshold"])
		print (datetime.today(),"\n-------------\nCO2: ", ccs.geteCO2(), "ppm\nTVOC: ", ccs.getTVOC(),"\n")
		if not ccs.readData():
			print("FIRST IF")
			if ccs.geteCO2() > errorValueLower and ccs.geteCO2() < errorValueUpper:		
				print("SECOND IF")				
				if  ccs.geteCO2() > data["threshold"]:
					print("THIRD IF")
					print("ALERT! CO2 level is ",ccs.geteCO2(), " threshold is ",threshold)
					print("Starting fan to exhaust CO2 at ", datetime.today())
					while ccs.geteCO2() > data["threshold"]:
						fo = open("CO2.txt", "w")
						ccs.readData()
						print("Run Fan: Current CO2 ", ccs.geteCO2())
						gpio.output(FAN1_PIN, True)
						gpio.output(FAN2_PIN, True)
						fo.write( str(ccs.geteCO2()))
						fo.close()
						sleep(3)
					gpio.output(FAN1_PIN, False)
					gpio.output(FAN2_PIN, False)
					print("CO2 at acceptable level, stopping fan at ", datetime.today())
				else:
					fo = open("CO2.txt", "w")
					fo.write(str(ccs.geteCO2()))
					fo.close()
					
					
						
			else:
				print("Error Value ", ccs.geteCO2())
			f.close()
		else:
			print ("ERROR!")
			while 1 :
				pass
	
	sleep(3)
