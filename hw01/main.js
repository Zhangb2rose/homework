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
//allow javascript recognize keyboard input
var keypress = require('./keypress.js');
keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	
  if (key&&key.sequence =="A"){
	  process.stdout.write("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
	    screen[y][x] = '*';
        y--;
        if (y < 0) {
            y = yMax - 1;
        }
		screen[y][x] = '+';
		printscreen(screen);
  }
  
  else if (key&&key.sequence =="B"){
	  process.stdout.write("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
	  screen[y][x] = '*';
        y++;
        if (y >= yMax) {
            y = 0;
        }
		screen[y][x] = '+';
		printscreen(screen);
  }
  else if (key&&key.sequence =="C"){
	  process.stdout.write("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
		screen[y][x] = '*';
        x++;
        if (x >= xMax) {
            x = 0;
        }
		screen[y][x] = '+';
		printscreen(screen);
  }
  else if (key&&key.sequence =="D"){
	  process.stdout.write("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
		screen[y][x] = '*';
        x--;
        if (x < 0) {
            x = xMax - 1;
        }
		screen[y][x] = '+';
		printscreen(screen);
  }
   
  else if (key&&key.sequence =="e"){
	  process.exit();
  }
  
  else if (key&&key.sequence =="c"){
	  process.stdout.write("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
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
   
});

process.stdin.setRawMode(true);
process.stdin.resume();

