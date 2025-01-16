(function() {
    'use strict';

    let time = 0;

    document.body.toggleClass('no--cursor',true);

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('keydown code: '+ code);
    });

    document.addEventListener("mousedown", function (e) {    
        Lampa.Noty.show('mouse down');
    });

    document.addEventListener("mouseup", function (e) {    
        Lampa.Noty.show('mouse up');
    });
    
    document.addEventListener("keyup", function (e) {    
        Lampa.Noty.show('key up');
    });
    
    // https://github.com/yumata/lampa-source/blob/main/src/interaction/keypad.js
    document.addEventListener("mousemove", function (e) {
    	if (time > Date.now() - 200) return
    	time = Date.now();
        
        var button = e.button;
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
        } else if (movementX == 0 && movementY == 0) {
            Lampa.Controller.enter()
        }

        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX);
    });


    // let mouse_timer_cursor
    
    // $(window).on('mousemove',()=>{
    //     clearTimeout(mouse_timer_cursor)

    //     mouse_timer_cursor = setTimeout(()=>{
    //         body.toggleClass('no--cursor',true)
    //     },3000)

    //     body.toggleClass('no--cursor',false)    
})();
