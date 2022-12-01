//GLOBAL VARIABLES
let player, gems, coin;
let angle = 0;
let pace;
let coherenceScore;
let collectedCoin;
let img;
let MENU = 0
let SPbutton, MPbutton;
let catMC;
let setupTrigger = true
//Open and connect socket
let socket = io();

//SOCKET.IO - Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

function preload() {
  img = loadImage('moonNightBG.png');
}

function setup() {
  createCanvas(950, 600);

  // catMC = loadAni('catWalkRight',4)

  //Listen for messages named 'data' from the server
  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });

  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(width / 1.9, 850);
  slider.style("width", "150px");


  // if (MENU == 1) {
  //   player = new Sprite(width / 10, height / 2, 50);

  // coin = new Sprite((width / 10) * 9, height / 2, 30);

  // }
  // if (MENU == 2) {
  //   }


}

function draw() {



  //Coherence Score from Sockets.io
  socket.on('newdata', function (score) {

    //put into global variable
    coherenceScore = score

  })

  startMenu();

  if (MENU == 1 && setupTrigger == true) {
    gameOneSetup();
      setupTrigger = false
  }

  if (MENU == 1){
    gameOne();
  }

  if (MENU == 2) {
  }
  //startScreen();


}


//GAME ONE - HOW TO INCREASE COHERENCE
function gameOne() {

  background(150);
  image(img, 0, 0, width, height, 0, 0, img.width, img.height);

  //SLIDER AND BREATH PACER
  pace = slider.value();
  pacerLine();

  //DISPLAY COHERENCE SCORE
  noStroke();
  fill(255)
  textSize(32);
  text(coherenceScore, width / 2.1, (height / 12));
  textSize(16);
  
  text("You are the cat. Get your coherence score up to 2 to get the strawberry!", width / 4, (height / 9));

  let coherenceVal = map(coherenceScore, 0, 6, 0, 12);

  player.direction = 'right'


  if (coherenceScore > 2 && coin.removed == false) {
    player.speed = coherenceScore
  } else if (coin.removed == true) {
    player.speed = 0;
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
  player = new Sprite(width / 10, height / 2, 50);
  // player.addAni('catWalkRight',4)
  player.addAni('walkRight','catWalkRight/tile1.png',4)
  player.r = 5

  coin = new Sprite((width / 10) * 9, height / 2, 30);
  coin.addAni('strawb','strawberry.png')
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
  image(img, 0, 0, width, height, 0, 0, img.width, img.height);
  print(mouseX, mouseY)
  textSize(26);
  text('Choose a Game Mode to Play ->', width / 4, height / 2)

  let leftAlign = width - 200

  //SP BUTTON
  fill(255, 150, 210);
  rect(leftAlign - 20, 50, 200, 75);
  fill(255);
  text('Single Player', leftAlign, 106);

  //MP BUTTON
  fill(236, 150, 255);
  rect(leftAlign - 20, 200, 200, 75);
  fill(255);
  text('MultiPlayer', leftAlign, 248);

  // //INSTRUCTIONS BUTTON
  // text('Instructions', 94, 406);
  // fill(255, 0, 0);
  // rect(50, 350, 200, 75);

}

function mouseClicked() {
  if (MENU == 0) {
    if (mouseX < 930 && mouseX > 730) {
      if (mouseY < 125 && mouseY > 50) {
        MENU = 1
      }
      if (mouseY < 275 && mouseY > 200) {
        MENU = 2
      }
      if (mouseY < 425 && mouseY > 350) {
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
}
