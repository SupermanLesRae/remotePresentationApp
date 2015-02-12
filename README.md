# remotePresentationApp
A remote presentation app

# Quick Installation Guide:
Dependencies

1. NodeJS
2. ExpressJS
3. Socket.io
4. RevealJS

# HTTPS clone URL Locally:
https://github.com/SupermanLesRae/remotePresentationApp.git

Once the files are installed open your cmd tool cd to the project folder and run npm install

# Files and folder structure

Public:
This folder contains all the css, images and script required to run the project.

Views: (The view engine used is ejs)
1. index.ejs
2. controller.ejs

# Important to know
In the folder public/scripts/controller.js change the sever value to your server you running on.

In public/scripts/app.js change var socket = io.connect('http://10.0.0.6:3000'); to your running server. 

# How this all works.
1. Run the project (locally this would be http://localhost:3000), this will open the index.ejs file click ok and open the slides

2. To run the controller(In a new browser locally this would be http://localhost:3000/controller) this will open the controller.ejs file.

3. A number is generated on the controller screen, in order to control the user or index screen typr the controller code into the otp box.

4. Your controller will now control the screen on the other device.

# Hosting

In oder to host this file you will have to host the project on a nodeJS server.

eg.Modulus.io, Nitro.io 