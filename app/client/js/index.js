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

$host_room.on('click', function() {
    if(form_validated === true) {
        jQuery.ajax('/api/new_room/'+$room_name.val()+'/'+$user_name.val(), {
            complete: function(data) {
                console.log(data.responseJSON);
                var res = data.responseJSON;

                if(res.text === 'room exists already') {
                    Materialize.toast('The room specified already exists. Please choose a different room name.', 8000);
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
                    Materialize.toast('You\'ve already joined the room specified.', 8000);
                }

            }
        });
    }
})
