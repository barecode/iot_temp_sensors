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
 * Second = 1000
 */
var delayinms = 1800000; // every half hour
var suspend = false; // global suspend flag, set via IoT command

if (!!!process.env.AUTH_TOKEN) {
  console.error("Error, environment variable AUTH_TOKEN not set")
  process.exit()
}

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

deviceClient.on('connect', function () {
  console.log("connected");
  publishSensorData();
  setInterval(publishSensorData, delayinms); 
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
 *   "sensors": { '28-00000574c791': 22.9, ... }
 * }
 */
function publishSensorData() {
  if (!suspend)  {
    sensor.getAll(function (err, tempObj) {
      var monval = { sensors: [] };
      monval.ts = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
      monval.sensors = tempObj;

      var payload = JSON.stringify(monval);
      console.log("publishing payload: " + payload);
      deviceClient.publish('itemsvc', 'json', payload);
    });
  }
}
