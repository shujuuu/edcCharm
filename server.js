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
serialPort.on("open", function () {

	var socket = require('socket.io-client')('192.168.1.49:9000');
	socket.on('connect', function () {
		console.log("Connected");
	});
	socket.on('event', function (data) {
		console.log("Event ", data);

	});
	socket.on('disconnect', function () {
		console.log("disconnect");
	});

	serialPort.on("data", function (data) {
		let decodeBuffer = data.toString('utf8');
		console.log(decodeBuffer);
		socket.emit('serialdata', decodeBuffer);
	});

});