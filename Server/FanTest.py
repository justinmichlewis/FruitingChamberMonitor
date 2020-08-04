import RPi.GPIO as gpio

# GPIO SETTINGS
gpio.setmode(gpio.BCM)
FAN1_PIN = 17
FAN2_PIN = 21
gpio.setup(FAN1_PIN, gpio.OUT)
gpio.setup(FAN2_PIN, gpio.OUT)
gpio.setwarnings(False)

while 1:
	x = input()
	print(x)
	if x == '1':
		print("Turning Fans On")
		gpio.output(FAN1_PIN, True)
		gpio.output(FAN2_PIN, True)
	elif x == '0':
		print("Turning Fans Off")
		gpio.output(FAN1_PIN, False)
		gpio.output(FAN2_PIN, False)
