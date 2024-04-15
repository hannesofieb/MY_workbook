var answer = "Click the screen for answers to your questions...";

var no = [
  "Nay, the heavens doth protest vehemently.",
  "Alas, the astral spheres doth whisper 'tis not to be.",
  "Methinks not, for the constellations doth frown upon it.",
  "In sooth, the cosmic balance doth sway against it.",
  "Nay, for the stars decree it not to be so.",
  "Nay, the stars doth weep at such a notion.",
  "Methinks not, for the heavens frown upon it.",
  "Not happening, the stars are saying 'not today'.",
  "Nope, your aura is out of sync with this one."
];
var yes = [
  "Indeed, thy cosmic destiny is bright.",
  "Yea, forsooth! The celestial bodies assent.",
  "Indeed! The universe doth nod in assent.",
  "Certes! Thy aura doth shine with affirmation.",
  "Without a doubt! Your vibes are aligned with success.",
  "100%, no doubt.",
  "Absolutely slaying it!",
  "You already know!",
  "Totally! No cap.",
  "It's a vibe"
];

var maybes = [
  "Hmm, not sure, but let's keep it mysterious.",
  "IDK, maybe check back later?",
  "I'm vibing with 'uncertain' right now.",
  "Feeling indecisive AF about this one.",
  "It's like, kinda unclear, you know?",
  "Let's leave that in the 'TBD' category.",
  "Sorry, my crystal ball's taking a coffee break.",
  "I'm sensing some mixed signals here, TBH.",
  "Hmm, let's leave that in the realm of 'who knows?'",
  "I'm feeling 'meh' about answering that.",
  "Feeling non-committal about this one, ask again later?",
  "The mystical forces are recalibrating, try again soon."
];

function setup() {
  createCanvas(windowWidth, windowHeight*0.85);
}

function draw() {
  background(7, 3, 35);

  // Calculate the width and height of the text box based on the longest text
  let maxWidth = maxTextWidth();
  let textHeight = 22; // Assuming the text size is fixed

  // Background ellipse
  noStroke();
  fill(155, 0, 255, 50); 
  ellipse(windowWidth / 2, windowHeight * 0.4, maxWidth + 40, textHeight * 20); // Adjust size based on text width

  // Answer text
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(answer, windowWidth / 2, windowHeight * 0.4);
}

// Function to calculate the maximum width of the text
function maxTextWidth() {
  let maxLen = max(max(no.length, yes.length), maybes.length);
  let maxWidth = 0;
  for (let i = 0; i < maxLen; i++) {
    if (no[i]) {
      let w = textWidth(no[i]);
      maxWidth = max(maxWidth, w);
    }
    if (yes[i]) {
      let w = textWidth(yes[i]);
      maxWidth = max(maxWidth, w);
    }
    if (maybes[i]) {
      let w = textWidth(maybes[i]);
      maxWidth = max(maxWidth, w);
    }
  }
  return maxWidth;
}


function mouseClicked(){
  var result = Math.floor(random(3));
  if (result === 1) {
    answer = yes[Math.floor(random(10))];
  } else if (result === 0) {
    answer = no[Math.floor(random(9))];
  } else if (result === 2) {
    answer = maybes[Math.floor(random(12))];
  }
}



// this code was inspired by a1009252@students.katyisd.org's magic 8ball code from 
// https://editor.p5js.org/a1009252@students.katyisd.org/sketches/BkgSx4I2Q. It was modified by me, and when I 
// got stuck for certain features (like getting ellipse same size as text) I used ChatGPT.