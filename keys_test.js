(function() {
    'use strict';

    let time = 0;

    Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        Lampa.Noty.show('keydown code: '+ code);
    });

    // https://github.com/yumata/lampa-source/blob/main/src/interaction/keypad.js
    document.addEventListener("mousemove", function (e) {
    	if (time > Date.now() - 100) return
    	time = Date.now();
        
        var button = e.button;
        var movementX = e.movementX;
        if (movementX < 0) {
            Lampa.Controller.move('left');
        } else if (movementX > 0) {
            Lampa.Controller.move('right');
        }
        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX);
    });

    document.addEventListener("mousedown", function (e) {
        var button = e.button;
        Lampa.Noty.show('mouse down, button: ' + button);
    });


    // let mouse_timer_cursor
    
    // $(window).on('mousemove',()=>{
    //     clearTimeout(mouse_timer_cursor)

    //     mouse_timer_cursor = setTimeout(()=>{
    //         body.toggleClass('no--cursor',true)
    //     },3000)

    //     body.toggleClass('no--cursor',false)    
})();
