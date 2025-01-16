(function() {
    'use strict';

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('code_ '+ code);
    });
    

})();