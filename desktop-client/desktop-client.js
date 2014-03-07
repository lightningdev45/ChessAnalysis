var http = require('http')
var state="hi";
var app = http.createServer(function(req, res) {
  req.setEncoding('utf8');
	req.on("data",function(chunk){
		//console.log(JSON.parse(chunk).evaluation)
	var data=JSON.parse(chunk)
  	socket.emit("send_evaluation",{evaluation:data.evaluation,room:connectionId,depth:data.depth,seldepth:data.seldepth,engine:data.engine,nodes:data.nodes})
  })

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(state);
  

}).listen(4000);


 var socket=require('socket.io-client').connect("http://localhost:8080")   
 var connectionId=process.argv[2]
 socket.emit('subscribe',{room:connectionId})             
  socket.on("receive_fen",function(data){
  	state=data.fen

 })