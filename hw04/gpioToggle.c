#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <signal.h>
#include "beaglebone_gpio.h"

int keepgoing = 1;// Set to 0 when ctrl-c is pressed
void signal_handler(int sig);
// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
	printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	exit(0);
}

int main(int argc, char *argv[]) {
    volatile void *gpio0_addr;
    volatile unsigned int *gpio0_oe_addr;
    volatile unsigned int *gpio0_setdataout_addr;
    volatile unsigned int *gpio0_cleardataout_addr;
    volatile unsigned int *gpio0_datain_addr;
    
    volatile void *gpio1_addr;
    volatile unsigned int *gpio1_oe_addr;
    volatile unsigned int *gpio1_setdataout_addr;
    volatile unsigned int *gpio1_cleardataout_addr;
    volatile unsigned int *gpio1_datain_addr;
    
    unsigned int reg;
    unsigned int reg1;
	// Set the signal callback for Ctrl-C
	signal(SIGINT, signal_handler);
    int fd = open("/dev/mem", O_RDWR);
    printf("Mapping %X - %X (size: %X)\n", GPIO1_START_ADDR, GPIO1_END_ADDR, GPIO1_SIZE);
	// map gpio1 register
    gpio1_addr = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);

    gpio1_oe_addr           = gpio1_addr + GPIO_OE;
    gpio1_setdataout_addr   = gpio1_addr + GPIO_SETDATAOUT;
    gpio1_cleardataout_addr = gpio1_addr + GPIO_CLEARDATAOUT;
    gpio1_datain_addr       = gpio1_addr + GPIO_DATAIN;

    if(gpio1_addr == MAP_FAILED) {
        printf("Unable to map GPIO1\n");
        exit(1);
    }
    printf("GPIO1 mapped to %p\n", gpio1_addr);
    printf("GPIO1 OE mapped to %p\n", gpio1_oe_addr);
    printf("GPIO1 SETDATAOUTADDR mapped to %p\n", gpio1_setdataout_addr);
    printf("GPIO1 CLEARDATAOUT mapped to %p\n", gpio1_cleardataout_addr);
    printf("GPIO1 DATAIN mapped to %p\n", gpio1_datain_addr);
    printf("Mapping %X - %X (size: %X)\n", GPIO0_START_ADDR, GPIO1_END_ADDR, GPIO0_SIZE);
    gpio0_addr = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);

    gpio0_oe_addr           = gpio0_addr + GPIO_OE;
    gpio0_setdataout_addr   = gpio0_addr + GPIO_SETDATAOUT;
    gpio0_cleardataout_addr = gpio0_addr + GPIO_CLEARDATAOUT;
    gpio0_datain_addr       = gpio0_addr + GPIO_DATAIN;

    if(gpio0_addr == MAP_FAILED) {
        printf("Unable to map GPIO0\n");
        exit(1);
    }
	//map gpio0 register
    printf("GPIO0 mapped to %p\n", gpio0_addr);
    printf("GPIO0 OE mapped to %p\n", gpio0_oe_addr);
    printf("GPIO0 SETDATAOUTADDR mapped to %p\n", gpio0_setdataout_addr);
    printf("GPIO0 CLEARDATAOUT mapped to %p\n", gpio0_cleardataout_addr);
    printf("GPIO0 DATAIN mapped to %p\n", gpio0_datain_addr);
    
	
	//make GPIO_60 AND GPIO_48 output
	reg = *gpio1_oe_addr;
    printf("GPIO1 configuration: %X\n", reg);
    reg &= ~GPIO_60;
    reg &= ~GPIO_48;
    *gpio1_oe_addr = reg;
    printf("GPIO1 configuration: %X\n", reg);
    *gpio0_oe_addr =0;

    while(keepgoing) {
        reg = *gpio0_datain_addr;
        reg &= GPIO_05;
        if (reg) {
        *gpio1_setdataout_addr = GPIO_60;}
        else {
        *gpio1_cleardataout_addr = GPIO_60;
        }
        
        reg1 = *gpio1_datain_addr;
        reg1 &= GPIO_51;
        if (reg1) {
        *gpio1_setdataout_addr = GPIO_48;}
        else {
        *gpio1_cleardataout_addr = GPIO_48;
        }
    }
    munmap((void *)gpio1_addr, GPIO1_SIZE);
    close(fd);
    return 0;
}
