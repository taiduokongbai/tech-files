var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/regest', function(req, res){
  res.sendfile('regest.html');
});

app.get('/shopInfo', function(req, res){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : ''
	});

	 userName = req.query.username;
	 email = req.query.email;
	 // userName = "zhaoying";

	connection.connect();

	connection.query("SELECT * FROM testdata.test01 where username=? and email=?",[userName,email] function(err, rows, fields) {
		if(err) {
			// 抛出异常,下面的代码不会被执行。
			throw err;
		}
	  	body = JSON.stringify(rows);
		res.write(body,"utf8");
		res.end();
	});

	connection.end();
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(80, function(){
  console.log('listening on *:80');
});