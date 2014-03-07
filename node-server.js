var fens={}
var browser_clients={}
var http = require('http')
    // NEVER use a Sync function except at start-up!
    //index = fs.readFileSync("/home/kempchee/Projects/EngineEval/app/views/positions/show.html.erb");

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("");
}).listen(8080);

var io = require('socket.io').listen(app);



var chat = io
  .of('')
  .on('connection', function (socket) {
    
    socket.on('subscribe',function(data){
      socket.join(data.room)
      socket.room=data.room
      if (io.sockets.clients(socket.room).length===1)
        {fens[socket.room]="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      browser_clients[socket.room]=socket.id}
      socket.emit("receive_fen",{fen:fens[data.room]})
      
      
      
       })
    socket.on("send_evaluation",function(data){
      socket.broadcast.to(data.room).emit("receive_evaluation",{evaluation:data.evaluation,depth:data.depth,seldepth:data.seldepth,engine:data.engine,nodes:data.nodes})
    })
    socket.on('disconnect',function(data){
      console.log(fens)
      console.log(browser_clients)
      if(socket.id===browser_clients[socket.room])
        {socket.broadcast.to(socket.room).emit("receive_fen",{fen:"kill"});
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
  

 

  