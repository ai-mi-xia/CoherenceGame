//GLOBAL VARIABLES
let player, gems, coin;
let angle = 0;
let pace;
let coherenceScore;
let collectedCoin;
let img;
//Open and connect socket
let socket = io();

//SOCKET.IO - Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

function preload() {
  img = loadImage('PixelSky.png');
}

function setup() {
  
  createCanvas(800, 600);


  gameOneSetup();

  //Listen for messages named 'data' from the server
  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });

  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(width / 2.2, 860);
  slider.style("width", "150px");

  //Gems setup
  // gems = new Group();
  // gems.diameter = 10;
  // gems.x = () => random(0, width);
  // gems.y = () => random(0, height);
  // gems.amount = 80;


  // player.overlaps(gems, collect);

}

function draw() {

  
  // preload();

  //PACER LINE
  pace = slider.value();
  pacerLine();

  //Coherence Score from Sockets.io
  socket.on('newdata', function (score) {

    //put into global variable
    coherenceScore = score

  })

  //startScreen();
  gameOne();



}

function startScreen(){
background(230);
//Check if emWave pro is connected
}

//GAME ONE - HOW TO INCREASE COHERENCE
function gameOne() {
background(150);
  image(img, 0, 0, width, height, 0, 0, img.width, img.height);
  //DISPLAY COHERENCE SCORE
  noStroke();
  textSize(32);
  text(coherenceScore, width / 2.2, (height / 12));
  textSize(16);
  text("Get your coherence score up to increase your speed!", width / 4, (height / 9));

  let coherenceVal = map(coherenceScore, 0, 6, 0, 12);

  player.direction = 'right'


  if (coherenceScore > 0 && coin.removed == false) {
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

function gameOneSetup(){
  player = new Sprite(width / 10, height / 2, 50);

  coin = new Sprite((width / 10) * 9, height / 2, 30);
}

//GAME TWO - COHERENCE IN STRESSFUL SITUATIONS

function gameTwoSetup(){

}

function gameTwo(){
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

function pacerLine() {
  let r = map(sin(angle), 1, -1, width / 4, (width / 4) * 3);
  fill(0)
  circle(r, (height / 10) * 9, 10);
  stroke(0);
  line(width / 4, (height / 10) * 9, (width / 4) * 3, (height / 10) * 9);
  angle += pace;
}
