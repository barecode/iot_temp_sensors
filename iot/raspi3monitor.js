/**
 * Not sure if I want to use unique IoT devices for each sensor
 * (and manage their locations via the IoT portal) or if I treat
 * the Pi as the device and the sensors are just part of the payload.
 *
 * Currently, this treats the Pi as the device and the sensors as
 * part of the payload.
 * How I map the sensors to human readable locations is TBD.
 */

/**
 * delayinms is the delay, in milliseconds, to wait between publishes
 * of data. Here are some common values:
 * Hour = 3600000
 * Half-hour = 1800000
 * Minute = 60000
 * Second = 6000
 */
var delayinms = 1800000; // every half hour
var suspend = false;

if (!!!process.env.AUTH_TOKEN) {
  console.error("Error, environment variable AUTH_TOKEN not set")
  process.exit()
}

var fs = require('fs');
var moment = require('moment');
var sensor = require('ds18x20');
var iotf = require('ibmiotf');
var config = {
               "org" : "oengiu",
               "type" : "raspi3monitor",
               "id" : "mct1001",
               "auth-method" : "token",
               "auth-token" : process.env.AUTH_TOKEN
             };
var deviceClient = new iotf.IotfDevice(config);
deviceClient.log.setLevel('debug');
deviceClient.connect();

var devices = sensor.list();

deviceClient.on('connect', function () {
  console.log("connected");
  doTask();
  setInterval(doTask, delayinms); 
});
 
deviceClient.on('reconnect', function () {
  console.log("reconnected");
});

deviceClient.on("command", function (commandName, format, payload, topic) {
  console.log('got command: ' + commandName);
  if (commandName === "suspend") {
    suspend = true;
  } else {
    suspend = false;
  }
});

deviceClient.on("error", function (err) {
  console.log("Error : " + err);
});

/**
 * Published json structure:
 * {
 *   "ts": "YYYY-MM-DDTHH:mm:ss.SSSZZ",
 *   "sensors": [
 *     { "id": "28-*", "temp": 0.0 }
 *   ]
 * }
 */
function doTask() {
    if (!suspend)  {
      var monval = { sensors: [] };

      for (var device in devices) {
        var data = {};
        data.id = device.id();

        var ctemp = sensor.get( device );
        var ftemp = ((ctemp * 9) / 5) + 32;
        data.temp = Math.round(ftemp * 10, 1) / 10;

        monval.sensors.add(data);
      }

      monval.ts = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");

      var payload = JSON.stringify(monval);
      console.log("publishing payload:" + payload);
      deviceClient.publish('itemsvc', 'json', payload);
    }
}
