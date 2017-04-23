#!/bin/bash

if [[ -z `which nodejs` ]]; then
    apt-get update
    apt-get install -y nodejs nodejs-legacy 
fi
if [[ -z `which npm` ]]; then
    apt-get install -y npm
fi
if [[ -z `which pm2` ]]; then
    npm install -g pm2 
fi
npm install stat moment fs ds18x20 ibmiotf
