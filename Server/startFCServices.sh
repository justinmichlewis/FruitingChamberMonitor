#!/bin/bash
echo "CO2"
xterm -e python3 CO2.py  &

echo "Fan"
xterm -e python3 FanController.py &

echo "Video"
xterm -e python3 VideoController.py  &

echo "REST"
xterm -e node RestController.js



