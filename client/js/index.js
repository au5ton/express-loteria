/*
*  Index.js
*
*/

var form_validated = false;

var $user_name = $('#user_name');
var $room_name = $('#room_name');

$user_name.on('keyup', validateForm);
$room_name.on('keyup', validateForm);

function validateForm() {
    console.log($user_name.val());
    console.log($room_name.val());
    if($user_name.val() !== '' && $room_name.val() !== '') {
        enableForm();
    }
    else {
        disableForm();
    }
}

function enableForm() {
    $('.btn').removeClass('disabled');
}
function disableForm() {
    $('.btn').addClass('disabled');
}
