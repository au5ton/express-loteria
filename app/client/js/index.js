/*
*  Index.js
*
*/

var form_validated = false;

var $user_name = $('#user_name');
var $room_name = $('#room_name');
var $host_room = $('#host_room');
var $join_room = $('#join_room');

$user_name.on('keyup', validateForm);
$room_name.on('keyup', validateForm);

function validateForm() {
    if($user_name.val() !== '' && $room_name.val() !== '') {
        enableForm();
    }
    else {
        disableForm();
    }
}

function enableForm() {
    form_validated = true;
    $('.btn').removeClass('disabled');
}
function disableForm() {
    form_validated = false;
    $('.btn').addClass('disabled');
}

function redirectToGame(room,user) {
    if(room && user) {
        window.location = '/game?room='+room+'&user='+user;
    }
    else {
        window.location = '/game?room='+$room_name.val()+'&user='+$user_name.val();
    }
}

$host_room.on('click', function() {
    if(form_validated === true) {
        jQuery.ajax('/api/new_room/'+$room_name.val()+'/'+$user_name.val(), {
            complete: function(data) {
                console.log(data.responseJSON);
                var res = data.responseJSON;

                if(res.text === 'room exists already') {
                    for(var i = 0; i < res.room.members.length; i++) {
                        if(res.room.members[i].name === $user_name.val()) {
                            redirectToGame();
                        }
                    }
                    Materialize.toast('The room specified already exists. Please choose a different room name.', 8000);
                }
                else {
                    redirectToGame();
                }

            }
        });
    }
});

$join_room.on('click', function() {
    if(form_validated === true) {
        jQuery.ajax('/api/join_room/'+$room_name.val()+'/'+$user_name.val(), {
            complete: function(data) {
                console.log(data.responseJSON);
                var res = data.responseJSON;

                if(res.text === 'room does not exist') {
                    Materialize.toast('The room specified does not exist.', 8000);
                }
                else if(res.text === 'room already joined') {
                    for(var i = 0; i < res.room.members.length; i++) {
                        if(res.room.members[i].name === $user_name.val()) {
                            redirectToGame();
                        }
                    }
                    Materialize.toast('You\'ve already joined a room. You can only join one room at a time.', 8000);
                    //check to see if this is the room you're a part of
                }

            }
        });
    }
})
