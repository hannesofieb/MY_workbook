var capture; 
function setup() {
  createCanvas(windowWidth, windowHeight*0.85);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight); // Match the canvas size
  capture.hide(); // hides the regular capture
}


function draw() {
  tint(255,0,255);
  image(capture, mouseX, mouseY, pmouseX, pmouseY);  
  filter(POSTERIZE, 5);

  console.log(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
