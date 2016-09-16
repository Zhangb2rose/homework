TMP101

Before running the main program “temAlert.js”, please make two shell file “tem.sh” and “setup.sh” executable, using command “chmod +x script.sh”. After running the main program, please wait for 5~8 seconds to make sure the program truly start. Touch the temperature sensor with address 0x49 for a few second, a temperature will be printed. T(high) I set is 82.4F and T(low) I set is 80.6F. 

Etch-a-sketch

To run the program, please execute “main.js”. After running the main program, please wait for 5~8 seconds to make sure the program truly start. 

Button & Pin assignment
Top Button	  : P9_13
Left Button	  : P9_11
Bottom Button : P9_16
Right Button  : P9_17
Reset Button  : P9_42

Yellow led shows the position of cursor. User can press Top, Left, Bottom or Right button to move cursor accordingly in the grid. The LEDs where cursor passed will turn to green. User can also press the Reset Button to clean the grid.
