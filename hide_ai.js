(function() {
  'use strict';

  function startPlugin() {
    var manifest = {
      type: 'other',
      version: '0.1.0',
      name: 'Скрытие AI',
      description: 'Плагин для скрытия AI-элементов',
      component: 'hide_ai',
    };
    Lampa.Manifest.plugins = manifest;


    // Lampa.Template.add('hhh', '<style type="text/css">\n.search-source.selector:contains("TMDB") {display:none}\n</style>');
    // $('head').append(Lampa.Template.get('hhh', {}, true));


    Lampa.Listener.follow('full', function (e) {

      console.log('full', e);
      if (e.type == 'complite') {
      
        $('.button--options').hide();
        $('.search-source.selector:contains("AI")').hide();

      }

    });

      
  }

  if (window.appready) {
    startPlugin();
  } else {
    Lampa.Listener.follow('app', function(e) {
      console.log('app', e);
      if (e.type == 'ready') {
        startPlugin();
      }
    });
  }
})();
