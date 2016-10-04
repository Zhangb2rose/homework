#!/usr/bin/env node
// Reads the tmp101 temperature sensor.

var i2c     = require('i2c');
var fs      = require('fs');
var request = require('request');
var util    = require('util');

var filename = "keys_tmp101.json";


var time = 1000;    // Time between readings

var wire1 = new i2c(0x48, {
    device: '/dev/i2c-2'
});

var wire2 = new i2c(0x49, {
    device: '/dev/i2c-2'
});

var tmp101 = [wire1, wire2];

var keys = JSON.parse(fs.readFileSync(filename));
// console.log("Using: " + filename);
console.log("Title: " + keys.title);
console.log(util.inspect(keys));

var urlBase = keys.inputUrl + "/?private_key=" + keys.privateKey 
                + "&temp0=%s&temp1=%s";

var temp = [];

// Read the temp sensors
function updatetem(){
for(var i=0; i<tmp101.length; i++) {
    temp[i] = tmp101[i].readByte(function(err, res) {});
    // temp[i] = Math.random();
    console.log("temp: %dC, %dF (0x%s)", temp[i], temp[i]*9/5+32, tmp101[i].toString(16));
}

// Substitute in the temperatures
var url = util.format(urlBase, temp[0], temp[1]);
console.log("url: ", url);

// Send to phant
request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        console.log(body); 
    } else {
        console.log("error=" + err + " response=" + JSON.stringify(res));
    }
});

}
setInterval(updatetem,10000);
