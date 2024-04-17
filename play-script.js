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

// Initialize drag-and-drop for each element with the "drag" class
var dragElements = document.getElementsByClassName("drag");
for (var i = 0; i < dragElements.length; i++) {
  dragElement(dragElements[i]);
}

// Function to set random position for elements with class "gravity"
function setRandomPosition(element) {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  
  // Calculate random top and left positions
  var randomTop = Math.floor(Math.random() * (screenHeight - element.clientHeight));
  var randomLeft = Math.floor(Math.random() * (screenWidth - element.clientWidth));
  
  // Apply random positions to the element
  element.style.top = randomTop + 'px';
  element.style.left = randomLeft + 'px';
}

// Set random positions for all elements with class "gravity"
var gravityElements = document.getElementsByClassName("gravity");
for (var i = 0; i < gravityElements.length; i++) {
  setRandomPosition(gravityElements[i]);
}

// Function to simulate gravity and collision detection
function applyGravity() {
  var gravityElements = document.getElementsByClassName("gravity");

  // Loop through each gravity element
  for (var i = 0; i < gravityElements.length; i++) {
    var currentElement = gravityElements[i];
    var currentRect = currentElement.getBoundingClientRect();
    var currentBottom = currentRect.top + currentRect.height;
    var currentRight = currentRect.left + currentRect.width;
    var groundHeight = window.innerHeight;

    // Check collision with other elements
    for (var j = 0; j < gravityElements.length; j++) {
      if (i !== j) {
        var otherElement = gravityElements[j];
        var otherRect = otherElement.getBoundingClientRect();

        // Check if there's a collision
        if (
          ((otherRect.left < currentRect.left && currentRect.left < otherRect.right) ||
          (otherRect.left < currentRight && currentRight < otherRect.right)) &&
          (currentRect.top < otherRect.bottom)
        ) {
          // If collision detected, adjust ground height
          groundHeight = Math.min(groundHeight, otherRect.top);
        }
      }
    }

    // Apply gravity within the bounds of the viewport
    if (currentBottom < groundHeight && currentRect.top < groundHeight - currentRect.height) {
      currentElement.style.top = (currentRect.top + 1) + "px";
    }
  }
}


// Apply gravity periodically
setInterval(applyGravity, 2); // Adjust the interval for smoother animation
