#!/bin/bash

source secure.sh
echo "Starting monitor with AUTH_TOKEN=$AUTH_TOKEN"
#nodejs iot/raspi3monitor.js

# Need to kill pm2 and start with the new environment variable in pm2's address space
# This is hacky, but works
pm2 kill

AUTH_TOKEN=$AUTH_TOKEN pm2 start iot/raspi3monitor.js
