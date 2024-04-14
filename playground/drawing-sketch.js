// variables at the top, var is a variable that sticks to same value at all times, let can be changed later
var bckgr = "#002fff";


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bckgr)
}


function draw() {
  if (mouseIsPressed) {
    stroke(bckgr);
  } else {
    stroke(255);
  }
  line(mouseX,mouseY,pmouseX,pmouseY);
}

