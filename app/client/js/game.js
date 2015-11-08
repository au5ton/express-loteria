/*
*  Game.js
*
*/

$('.card_container .playing_card').on('click', function(event){
    event.target.setAttribute('src','static/img/loteria/15_marked.jpg');
});

if(document.getElementById('host_close_room')) {
    $('#host_close_room').on('click', function(){
        jQuery.ajax('/api/close_room/'+document.getElementById('roomName').innerHTML, {
            complete: function(data) {
                console.log(data);
                window.location = '/index';
            }
        });
    });
}

if(document.getElementById('host_start_game')) {
    $('#host_start_game').on('click', function(){
        jQuery.ajax('/api/start_game/'+document.getElementById('roomName').innerHTML, {
            complete: function(data) {
                console.log(data);
                window.location = '/index';
            }
        });
    });
}

function updateGameView() {

}
