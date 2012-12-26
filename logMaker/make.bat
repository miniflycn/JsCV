@echo off
title logMaker
echo Begin to make the src Files.

for /f "delims=" %%i in ('dir /b ..\src\*.js') do ( 

	echo make %%i
	java make %%i

) 

echo All src files have been made.

pause && exit