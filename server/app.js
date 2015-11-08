var express = require('express');
var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var app = express();

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin','*');
    res.json({'response':'Check out the API!'});
});

app.get('/api/mostpopular', function(req, res) {
    res.set('Access-Control-Allow-Origin','*');
});

app.get('/api/mostusedlanguages', function (req, res) {
    res.set('Access-Control-Allow-Origin','*');
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
