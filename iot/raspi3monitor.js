//var delayinms = 3600000; // every hour
var delayinms = 1800000; // every half hour
//var delayinms = 60000; // every minute
//var delayinms = 6000; // every second
var suspend = false;

if (!!!process.env.AUTH_TOKEN) {
  console.log("Error, environment variable AUTH_TOKEN not set")
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

var listOfDeviceIds = sensor.list();

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

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

function doTask() {
    if (!suspend)  {
      var ctemp = sensor.get( listOfDeviceIds[0] );
      var ftemp = ((ctemp * 9) / 5) + 32;
      var ftemp = Math.round(ftemp * 10, 1) / 10;
      if (fileExists(__dirname + '/simcold')) {
        console.log('simcold File found. Forcing temp reading of 32 degrees');
        ftemp = 32;
      }
      var monval = {};
      monval.d = { "temperature" : ftemp };
      monval.ts = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
      var payload = JSON.stringify(monval);

      console.log("publishing payload:" + payload);
      deviceClient.publish('itemsvc', 'json', payload);
    }
}
