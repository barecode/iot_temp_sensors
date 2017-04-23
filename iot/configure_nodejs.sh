#!/bin/bash

# Check to see if nodejs is installed
if [[ -z `which nodejs` ]]; then
    # If nodejs isn't installed, then install it
    apt-get update
    apt-get install -y nodejs nodejs-legacy 
fi

# Check to see if npm is installed
if [[ -z `which npm` ]]; then
    # If npm isn't installed, then install it
    apt-get install -y npm
fi

# Check to see if pm2 is installed
if [[ -z `which pm2` ]]; then
    # If pm2 isn't installed, then install it
    npm install -g pm2 
fi

# Install prerequisite nodejs libraries
npm install stat moment fs ds18x20 ibmiotf


