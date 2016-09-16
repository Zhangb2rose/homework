#!/usr/bin/env node

var util = require('util');
var xMax = 8;
var yMax = 8;

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

var i2c = require('i2c');
var port = '/dev/i2c-2';
var matrix = 0x70;

var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});

var greenGrid = new Array(xMax);
for (var j = 0; j < xMax; j++) {
    greenGrid[j] = 0;
}
var redGrid = new Array(xMax);
for (var j = 0; j < xMax; j++) {
    redGrid[j] = 0;
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
            if (screen[i][j] == '*' || screen[i][j] == '+') {
                if (j == 0) {
                    greenGrid[i] += 1;
                }
                else if (j == 1) {
                    greenGrid[i] += 2;
                }
                else if (j == 2) {
                    greenGrid[i] += 4;
                }
                else if (j == 3) {
                    greenGrid[i] += 8;
                }
                else if (j == 4) {
                    greenGrid[i] += 16;
                }
                else if (j == 5) {
                    greenGrid[i] += 32;
                }
                else if (j == 6) {
                    greenGrid[i] += 64;
                }
                else if (j == 7) {
                    greenGrid[i] += 128;
                }
            }
            if (screen[i][j] == '+') {
                if (j == 0) {
                    redGrid[i] = 1;
                }
                else if (j == 1) {
                    redGrid[i] = 2;
                }
                else if (j == 2) {
                    redGrid[i] = 4;
                }
                else if (j == 3) {
                    redGrid[i] = 8;
                }
                else if (j == 4) {
                    redGrid[i] = 16;
                }
                else if (j == 5) {
                    redGrid[i] = 32;
                }
                else if (j == 6) {
                    redGrid[i] = 64;
                }
                else if (j == 7) {
                    redGrid[i] = 128;
                }
            }

        }
        process.stdout.write("\n");
    }
    for (var j = 0; j < xMax * 2; j += 2) {
        grid[j] = greenGrid[j / 2];
    }
    for (var j = 1; j < xMax * 2; j += 2) {
        grid[j] = redGrid[(j - 1) / 2];
    }
}
printscreen(screen);
greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
redGrid = [0, 0, 0, 0, 0, 0, 0, 0];


function printGrid() {
    wire.writeBytes(0x00, grid, function(err) {});
}

wire.writeByte(0x21, function(err) {});
wire.writeByte(0x81, function(err) {});
wire.writeByte(0xe7, function(err) {});


printGrid();





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
            y = yMax - 1;
        }
        screen[y][x] = '+';
        printscreen(screen);
        printGrid();
        greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        redGrid = [0, 0, 0, 0, 0, 0, 0, 0];
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
            x = 0;
        }
        screen[y][x] = '+';
        printscreen(screen);
        printGrid();
        greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        redGrid = [0, 0, 0, 0, 0, 0, 0, 0];
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
            x = xMax - 1;
        }
        screen[y][x] = '+';
        printscreen(screen);
        printGrid();
        greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        redGrid = [0, 0, 0, 0, 0, 0, 0, 0];
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
            y = 0;
        }
        screen[y][x] = '+';
        printscreen(screen);
        printGrid();
        greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        redGrid = [0, 0, 0, 0, 0, 0, 0, 0];
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
        grid = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        greenGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        redGrid = [0, 0, 0, 0, 0, 0, 0, 0];
        printGrid();
    }
}