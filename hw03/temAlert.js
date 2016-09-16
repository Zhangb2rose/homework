#!/usr/bin/envnode

var exec = require('child_process').exec;
var cmd1 = './setup.sh';
var cmd2 = './tem.sh';

exec(cmd1, function(error, stdout, stderr) {
    console.log(stdout);
});

var b = require('bonescript');
var button = 'P9_41';
b.pinMode(button, b.INPUT);
b.attachInterrupt(button, true,
    b.CHANGE, printtem);

function printtem(x) {
    if (x.value === 1) {
        exec(cmd2, function(error, stdout, stderr) {
            console.log('Temperature: ' + stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }


}