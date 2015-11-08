/*
*  App.js
*
*/

var express = require('express');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var app = express();

var api = require('./api');

//Static page serving
app.use('/static', express.static('client'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: './client'});
});
app.get('/game', function(req, res) {
    res.sendFile('game.html', {root: './client'});
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
