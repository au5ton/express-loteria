/*
*  API.js
*
*/

var express = require('express');
var router = express.Router();








//Actual server code
var RoomManager = require('./RoomManager');

/*
____
|  _ \ ___   ___  _ __ ___  ___
| |_) / _ \ / _ \| '_ ` _ \/ __|
|  _ < (_) | (_) | | | | | \__ \
|_| \_\___/ \___/|_| |_| |_|___/

*/
router.get('/new_room/:name/:host', function(req, res) {
    if(RoomManager.roomExists(req.params.name)) {
        res.json({text: 'room exists already', room: RoomManager.getRoomByName(req.params.name)});
    }
    else if(RoomManager.userHasGroup(req.params.host) === true) {
        var obj = RoomManager.getGroupForMember(req.params.host);
        res.json({text: 'room already joined', obj});
    }
    else {
        RoomManager.addRoom(req.params.name, req.params.host);
        RoomManager.joinRoom(req.params.name,req.params.host);
        res.json({text: 'room created', room: RoomManager.getRoomByName(req.params.name)});
    }
});

router.get('/close_room/:name', function(req, res) {
    if(RoomManager.roomExists(req.params.name) === true) {
        res.json({text: 'room closed', room: RoomManager.getRoomByName(req.params.name)});
        RoomManager.closeRoom(req.params.name);
    }
    else {
        res.json({text: 'room does not exist'});
    }
});

router.get('/open_rooms', function(req, res) {
    res.json(RoomManager.rooms);
});

router.get('/room/:name', function(req, res) {
    if(RoomManager.roomExists(req.params.name) === true) {
        res.json(RoomManager.getRoomByName(req.params.name));
    }
    else {
        res.json({text: 'room does not exist'});
    }
});

router.get('/join_room/:name/:user', function(req, res) {
    if(RoomManager.roomExists(req.params.name) === true) {
        if(RoomManager.userHasGroup(req.params.user)) {
            res.json({text: 'room already joined', room: RoomManager.getRoomByName(req.params.name)});
        }
        else {
            RoomManager.joinRoom(req.params.name,req.params.user);
            res.json({text: 'room joined', info: req.params.user+' joined '+req.params.name});
        }
    }
    else {
        res.json({text: 'room does not exist'});
    }
});















/*
____
/ ___| __ _ _ __ ___   ___
| |  _ / _` | '_ ` _ \ / _ \
| |_| | (_| | | | | | |  __/
\____|\__,_|_| |_| |_|\___|

*/

router.get('/scoreboard/:format/:name', function(req, res){
    currentRoom = RoomManager.getRoomByName(req.params.name);
    if(currentRoom === null) {
        res.json({text: 'room with specified name not found'});
    }

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
    if(req.params.format !== 'html') {
        res.json(scoreboard);
    }
    var score_string = [];
    for(var i = 0; i < scoreboard.length; i++) {
        score_string.push(scoreboard[i].name+' ('+scoreboard[i].score+')');
    }
    res.json(score_string);
});

router.get('/game_status/:name', function(req, res){


    var scoreboard = RoomManager.getRoomByName(req.params.name).members;
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


    if(RoomManager.roomExists(req.params.name) === true) {
        res.json({
            room: RoomManager.getRoomByName(req.params.name),
            scoreboard: scoreboard,
            card_queue: RoomManager.getRoomByName(req.params.name).shown_queue
        });
    }
    else {
        res.json({text: 'room does not exist'});
    }
});

router.get('/start_game/:name', function(req, res) {

    RoomManager.startGame(req.params.name);

});



module.exports = router;
