# iot_temp_sensors
IoT temperature sensor network used to monitor the heat in my attic

# Getting Started

Required Hardware
* Raspberry pi (I am using Raspberry Pi 1 Model B, I'd recommend a newer version)
* DS18B20 Thermal sensor (easily ordered online from a variety of retailers)
* A breadboard (for easy connecting) 



# Install and Configure your Raspberry Pi

1. Install Raspbian via NOOBS, just take the defaults, you can hack on it later
2. Enable SSH by default so you can SSH in and do the work
`sudo raspi-config`
  * Select `5 Interfacing options`
  * Select `P2 enable SSH`
3. Install your favorite editor (if not already provided)
  * `sudo apt-get install vim`
4. Configure your pi with 1-wire GPIO support
  * `sudo ./configure_w1_pi.sh`

# Ready to hack

