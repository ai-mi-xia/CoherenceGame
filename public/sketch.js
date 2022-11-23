let speed;

//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  //Listen for messages named 'data' from the server
  socket.on('data', function(obj) {
    console.log(obj);
    drawPos(obj);
  });
}

function draw() {
    socket.on('newdata', function(score){
      let character;
        character = new Sprite();
        sprite.diameter = 50;
        if(score > 0 && score < 1){
            background(234,0,0);
         } 
        else if (score > 1 && score < 2){
            background(0,243,0);
         } 
        else if (score > 2 && score < 3){
             background(0,0,234);
         }
        //console.log(score);
    })
}
