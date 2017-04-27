var sensor = require('ds18x20');
var moment = require('moment');

var now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
console.log("now " + now);

var tempObj = sensor.getAll();
console.log(tempObj);

var listOfDeviceIds = sensor.list();
for (var device in devices) {
  console.log("Device = " + device);
  var ctemp = sensor.get( device );
  var ftemp = ((ctemp * 9) / 5) + 32;
  console.log("Current temp in F: " + ftemp);
}

