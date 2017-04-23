var sensor = require('ds18x20');
var moment = require('moment');

var now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
console.log("now " + now);

var listOfDeviceIds = sensor.list();
console.log("DeviceId[0] = " + listOfDeviceIds);

var ctemp = sensor.get( listOfDeviceIds[0] );
var ftemp = ((ctemp * 9) / 5) + 32;
console.log("Current temp in F: " + ftemp);

//var isLoaded = sensor.isDriverLoaded();
//console.log(isLoaded);

//var listOfDeviceIds = sensor.list();
//console.log(listOfDeviceIds);

//var tempObj = sensor.getAll();
//console.log(tempObj);

