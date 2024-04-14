var welcomeText = document.getElementById("welcomeType");
var instructionText = document.getElementById("instruction");
var promptText = document.getElementById("prompt");

function typeWriter(text, element, i, fnCallback) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(text, element, i, fnCallback)
        }, 110);
    } else {
        fnCallback();
    }
}

function reverseTypeWriter(text, element, i, fnCallback) {
    if (i >= 0) {
        element.innerHTML = text.substring(0, i);
        i--;
        setTimeout(function() {
            reverseTypeWriter(text, element, i, fnCallback);
        }, 50);
    } else {
        fnCallback();
    }
}

function startTyping() {
    typeWriter("Welcome to the playground.", welcomeText, 0, function() {
        setTimeout(function() {
            reverseTypeWriter("Welcome to the playground.", welcomeText, "Welcome to the playground.".length - 1, function() {
                typeWriter("To enter, you need to say the secret password.", instructionText, 0, function() {
                    setTimeout(function() {
                        reverseTypeWriter("To enter, you need to say the secret password.", instructionText, "To enter, you need to say the secret password.".length - 1, function() {
                            typeWriter("What's the secret password?", promptText, 0, function() {
                                setup();
                            });
                        });
                    }, 2000);
                });
            });
        }, 2000);
    });
}

startTyping();

// the code above is inspired from Mathilda Sutho's Git Repo for INteractive Media, week 3 page: 
// https://github.com/matildasutho/matildasutho.github.io/tree/main/InteractiveMedia2024/Week3
// it was tinkered further with use of chatGPT to get the finished result.





// p5 code
function setup(){
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(userStartAudio);
    textAlign(CENTER);
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    // Ensure p5.js code only runs after typing animation completes
    if (promptText.innerHTML === "What's the secret password?") {
        // Your p5.js code goes here
        micLevel = mic.getLevel();

        if (micLevel > 0.03 && micLevel < 0.05) {
            window.location.href = "../play.html";
            console.log(micLevel);
        } else if (micLevel > 0.03 && showMessage) {
            typeWriter("Secret Password won't be so secret if you start yelling...", feedback, 0, function() {
                showMessage = false; // Set the flag to false after displaying the message once
            });
            console.log(micLevel);
        }
    }
    // In this modification, the showMessage flag is initially set to true. When the microphone level exceeds 0.03 
// and the message hasn't been displayed yet (controlled by the showMessage flag), the message will be displayed. 
// After displaying the message once, the showMessage flag is set to false, preventing the message from being displayed 
// repeatedly. This way, the message will only be displayed once until the showMessage flag is set back to true.

}






