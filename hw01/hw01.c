#include <stdio.h>
#include <termios.h>
#include <unistd.h>
/*Copy from http://wesley.vidiqatch.org/code-snippets/alternative-for-getch-and-getche-on-linux
 *which implements getch() function allowing c code reads keyboard input */
static struct termios old, new;
/* Initialize new terminal i/o settings */
void initTermios(int echo) 
{
  tcgetattr(0, &old); /* grab old terminal i/o settings */
  new = old; /* make new settings same as old settings */
  new.c_lflag &= ~ICANON; /* disable buffered i/o */
  new.c_lflag &= echo ? ECHO : ~ECHO; /* set echo mode */
  tcsetattr(0, TCSANOW, &new); /* use these new terminal i/o settings now */
}
/* Restore old terminal i/o settings */
void resetTermios(void) 
{
  tcsetattr(0, TCSANOW, &old);
}
/* Read 1 character - echo defines echo mode */
char getch_(int echo) 
{
  char ch;
  initTermios(echo);
  ch = getchar();
  resetTermios();
  return ch;
}
/* Read 1 character without echo */
char getch(void) 
{
  return getch_(0);
}
/* Read 1 character with echo */
char getche(void) 
{
  return getch_(1);
}
/*-------------------------------------------------------------------------------------------------*/

int main (){ 
// get the screen size.
   int length;
   int width;
   printf("Please enter the length of screen(an integer)\n");
   scanf("%d", &length );
   printf("Please enter the width of screen(an interger)\n");
   scanf("%d", &width );
// initialize a 2d array to store the position of the cursor.
   int cursor[width][length+1];
   for(int j=0; j<=width; j++){
	 for(int i=0; i<=length; i++){
		cursor[j][i]=0;
   }
   }
// initialize the sreen.
   int y = width/2;
   int x = length/2;
   cursor[y][x]=1;
   printf("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
   printf("    ");
   for(int i=0; i<=length; i++){
	  printf("%d ",i);
   }
   printf("\n");
   for(int j=0; j<=width; j++){
  	if (j<10){
	    printf("%d:  ",j);}
	  else{
	    printf("%d: ",j);}

	 for(int i=0; i<=length; i++){
	  if (cursor[j][i]==0){
		  if (i<10){
		    printf("  ");}
		  else{
		    printf("   ");}
	    }
	  else{
		  if (i<10){
		    printf("X ");}
	  	else{
		    printf("X  ");}
    	}
   }
	  printf("\n");
}
//print serveral empty lines to "clean the console screen"
	for (int n = 0; n < 18-width; n++){
	  printf( "\n" );}

while(1){
  //get the keyboard input
  char keyinput = getch();
  //detect whether arrow keys are pressed
	if (keyinput == '\033') {
    getch(); 
    switch(getch()) { 
        case 'A':
			if (y>0){
            y--;}
			cursor[y][x]=1;
            break;
        case 'B':
			if (y<width){
			y++;}
			cursor[y][x]=1;
            break;
        case 'C':
			if (x<length){
			x++;}
			cursor[y][x]=1;
            break;
        case 'D':
			if (x>0){
            x--;}
			cursor[y][x]=1;
            break;
    }

}
  //detect whether 'c' key is pressed. If so reset the screen
    else if (keyinput=='c'){
		for(int j=0; j<=width; j++){
		for(int i=0; i<=length; i++){
		cursor[j][i]=0;
   }
   }
    y = width/2;
    x = length/2;
    cursor[y][x]=1;
	}
  //detect whether 'e' key is pressed. If so exit the program
   else if (keyinput=='e'){
	return 0;
}
  // print the updated screen
   printf("Use arrow keys to move the cursor;Press 'c' to clean the screen; Press 'e' to exit.\n");
   printf("    ");
   for(int i=0; i<=length; i++){
	printf("%d ",i);
   }
   printf("\n");
   for(int j=0; j<=width; j++){
    if (j<10){
    printf("%d:  ",j);}
    else{
    printf("%d: ",j);}

	for(int i=0; i<=length; i++){
	if (cursor[j][i]==1){
		if (i<10)
		printf("X ");
		else
		printf("X  ");
	}

	else{	
		if (i<10)
		printf("  ");
		else
		printf("   ");
   }
	}
   printf("\n");
   }

   printf("Cursor Position: %d,%d",y,x);
	for (int n = 0; n < 18-width; n++){
	printf( "\n" );}
   }
   return(0);
}


