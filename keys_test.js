(function() {
    'use strict';

    let time = 0;


    // document.addEventListener("keydown", function (e) {
    //     var code = e.code;
    //     Lampa.Noty.show('keydown code: '+ code);        
    // });
    
    document.addEventListener("mouseup", function (e) {    
        e.preventDefault();
        
        Lampa.Controller.enter();
    });


    
    // https://github.com/yumata/lampa-source/blob/main/src/interaction/keypad.js
    window.addEventListener("mousemove", function (e) {
        
        if (time > Date.now() - 100) return
    	time = Date.now();
        
        var button = e.button;
        var key = e.key;
        var movementX = e.movementX;
        var movementY = e.movementY;
        if (movementX < 0) {
            Lampa.Controller.move('left');            
        } else if (movementX > 0) {
            Lampa.Controller.move('right');
        } else if (movementY < 0) {
            Lampa.Controller.move('up');
        } else if (movementY > 0) {
            Lampa.Controller.move('down');
        }

        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX + ', movementY: ' + movementY + ', key: ' + key);
    });
 
})();
