// import all the 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const package = require('./package.json')
const settings = require('./settings.json')

// add .format() implimentation to Javascript
// credit to fearphage for fix
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

MOTD1 = "{0} version {1}, Made by AwesomeCatClub. the source code is available at {2}".format(package.name, package.version, package.homepage);

// process a message
function prcMsg(data, skt) {
	skt.emit("msgTX", {
		user: data.user,
		msg: data.msg,
	})
}

// log that it finished loading
console.log(Date()+' loaded');

// a function to clear all the messages
function clearMsg() {
	msgArray = [ ];
	unmArray = [ ];
	// add empty lines
	for (var line = 0; line < settings.MAX_MSG; line++) {
		msgArray[line] = "";
		unmArray
	}
	
	// put in the MOTDs
	unmArray[settings.MAX_MSG - 2] = "MOTD";
	msgArray[settings.MAX_MSG - 2] = MOTD1;
	unmArray[settings.MAX_MSG - 1] = "MOTD";
	msgArray[settings.MAX_MSG - 1] = settings.MOTD2;
}

// we run it to get our array
clearMsg();

console.log(Date()+' blank screen generated');

// make a server
app.use(express.static("www"))
console.log(Date()+' started server');

// listen to the sockets
io.on("connection", socket => {
	// a user connecting has to login.
	socket.on("login", data => {
		// send newly connected users the entire conversation
		socket.emit("msgArray", {
			msgArray: msgArray,
			unmArray: unmArray
		})
		
	})
	socket.on("msgRX", data => {
		prcMsg(data, socket)
	})
})