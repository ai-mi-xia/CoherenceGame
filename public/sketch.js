//Cat Sprite: https://pop-shop-packs.itch.io/
//Fruit Sprites: https://ninjikin.itch.io/fruit
//Backgrounds: https://digitalmoons.itch.io/pixel-skies-demo

//GLOBAL VARIABLES
let myFont;
let angle = 0;
let pace, slider;
let coherenceScore;
let player, gems, coin;
let collectedCoin;
let socket = io();

//game variables
let BGNight, BGMoon, BGSpace, sleepCat;
let MENU = 0
let SPbutton, MPbutton;
let catMC;
let bananas, strawberries;
let floor;
let countB = 0;
let countS = 0;
let gameTwoScore = 0;
let startMenuTrig = true
let setupTrigger = true
let setupTrigger2 = true
let setupTrigger3 = true
let Low, Med, High;


//SOCKET.IO - Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

//Pre-load fonts & images
function preload() {
  BGNight = loadImage('BG/PixelNightSkyBG.png');
  BGMoon = loadImage('BG/moonNightBG.png');
  BGSpace = loadImage('BG/PixelSpaceBG.png');
  sleepCat = loadImage('catSleepImg.png')
  myFont = loadFont('RobotoMono-Regular.ttf');
}

function setup() {
  createCanvas(950, 600);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(myFont);

  //Listen for messages named 'data' from the server
  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });
  //Setting Coherence Scores


}

function draw() {

  //Coherence Score from Sockets.io
  socket.on('newdata', function (score) {

    //put into global variable
    coherenceScore = score

  })

  //Call Start Menu Function
  startMenu();

  //Calling Other Menus based on MouseClicked function at the bottom. Trigger is so "setup" functions are only called once.
  if (MENU == 1 && setupTrigger == true) {
    bpSlider(750, 1000);
    setupTrigger = false
  }
  if (MENU == 1) {
    tutorial();
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  }

  if (MENU == 2 && setupTrigger2 == true) {
    gameOneSetup();
    bpSlider(750, 1000);
    setupTrigger2 = false
  }
  if (MENU == 2) {
    gameOne();
  }

  if (MENU == 3 && setupTrigger3 == true) {
    gameTwoSetup();
    bpSlider(750, 1000);
    setupTrigger3 = false
  }
  if (MENU == 3) {
    gameTwo();
  }


}

//TUTORIAL LEVEL
function tutorial() {
  image(BGMoon, 0, 0, width, height, 0, 0, BGMoon.width, BGMoon.height);
  stroke(0);
  strokeWeight(2);
  let R = 0;
  let G = 0;
  let B = 0;

  //Coherence Score Color
  if (coherenceScore == 0) {
    R = 255
  } else if (coherenceScore == 1) {
    B = 255
  } else if (coherenceScore == 2) {
    G = 255
  }

  //DISPLAY COHERENCE SCORE
  fill(R, G, B)
  textSize(100);
  text(coherenceScore, 675, 280);

  //Instructions BG
  let textXPos = 290
  fill(176, 141, 247)
  rect(textXPos - 10, 290, 320, 320);

  //instructions
  fill(255)
  textSize(26);
  textAlign(CENTER);
  text('How to increase Heart Coherence and help Shortcake!', width / 2, height / 8)

  noStroke();
  textSize(18);
  textAlign(LEFT);
  let text1 = '1. Focus your attention on your heart. Imagine your breath is flowing in and out of your heart, breathing a little slower and deeper than usual.'
  text(text1, textXPos, 200, 300, 300)

  textSize(18);
  textAlign(LEFT);
  let text2 = '2. Try to feel a restorative and positive emotion, such as calm, ease or appreciation for someone or something in your life. '
  text(text2, textXPos, 360, 300, 300)

  textSize(18);
  textAlign(CENTER);
  let text3 = 'PRACTICE: Get your Coherence Score to 2!'
  text(text3, textXPos + 400, 400, 300, 300)

  textSize(14);
  textAlign(CENTER);
  text('TIP: Follow the breath pacer below,', width / 2, (height / 5) * 4)
  text('and use the slider to adjust speed of the pacer!', width / 2, (height / 6) * 5)

  //CLICK RIGHT TO RETURN
  textSize(12);
  fill(200)
  textAlign(CENTER);
  text('(Right click to return to Menu)', width / 2, height / 16)

  //BREATH PACER
  pace = slider.value();
  pacerLine();

}

//GAME ONE
function gameOne() {

  image(BGMoon, 0, 0, width, height, 0, 0, BGMoon.width, BGMoon.height);
  let R = 0;
  let G = 0;
  let B = 0;

  //BREATH PACER
  pace = slider.value();
  pacerLine();

  //Controlling player speed with coherence score
  if (coherenceScore == 0) {
    R = 255
  } else if (coherenceScore == 1) {
    B = 255
  } else if (coherenceScore == 2) {
    G = 255
  }

  //DISPLAY COHERENCE SCORE
  noStroke();
  fill(R, G, B)
  //textSize(28);
  //text(coherenceScore, 600, 550);
  textSize(18);
  text('Coherence Level: ' + coherenceScore, 600, 570);

  //Instructions
  stroke(0);
  strokeWeight(1);
  fill(255)
  textSize(28);
  text("Help Shortcake get the BIG strawberry!", width / 2, (height / 9));
  fill(255, 92, 250)
  textSize(16);
  fill(255, 74, 182);
  text("She will only move if you stay at a coherence level of 2", width / 2, (height / 6));
  text("(your love motivates her.)", width / 2, (height / 5));


  player.ani = 'catSleepRight'
  player.ani.frameDelay = 25;
  player.direction = 'right'

  if (coherenceScore == 2 && coin.removed == false) {
    player.ani = 'walkRight'
    player.speed = 0.7
  } else if (coin.removed == true) {
    player.speed = 0;
    player.ani = 'catStand'
    textSize(24);
    text("Good Job!", width / 4, (height / 2));
  } else {
    player.speed = 0;
  }

  if (player.overlaps(coin)) {
    coin.remove();
  }

}

function gameOneSetup() {

  //Cat Sprite & Animation Creation
  player = new Sprite(width / 10, height / 2, 50);
  player.addAni('walkRight', 'catWalkRight/tile1.png', 4)
  player.addAni('walkLeft', 'catWalkLeft/tile1.png', 4)
  player.addAni('catSleepRight', 'catSleepRight/tile1.png', 2)
  player.addAni('catStand', 'catStand/tile1.png', 20)
  player.r = 5

  //Watermelon Sprite
  coin = new Sprite((width / 10) * 9, height / 2, 30);
  coin.addAni('strawb', 'bigStrawberry.png')
}

//GAME TWO - COHERENCE IN STRESSFUL SITUATIONS

function gameTwoSetup() {

  //Cat Sprite & Animation Creation
  player = new Sprite(width / 10, 490, 50);
  player.addAni('walkRight', 'catWalkRight/tile1.png', 4)
  player.addAni('walkLeft', 'catWalkLeft/tile1.png', 4)
  player.addAni('catSleepRight', 'catSleepRight/tile1.png', 2)
  player.addAni('catStand', 'catStand/tile1.png', 20)
  player.addAni('catStandStraight', 'catStandStraight.png')
  player.addAni('catOwch', 'catOwch.png')
  player.r = 10

  floor = new Sprite(width / 2, 512, width, 5, 'static');
  floor.color = ("white")

  //Banana Sprite
  bananas = new Group();
  bananas.addAni('nanerz', 'banana/tile1.png')
  // a is the player, b is the item
  bananas.overlap(floor, (a, b) => a.remove());
  bananas.rotationSpeed = 2

  //Strawberry Sprite
  strawberries = new Group();
  strawberries.addAni('strawbz', 'strawberry.png')
  strawberries.overlap(floor, (a, b) => a.remove());
  strawberries.rotationSpeed = 1

}


function gameTwo() {

  image(BGSpace, 0, 0, width, height, 0, 0, BGSpace.width, BGSpace.height);
  let R = 0;
  let G = 0;
  let B = 0;

  //Breath Pacer BG
  fill(140, 136, 247)
  rect(width / 2, 560, width, 100)

  //BREATH PACER
  pace = slider.value();
  pacerLine();

  //INSTRUCTIONS
  noStroke();
  fill(255, 92, 250)
  textSize(14);
  text("Challenge Level - Practice Coherence under stress! Dodge the nanerz and get the strawbz!", width / 2, (height / 8));
  textSize(12);
  fill(255);
  text("Use the left and right arrow keys to move Shortcake.", width / 2, (height / 6));
  text("Higher coherence level will increase your movement speed.", width / 2, (height / 5));

  //Display Score
  textAlign(CENTER);
  textSize(24);
  text("Get 10 Strawbz! You have: " + gameTwoScore, width / 2, 30);

  player.ani = 'catStandStraight'

  //Controlling player speed with coherence score
  if (coherenceScore == 0) {
    player.speed = 0.5;
    R = 255
  } else if (coherenceScore == 1) {
    player.speed = 1.5;
    B = 255
  } else if (coherenceScore == 2) {
    player.speed = 3;
    G = 255
  }

  //DISPLAY COHERENCE SCORE
  noStroke();
  fill(R, G, B)
  textSize(18);
  text('Coherence Level: ' + coherenceScore, 600, 570);

  //Spawn Bananas
  if (countB >= 25) {
    let Banana = new bananas.Sprite(random(10, width - 10), -10, 20, 20);
    bananas.vel.y = 2;
    countB = 0;
  }

  //Spawn Strawberries
  if (countS >= 300) {
    let Strawberry = new strawberries.Sprite(random(10, width - 10), -10, 20, 20);
    strawberries.vel.y = 2;
    countS = 0;
  }

  //Keyboard Controls
  if (kb.pressing('ArrowLeft')) {
    player.direction = 'left';
    player.ani = 'walkLeft'
  } else if (kb.pressing('ArrowRight')) {
    player.direction = 'right';
    player.ani = 'walkRight'
  } else {
    player.vel.x = 0;
  }

  countB++;
  countS++;

  //Remove sprite & count score
  player.overlap(bananas, (a, b) => MinusScore(b));
  player.overlap(strawberries, (a, b) => AddScore(b));

   if (gameTwoScore == 10){
    textSize(24);
    text("Good Job!", width / 4, (height / 2));
    player.ani = 'catStand'
  }

  //console.log(gameTwoScore)
}

function AddScore(b) {
  b.remove();
  gameTwoScore++ 

}

function MinusScore(b) {
  player.ani = 'catOwch' //this doesn't work
  b.remove();
  if (gameTwoScore > 0) {
    gameTwoScore--
  }

}

function startMenu() {
  textSize(28);
  image(BGNight, 0, 0, width, height, 0, 0, BGNight.width, BGNight.height);
  image(sleepCat, 600, 200);
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER);
  text('Choose a Game Mode Below to Start!', width / 2, (height / 3) * 2)
  //print(mouseX,mouseY)

  let buttonLevelHeight = (height / 7) * 6
  let buttonWidth = 200
  let buttonHeight = 80

  //Instructions
  fill(255)
  textSize(28);
  textAlign(CENTER);
  text('Help Shortcake with your Coherent Heart!', width / 2, height / 8)

  //Instructions BG
  strokeWeight(1);
  let textXPos = 290
  fill(176, 141, 247)
  rect(textXPos - 10, 250, 320, 200);
  noStroke();
  // stroke(0);
  // strokeWeight(1);
  fill(255)
  textSize(18);
  textAlign(LEFT);
  let text1 = 'Shortcake is taking a nice catnap and with the power of your heart, you can help her get the sweet treats of her dreams. <3'
  text(text1, textXPos, 250, 300, 300)

  //TUTORIAL BUTTON
  textAlign(CENTER);
  stroke(0);
  strokeWeight(1);
  fill(255, 150, 190);
  rect(width / 4, buttonLevelHeight, buttonWidth, buttonHeight);
  noStroke();
  fill(255);
  text('Tutorial', width / 4, buttonLevelHeight);

  //LEVEL ONE BUTTON
  stroke(0);
  strokeWeight(1);
  fill(245, 150, 210);
  rect(width / 2, buttonLevelHeight, buttonWidth, buttonHeight);
  noStroke();
  fill(255);
  text('Level 1', width / 2, buttonLevelHeight);

  //LEVEL TWO BUTTON
  stroke(0);
  strokeWeight(1);
  fill(236, 150, 255);
  rect((width / 4) * 3, buttonLevelHeight, buttonWidth, buttonHeight);
  noStroke();
  fill(255);
  text('Level 2', (width / 4) * 3, buttonLevelHeight);

}

function mouseClicked() {
  if (MENU == 0) {
    if (mouseY < 555 && mouseY > 476) {
      if (mouseX < 333 && mouseX > 137) {
        MENU = 1
        console.log("menu1")
      }
      if (mouseX < 575 && mouseX > 375) {
        MENU = 2
        console.log("menu2")
      }
      if (mouseX < 814 && mouseX > 614) {
        MENU = 3
        console.log("menu3")
      }
    }
  }
}

function pacerLine() {
  let r = map(sin(angle), 1, -1, width / 4, (width / 4) * 3);
  fill(0)
  circle(r, (height / 10) * 9, 10);
  stroke(0);
  line(width / 4, (height / 10) * 9, (width / 4) * 3, (height / 10) * 9);
  angle += pace;

  push();
  textSize(11);
  noStroke();
  text('Breath In', width / 4 +30, (height / 12) * 11)
  text('Breath Out', (width / 4) * 3 - 30, (height / 12) * 11)
  pop();
}

function bpSlider(positionX, positionY) {
  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(positionX, positionY);
  slider.style("width", "150px");
}