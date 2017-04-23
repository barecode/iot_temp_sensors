#!/bin/bash
# This script will attempt to configure the dtoverlay for the
# Raspberry Pi boot config. If a dtoverlay option is already
# specified, no changes will be made

find=`egrep "^dtoverlay" /boot/config.txt`

if [[ -z $find ]]; then
    echo "dtoverlay=w1-gpio" >> /boot/config.txt
    if [[ `egrep "^dtoverlay=w1-gpio" /boot/config.txt` ]]; then
        echo "Successfully configured pi for 1-wire"
    fi
else
    echo "dtoverlay is already specified in /boot/config.txt - edit manually"
    echo $find
fi
