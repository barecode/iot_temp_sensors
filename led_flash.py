# Basic script to toggle the LED state on GPIO pin 7
# For Raspberry Pi pin mapping, see:
# https://www.raspberrypi.org/documentation/usage/gpio/README.md
#
# Insipired by:
# https://www.raspberrypi.org/learning/python-quick-reaction-game/worksheet/
# 

from gpiozero import LED
from time import sleep

flag = True
led = LED(7)
while True:
    if flag:
        print("on");
        led.on()
    else:
        print("off");
        led.off()
    flag = not flag    
    sleep(1)
