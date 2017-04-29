/**
 * Read DS18B20 sensor data using the following NPM module:
 * https://www.npmjs.com/package/ds18x20
 */
var sensor = require('ds18x20');
var moment = require('moment');

var now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
console.log("now " + now);

/**
 * Method 1: getAll(), returns an object like this:
 * { '28-00000574c791': 22.9, '28-00000574f4f3': 22.8 }
 */
sensor.getAll(function (err, tempObj) {
  console.log("debug: " + tempObj);
  Object.keys(tempObj).forEach(function(device) {
    console.log("Device = "+device + " - " + tempObj[device] + "C");
  });
});

/**
 * Method 2: list(), returns an object like this:
 * [ '28-00000574c791', '28-00000574f4f3' ]
 */
sensor.list(function (err, listOfDeviceIds) {
  console.log("listOfDeviceIds="+listOfDeviceIds);
  listOfDeviceIds.forEach(function(device) {
    console.log("Device = " + device);
    var ctemp = sensor.get( device );
    var ftemp = ((ctemp * 9) / 5) + 32;
    ftemp = Math.round(ftemp * 10, 1) / 10
    console.log("  Current temp in F: " + ftemp);
  });
});

