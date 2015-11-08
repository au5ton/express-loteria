/*
*  API.js
*
*/

var express = require('express');
var router = express.Router();


//Actual server code
var RoomManager = require('./RoomManager');

//Room management
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
            res.json({text: 'room already joined'});
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



module.exports = router;
