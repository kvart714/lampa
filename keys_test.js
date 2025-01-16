(function() {
    'use strict';

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('keydown code: '+ code);
    });

    document.addEventListener("mousemove", function (e) {
        var button = e.offsetX;
        Lampa.Noty.show('mouse move, offsetX: ' + button);
    });
    

})();
