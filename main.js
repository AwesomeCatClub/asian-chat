// import all the 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

// some info
var info = {
	"name": "asian-chat",
	"version": "v1.0",
	"repo": "https://github.com/AwesomeCatClub/asian-chat",
	"message": "",
}
info.message = "{0} version {1}, Made by AwesomeCatClub. the source code is available at {2}".format(info.name, info.version, info.repo);

// define max messages stored
const MSG_MAX = 50;

// log that it finished loading
console.log(Date()+' loaded');

// a function to clear all the messages
function clearMsg() {
	msgArray = [ ];
	msgArray[0] = info.message;
}

// we run it to get our array
clearMsg();

