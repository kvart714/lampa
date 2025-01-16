(function() {
    'use strict';

    let time = 0;

    const noHoverStyle = document.createElement("style");
    noHoverStyle.innerHTML = "* { pointer-events: none !important; }";
    document.head.appendChild(noHoverStyle);

    // document.addEventListener("keydown", function (e) {
    //     var code = e.code;
    //     Lampa.Noty.show('keydown code: '+ code);        
    // });
    
    document.addEventListener("mouseup", function (e) {    
        Lampa.Controller.enter();
        e.preventDefault();
    });

    
    // document.addEventListener("mousedown", function (e) {    
    //     Lampa.Noty.show('mouse down');
    // });

    
    // document.addEventListener("keyup", function (e) {    
    //     Lampa.Noty.show('key up');
    // });
    
    // https://github.com/yumata/lampa-source/blob/main/src/interaction/keypad.js
    document.addEventListener("mousemove", function (e) {
    	if (time > Date.now() - 100) return
    	time = Date.now();
        
        var button = e.button;
        var movementX = e.movementX;
        var movementY = e.movementY;
        if (movementX < 0) {
            Lampa.Controller.move('left');
            e.preventDefault();
        } else if (movementX > 0) {
            Lampa.Controller.move('right');
            e.preventDefault();
        } else if (movementY < 0) {
            Lampa.Controller.move('up');
            e.preventDefault();
        } else if (movementY > 0) {
            Lampa.Controller.move('down');
            e.preventDefault();
        }

        // Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX);
    });
 
})();
