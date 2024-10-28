(function () {
    'use strict';

    function startPlugin() {
      window.head_filter_ready = true;


      Lampa.Template.add('trailer', "\n        <div class=\"card selector card--trailer\">\n            <div class=\"card__view\">\n                <img src=\"./img/img_load.svg\" class=\"card__img\">\n            </div>\n            <div class=\"card__promo\">\n                <div class=\"card__promo-text\">\n                    <div class=\"card__title\"></div>\n                </div>\n                <div class=\"card__details\"></div>\n            </div>\n            <div class=\"card__play\">\n                <img src=\"./img/icons/player/play.svg\">\n            </div>\n        </div>\n    ");
      

      function add() {
        // настройки
        // https://github.com/yumata/lampa-source/blob/main/src/components/settings/api.js
        Lampa.SettingsApi.addParam({
          component: 'interface',
          param: {
            type: 'title'
          },
          field: {
            name: 'Шапка'
          }
        });


        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'head_filter_settings',
                type: 'button'
            },
            field: {
                name: 'Настроить',
            },
            onChange: ()=>{
              Lampa.Select.show({
                title: 'Элементы шапки',
                name: 'head_filter_selection',
                items: [
                  {title: 'Поиск', selected: true, element: 'open--search'},
                  {title: 'Премиум', selected: true, element: 'open--premium'}
                  ],
                onSelect: (a)=>{
                  console.log('Head Filter', a.element);
                  // Lampa.Controller.toggle('head_filter_selection');

                },
                onBack: Lampa.Controller.toggle('interface') // TODO: отображать меню выбора
              });
            }
        })

        // Lampa.SettingsApi.addParam({
        //   component: 'interface',
        //   param: {
        //     name: 'head_filter_settings',
        //     type: 'button',
        //     placeholder: '',
        //     values: '',
        //   default: ''
        //   },
        //   field: {
        //     name: 'DLNA-сервер на Synology NAS',
        //     description: 'Например, 192.168.1.5:50001'
        //   }
        // });

        // Lampa.SettingsApi.addParam({
        //   component: 'head_filter_settings',
        //   param: {
        //     name: 'synology_nas_server',
        //     type: 'button',
        //     placeholder: '',
        //     values: '',
        //   default: ''
        //   },
        //   field: {
        //     name: 'DLNA-сервер на Synology NAS',
        //     description: 'Например, 192.168.1.5:50001'
        //   }
        // });        



        // var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"21\" height=\"21\" rx=\"2\" fill=\"white\"></rect>\n                    <mask id=\"path-2-inside-1_154:24\" fill=\"white\">\n                    <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\"></rect>\n                    </mask>\n                    <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\" stroke=\"white\" stroke-width=\"6\" mask=\"url(#path-2-inside-1_154:24)\"></rect>\n                    <rect x=\"27\" y=\"2\" width=\"17\" height=\"17\" rx=\"2\" fill=\"white\"></rect>\n                    <rect x=\"27\" y=\"34\" width=\"17\" height=\"3\" fill=\"white\"></rect>\n                    <rect x=\"34\" y=\"44\" width=\"17\" height=\"3\" transform=\"rotate(-90 34 44)\" fill=\"white\"></rect>\n                </svg>\n            </div>\n            <div class=\"menu__text\">\u0410\u043D\u0430\u043B\u0438\u0437</div>\n        </li>");
        // button.on('hover:enter', showList);
        // $('.menu .menu__list').eq(0).append(button);
      }
      if (window.appready) add(); else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }
    }
    if (!window.head_filter_ready) startPlugin();

})();
