var TelnetSocket, net, socket, tSocket;
let dataS = [];
const xml2js = require('xml2js');
let testFunction;

net = require('net');

//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//TCP Socket
({TelnetSocket}=require("telnet-stream"));

socket = net.createConnection(20480, "localhost");

tSocket = new TelnetSocket(socket);

tSocket.on("close", function(){
    return process.exit();
});

//connecting the socket & parsing the data
tSocket.on("data", function(buffer){
   
    //XML string to JSON
    let xml = buffer.toString("utf8");
    xml2js.parseString(xml, (err, result) => {
        if (err) {
          throw err
        };
        // `result` is a JavaScript object
        // convert it to a JSON string
        const json = JSON.stringify(result, null, 4)
        const jsonAccess = JSON.parse(json);
    
        //if it isn't undefined, then return TRUE (if it's d01 and not IBI)
        if (jsonAccess.D01) {
             //data.push(Object.keys(jsonAccess.D01.$.S));
             //dataS.push(jsonAccess.D01.$.S);
            
             //checking function to see if it exists, if it exists, call it
             if (testFunction){
                let valueS = jsonAccess.D01.$.S
                let valueEP = jsonAccess.D01.$.EP
                let rawCoherenceScore = Math.log((valueEP/10)+1);
                let coherenceScore = Math.round((rawCoherenceScore + Number.EPSILON) * 100) / 100
                testFunction(valueS);
                console.log(testFunction);
             }

             
        }
    })


})

//TSOCKET STUFF
tSocket.on("do", function(option){
    return tSocket.writeWont(option);
})

tSocket.on("will", function(option){
    return tSocket.writeDont(option);
})

process.stdin.on("data", function (buffer){
    return tSocket.write(buffer.toString("utf-8"));
})


//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //creating the fuction and sending data (score)  
    testFunction = (data)=> {
        console.log(data);
        io.sockets.emit('newdata', data);
    }

    //Listen for a message named 'data' from this client
    socket.on('data', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received: 'data' " + data);

        //Send the data to all clients, including this one
        //Set the name of the message to be 'data'
        io.sockets.emit('data', data);

        //Send the data to all other clients, not including this one
        // socket.broadcast.emit('data', data);

        //Send the data to just this client
        // socket.emit('data', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});

