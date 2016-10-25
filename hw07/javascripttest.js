#!/usr/bin/env node

var b = require('bonescript');
var LEDbottom = 'P9_27';
b.pinMode(LEDbottom, b.OUTPUT);
var buttondown = 'P9_28';
b.pinMode(buttondown, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttondown, true, b.CHANGE, lightdown);
console.log("Ready");

function lightdown(a) {
  if (a.value === 1) {
    b.digitalWrite(LEDbottom, b.HIGH);
    }
    else {
    b.digitalWrite(LEDbottom, b.LOW);
    }
  }

