/*
*  App.js
*
*/

var express = require('express');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

var RoomManager = require('./RoomManager');

var api = require('./api');

//Static page serving
app.use('/static', express.static('client'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());


app.get('/', function(req, res) {
    res.sendFile('index.html', {root: './client'});
});
app.get('/index', function(req, res) {
    res.redirect('/');
});
app.get('/help', function(req, res) {
    res.sendFile('help.html', {root: './client'});
});
app.get('/game', function(req, res) {

    console.log(req.query);
    var currentRoom;
    if(req.query.room) {
        if(req.query.user) {
            if(RoomManager.roomExists(req.query.room) === true) {
                currentRoom = RoomManager.getRoomByName(req.query.room);
                var scoreboard = currentRoom.members;
                scoreboard = scoreboard.sort(function(a,b){
                    if(a.score > b.score) {
                        return -1;
                    }
                    else if(a.score < b.score){
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                var score_string = [];
                for(var i = 0; i < scoreboard.length; i++) {
                    score_string.push(scoreboard[i].name+'('+scoreboard[i].score+')');
                }
                res.render('game', {
                    roomName: currentRoom.name,
                    hostName: currentRoom.host,
                    scoreboard: score_string,
                    username: req.query.user
                });
            }
        }
        else {
            res.render('error', {
                text: 'The user you provided wasn\'t valid'
            });
        }
    }
    else {
        res.render('error', {
            text: 'The room you provided doesn\'t exist.'
        });
    }

});

//API calls are done under api.js
app.use('/api', api);

//Mirrors for testing
app.get('/query_mirror', function (req, res) {
    res.json(req.query);
});
app.get('/params_mirror/:name/:other', function (req, res) {
    res.json(req.params);
});


var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    /*fs.readFile('colors.json', 'utf8', function(err,data){
    if(err) throw err;
    github_colors = JSON.parse(data);
});*/

console.log('Example app listening at http://%s:%s', host, port);
});
