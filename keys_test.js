(function() {
    'use strict';

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('keydown code: '+ code);
    });

    document.addEventListener("mousedown", function (e) {
        var button = e.button;
        Lampa.Noty.show('mouse moved, button: ' + button);
    });
    

})();
