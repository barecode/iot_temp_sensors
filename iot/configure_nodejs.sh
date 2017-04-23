#!/bin/bash

# Update function, only update once per run
updated=
function apt-get-update() {
   if [[ $updated ]]; then
       echo "already updated"
   else
       updated=done
       echo "updating"
       #apt-get update
   fi
}

# Check to see if nodejs is installed
if [[ -z `which nodejs` ]]; then
    # If nodejs isn't installed, then install it
    apt-get-update
    apt-get install -y nodejs nodejs-legacy 
else
    echo "nodejs already installed"
fi

# Check to see if npm is installed
if [[ -z `which npm` ]]; then
    # If npm isn't installed, then install it
    apt-get-update
    apt-get install -y npm
else
    echo "npm already installed"
fi

# Check to see if pm2 is installed
if [[ -z `which pm2` ]]; then
    # If pm2 isn't installed, then install it
    npm install -g pm2 
else
    echo "pm2 already installed"
fi

# Install prerequisite nodejs libraries
npm install stat moment fs ds18x20 ibmiotf


