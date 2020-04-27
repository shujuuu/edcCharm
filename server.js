// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);

	fs.readFile(__dirname + parsedUrl.pathname,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
		}
	);
}

var httpServer = http.createServer(requestHandler);
httpServer.listen(9000);
console.log('Server listening on port 9000');
var io = require('socket.io').listen(httpServer);

//serial port
var SerialPort = require('serialport');
var serialPort = new SerialPort("/dev/cu.usbmodem14101", {
	baudRate: 9600
});

io.sockets.on('connection',
	function (socket) {
		console.log("We have a new client: " + socket.id);
		socket.on('serialdata', function (data) {
			// console.log(data);
			//console.log(data.readInt8(0));
			// for (var i = 0; i < data.length; i++) {
			// 	io.sockets.emit('serialdata', data.readInt8(i));
			// }
			// io.emit('serialdata', data);
		});

		socket.on('disconnect', function () {
			console.log("Client has disconnected");
		});

		serialPort.on("data", function (data) {
			let decodeBuffer = data.toString('utf8');
			console.log(data.toString('utf8'))
			socket.emit('serialdata', data);
			// console.log(data);
		});
	}
);