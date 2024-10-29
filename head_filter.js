(async function() { 
  'use strict'; 

  function startPlugin() {

    var manifest = {
      type: 'other',
      version: '0.0.3',
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
        $(element).show()
      } else {
        $(element).hide()
      }
    }

    Lampa.Storage.listener.follow('change', function (event) {
      if (event.name == 'activity') { // если приложение только запущено (activity)
        Object.keys(head).forEach(key => {
          var show_element = Lampa.Storage.get(key, true); 
          showHideElement(head[key].element, show_element);     
        });
      } else if (event.name in head) { // если изменен наш параметр
        var show_element = Lampa.Storage.get(event.name, true); 
        showHideElement(head[event.name].element, show_element);     
      }      
    });


    Lampa.SettingsApi.addComponent({
      component: 'head_filter',
      name: 'Настройка шапки',
      icon: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle>
              <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle>
              <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle>
            </svg>`
    });


    Lampa.SettingsApi.addParam({
      component: 'head_filter',
      param: {
        type: 'title'
      },
      field: {
        name: 'Отображать',
      }
    });


    Object.keys(head).forEach(key => {
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

  if (window.appready) startPlugin();
  else {
    Lampa.Listener.follow('app', function(e) {
      if(e.type == 'ready') {
        startPlugin();
      }
    });
  }

})();