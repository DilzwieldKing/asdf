var serial; // variable to hold an instance of the serialport library
  var portName = 'COM3';  // fill in your serial
  var inData;                             // for incoming serial
  var switch1;
  var switch2;
  var lastValue = false;
  var switch3;
  var ghosts = [];
  var mappedSensor1;
  var sensor1;
  var sensor2;
  var sensor3;
  var retrigger1 = true;
  var retrigger2 = true;
  var retrigger3 = true;
  var retrigger4 = true;
  var retrigger5 = true;
  var retrigger6 = true;
  var Light_Beams = [];
  var hit = 0;
  var haunt = [];
  var wisple;


function preload() {
  img = loadImage('pictures/ghost.png');
  img1 = loadImage("pictures/background.png");
  img_heart = loadImage("pictures/heart_red.png");
  img_dead = loadImage("pictures/heart_black.png");
  wisple = loadImage("Assets/pixil-frame-0 (11).png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  // for (var i=0; i<1; i++) {
  //   ghosts.push(new Ghost());
  // }

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
  for(var i = 0; i < 10; i++){
    haunt.push(new wisp());
  }
}

function draw() {
  background(img1);
  spawn();
  lights();
  lives1();
  lives2();
    for(var i = 0; i < haunt.length; i++){
      haunt[i].move();
      haunt[i].display();
    }
  
    for (var i=0; i<ghosts.length; i++){
      ghosts[i].display();
      ghosts[i].move();
    }
    for(var i=0; i<Light_Beams.length; i++){
      Light_Beams[i].display();
      Light_Beams[i].move();
    }

    for (var i=0; i<ghosts.length; i++){
      for(var j=0; j<Light_Beams.length; j++){
        if(dist(Light_Beams[j].x, Light_Beams[j].y, ghosts[i].x, ghosts[i].y) < 50){
          Light_Beams.splice(0, 1);
          ghosts.splice(0, 1);
          console.log("Killed")
        }
      }
    }

    for (var i = 0 ; i < ghosts.length; i++){
      if(ghosts[i].y > windowHeight){
        console.log("Lose Life");
        ghosts.splice(0,1);
        hit += 1;
        console.log(hit)
      } 
    }
  }


  // Ghosts Spawning

function spawn(){
  if(switch1==0 ){
    if (retrigger1 == true){
    retrigger1 = false;
    // fill(0)
      ghosts.push(new Ghost1());
    console.log("a")
  }
 } else{
    retrigger1 = true;

  } 

  if(switch2==0 ){
    if (retrigger2 == true){
    retrigger2 = false;
    // fill(0)
      ghosts.push(new Ghost2());
    console.log("a")
  }
 } else{
    retrigger2 = true;

  } 

  if(switch3==0 ){
    if (retrigger3 == true){
    retrigger3 = false;
    // fill(0)
      ghosts.push(new Ghost3());
    console.log("a")
  }
 } else{
    retrigger3 = true;

  } 

//   if(switch2==0 ){
//     if (retrigger2 == true){
//     retrigger2 = false;
    
//     // fill(0)
//     for (var i=0; i<1; i++) {
//       ghosts.push(new Ghost2());
//   }
//     // console.log("a")
//   }
//  } else{
//     retrigger2 = true;

//   } 
}

//Light Ball Spawning
function lights(){
  if(sensor1 <= 160 ){
    if (retrigger4 == true){
      retrigger4 = false;
      Light_Beams.push(new Light_Beam1());
      console.log("b");
    }
  } else {
    retrigger4 = true;
  }

  if(sensor2 <= 15 ){
    if (retrigger5 == true){
      retrigger5 = false;
      Light_Beams.push(new Light_Beam2());
      console.log("b");
    }
  } else {
    retrigger5 = true;
  }

  if(sensor3 <= 100 ){
    if (retrigger6 == true){
      retrigger6 = false;
      Light_Beams.push(new Light_Beam3());
      console.log("b");
    }
  } else {
    retrigger6= true;
  }
}

function Ghost1(){
	this.x = 90;
	this.y = 100;
	this.dy = 5;

		this.display = function(){
			image(img, this.x, this.y, 150, 150);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}

function Ghost2(){
	this.x = 420;
	this.y = 100;
	this.dy = 5;

		this.display = function(){
			image(img, this.x, this.y, 150, 150);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}


function Ghost3(){
	this.x = 740;
	this.y = 100;
	this.dy = 5;

		this.display = function(){
			image(img, this.x, this.y, 150, 150);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}


function Light_Beam1(){
	this.x = 130;
	this.y = windowHeight;
	this.dy = 2;

		this.display = function(){
      noStroke();
      fill("yellow");
			rect(this.x, this.y, 50,100);
		}
		
		this.move = function(){
			this.y -= this.dy;
    }
}

function Light_Beam2(){
	this.x = 460;
	this.y = windowHeight;
	this.dy = 2;

		this.display = function(){
      noStroke();
      fill("yellow");
			rect(this.x, this.y, 50,100);
		}
		
		this.move = function(){
			this.y -= this.dy;
    }
}

function Light_Beam3(){
	this.x = 790;
	this.y = windowHeight;
	this.dy = 2;

		this.display = function(){
      noStroke();
      fill("yellow");
			rect(this.x, this.y, 50,100);
		}
		
		this.move = function(){
			this.y -= this.dy;
    }
}

function lives1(){
  this.x = 250;
  this.y = 900;
  this.r = 100;

  noStroke();

  if (hit > 0){
    image(img_dead, this.x, this.y, 150, 150)
  } else {
    image(img_heart, this.x, this.y, 150, 150)
  }
}

function lives2(){
  this.x = 570;
  this.y = 900;
  this.r = 100;

  noStroke();

  if (hit > 1){
    image(img_dead, this.x, this.y, 150, 150)
  } else {
    image(img_heart, this.x, this.y, 150, 150)
  }
}
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  // if (switch1 == 0){
  //   retrigger = false;
  //   buttonDown = true;
  // };

  // console.log(retrigger, switch1)
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 5) {                      // if there are three elements
      switch1 = sensors[0];  
      switch2 = sensors[1];
      switch3 = sensors[2]; 
      sensor1 = sensors[3];
      sensor2 = sensors[4];
      sensor3 = sensors[5]; 
      mappedSensor1 = map(sensor1, 0, 1023, height, 0);     
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

function wisp(){
  this.xcord = random(0, windowWidth);
  this.ycord = random(0, windowHeight);
  this.width = random(20, 40);
  this.speed = random(5, 10);
  

  this.move = function(){
    this.ycord += random(-0.3, 0.3);
    this.xcord += random(-0.3, 0.3);
  }

  this.display = function(){
    fill('white');
    image(wisple, this.xcord, this.ycord, this.width, this.width);
    //ellipse(this.xcord, this.ycord, this.width);
  }
}

