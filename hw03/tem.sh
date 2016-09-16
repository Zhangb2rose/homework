#!/bin/bash 
temp="$(i2cget -y 2 0x49 00)"
temp2=$((temp))
echo "1.8*$temp2+32" | bc