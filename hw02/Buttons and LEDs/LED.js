#!/usr/bin/env node

var b = require('bonescript');
var LEDbottom = 'P9_21';
var statebottom = b.HIGH
b.pinMode(LEDbottom, b.OUTPUT);
var buttondown = 'P9_16';
b.pinMode(buttondown, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttondown, true, b.CHANGE, lightdown);

function lightdown(a) {
  if (a.value === 1) {
    b.digitalWrite(LEDbottom, statebottom);
    if (statebottom === b.HIGH) {
      statebottom = b.LOW;
    }
    else {
      statebottom = b.HIGH;
    }
  }
}

var LEDleft = 'P9_12';
var stateleft = b.HIGH
b.pinMode(LEDleft, b.OUTPUT);
var buttonleft = 'P9_11';
b.pinMode(buttonleft, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonleft, true, b.CHANGE, lightleft);

function lightleft(a) {
  if (a.value === 1) {
    b.digitalWrite(LEDleft, stateleft);
    if (stateleft === b.HIGH) {
      stateleft = b.LOW;
    }
    else {
      stateleft = b.HIGH;
    }
  }
}

var LEDright = 'P9_22';
var stateright = b.HIGH
b.pinMode(LEDright, b.OUTPUT);
var buttonright = 'P9_17';
b.pinMode(buttonright, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonright, true, b.CHANGE, cursorright);

function cursorright(a) {
  if (a.value === 1) {
    b.digitalWrite(LEDright, stateright);
    if (stateright === b.HIGH) {
      stateright = b.LOW;
    }
    else {
      stateright = b.HIGH;
    }
  }
}


var LEDup = 'P9_14';
var stateup = b.HIGH
b.pinMode(LEDup, b.OUTPUT);
var buttonup = 'P9_13';
b.pinMode(buttonup, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonup, true, b.CHANGE, lightup);

function lightup(a) {
  if (a.value === 1) {
    b.digitalWrite(LEDup, stateup);
    if (stateup === b.HIGH) {
      stateup = b.LOW;
    }
    else {
      stateup = b.HIGH;
    }
  }
}
