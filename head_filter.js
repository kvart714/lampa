(function() {
  'use strict';

  function startPlugin() {
    var manifest = {
      type: 'other',
      version: '0.1.0',
      name: 'Настройка шапки',
      description: 'Плагин для скрытия элементов в шапке Лампы',
      component: 'head_filter',
    };
    Lampa.Manifest.plugins = manifest;

    var head = {
      'head_filter_show_search': {name: 'Поиск', element: '.open--search'}, 
      'head_filter_show_settings': {name: 'Настройки', element: '.open--settings'}, 
      'head_filter_show_premium': {name: 'Премиум', element: '.open--premium'}, 
      'head_filter_show_profile': {name: 'Профиль', element: '.open--profile'}, 
      'head_filter_show_feed': {name: 'Новости', element: '.open--feed'}, 
      'head_filter_show_notice': {name: 'Уведомления', element: '.open--notice'},
      'head_filter_show_broadcast': {name: 'Вещание', element: '.open--broadcast'},
      'head_filter_show_fullscreen': {name: 'Полноэкранный режим', element: '.full-screen'}, 
      'head_filter_show_reload': {name: 'Обновление страницы', element: '.m-reload-screen'},
      'head_filter_show_split': {name: 'Разделитель', element: '.head__split'}, 
      'head_filter_show_time': {name: 'Время', element: '.head__time'}, 
    };

    function showHideElement(element, show) {
      if (show == true) {
        $(element).show();
      } else {
        $(element).hide();
      }
    }

    Lampa.Storage.listener.follow('change', function(event) {
      if (event.name == 'activity') {
        setTimeout(function() {
          Object.keys(head).forEach(function(key) {
            var show_element = Lampa.Storage.get(key, true); 
            showHideElement(head[key].element, show_element);     
          });          
        }, 1000);
      } else if (event.name in head) {
        var show_element = Lampa.Storage.get(event.name, true); 
        showHideElement(head[event.name].element, show_element);     
      }
    });

    // https://github.com/yumata/lampa-source/blob/main/src/interaction/template.js
    Lampa.Template.add('settings_head_filter',`<div></div>`);

    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            type: 'button'
        },
        field: {
            name: 'Шапка',
            description: 'Настройка отображения элементов в шапке'
        },
        onChange: ()=>{
            Lampa.Settings.create('head_filter',{
                onBack: ()=>{
                    Lampa.Settings.create('interface')
                }
            })
        }
    })   

    Lampa.SettingsApi.addParam({
      component: 'head_filter',
      param: {
        type: 'title'
      },
      field: {
        name: 'Отображать в шапке',
      }
    });   

    Object.keys(head).forEach(function(key) {
      Lampa.SettingsApi.addParam({
        component: 'head_filter',
        param: {
          name: key,
          type: 'trigger',
          default: true
        },
        field: {
          name: head[key].name,
        }        
      });
    });
  
  }

  if (window.appready) {
    startPlugin();
  } else {
    Lampa.Listener.follow('app', function(e) {
      if (e.type == 'ready') {
        startPlugin();
      }
    });
  }
})();