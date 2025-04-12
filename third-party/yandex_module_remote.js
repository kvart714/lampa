(function() {
    'use strict';

    let time = 0;

    // document.addEventListener("mouseup", function (e) {    
    //     e.preventDefault();
        
    //     Lampa.Controller.enter();
    // });

    Lampa.Noty.show('ver 1'); // Yandex.Browser for TV doesn't allow to refresh the page without cache 

    
    // https://github.com/yumata/lampa-source/blob/main/src/interaction/keypad.js
    window.addEventListener("mousemove", function (e) {
        
        if (time > Date.now() - 100) return
    	time = Date.now();
        
        var button = e.button;
        var key = e.key;
        var movementX = e.movementX;
        var movementY = e.movementY;
        var screenX = e.screenX;
        if (movementX < 0) {
            Lampa.Controller.move('left');            
        } else if (movementX > 0) {
            Lampa.Controller.move('right');
        } else if (movementY < 0) {
            Lampa.Controller.move('up');
        } else if (movementY > 0) {
            Lampa.Controller.move('down');
        } else if (screenX == 0) { // it works with the left side, but doesn't work on others
            Lampa.Controller.move('left');
        } 


        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX + ', movementY: ' + movementY + ', key: ' + key);
    });
 
})();
