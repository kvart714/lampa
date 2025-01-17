(function() {
    'use strict';

    let time = 0;


    
    // document.addEventListener("mouseup", function (e) {    
    //     e.preventDefault();
        
    //     Lampa.Controller.enter();
    // });

    Lampa.Noty.show('ver 1'); // Yandex.Browser for TV doesn't allow to refresh the page without cache 

    let modal = $('<div><div class="about">Разрешите доступ</div><br><div class="broadcast__device selector" style="textalign: center">Готово</div></div>')
    Lampa.Modal.open({
        title: 'Авторизация',
        html: modal,
        align: 'center',
        onBack: () => {
            Lampa.Modal.close()
        },
        onSelect: () => { // on button click
            Lampa.Noty.show('ok');
            document.body.requestPointerLock();
        }
    })
    

    
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
        } else if (screenX == 0) {
            Lampa.Controller.move('left');
        } 


        Lampa.Noty.show('mouse move, button: ' + button + ', movementX: ' + movementX + ', movementY: ' + movementY + ', key: ' + key);
    });
 
})();
