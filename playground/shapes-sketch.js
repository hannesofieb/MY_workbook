// Function to handle dragging of an element
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Start dragging when mousedown event occurs on the element
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      
      // stop moving when mouse button is released:
      document.onmouseup = closeDragElement;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
// p5 sketch
let gridWidth;
let gridHeight;
let numRows = 3;
let numCols = 9;
let shapes = [];
let rollButton;
let diceDisplay;
let rolling = true;
let circleGridOffsetX;
let circleGridOffsetY;

function setup() {
  let headerHeight = document.querySelector('header').offsetHeight;
  let footerHeight = document.querySelector('footer').offsetHeight;
  let availableHeight = windowHeight - headerHeight - footerHeight;
  
  // Adjusting the grid dimensions to fit the available space
  gridHeight = (windowHeight*0.85) / numRows;
  gridWidth = windowWidth / numCols;
  
  // Set up the circle grid offset
  circleGridOffsetX = gridWidth / 2;
  circleGridOffsetY = gridHeight / 2;

  createCanvas(windowWidth, windowHeight*0.85);
  
  rollButton = createButton('Stop');
  rollButton.position(10, availableHeight + 10);
  rollButton.mousePressed(stopRolling);

  refreshButton = createButton('Refresh');
  refreshButton.position(100, availableHeight + 10);
  refreshButton.mousePressed(refresh);

  diceDisplay = createP('');
  diceDisplay.position(200, availableHeight + 10);

  dragElement(document.getElementById("mydiv"));
}

function draw() {
  if (rolling) {
    rollDice();
  }
  background(255);
  drawGrid();
  drawShapes();
}

function drawGrid() {
    stroke(0, 50); // Setting alpha value to 50 for semi-transparent lines
    for (let i = 0; i < numCols; i++) {
      line(i * gridWidth, 0, i * gridWidth, height);
    }
    for (let j = 0; j < numRows; j++) {
      line(0, j * gridHeight, width, j * gridHeight);
    }
  }

function drawShapes() {
  for (let shape of shapes) {
    if (shape.type === 'square') {
      if (shape.fill) {
        fill(shape.color);
      } else {
        noFill();
        stroke(shape.color);
      }
      rect(shape.x, shape.y, shape.size, shape.size);
    } else if (shape.type === 'triangle') {
      if (shape.fill) {
        fill(shape.color);
      } else {
        noFill();
        stroke(shape.color);
      }
      triangle(shape.x, shape.y + shape.size, shape.x + shape.size, shape.y, shape.x + shape.size, shape.y + shape.size);
    } else if (shape.type === 'circle') {
      noFill();
      stroke(shape.color);
      ellipse(shape.x + circleGridOffsetX, shape.y + circleGridOffsetY, shape.size * 2);
    }
  }
}

function rollDice() {
  let numShapes = roll(3) + 1; // Roll for the number of shapes to generate (1 to 3 shapes)
  
  for (let i = 0; i < numShapes; i++) {
    let shapeRoll = roll(6); // Roll for shape
    let colorRoll = roll(2); // Roll for color
    let xRoll = roll(numCols); // Roll for x position
    let yRoll = roll(numRows); // Roll for y position
    let sizeRoll = random(gridWidth / 4, gridWidth / 2); // Random size between 1/4 and 1/2 of grid width

    let color;
    if (colorRoll === 1) {
      color = '#0000ff';
    } else {
      color = '#5ab2ff';
    }

    let fillShape = random(2) > 1; // Randomly choose whether to fill the shape or not

    // Calculate the x position based on the second roll
    let xPos = (xRoll - 1) * gridWidth + random(gridWidth - sizeRoll);
    // Calculate the y position based on the third roll
    let yPos = (yRoll - 1) * gridHeight + random(gridHeight - sizeRoll);

    // Ensure shapes wrap around to the next row/column if necessary
    xPos %= windowWidth;
    yPos %= gridHeight * numRows;

    if (shapeRoll === 1 || shapeRoll === 4) {
      shapes.push({ type: 'square', color: color, x: xPos, y: yPos, size: sizeRoll, fill: fillShape });
    } else if (shapeRoll === 2 || shapeRoll === 5) {
      shapes.push({ type: 'triangle', color: color, x: xPos, y: yPos, size: sizeRoll, fill: fillShape });
    } else {
      // Ensure circle overlays lines/cross more than one cell
      let offsetX = random(0, gridWidth / 2 - sizeRoll);
      let offsetY = random(0, gridHeight / 2 - sizeRoll);
      shapes.push({ type: 'circle', color: color, x: xPos, y: yPos, size: sizeRoll, fill: fillShape });
    }
  }
  diceDisplay.html('Dice Roll: ' + numShapes);
}

function stopRolling() {
  rolling = !rolling;
  if (rolling) {
    rollButton.html('Stop');
  } else {
    rollButton.html('Start');
  }
}

function refresh() {
  shapes = [];
}

function roll(max) {
  return Math.floor(random(1, max + 1));
}


// the p5 sketch was made through prompt engineering with chatGPT, letting it know about rules of the game etc. 
// few aesthetic alterations made myself