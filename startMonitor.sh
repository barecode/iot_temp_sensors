#!/bin/bash

source secure.sh
echo "Starting monitor with AUTH_TOKEN=$AUTH_TOKEN"
pm2 start iot/raspi3monitor.js
