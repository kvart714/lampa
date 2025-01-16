(function() {
    'use strict';

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('keydown code: '+ code);
    });

    document.addEventListener("mousemove", function (e) {
        var button = e.button;
        var movementX = e.movementX;
        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX);
    });

    document.addEventListener("mousedown", function (e) {
        var button = e.button;
        Lampa.Noty.show('mouse down, button: ' + button);
    });


})();
