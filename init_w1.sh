#!/bin/bash

echo "Loading 1-wire kernel modules and listing active devices"
sudo modprobe w1-gpio
sudo modprobe w1-therm

list=`ls /sys/bus/w1/devices`;
if [[ -z $list ]]; then
    echo "no devices";
else
    echo $list;
fi
