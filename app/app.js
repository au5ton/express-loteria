var express = require('express');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var app = express();

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

app.use('/static', express.static('client'));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: './client'});
});
app.get('/game', function(req, res) {
    res.sendFile('game.html', {root: './client'});
});

app.get('/helloworld', function (req, res) {
    res.json({'response':'Check out the API!'});
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
