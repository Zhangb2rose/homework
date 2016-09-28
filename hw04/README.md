GPIO via mmap

Please use following command to compile C files

cc -O3 -g  -o gpioThru gpioThru.c

cc -O3 -g  -o gpioToggle gpioToggle.c

gpioThru

input bottoms: 	  P9_16; P9_17
LED output:       P9_12; P9_15
Press any of bottoms, corresponding led will be turned on 

gpioToggle
input: P9_42
output: P9_21

MatrixLED
1. The connect() function of matrixLED.js send different messages to the bone. BoneServer.js listens socket 9090 for receiving messages. Once it receives any messages, it will perform according operations on the bone like shell commands.
2. When an “LED” is clicked the LEDclick function will be called. Value in array disp[] will be updated and will be sent to the bone.
3. The entry “background-color” in the class “on” is used to color the LED.
4. In my version of marixLED.js, I have two functions “leftLEDclick” and “rightLEDclick” which are similar to the function “LEDclick” in the example marixLED.js file, but “leftLEDclick” only turns on green LED while “rightLEDclick” turns on red LED. In the html, I add “onclick="leftLEDclick(' + i + ',' + j + ')" oncontextmenu="rightLEDclick(' + i + ',' + j + ')”;” to each “LED” block. When the user left clicks the block, green led will be turned on and when he right clicks the block, red led will be turned on. Disp[] and disp[]  will sent between bone and browser.
5. No need to change boneSever.js 
