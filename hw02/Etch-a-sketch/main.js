#!/usr/bin/env node

var util = require('util');
//node js module that allow javascript do scanf
var scanf = require('./scanf.js');
//get size of screen from user
console.log('Pleas enter max value of x axis');
var xMax = scanf('%d');
console.log('Pleas enter max value of y axis');
var yMax = scanf('%d');

//current cursor position
var x = 0;
var y = 0;

//initial the screen grid 
var screen = new Array(yMax);
for (var i = 0; i < yMax; i++) {
    screen[i] = new Array(xMax);
    for (var j = 0; j < xMax; j++) {
        screen[i][j] = ' ';
    }
}
//make the cursor position with '+'
screen[y][x] = '+';
//function to print the screen grid
function printscreen(screen) {
    process.stdout.write('   ');
    for (var j = 0; j < xMax; j++) {
        process.stdout.write(util.format("%d ", j));
    }
    process.stdout.write('\n');
    for (var i = 0; i < yMax; i++) {
        process.stdout.write(util.format("%d: ", i));
        for (var j = 0; j < xMax; j++) {
            process.stdout.write(util.format("%s ", screen[i][j]));
        }
        process.stdout.write("\n");
    }
}
printscreen(screen);
//Read 4 buttons via Interrupts to control the cursor
var b = require('bonescript');
var buttondown = 'P9_16';
b.pinMode(buttondown, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttondown, true, b.CHANGE, cursordown);

function cursordown(a) {
    if (a.value === 1) {
        screen[y][x] = '*';
        y++;
        if (y >= yMax) {
            y = 0;
        }
        screen[y][x] = '+';
        printscreen(screen);
    }
}

var buttonleft = 'P9_11';
b.pinMode(buttonleft, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonleft, true, b.CHANGE, cursorleft);

function cursorleft(a) {
    if (a.value === 1) {
        screen[y][x] = '*';
        x--;
        if (x < 0) {
            x = xMax - 1;
        }
        screen[y][x] = '+';
        printscreen(screen);
    }
}

var buttonright = 'P9_17';
b.pinMode(buttonright, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonright, true, b.CHANGE, cursorright);

function cursorright(a) {
    if (a.value === 1) {
        screen[y][x] = '*';
        x++;
        if (x >= xMax) {
            x = 0;
        }
        screen[y][x] = '+';
        printscreen(screen);
    }
}

var buttonup = 'P9_13';
b.pinMode(buttonup, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonup, true, b.CHANGE, cursorup);

function cursorup(a) {
    if (a.value === 1) {
        screen[y][x] = '*';
        y--;
        if (y < 0) {
            y = yMax - 1;
        }
        screen[y][x] = '+';
        printscreen(screen);
    }
}
// inplement the read button to reset the screen
var buttonclear = 'P9_42';
b.pinMode(buttonclear, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonclear, true, b.CHANGE, cursorclear);

function cursorclear(a) {
    if (a.value === 1) {
        y = 0;
        x = 0;
        for (var i = 0; i < yMax; i++) {
            for (var j = 0; j < xMax; j++) {
                screen[i][j] = ' ';
            }
        }
        screen[y][x] = '+';
        printscreen(screen);
    }
}