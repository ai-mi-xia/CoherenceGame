let player, gems;
let angle = 0;
let pace;
//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(232);

  //Listen for messages named 'data' from the server
  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });

  slider = createSlider(0, 1, 0.5, 0.05);
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

pace = slider.value();
  
    //PACER LINE
    pacerLine();
  socket.on('newdata', function (score) {
    background(150); 
    textSize(32);
    text(score, 10, 30);
    let coherenceVal = map(score, 0, 6, 1, 500);
    
    circle(500, 500, coherenceVal);
   
    
    // player = new Sprite();
    // player.r = coherenceVal
    //player.speed = coherenceVal;
    //console.log(coherenceVal);

    // if (score > 0 && score < 1) {

    //   background(243, 0, 0);
    //   //console.log("score")
    // }
    // else if (score > 1 && score < 2) {
    //   //player.speed = 10;
    //   background(0, 243, 0);
    //  //console.log("score")

    // }
    // else if (score > 2 && score < 3) {
    //   //player.speed = 20;
    //   background(0, 0, 234);
    //   //console.log("score")
    // }

    //display coherence score

    //console.log(player.speed);
  })


  //Keyboard controls

  //player.speed = 5;

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
  // clear();


}

// function collect(player, gem) {
//   gem.remove();
// }

function pacerLine() {
  let r = map(sin(angle), 1, -1, windowWidth/4, (windowWidth/4)*3);
  circle(r, (height / 10) * 9, 10);
  stroke(255);
  line(windowWidth/4, (height / 10) * 9, (windowWidth/4)*3, (height / 10) * 9);
  angle += pace;
}
