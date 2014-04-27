var fens={}
var browser_clients={}
var http = require('http')
var express=require('express')
var app = express()
var server=http.createServer(app).listen(4000)
var io = require('socket.io').listen(server);
var _=require("underscore")

io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');

app.get("/get_fen/:connectionId",function(request,response){
  console.log(fens[request.params.connectionId])
  response.write(fens[request.params.connectionId])
  response.end()
})

app.get("/send_evaluation/:room",function(request,response){

  _.each(io.sockets.clients(request.params.room),function(client,index){
    client.emit("hi")
  });
  response.end()
})



var chat = io
  .on('connection', function (socket) { 

    socket.on('subscribe',function(data){
      socket.join(data.room)
      socket.room=data.room
      if (io.sockets.clients(socket.room).length===1){
        fens[socket.room]="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        browser_clients[data.room]=socket
        console.log("booya")
      }
      socket.emit("receive_fen",{fen:fens[data.room]})
    })

    socket.on("send_evaluation",function(data){
      socket.broadcast.to(data.room).emit("receive_evaluation",{evaluation:data.evaluation,depth:data.depth,seldepth:data.seldepth,engine:data.engine,nodes:data.nodes})
    })

    socket.on("new_position",function(data){
      fens[data.connectionId]=data.fen
    })

    socket.on('disconnect',function(data){
      console.log(fens)
      console.log(browser_clients)
      if(socket.id===browser_clients[socket.room]){
        socket.broadcast.to(socket.room).emit("receive_fen",{fen:"kill"});
        delete fens[socket.room];
        delete browser_clients[socket.room];
        }
      console.log(fens)
      console.log(browser_clients)
    })
      
   
    
    socket.on('position',function(data){
      fens[data.room]=data.fen
      socket.broadcast.to(data.room).emit("receive_fen",{fen:data.fen})
      
    });
 
  })
  

 

  