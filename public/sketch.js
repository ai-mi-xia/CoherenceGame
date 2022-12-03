//GLOBAL VARIABLES
let player, gems, coin;
let angle = 0;
let pace, slider;
let coherenceScore;
let collectedCoin;
let myFont;
let BGNight, BGMoon, BGSpace;
let MENU = 0
let SPbutton, MPbutton;
let catMC;
let setupTrigger = true
let setupTrigger2 = true
let socket = io();
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


  // if (MENU == 1) {
  //   player = new Sprite(width / 10, height / 2, 50);

  // coin = new Sprite((width / 10) * 9, height / 2, 30);


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
    bpSlider(470, 840);
    setupTrigger = false
  }
  if (MENU == 1) {
    tutorial();
  }

  if (MENU == 2 && setupTrigger2 == true) {
    gameOneSetup();
    bpSlider(470, 840);
    setupTrigger2 = false
  }
  if (MENU == 2) {
    gameOne();
  }

}

//TUTORIAL LEVEL
function tutorial() {
  image(BGMoon, 0, 0, width, height, 0, 0, BGMoon.width, BGMoon.height);
  stroke(0);
  strokeWeight(2);
  

  //coherence score
  textSize(100);
  text(coherenceScore, 670, 280);
  let textXPos = 290

  //Instructions BG
  fill(176, 141, 247)
  rect(textXPos - 10, 290, 320, 320);

  //instructions
  fill(255)
  textSize(26);
  textAlign(CENTER);
  text('How to increase Heart Coherence (and help Cappy!)', width / 2, height / 8)

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
  text(text3, textXPos+400, 400, 300, 300)

  textSize(14);
  textAlign(CENTER);
  text('TIP: Follow the breath pacer below,', width / 2, (height / 5) * 4)
  text('and use the slider to adjust speed of the pacer!', width / 2, (height / 6) * 5)

  //BREATH PACER
  pace = slider.value();
  pacerLine();

}

//GAME ONE
function gameOne() {

  background(150);
  image(BGMoon, 0, 0, width, height, 0, 0, BGMoon.width, BGMoon.height);

  //BREATH PACER
  pace = slider.value();
  pacerLine();


  //DISPLAY COHERENCE SCORE
  noStroke();
  fill(255)
  textSize(32);
  text(coherenceScore, width / 2.1, (height / 12));
  textSize(16);

  text("Help Cappy get Watermelon!", width / 2, (height / 9));
  player.ani = 'catSleep'
  player.direction = 'right'

  if (coherenceScore == 2 && coin.removed == false) {
    player.ani = 'walkRight'
    player.speed = 2
  } else if (coin.removed == true) {
    player.speed = 0;
    //player.ani = 'catStand'
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
  console.log(MENU)

  //Cat Sprite & Animation Creation
  player = new Sprite(width / 10, height / 2, 50);
  player.addAni('walkRight', 'catWalkRight/tile1.png', 4)
  player.addAni('walkLeft', 'catWalkLeft/tile1.png', 4)
  player.addAni('catSleep', 'catSleep/tile1.png', 9)
  player.addAni('catStand', 'catStand/tile1.png', 20)
  player.r = 5

  //Watermelon Sprite
  coin = new Sprite((width / 10) * 9, height / 2, 30);
  coin.addAni('strawb', 'strawberry.png')
}

//GAME TWO - COHERENCE IN STRESSFUL SITUATIONS

function gameTwoSetup() {
  //Gems setup
  // gems = new Group();
  // gems.diameter = 10;
  // gems.x = () => random(0, width);
  // gems.y = () => random(0, height);
  // gems.amount = 80;
  // player.overlaps(gems, collect);
}

function gameTwo() {
  //Keyboard controls
  // if (kb.pressing('up')) {
  //   player.direction = -90;
  // } else if (kb.pressing('down')) {
  //   player.direction = 90;
  // } else if (kb.pressing('left')) {
  //   player.direction = 180;
  // } else if (kb.pressing('right')) {
  //   player.direction = 0;
  // } else {
  //   player.speed = 0;
  // }


  // gem collect on mouse over
  //clear();

}

// function collect(player, gem) {
//   gem.remove();
// }

function startMenu() {
  textSize(28);
  image(BGNight, 0, 0, width, height, 0, 0, BGNight.width, BGNight.height);
  stroke(0);
  strokeWeight(2);
  text('Choose a Game Mode Below to Play', width / 2, (height / 3) * 2)
  //print(mouseX,mouseY)

  let buttonLevelHeight = (height / 7) * 6
  let buttonWidth = 200
  let buttonHeight = 80

  //TUTORIAL BUTTON
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
      if (mouseX < 614 && mouseX > 814) {
        MENU = 3
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

  //text('In', 100,700)
}

function bpSlider(positionX, positionY) {
  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(positionX, positionY);
  slider.style("width", "150px");
}