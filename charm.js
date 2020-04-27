var SerialPort = require('serialport');
var serialPort = new SerialPort("/dev/cu.usbmodem14101", {
    baudRate: 9600
});

const Readline = SerialPort.parsers.Readline
const parser = new Readline()
serialPort.pipe(parser)

serialPort.on("open", function () {

    // var socket = require('socket.io-client')('192.168.1.49:9000');
    // socket.on('connect', function () {
    //     console.log("Connected");
    // });
    // socket.on('event', function (data) {
    //     console.log("Event ", data);

    // });
    // socket.on('disconnect', function () {
    //     console.log("disconnect");
    // });

    serialPort.on("data", function (data) {
        let decodeBuffer = data.toString('utf8');
        console.log(decodeBuffer);
        // socket.emit('serialdata', decodeBuffer);
    });

});