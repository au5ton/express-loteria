/*
*  Game.js
*
*/

var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host);
var room_name = document.getElementById('room_name').innerHTML;
var user_name = document.getElementById('user_name').innerHTML;


if(document.getElementById('host_close_room')) {
    $('#host_close_room').on('click', function(){
        socket.emit('close game', {
            room_name: room_name,
            client_user_name: user_name
        }, function(err, message) {
            console.log(err);
            console.log(message);
            window.location = '/index';
        });
    });
}

if(document.getElementById('host_start_game')) {
    $('#host_start_game').on('click', function(){
        socket.emit('start game', {
            room_name: room_name,
            client_user_name: user_name
        }, function(err, message) {
            console.log(err);
            console.log(message);
            window.location = '/index';
        });
    });
}

$('.card_container .playing_card').on('click', function(event){
    var slot = event.target.getAttribute('data-markable-card');
    var card_id = event.target.getAttribute('data-card-id');
    var marked = event.target.getAttribute('data-marked');
    console.log('slot '+slot+' clicked, holds card id: '+card_id);

    if(!isNaN(slot) && card_id !== '0' && marked === 'false') {
        socket.emit('mark slot', {
            room_name: room_name,
            client_user_name: user_name,
            slot: slot
        });
        var src = event.target.getAttribute('src');
        event.target.setAttribute('src', src.substring(0,src.length-4)+'_marked.jpg')
    }
    else {
        console.log('(not emitted)');
    }

});


socket.emit('refresh game', {
    //
});

socket.on('game refreshed', function(data) {
    //
});
