(function () {
    'use strict';

    var network = new Lampa.Reguest();

    function processKinopoiskData(data) {
      // use cache
      if (data && data.data.userProfile && data.data.userProfile.userData && data.data.userProfile.userData.plannedToWatch) {
        
        var kinopoiskMovies = Lampa.Storage.get('kinopoisk_movies', []);
        var receivedMovies = data.data.userProfile.userData.plannedToWatch.movies.items;
        receivedMovies.forEach(m => {

            const existsInLocalStorage = kinopoiskMovies.some(km => km.kinopoisk_id === String(m.movie.id));
            if (!existsInLocalStorage) {
              // get movie data
              console.log(m.movie);
              var title = m.movie.title.localized || m.movie.title.original;
              network.silent('https://cub.red/api/catalog/search?query='+encodeURIComponent(title),
                function (data) {
                  if (data && data.results) {
                    var movieItem = data.results[0];
                    movieItem.kinopoisk_id = String(m.movie.id);
                    movieItem.source = "tmdb";
                    kinopoiskMovies = Lampa.Storage.get('kinopoisk_movies', []); // re-read data if another process modified it
                    kinopoiskMovies.unshift(movieItem);
                    Lampa.Storage.set('kinopoisk_movies', JSON.stringify(kinopoiskMovies));
                  } else {
                    console.log('No movie found for query ' + title);
                  }
                },
                function (data) {
                  console.log('error');
                  console.log(data);
                }
              );
            }

          }
        )

      } else {
        Lampa.Noty.show('Невозможно обработать данные, полученные от Кинопоиска');
        console.log(data);
      }
    }


    function getKinopoiskData() {
      var oauth = Lampa.Storage.get('kinopoisk_access_token');
      // google script is used to act as CORS proxy
      network.silent('https://script.google.com/macros/s/AKfycbwQhxl9xQPv46uChWJ1UDg6BjSmefbSlTRUoSZz5f1rZDRvdhAGTi6RHyXwcSeyBtPr/exec?oauth=' + oauth, 
        function (data) { // on success
          processKinopoiskData(data);
        },
        function (data) { // on error
          console.log('error');
          console.log(data);
        }
      );
    }


    function full(params, oncomplete, onerror) {
      // https://github.com/yumata/lampa-source/blob/main/src/utils/reguest.js
      getKinopoiskData();

      oncomplete({
        "secuses": true,
        "page": 1,
        "results": Lampa.Storage.get('kinopoisk_movies', [])
      });

    }

    function clear() {
      network.clear();
    }

    var Api = {
      full: full,
      clear: clear
    };

    function component(object) {
      var comp = new Lampa.InteractionCategory(object);
      comp.create = function () {
        Api.full(object, this.build.bind(this), this.empty.bind(this));
      };
      comp.nextPageReuest = function (object, resolve, reject) {
        Api.full(object, resolve.bind(comp), reject.bind(comp));
      };
      return comp;
    }

    // getting/refreshing oauth token
    function getToken(device_code, refresh) {
      var client_id = 'b8b9c7a09b79452094e12f6990009934';
      if (!refresh) {
        var token_data = {
          'grant_type': 'device_code',
          'code': device_code,
          'client_id': client_id,
          'client_secret': '0e7001e272944c05ae5a0df16e3ea8bd'
        }
      } else { // refresh token
        var token_data = {
          'grant_type': 'refresh_token',
          'refresh_token': device_code, // pass refresh token as device_code
          'client_id': client_id,
          'client_secret': '0e7001e272944c05ae5a0df16e3ea8bd'
        }
      }
      network.silent('https://oauth.yandex.ru/token', 
        function (data) { // on token success
          if (data.access_token){
            Lampa.Storage.set('kinopoisk_access_token', data.access_token);
            Lampa.Storage.set('kinopoisk_refresh_token', data.refresh_token);
            Lampa.Storage.set('kinopoisk_token_expires', data.expires_in*1000 + Date.now());

            Lampa.Modal.close();

          } else {
            Lampa.Noty.show('Не удалось получить token');
            console.log(data.error);
          }

          

        },
        function (data) { // on token error
          Lampa.Noty.show(data.responseJSON.error_description);
          console.log(data); 
        },
        token_data);                        

    }


    // getting oauth user_code
    // https://yandex.ru/dev/id/doc/ru/codes/screen-code-oauth
    function getDeviceCode()
    {
      // generating unique device id
      const uuid4 = () => {
        const ho = (n, p) => n.toString(16).padStart(p, 0);
        const data = crypto.getRandomValues(new Uint8Array(16));
        data[6] = (data[6] & 0xf) | 0x40;
        data[8] = (data[8] & 0x3f) | 0x80;
        const view = new DataView(data.buffer);
        return `${ho(view.getUint32(0), 8)}${ho(view.getUint16(4), 4)}${ho(view.getUint16(6), 4)}${ho(view.getUint16(8), 4)}${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
      };
      Lampa.Storage.set('kinopoisk_deviceid', uuid4());


      var client_id = 'b8b9c7a09b79452094e12f6990009934';
      var device_code_data = {
        'client_id': client_id,
        'device_id': Lampa.Storage.get('kinopoisk_deviceid', '')
      }
      network.silent('https://oauth.yandex.ru/device/code', 
        function (data) { // on device code success                
          if (data.user_code && data.device_code) {

            // ask user to authorize
            let modal = $('<div><div class="about">Перейдите по ссылке https://ya.ru/device на любом устройстве и введите код<br><br><b>' + data.user_code + '</b><br><br></div><br><div class="broadcast__device selector" style="textalign: center">Готово</div></div>')

            Lampa.Modal.open({
                title: 'Авторизация',
                html: modal,
                align: 'center',
                onBack: ()=> {
                  Lampa.Modal.close()
                },
                onSelect: ()=> { // on button click
                  getToken(data.device_code, false);
                }
            })

          } else {
            Lampa.Noty.show('Не удалось получить user_code');
            console.log(data.error);
          }
        }, 
        function (data) {  // on device code error
          Lampa.Noty.show(data.responseJSON.error_description);
          console.log(data); 
        }, 
        device_code_data);
    }

    function startPlugin() {
      var manifest = {
        type: 'video',
        version: '0.1.0',
        name: 'Кинопоиск',
        description: '',
        component: 'kinopoisk'
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Component.add('kinopoisk', component);

      function add() {
        

        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"239\" height=\"239\" viewBox=\"0 0 239 239\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\"><path fill=\"currentColor\" d=\"M215 121.415l-99.297-6.644 90.943 36.334a106.416 106.416 0 0 0 8.354-29.69z\" /><path fill=\"currentColor\" d=\"M194.608 171.609C174.933 197.942 143.441 215 107.948 215 48.33 215 0 166.871 0 107.5 0 48.13 48.33 0 107.948 0c35.559 0 67.102 17.122 86.77 43.539l-90.181 48.07L162.57 32.25h-32.169L90.892 86.862V32.25H64.77v150.5h26.123v-54.524l39.509 54.524h32.169l-56.526-57.493 88.564 46.352z\" /><path d=\"M206.646 63.895l-90.308 36.076L215 93.583a106.396 106.396 0 0 0-8.354-29.688z\" fill=\"currentColor\"/></svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
        
        button.on('hover:enter', function () {
          if (Lampa.Storage.get('kinopoisk_access_token','') == '') { // initial authorization needed
            getDeviceCode();            
          } else if (Lampa.Storage.get('kinopoisk_token_expires', 0) < Date.now()) { // refresh token needed
            getToken(Lampa.Storage.get('kinopoisk_refresh_token',''), true);
          }

          Lampa.Activity.push({
            url: '',
            title: manifest.name,
            component: 'kinopoisk',
            page: 1
          });
        });
        $('.menu .menu__list').eq(0).append(button);
        // $('.head__actions').eq(0).append(button);

      }

      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }

    }
    if (!window.kinopoisk_ready) startPlugin();

})();
