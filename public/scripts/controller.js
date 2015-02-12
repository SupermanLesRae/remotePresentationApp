/**
 * Created by Les-Rae Superman on 2014-12-08.
 */
$(function() {

    var server = 'http://10.0.0.6:3000/';

    var user = "";

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    user = Math.round(getRandomArbitrary(0, 10000));

    $('#optTxt h1').html(user);

    function xhr(url, id) {
        var request = new window.XMLHttpRequest();
        request.open('GET', url+'?name='+user, true);
        request.send();
    }

    var buttons = [].slice.call(document.getElementsByClassName('customBtn'));
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
       //     alert( $(this).data('value'));
            xhr(server + $(this).data('value'), user);
        }, true);
    });

});