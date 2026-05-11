

var gameState = "startscreen";
var cursorHover = false;
var playerX = 450;
var playerY = 420;
var playerSpeed = 2;
var playerSprite;
var camX = 0;
var camY = 0;
// let choices = ['fish', 'fish', 'fish', 'fish', 'fish', 'lobster']; RANDOMIZER TEST 1 ---------------
let drop = undefined;
//let p = undefined; test for making the drop activated on keypress

let messages = [
  "...",
  "another day..",
  "it never ends",
  "press the button.",
  "press",
  "the",
  "button",
  "press the button, press the button, press the button..",
  ".",
  "..",
  "...",
  "dialogue."
];

let messageIndex = 0;
let message = messages[messageIndex];

function preload() {
    titleScreen = loadImage('https://sethtobeck.github.io/images/lobstertitlescreen.gif');
    idleD = loadImage('https://sethtobeck.github.io/images/idledown.gif');
    idleU = loadImage('https://sethtobeck.github.io/images/idleup.gif');
    idleR = loadImage('https://sethtobeck.github.io/images/idleright.gif');
    idleL = loadImage('https://sethtobeck.github.io/images/idleleft.gif');
    lobsterRoom = loadImage('https://sethtobeck.github.io/images/notpressed.png');
    lobsterRoom2 = loadImage('https://sethtobeck.github.io/images/pressed.png');
    secret = loadImage('https://sethtobeck.github.io/images/secretpose.gif');
    //lobsterRoom = loadImage('https://sethtobeck.github.io/images/gameroom.png'); //old background
    front = loadImage('https://sethtobeck.github.io/images/foreground.png');
}

//end of preload ===========================================================

function setup() {
  createCanvas(600, 600);
  playerSprite = idleD;
  
 const p = random(); //start of random logic
 if (p < 0.01) {
    drop = "LOBSTER";
  }
  // Between 0.01 and 0.21 means this one is 20% of the time
  else if (p < 0.21) {
    drop = "SOUP";
  }
  // Between 0.21 and 0.51 means this one is 30% of the time
  else if (p < 0.51) {
    drop = "FISH"
  }
  // Between 0.51 and 1.0 means this one is 49% of the time
  else {
    drop = "TRASH"
  }//end of random logic
  

}//IMPORTANT SETUP CLOSER BRACKET ----------

function mousePressed() { //dialogue abyss code
  if (gameState == "abyss") {
    messageIndex++;

    if (messageIndex < messages.length) {
      message = messages[messageIndex];
    } else {
      // optional: go to next scene after dialogue ends
      gameState = "lobster";
    }
  }
}// end of dialogue abyss code ----------


function draw() {
  if (gameState=="startscreen"){
    intro();
  }
  
  if (gameState == "abyss") {
    abyss();
  }
  
  if (gameState == "lobster") {
    lobsterGame();
  }
  
  if (gameState == "game") {
    miniGame();
  }
  
  if (gameState == "end") {
    ending();
  }

}
function intro() {
  background(titleScreen);
 
  
if (isColliding(mouseX, mouseY, 1, 1, width/2-275, height/2+225, 100, 50)) {
    stroke(250);
    strokeWeight(3);
    cursorHover = true;
    
    if (mouseIsPressed) {
      gameState = "abyss";
    }
  }
  else {
    noStroke();
    cursorHover = false;
  }
  fill("red");
  rect(width/2-275, height/2+225, 100, 50, 5);
 fill("white");
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Play", width/2-225, height/2+250);
}

function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 &&
         x1 + w1 > x2 &&
         y1 < y2 + h2 &&
         y1 + h1 > y2;
}//END OF TITLE SCREEN -----------------------------------------------------

function abyss(){
  
background(10);


stroke(200);
  fill(0)
  
  rect(20, 440, 560, 140);
  
  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text(message, 40, 460);

//if (gameState == "abyss" && (key == 'b' || key == 'B')){
  
//   message = "testing";
//} else if (message == "testing" && (key == 'b' || key == 'B')){
  
//   message = "HELLO";
//}

////end of testing area
// (gameState == "abyss" && (key == 'y' || key == 'Y')){
//    gameState = "lobster";
//} 
 // 
  

}//END OF ABYSS --------------------------------------------------------------




function lobsterGame(){
background(0);
 let moveX = 0;
  let moveY = 0;
  
 if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
  moveY -= 2;
  playerSprite = idleU;
}

if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
  moveY += 2;
  playerSprite = idleD;
}

if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
  moveX -= 2;
  playerSprite = idleL;
}

if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
  moveX += 2;
  playerSprite = idleR;
}
  if (key === '?') {
  playerSprite = secret;
  }
  
let magnitude = sqrt(moveX * moveX + moveY * moveY);
  if (magnitude > 0) {
    moveX /= magnitude;
    moveY /= magnitude;
  }
  
  playerX += moveX * playerSpeed;
playerY += moveY * playerSpeed;
  
  
// keep player inside map
let halfSize = 30;
playerX = constrain(playerX, halfSize, lobsterRoom.width - halfSize);
playerY = constrain(playerY, halfSize, lobsterRoom.height - halfSize);

// camera follows player
camX = playerX - width / 2;
camY = playerY - height / 2;

// keep camera inside map
camX = constrain(camX, 0, lobsterRoom.width - width);
camY = constrain(camY, 0, lobsterRoom.height - height);

// draw background
imageMode(CORNER);
image(lobsterRoom, -camX, -camY);

//start of display of drop
let dropX = lobsterRoom.width - 500;
let dropY = lobsterRoom.height - 475;

push();
  textStyle(BOLD);
  textSize(30);
  fill(255);
  textAlign(LEFT, TOP);
  text(drop, dropX - camX, dropY - camY);
pop();
//function keyPressed() { //tests for activation of wheel spin RANDOMIZER TEST 2
//if (keyCode === 'o') {
//push();
//  textStyle(BOLD);
//  textSize(20);
//text(drop, width - 50, height - 20); //NOTE!!! MUST SECURE TO A SPOT in relation to the room not the canvas
//pop();
//  }
//}------------------ end of randomizer test 2

//let result = random(choices); RANDOMIZER TEST 1-----------------------------------------

// draw player
imageMode(CENTER);
image(playerSprite, playerX - camX, playerY - camY, 60, 60);

//this below will change it does NOT work rn idea
if (isColliding(playerX, playerY, 1, 1, lobsterRoom.width/2-275, lobsterRoom.height/2+225, 100, 50)) { // STUFF IN PROGRESS
    stroke(250);
    strokeWeight(3);
    cursorHover = true;
    
    if (mouseIsPressed) {
      gameState = "game";
    }
  }
image(front, 300, 300, 600, 600); //foreground -
}//END OF LOBSTER ---------------------------------------------------------------------

function ending(){
  background(50);
}
