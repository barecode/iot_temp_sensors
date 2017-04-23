# iot_temp_sensors
IoT temperature sensor network used to monitor the heat in my attic

# Getting Started

Required Hardware
* Raspberry pi (I am using Raspberry Pi 1 Model B, I'd recommend a newer version)
* DS18B20 Thermal sensor (easily ordered online from a variety of retailers)
* A breadboard (for easy connecting) 
* Single LED
* Jumper cables (purchased or home-made from 22 AWG)



# Install and Configure your Raspberry Pi

1. Install Raspbian via NOOBS, just take the defaults, you can hack on it later
2. Enable SSH by default so you can SSH in and do the work
`sudo raspi-config`
  * Select `5 Interfacing options`
  * Select `P2 enable SSH`
3. Change the default password! The default password is 'raspberry', so change the password to something better
4. Install your favorite editor (if not already provided)
  * `sudo apt-get install vim`
5. Configure your pi to boot with 1-wire GPIO support
  * `sudo ./configure_w1_pi.sh`
6. Reboot your pi
  * `sudo reboot`

# Ready to hack

To sanity check your pi is configured with GPIO support, wire up a simple LED to GPIO 7 and run `python led_flash.py`. If things are properly configured and wired, the LED will flash on and off (really a dim) every second.

Follow the AdaFruit guide:
https://learn.adafruit.com/adafruits-raspberry-pi-lesson-11-ds18b20-temperature-sensing/hardware

