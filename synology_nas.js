(function () {
    'use strict';


    function filmix(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var embed = 'http://filmixapp.cyou/api/v2/';
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      var token = Lampa.Storage.get('filmix_token', '');
      if (!window.filmix) {
        window.filmix = {
          max_qualitie: 720,
          is_max_qualitie: false
        };
      }
      var dev_token = 'user_dev_apk=2.0.1&user_dev_id=&user_dev_name=Xiaomi&user_dev_os=11&user_dev_token=' + token + '&user_dev_vendor=Xiaomi';

      /**
       * Начать поиск
       * @param {Object} _object 
       */
      this.search = function (_object, data) {
        console.log("filmix search");
        var _this = this;
        if (this.wait_similars) return this.find(data[0].id);
        object = _object;
        select_title = object.movie.title;
        var item = data[0];
        var year = parseInt((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4));
        var orig = object.movie.original_title || object.movie.original_name;
        var url = embed + 'search';
        url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(item.title));
        url = Lampa.Utils.addUrlComponent(url, dev_token);
        console.log(url);
        network.clear();
        network.silent(url, function (json) {
			// [
			//     {
			//         "id": 172878,
			//         "section": 14,
			//         "alt_name": "dikiy-robot-milli-2024",
			//         "title": "Дикий робот",
			//         "original_title": "The Wild Robot",
			//         "year": 2024,
			//         "date": "Сегодня, 12:37",
			//         "date_atom": "2024-10-22T12:37:14+03:00",
			//         "serial_stats": null,
			//         "favorited": false,
			//         "watch_later": false,
			//         "last_episode": {},
			//         "actors": [
			//             "Лупита Нионго",
			//             "Педро Паскаль",
			//             "Кит Коннор",
			//             "Билл Найи",
			//             "Стефани Сюй",
			//             "Мэтт Берри",
			//             "Винг Реймз",
			//             "Марк Хэмилл",
			//             "Кэтрин О’Хара",
			//             "Boone Storm"
			//         ],
			//         "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w220\/dikiy-robot-milli-2024_173787_0.jpg",
			//         "countries": [
			//             "США"
			//         ],
			//         "categories": [
			//             "Драмы",
			//             "Семейный",
			//             "Фантастика",
			//             "Приключения",
			//             "Мультфильмы",
			//             "Комедия",
			//             "На украинском"
			//         ],
			//         "quality": "WEB-DLRip 2160",
			//         "rating": 610,
			//         "user_id": 0,
			//         "additional": null
			//     }
			// ]        	
          var cards = json.filter(function (c) {
            c.year = parseInt(c.alt_name.split('-').pop());
            return c.year > year - 2 && c.year < year + 2;
          });
          var card = cards.find(function (c) {
            return c.year == year;
          });
          if (!card) {
            card = cards.find(function (c) {
              return c.original_title == orig;
            });
          }
          if (!card && cards.length == 1) card = cards[0];
          if (card) _this.find(card.id);else if (json.length) {
            _this.wait_similars = true;
            component.similars(json);
            component.loading(false);
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
      this.find = function (filmix_id) {
      	console.log('filmix find');
        var url = embed;
        // if (!window.filmix.is_max_qualitie && token) {
        //   window.filmix.is_max_qualitie = true;
        //   network.clear();
        //   network.timeout(10000);
        //   console.log(url + 'user_profile?' + dev_token);
        //   network.silent(url + 'user_profile?' + dev_token, function (found) {
        //     if (found && found.user_data) {
        //       if (found.user_data.is_pro) window.filmix.max_qualitie = 1080;
        //       if (found.user_data.is_pro_plus) window.filmix.max_qualitie = 2160;
        //     }
        //     end_search(filmix_id);
        //   });
        // } else 
        end_search(filmix_id);
        function end_search(filmix_id) {
          console.log('filmix end_search');
          network.clear();
          network.timeout(10000);
          console.log(url + 'post/' + filmix_id);
          network.silent((window.filmix.is_max_qualitie ? url + 'post/' + filmix_id : url + 'post/' + filmix_id) + '?' + dev_token, function (found) {
            if (found && Object.keys(found).length) {
              success(found);
              component.loading(false);
            } else component.emptyForQuery(select_title);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          });
        }
      };
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      /**
       * Сброс фильтра
       */
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        extractData(results);
        // filter();
        // append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        extractData(results);
        // filter();
        // append(filtred());
        component.saveChoice(choice);
      };

      /**
       * Уничтожить
       */
      this.destroy = function () {
        network.clear();
        results = null;
      };

      /**
       * Успешно, есть данные
       * @param {Object} json
       */
      function success(json) {
      	console.log('success');
      	results = 
			{
			    "id": 173787,
			    "section": 14,
			    "alt_name": "dikiy-robot-milli-2024",
			    "title": "\u0414\u0438\u043a\u0438\u0439 \u0440\u043e\u0431\u043e\u0442",
			    "original_title": "The Wild Robot",
			    "year": 2024,
			    "year_end": 0,
			    "duration": 101,
			    "date": "\u0421\u0435\u0433\u043e\u0434\u043d\u044f, 12:37",
			    "date_atom": "2024-10-22T12:37:14+03:00",
			    "favorited": false,
			    "watch_later": false,
			    "last_episode": null,
			    "actors": [
			        "\u041b\u0443\u043f\u0438\u0442\u0430 \u041d\u0438\u043e\u043d\u0433\u043e",
			        "\u041f\u0435\u0434\u0440\u043e \u041f\u0430\u0441\u043a\u0430\u043b\u044c",
			        "\u041a\u0438\u0442 \u041a\u043e\u043d\u043d\u043e\u0440",
			        "\u0411\u0438\u043b\u043b \u041d\u0430\u0439\u0438",
			        "\u0421\u0442\u0435\u0444\u0430\u043d\u0438 \u0421\u044e\u0439",
			        "\u041c\u044d\u0442\u0442 \u0411\u0435\u0440\u0440\u0438",
			        "\u0412\u0438\u043d\u0433 \u0420\u0435\u0439\u043c\u0437",
			        "\u041c\u0430\u0440\u043a \u0425\u044d\u043c\u0438\u043b\u043b",
			        "\u041a\u044d\u0442\u0440\u0438\u043d \u041e\u2019\u0425\u0430\u0440\u0430",
			        "Boone Storm"
			    ],
			    "found_actors": [
			        {
			            "id": 1633,
			            "name": "\u0411\u0438\u043b\u043b \u041d\u0430\u0439\u0438",
			            "original_name": "Bill Nighy"
			        },
			        {
			            "id": 347,
			            "name": "\u0412\u0438\u043d\u0433 \u0420\u0435\u0439\u043c\u0437",
			            "original_name": "Ving Rhames"
			        },
			        {
			            "id": 82269,
			            "name": "\u041a\u044d\u0442\u0440\u0438\u043d \u041e\u2019\u0425\u0430\u0440\u0430",
			            "original_name": "Catherine O'Hara"
			        },
			        {
			            "id": 94399,
			            "name": "\u041b\u0443\u043f\u0438\u0442\u0430 \u041d\u0438\u043e\u043d\u0433\u043e",
			            "original_name": "Lupita Nyong'o"
			        },
			        {
			            "id": 8197,
			            "name": "\u041c\u0430\u0440\u043a \u0425\u044d\u043c\u0438\u043b\u043b",
			            "original_name": "Mark Hamill"
			        },
			        {
			            "id": 16348,
			            "name": "\u041c\u044d\u0442\u0442 \u0411\u0435\u0440\u0440\u0438",
			            "original_name": "Matt Berry"
			        },
			        {
			            "id": 77883,
			            "name": "\u041f\u0435\u0434\u0440\u043e \u041f\u0430\u0441\u043a\u0430\u043b\u044c",
			            "original_name": "Pedro Pascal"
			        }
			    ],
			    "directors": [
			        "\u041a\u0440\u0438\u0441 \u0421\u0430\u043d\u0434\u0435\u0440\u0441"
			    ],
			    "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w220\/dikiy-robot-milli-2024_173787_0.jpg",
			    "short_story": "\u0420\u043e\u0431\u043e\u0442 ROZZUM 7134, \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u043d\u0430\u0437\u044b\u0432\u0430\u044e\u0442 \u043f\u0440\u043e\u0441\u0442\u043e \u00ab\u0420\u043e\u0437\u00bb, \u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043d\u0430 \u043d\u0435\u043e\u0431\u0438\u0442\u0430\u0435\u043c\u043e\u043c \u043e\u0441\u0442\u0440\u043e\u0432\u0435 \u043f\u043e\u0441\u043b\u0435 \u043a\u0440\u0443\u0448\u0435\u043d\u0438\u044f \u043a\u043e\u0441\u043c\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043a\u043e\u0440\u0430\u0431\u043b\u044f. \u041d\u0435 \u0437\u0430\u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0434\u043b\u044f \u0442\u0430\u043a\u0438\u0445 \u0443\u0441\u043b\u043e\u0432\u0438\u0439, \u0420\u043e\u0437 \u0432\u044b\u043d\u0443\u0436\u0434\u0435\u043d \u0443\u0447\u0438\u0442\u044c\u0441\u044f \u0432\u044b\u0436\u0438\u0432\u0430\u0442\u044c \u0432 \u0434\u0438\u043a\u043e\u0439 \u043f\u0440\u0438\u0440\u043e\u0434\u0435. \u0415\u0433\u043e \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0439, \u043c\u0435\u0445\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043c\u0438\u0440 \u0441\u0442\u0430\u043b\u043a\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0441 \u0445\u0430\u043e\u0442\u0438\u0447\u043d\u043e\u0439 \u0438 \u043d\u0435\u043f\u0440\u0435\u0434\u0441\u043a\u0430\u0437\u0443\u0435\u043c\u043e\u0439 \u0436\u0438\u0437\u043d\u044c\u044e \u043d\u0430 \u043e\u0441\u0442\u0440\u043e\u0432\u0435. \u041f\u043e\u0441\u0442\u0435\u043f\u0435\u043d\u043d\u043e \u0420\u043e\u0437 \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442 \u0432\u044b\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044c \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044f \u0441 \u043c\u0435\u0441\u0442\u043d\u044b\u043c\u0438 \u0436\u0438\u0432\u043e\u0442\u043d\u044b\u043c\u0438, \u043f\u0440\u0438\u0441\u043f\u043e\u0441\u0430\u0431\u043b\u0438\u0432\u0430\u044f\u0441\u044c \u043a \u0438\u0445 \u043f\u043e\u0432\u0430\u0434\u043a\u0430\u043c \u0438 \u0443\u0447\u0430\u0441\u044c \u0443 \u043d\u0438\u0445, \u043a\u0430\u043a \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u044c \u0435\u0434\u0443, \u0437\u0430\u0449\u0438\u0449\u0430\u0442\u044c\u0441\u044f \u0438 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f.<br \/><br \/>\u0421\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0435\u043c \u0440\u043e\u0431\u043e\u0442 \u0441\u0442\u0430\u043b\u043a\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0441 \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0439 \u0437\u0430\u0434\u0430\u0447\u0435\u0439 \u2014 \u0441\u0442\u0430\u0442\u044c \u043f\u0440\u0438\u0451\u043c\u043d\u044b\u043c \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u0435\u043c \u0434\u043b\u044f \u043e\u0441\u0438\u0440\u043e\u0442\u0435\u0432\u0448\u0435\u0433\u043e \u0433\u0443\u0441\u0451\u043d\u043a\u0430. \u042d\u0442\u043e\u0442 \u043d\u0435\u043e\u0436\u0438\u0434\u0430\u043d\u043d\u044b\u0439 \u043f\u043e\u0432\u043e\u0440\u043e\u0442 \u0437\u0430\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0420\u043e\u0437\u0430 \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0437\u0430\u0431\u043e\u0442\u0438\u0442\u044c\u0441\u044f \u043e \u0434\u0440\u0443\u0433\u043e\u043c \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0435, \u043d\u043e \u0438 \u043f\u0440\u043e\u044f\u0432\u0438\u0442\u044c \u0442\u0430\u043a\u0438\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430, \u043a\u0430\u043a \u0441\u043e\u0441\u0442\u0440\u0430\u0434\u0430\u043d\u0438\u0435 \u0438 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u044c. \u041f\u043e\u0441\u0442\u0435\u043f\u0435\u043d\u043d\u043e \u0440\u043e\u0431\u043e\u0442, \u043d\u0435\u043a\u043e\u0433\u0434\u0430 \u0447\u0443\u0436\u0434\u044b\u0439 \u0438 \u043d\u0435 \u043f\u0440\u0438\u0441\u043f\u043e\u0441\u043e\u0431\u043b\u0435\u043d\u043d\u044b\u0439 \u043a \u043c\u0438\u0440\u0443 \u043f\u0440\u0438\u0440\u043e\u0434\u044b, \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442 \u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c\u0441\u044f \u0435\u0451 \u043d\u0435\u043e\u0442\u044a\u0435\u043c\u043b\u0435\u043c\u043e\u0439 \u0447\u0430\u0441\u0442\u044c\u044e, \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u044f \u0432 \u0441\u0435\u0431\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0447\u0435\u043b\u043e\u0432\u0435\u0447\u043d\u043e\u0441\u0442\u0438, \u0447\u0435\u043c \u043e\u043d \u043c\u043e\u0433 \u0441\u0435\u0431\u0435 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u044c.",
			    "player_links": {
			        "movie": [
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/UHD_1212\/The.Wild.Robot.2024.Dt.ru.4K.SDR.WEBDL.BR.6t.2160p_[2160,,1080,720,480,].mp4",
			                "translation": "\u0414\u0443\u0431\u043b\u044f\u0436 [4K, SDR, ru, \u0437\u0432\u0443\u043a \u0441 TS]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HD_45\/The.Wild.Robot.1080p.rus.LostFilm.TV_[2160,,1080,720,480,].mp4",
			                "translation": "MVO [4K, SDR, ru, LostFilm]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HD_45\/The.Wild.Robot.2024.2160p.SDR_[2160,1440,1080,720,480,].mp4",
			                "translation": "MVO [4K, SDR, ru, RGB]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/UHD_1212\/The.Wild.Robot.2024.D.Ukr.Line.4K.SDR.WEBDL.3t.2160p_[2160,,1080,720,480,].mp4",
			                "translation": "\u0414\u0443\u0431\u043b\u044f\u0436 [4K, SDR, Ukr, Line]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/UHD_1212\/The.Wild.Robot.2024.DVO.Ukr.KolodiyTreyleriv.WEBDL.4K.SDR.2160pp_[2160,1440,1080,720,480,].mp4",
			                "translation": "DVO [4K, SDR, Ukr, \u041a\u043e\u043b\u043e\u0434\u0456\u0439 \u0422\u0440\u0435\u0439\u043b\u0435\u0440\u0456\u0432]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HDR10p\/The.Wild.Robot.2024.Dt.MVO.ru.D.Ukr.MVO.Line.4K.WEBDL.HDR10p.6t.2160p_[2160,,,,,].mp4",
			                "translation": "\u0414\u0443\u0431\u043b\u044f\u0436 [4K, HDR10+, ru, Ukr]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HDR10p\/The.Wild.Robot.2024.MVO.ru.RGB.DVO.Ukr.KT.WEBDL.4K.HDR10p.3t.2160pp_[2160,,,,,].mp4",
			                "translation": "MVO [4K, HDR10+, ru, Ukr]"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HEVC\/The.Wild.Robot.2024.Dt.MVO.ru.D.Ukr.MVO.Line.4K.SDR.WEBDL.HEVC.6t.2160p_[2160,,,,,].mp4",
			                "translation": "HEVC 4K AC3 DUB RU UKR"
			            },
			            {
			                "link": "https:\/\/chache09.werkecdn.me\/s\/FHkwpzK6OebvU7qCPOAgPj1UFBQUFBQUFBQUFBUjBXVUF3d0JV.6D9xmfQgPmiEidiacwEYVRVn_bCHL4IcQiJyXQ\/HEVC\/The.Wild.Robot.2024.MVO.ru.RGB.DVO.Ukr.KT.WEBDL.4K.SDR.HEVC.3t.2160pp_[2160,,,,,].mp4",
			                "translation": "HEVC 4K AC3 MVO RU UKR"
			            }
			        ],
			        "playlist": [],
			        "trailer": []
			    },
			    "kp_rating": 8.437,
			    "kp_votes": 7121,
			    "imdb_rating": 8.4,
			    "imdb_votes": 29798,
			    "serial_stats": null,
			    "rip": "WEB-DLRip 2160",
			    "quality": "2160",
			    "categories": [
			        "\u0414\u0440\u0430\u043c\u044b",
			        "\u0421\u0435\u043c\u0435\u0439\u043d\u044b\u0439",
			        "\u0424\u0430\u043d\u0442\u0430\u0441\u0442\u0438\u043a\u0430",
			        "\u041f\u0440\u0438\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f",
			        "\u041c\u0443\u043b\u044c\u0442\u0444\u0438\u043b\u044c\u043c\u044b",
			        "\u041a\u043e\u043c\u0435\u0434\u0438\u044f"
			    ],
			    "post_url": "https:\/\/filmix.fm\/mults\/drama\/173787-dikiy-robot-milli-2024.html",
			    "countries": [
			        "\u0421\u0428\u0410"
			    ],
			    "relates": [
			        {
			            "title": "\u0420\u043e\u0431\u043e\u0442\u044b",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/roboty-3d-2013_82987_0.jpg",
			            "category": "\u0421\u0435\u043c\u0435\u0439\u043d\u044b\u0439",
			            "year": 2005,
			            "id": 82987,
			            "alt_name": "roboty-3d-2013"
			        },
			        {
			            "title": "\u041a\u0430\u043a \u043f\u0440\u0438\u0440\u0443\u0447\u0438\u0442\u044c \u0434\u0440\u0430\u043a\u043e\u043d\u0430",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/kak-priruchit-drakona-shedevr-2010_8054_0.jpg",
			            "category": "\u041c\u0443\u043b\u044c\u0442\u0444\u0438\u043b\u044c\u043c\u044b",
			            "year": 2010,
			            "id": 8054,
			            "alt_name": "kak-priruchit-drakona-shedevr-2010"
			        },
			        {
			            "title": "\u0420\u043e\u0431\u043e\u0442\u044b",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/novi-2x-roboty-2005_1156_0.jpg",
			            "category": "\u0421\u0435\u043c\u0435\u0439\u043d\u044b\u0439",
			            "year": 2005,
			            "id": 1156,
			            "alt_name": "novi-2x-roboty-2005"
			        },
			        {
			            "title": "4 \u0441\u0430\u043f\u043e\u0433\u0430 \u0438 \u0431\u0430\u0440\u0441\u0443\u043a \u043f\u0440\u043e\u0442\u0438\u0432 \u0440\u043e\u0431\u043e\u0442\u043e\u0432",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/4-sapoga-i-barsuk-protiv-robotov-2015_172910_0.jpg",
			            "category": "\u041c\u044e\u0437\u0438\u043a\u043b",
			            "year": 2015,
			            "id": 172910,
			            "alt_name": "4-sapoga-i-barsuk-protiv-robotov-2015"
			        },
			        {
			            "title": "\u0421\u043a\u0443\u0431\u0438-\u0434\u0443! \u041d\u0430 \u0434\u0438\u043a\u043e\u043c \u0437\u0430\u043f\u0430\u0434\u0435",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/skubi-du-na-dikom-zapade-2017_118714_0.jpg",
			            "category": "\u0421\u0435\u043c\u0435\u0439\u043d\u044b\u0439",
			            "year": 2017,
			            "id": 118714,
			            "alt_name": "skubi-du-na-dikom-zapade-2017"
			        },
			        {
			            "title": "\u0414\u0438\u043a\u0430\u044f \u0441\u0435\u043c\u0435\u0439\u043a\u0430 \u0422\u043e\u0440\u043d\u0431\u0435\u0440\u0440\u0438",
			            "poster": "http:\/\/thumbs.fxapp.club\/posters\/1221\/thumbs\/w140\/dikaya-semeyka-tornberri-the-wild-thornberrys-movie-2002_36862_0.jpg",
			            "category": "\u0421\u0435\u043c\u0435\u0439\u043d\u044b\u0439",
			            "year": 2002,
			            "id": 36862,
			            "alt_name": "dikaya-semeyka-tornberri-the-wild-thornberrys-movie-2002"
			        }
			    ],
			    "rating": 611,
			    "rate_p": 637,
			    "rate_n": 26
			};
        // results = json;
        extractData(json);
        // filter();
        append(filtred());
      }

      /**
       * Получить информацию о фильме
       * @param {Arrays} data
       */
      function extractData(data) {
      	console.log('extractData');

        extract = {};
        var pl_links = data.player_links;
        if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
          var seas_num = 0;
          for (var season in pl_links.playlist) {
            var episode = pl_links.playlist[season];
            ++seas_num;
            var transl_id = 0;
            for (var voice in episode) {
              var episode_voice = episode[voice];
              ++transl_id;
              var items = [];
              for (var ID in episode_voice) {
                var file_episod = episode_voice[ID];
                var quality_eps = file_episod.qualities.filter(function (qualitys) {
                  return qualitys <= window.filmix.max_qualitie;
                });
                var max_quality = Math.max.apply(null, quality_eps);
                var stream_url = file_episod.link.replace('%s.mp4', max_quality + '.mp4');
                var s_e = stream_url.slice(0 - stream_url.length + stream_url.lastIndexOf('/'));
                var str_s_e = s_e.match(/s(\d+)e(\d+?)_\d+\.mp4/i);
                if (str_s_e) {
                  var _seas_num = parseInt(str_s_e[1]);
                  var _epis_num = parseInt(str_s_e[2]);
                  items.push({
                    id: _seas_num + '_' + _epis_num,
                    comment: _epis_num + ' ' + Lampa.Lang.translate('torrent_serial_episode') + ' <i>' + ID + '</i>',
                    file: stream_url,
                    episode: _epis_num,
                    season: _seas_num,
                    quality: max_quality,
                    qualities: quality_eps,
                    translation: transl_id
                  });
                }
              }
              if (!extract[transl_id]) extract[transl_id] = {
                json: [],
                file: ''
              };
              extract[transl_id].json.push({
                id: seas_num,
                comment: seas_num + ' ' + Lampa.Lang.translate('torrent_serial_season'),
                folder: items,
                translation: transl_id
              });
            }
          }
        } else if (pl_links.movie && pl_links.movie.length > 0) {
          var _transl_id = 0;
          for (var _ID in pl_links.movie) {
            var _file_episod = pl_links.movie[_ID];
            ++_transl_id;
            var _quality_eps = _file_episod.link.match(/.+\[(.+[\d]),?\].+/i);
            if (_quality_eps) _quality_eps = _quality_eps[1].split(',').filter(function (quality_) {
              return quality_ <= window.filmix.max_qualitie;
            });
            var _max_quality = Math.max.apply(null, _quality_eps);
            var file_url = _file_episod.link.replace(/\[(.+[\d]),?\]/i, _max_quality);
            extract[_transl_id] = {
              file: file_url,
              translation: _file_episod.translation,
              quality: _max_quality,
              qualities: _quality_eps
            };
          }
        }
        console.log(extract);
      }

      /**
       * Найти поток
       * @param {Object} element
       * @param {Int} max_quality
       * @returns string
       */
      function getFile(element, max_quality) {
      	console.log('getFile');
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var quality = false;
        if (translat) {
          if (element.season) for (var i in translat.json) {
            var elem = translat.json[i];
            if (elem.folder) for (var f in elem.folder) {
              var folder = elem.folder[f];
              if (folder.id == id) {
                file = folder.file;
                break;
              }
            } else {
              if (elem.id == id) {
                file = elem.file;
                break;
              }
            }
          } else file = translat.file;
        }
        max_quality = parseInt(max_quality);
        if (file) {
          var link = file.slice(0, file.lastIndexOf('_')) + '_';
          var orin = file.split('?');
          orin = orin.length > 1 ? '?' + orin.slice(1).join('?') : '';
          if (file.split('_').pop().replace('.mp4', '') !== max_quality) {
            file = link + max_quality + '.mp4' + orin;
          }
          quality = {};
          var mass = [2160, 1440, 1080, 720, 480, 360];
          mass = mass.slice(mass.indexOf(max_quality));
          mass.forEach(function (n) {
            quality[n + 'p'] = link + n + '.mp4' + orin;
          });
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
        return {
          file: file,
          quality: quality
        };
      }

      /**
       * Построить фильтр
       */
      // function filter() {
      //   filter_items = {
      //     season: [],
      //     voice: [],
      //     voice_info: []
      //   };
      //   if (results.last_episode && results.last_episode.season) {
      //     var s = results.last_episode.season;
      //     while (s--) {
      //       filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (results.last_episode.season - s));
      //     }
      //   }
      //   for (var Id in results.player_links.playlist) {
      //     var season = results.player_links.playlist[Id];
      //     var d = 0;
      //     for (var voic in season) {
      //       ++d;
      //       if (filter_items.voice.indexOf(voic) == -1) {
      //         filter_items.voice.push(voic);
      //         filter_items.voice_info.push({
      //           id: d
      //         });
      //       }
      //     }
      //   }
      //   if (choice.voice_name) {
      //     var inx = filter_items.voice.indexOf(choice.voice_name);
      //     if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
      //       choice.voice = inx;
      //     }
      //   }
      //   component.filter(filter_items, choice);
      // }

      /**
       * Отфильтровать файлы
       * @returns array
       */
      function filtred() {
        var filtred = [];
        // var filter_data = Lampa.Storage.get('online_filter', '{}');
        if (Object.keys(results.player_links.playlist).length) {
          for (var transl in extract) {
            var element = extract[transl];
            for (var season_id in element.json) {
              var episode = element.json[season_id];
              // if (episode.id == filter_data.season + 1) {
                episode.folder.forEach(function (media) {
                  // if (media.translation == filter_items.voice_info[filter_data.voice].id) {
                    filtred.push({
                      episode: parseInt(media.episode),
                      season: media.season,
                      title: media.episode + (media.title ? ' - ' + media.title : ''),
                      quality: media.quality + 'p ',
                      translation: media.translation
                    });
                  // }
                });
              // }
            }
          }
        } else if (Object.keys(results.player_links.movie).length) {
          for (var transl_id in extract) {
            var _element = extract[transl_id];
            filtred.push({
              title: _element.translation,
              quality: _element.quality + 'p ',
              qualitys: _element.qualities,
              translation: transl_id
            });
          }
        }
        return filtred;
      }

      /**
       * Добавить видео
       * @param {Array} items 
       */
      function append(items) {
      	console.log('append');
      	console.log(items);
		// [
		//     {
		//         "title": "Дубляж [4K, SDR, ru, звук с TS]",
		//         "quality": "720p ",
		//         "qualitys": [
		//             "",
		//             "720",
		//             "480"
		//         ],
		//         "translation": "1",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "MVO [4K, SDR, ru, LostFilm]",
		//         "quality": "720p ",
		//         "qualitys": [
		//             "",
		//             "720",
		//             "480"
		//         ],
		//         "translation": "2",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "MVO [4K, SDR, ru, RGB]",
		//         "quality": "720p ",
		//         "qualitys": [
		//             "720",
		//             "480"
		//         ],
		//         "translation": "3",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "Дубляж [4K, SDR, Ukr, Line]",
		//         "quality": "720p ",
		//         "qualitys": [
		//             "",
		//             "720",
		//             "480"
		//         ],
		//         "translation": "4",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "DVO [4K, SDR, Ukr, Колодій Трейлерів]",
		//         "quality": "720p ",
		//         "qualitys": [
		//             "720",
		//             "480"
		//         ],
		//         "translation": "5",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "Дубляж [4K, HDR10+, ru, Ukr]",
		//         "quality": "-Infinityp ",
		//         "qualitys": null,
		//         "translation": "6",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "MVO [4K, HDR10+, ru, Ukr]",
		//         "quality": "-Infinityp ",
		//         "qualitys": null,
		//         "translation": "7",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "HEVC 4K AC3 DUB RU UKR",
		//         "quality": "-Infinityp ",
		//         "qualitys": null,
		//         "translation": "8",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     },
		//     {
		//         "title": "HEVC 4K AC3 MVO RU UKR",
		//         "quality": "-Infinityp ",
		//         "qualitys": null,
		//         "translation": "9",
		//         "info": "",
		//         "timeline": {
		//             "hash": "888470979",
		//             "percent": 0,
		//             "time": 0,
		//             "duration": 0,
		//             "profile": 378159
		//         }
		//     }
		// ]      	
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) element.title = 'S' + element.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + element.episode;
          element.info = element.season ? ' / ' + Lampa.Utils.shortText(filter_items.voice[choice.voice], 50) : '';
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.quality);
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.quality);
                  playlist.push({
                    title: elem.title,
                    url: ex.file,
                    quality: ex.quality,
                    timeline: elem.timeline
                  });
                });
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
          });
          component.append(item);
          // component.contextmenu({
          //   item: item,
          //   view: view,
          //   viewed: viewed,
          //   hash_file: hash_file,
          //   element: element,
          //   file: function file(call) {
          //     call(getFile(element, element.quality));
          //   }
          // });
        });
        component.start(true);
      }
    }

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Files(object);
      var filter = new Lampa.Filter(object);
      var balanser = Lampa.Storage.get('online_balanser', 'filmix');
      var last_bls = Lampa.Storage.cache('online_last_balanser', 200, {});
      if (last_bls[object.movie.id]) {
        balanser = last_bls[object.movie.id];
      }
      // this.proxy = function (name) {
      //   var prox = Lampa.Storage.get('online_proxy_all');
      //   var need = Lampa.Storage.get('online_proxy_' + name);
      //   if (need) prox = need;
      //   if (prox && prox.slice(-1) !== '/') {
      //     prox += '/';
      //   }
      //   return prox;
      // };
      var sources = {
        filmix: new filmix(this, object),
      };
      var last;
      var last_filter;
      var extended;
      var selected_id;
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      var filter_sources = ['filmix'];
      // var ignore_sources = ['filmix', 'kinobase'];
      var kiposk_sources = [];

      if (filter_sources.indexOf(balanser) == -1) {
        balanser = 'filmix';
        Lampa.Storage.set('online_balanser', 'filmix');
      }
      scroll.body().addClass('torrent-list');
      function minus() {
        scroll.minus(window.innerWidth > 580 ? false : files.render().find('.files__left'));
      }
      window.addEventListener('resize', minus, false);
      minus();

      /**
       * Подготовка
       */
      this.create = function () {
        var _this = this;
        this.activity.loader(true);
        // filter.onSearch = function (value) {
        //   Lampa.Activity.replace({
        //     search: value,
        //     clarification: true
        //   });
        // };
        // filter.onBack = function () {
        //   _this.start();
        // };
        // filter.render().find('.selector').on('hover:focus', function (e) {
        //   last_filter = e.target;
        // });
        // filter.onSelect = function (type, a, b) {
        //   if (type == 'filter') {
        //     if (a.reset) {
        //       if (extended) sources[balanser].reset();else _this.start();
        //     } else {
        //       sources[balanser].filter(type, a, b);
        //     }
        //   } else if (type == 'sort') {
        //     balanser = a.source;
        //     Lampa.Storage.set('online_balanser', balanser);
        //     last_bls[object.movie.id] = balanser;
        //     Lampa.Storage.set('online_last_balanser', last_bls);
        //     _this.search();
        //     setTimeout(Lampa.Select.close, 10);
        //   }
        // };
        // filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_balanser'));
        // filter.render();
        files.append(scroll.render());
        scroll.append(filter.render());
        this.search();
        return this.render();
      };

      /**
       * Начать поиск
       */
      this.search = function () {
        this.activity.loader(true);
        // this.filter({
        //   source: filter_sources
        // }, {
        //   source: 0
        // });
        this.reset();
        this.find();
      };
      this.find = function () {
        var _this2 = this;
        var url = 'https://jsonplaceholder.typicode.com/todos/1'; // this.proxy('videocdn') + 'https://videocdn.tv/api/short';
        var query = object.search;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        console.log('find');
        console.log(url);
        var display = function display(json) {
          json = JSON.parse('{"result":true,"php":0.02154994010925293,"data":[{"id":77036,"content_type":"movie","kp_id":5457899,"title":"Дикий робот","orig_title":"The Wild Robot","add":"2024-09-25 04:22:15","year":"1969-12-31","translations":["Муз обоз","@MUZOBOZ@","RGB","LostFilm"],"imdb_id":"tt29623480","iframe_src":"//93155.svetacdn.in/owHyLRHCTf46/movie/77036","iframe":"<iframe src=\'//93155.svetacdn.in/owHyLRHCTf46/movie/77036\' width=\'640\' height=\'480\' frameborder=\'0\' allowfullscreen></iframe>"}]}');
          if (object.movie.imdb_id) {
            var imdb = json.data.filter(function (elem) {
              return elem.imdb_id == object.movie.imdb_id;
            });
            if (imdb.length) json.data = imdb;
          }
          if (json.data && json.data.length) {
            if (json.data.length == 1 || object.clarification) {
              _this2.extendChoice();
              sources['filmix'].search(object, json.data); // else sources[balanser].search(object, json.data[0].kp_id || json.data[0].filmId, json.data);
            } else {
              // _this2.similars(json.data);
              _this2.loading(false);
            }
          } else _this2.emptyForQuery(query);
        };

        display({});

        // if (object.movie.kinopoisk_id && kiposk_sources.indexOf(balanser) >= 0) {
        //   sources[balanser].search(object, object.movie.kinopoisk_id);
        // } else if (object.movie.imdb_id) {
        //   letgo(object.movie.imdb_id);
        // } else if (object.movie.source == 'tmdb' || object.movie.source == 'cub') {
        //   var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
        //   var baseurl = typeof Lampa.TMDB !== 'undefined' ? Lampa.TMDB.api(tmdburl) : 'http://api.themoviedb.org' + tmdburl;
        //   network["native"](baseurl, function (ttid) {
        //     letgo(ttid.imdb_id);
        //   }, function (a, c) {
        //     _this2.empty(network.errorDecode(a, c));
        //   });
        // } else {
        //   letgo();
        // }
        
      };
      this.extendChoice = function () {
        var data = Lampa.Storage.cache('online_choice_' + balanser, 500, {});
        var save = data[selected_id || object.movie.id] || {};
        extended = true;
        sources[balanser].extendChoice(save);
      };
      this.saveChoice = function (choice) {
        var data = Lampa.Storage.cache('online_choice_' + balanser, 500, {});
        data[selected_id || object.movie.id] = choice;
        Lampa.Storage.set('online_choice_' + balanser, data);
      };

      /**
       * Есть похожие карточки
       * @param {Object} json 
       */
      // this.similars = function (json) {
      //   var _this3 = this;
      //   json.forEach(function (elem) {
      //     var year = elem.start_date || elem.year || '';
      //     elem.title = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
      //     elem.quality = year ? (year + '').slice(0, 4) : '----';
      //     elem.info = '';
      //     var item = Lampa.Template.get('online_folder', elem);
      //     item.on('hover:enter', function () {
      //       _this3.activity.loader(true);
      //       _this3.reset();
      //       object.search_date = year;
      //       selected_id = elem.id;
      //       _this3.extendChoice();
      //       if (balanser == 'videocdn' || balanser == 'filmix' || balanser == 'cdnmovies') sources[balanser].search(object, [elem]);else sources[balanser].search(object, elem.kp_id || elem.filmId, [elem]);
      //     });
      //     _this3.append(item);
      //   });
      // };

      /**
       * Очистить список файлов
       */
      this.reset = function () {
        last = false;
        scroll.render().find('.empty').remove();
        filter.render().detach();
        scroll.clear();
        scroll.append(filter.render());
      };

      /**
       * Загрузка
       */
      this.loading = function (status) {
        if (status) this.activity.loader(true);else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };

      /**
       * Построить фильтр
       */
      // this.filter = function (filter_items, choice) {
      //   var select = [];
      //   var add = function add(type, title) {
      //     var need = Lampa.Storage.get('online_filter', '{}');
      //     var items = filter_items[type];
      //     var subitems = [];
      //     var value = need[type];
      //     items.forEach(function (name, i) {
      //       subitems.push({
      //         title: name,
      //         selected: value == i,
      //         index: i
      //       });
      //     });
      //     select.push({
      //       title: title,
      //       subtitle: items[value],
      //       items: subitems,
      //       stype: type
      //     });
      //   };
      //   filter_items.source = filter_sources;
      //   choice.source = filter_sources.indexOf(balanser);
      //   select.push({
      //     title: Lampa.Lang.translate('torrent_parser_reset'),
      //     reset: true
      //   });
      //   Lampa.Storage.set('online_filter', choice);
      //   if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
      //   if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
      //   filter.set('filter', select);
      //   filter.set('sort', filter_sources.map(function (e) {
      //     return {
      //       title: e,
      //       source: e,
      //       selected: e == balanser
      //     };
      //   }));
      //   this.selected(filter_items);
      // };

      // /**
      //  * Закрыть фильтр
      //  */
      // this.closeFilter = function () {
      //   if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
      // };

      /**
       * Показать что выбрано в фильтре
       */
      // this.selected = function (filter_items) {
      //   var need = Lampa.Storage.get('online_filter', '{}'),
      //     select = [];
      //   for (var i in need) {
      //     if (filter_items[i] && filter_items[i].length) {
      //       if (i == 'voice') {
      //         select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
      //       } else if (i !== 'source') {
      //         if (filter_items.season.length >= 1) {
      //           select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
      //         }
      //       }
      //     }
      //   }
      //   filter.chosen('filter', select);
      //   filter.chosen('sort', [balanser]);
      // };

      /**
       * Добавить файл
       */
      this.append = function (item) {
        item.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      };

      /**
       * Меню
       */
      // this.contextmenu = function (params) {
      //   params.item.on('hover:long', function () {
      //     function show(extra) {
      //       var enabled = Lampa.Controller.enabled().name;
      //       var menu = [{
      //         title: Lampa.Lang.translate('torrent_parser_label_title'),
      //         mark: true
      //       }, {
      //         title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
      //         clearmark: true
      //       }, {
      //         title: Lampa.Lang.translate('time_reset'),
      //         timeclear: true
      //       }];
      //       if (Lampa.Platform.is('webos')) {
      //         menu.push({
      //           title: Lampa.Lang.translate('player_lauch') + ' - Webos',
      //           player: 'webos'
      //         });
      //       }
      //       if (Lampa.Platform.is('android')) {
      //         menu.push({
      //           title: Lampa.Lang.translate('player_lauch') + ' - Android',
      //           player: 'android'
      //         });
      //       }
      //       menu.push({
      //         title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
      //         player: 'lampa'
      //       });
      //       if (extra) {
      //         menu.push({
      //           title: Lampa.Lang.translate('copy_link'),
      //           copylink: true
      //         });
      //       }
      //       if (Lampa.Account.working() && params.element && typeof params.element.season !== 'undefined' && Lampa.Account.subscribeToTranslation) {
      //         menu.push({
      //           title: Lampa.Lang.translate('online_voice_subscribe'),
      //           subscribe: true
      //         });
      //       }
      //       Lampa.Select.show({
      //         title: Lampa.Lang.translate('title_action'),
      //         items: menu,
      //         onBack: function onBack() {
      //           Lampa.Controller.toggle(enabled);
      //         },
      //         onSelect: function onSelect(a) {
      //           if (a.clearmark) {
      //             Lampa.Arrays.remove(params.viewed, params.hash_file);
      //             Lampa.Storage.set('online_view', params.viewed);
      //             params.item.find('.torrent-item__viewed').remove();
      //           }
      //           if (a.mark) {
      //             if (params.viewed.indexOf(params.hash_file) == -1) {
      //               params.viewed.push(params.hash_file);
      //               params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
      //               Lampa.Storage.set('online_view', params.viewed);
      //             }
      //           }
      //           if (a.timeclear) {
      //             params.view.percent = 0;
      //             params.view.time = 0;
      //             params.view.duration = 0;
      //             Lampa.Timeline.update(params.view);
      //           }
      //           Lampa.Controller.toggle(enabled);
      //           if (a.player) {
      //             Lampa.Player.runas(a.player);
      //             params.item.trigger('hover:enter');
      //           }
      //           if (a.copylink) {
      //             if (extra.quality) {
      //               var qual = [];
      //               for (var i in extra.quality) {
      //                 qual.push({
      //                   title: i,
      //                   file: extra.quality[i]
      //                 });
      //               }
      //               Lampa.Select.show({
      //                 title: 'Ссылки',
      //                 items: qual,
      //                 onBack: function onBack() {
      //                   Lampa.Controller.toggle(enabled);
      //                 },
      //                 onSelect: function onSelect(b) {
      //                   Lampa.Utils.copyTextToClipboard(b.file, function () {
      //                     Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
      //                   }, function () {
      //                     Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
      //                   });
      //                 }
      //               });
      //             } else {
      //               Lampa.Utils.copyTextToClipboard(extra.file, function () {
      //                 Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
      //               }, function () {
      //                 Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
      //               });
      //             }
      //           }
      //           if (a.subscribe) {
      //             Lampa.Account.subscribeToTranslation({
      //               card: object.movie,
      //               season: params.element.season,
      //               episode: params.element.translate_episode_end,
      //               voice: params.element.translate_voice
      //             }, function () {
      //               Lampa.Noty.show(Lampa.Lang.translate('online_voice_success'));
      //             }, function () {
      //               Lampa.Noty.show(Lampa.Lang.translate('online_voice_error'));
      //             });
      //           }
      //         }
      //       });
      //     }
      //     params.file(show);
      //   }).on('hover:focus', function () {
      //     if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.item);
      //   });
      // };

      /**
       * Показать пустой результат
       */
      this.empty = function (msg) {
        var empty = Lampa.Template.get('list_empty');
        if (msg) empty.find('.empty__descr').text(msg);
        scroll.append(empty);
        this.loading(false);
      };

      /**
       * Показать пустой результат по ключевому слову
       */
      this.emptyForQuery = function (query) {
        this.empty(Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end'));
      };
      this.getLastEpisode = function (items) {
        var last_episode = 0;
        items.forEach(function (e) {
          if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
        });
        return last_episode;
      };

      /**
       * Начать навигацию по файлам
       */
      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.

        if (first_select) {
          var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(3)[0];
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(3).index(last) == 0 && last_filter) {
                Lampa.Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
            } else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          back: this.back
        });
        Lampa.Controller.toggle('content');
      };
      this.render = function () {
        return files.render();
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        network.clear();
        files.destroy();
        scroll.destroy();
        network = null;
        sources.videocdn.destroy();
        sources.rezka.destroy();
        sources.kinobase.destroy();
        sources.collaps.destroy();
        sources.cdnmovies.destroy();
        sources.filmix.destroy();
        window.removeEventListener('resize', minus);
      };
    }

    if (!Lampa.Lang) {
      var lang_data = {};
      Lampa.Lang = {
        add: function add(data) {
          lang_data = data;
        },
        translate: function translate(key) {
          return lang_data[key] ? lang_data[key].ru : key;
        }
      };
    }
    Lampa.Lang.add({
      online_nolink: {
        ru: 'Не удалось извлечь ссылку',
        uk: 'Неможливо отримати посилання',
        en: 'Failed to fetch link',
        zh: '获取链接失败',
        bg: 'Не може да се извлече връзката'
      },
      online_waitlink: {
        ru: 'Работаем над извлечением ссылки, подождите...',
        uk: 'Працюємо над отриманням посилання, зачекайте...',
        en: 'Working on extracting the link, please wait...',
        zh: '正在提取链接，请稍候...',
        bg: 'Работя по извличнаето на линка, моля почакайте...'
      },
      online_balanser: {
        ru: 'Балансер',
        uk: 'Балансер',
        en: 'Balancer',
        zh: '平衡器',
        bg: 'Балансър'
      },
      // helper_online_file: {
      //   ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
      //   uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
      //   en: 'Hold the "OK" key to bring up the context menu',
      //   zh: '按住“确定”键调出上下文菜单',
      //   bg: 'Задръжте бутон "ОК" за да отворите контекстното меню'
      // },
      online_query_start: {
        ru: 'По запросу',
        uk: 'На запит',
        en: 'On request',
        zh: '根据要求',
        bg: 'По запитване'
      },
      online_query_end: {
        ru: 'нет результатов',
        uk: 'немає результатів',
        en: 'no results',
        zh: '没有结果',
        bg: 'няма резултати'
      },
      title_online: {
        ru: 'Synology NAS',
        uk: 'Synology NAS',
        en: 'Synology NAS',
        zh: 'Synology NAS',
        bg: 'Synology NAS'
      },
      // title_proxy: {
      //   ru: 'Прокси',
      //   uk: 'Проксі',
      //   en: 'Proxy',
      //   zh: '代理人',
      //   bg: 'Прокси'
      // },
      // online_proxy_title: {
      //   ru: 'Основной прокси',
      //   uk: 'Основний проксі',
      //   en: 'Main proxy',
      //   zh: '主要代理',
      //   bg: 'Основно прокси'
      // },
      // online_proxy_descr: {
      //   ru: 'Будет использоваться для всех балансеров',
      //   uk: 'Використовуватиметься для всіх балансерів',
      //   en: 'Will be used for all balancers',
      //   zh: '将用于所有平衡器',
      //   bg: 'Ще бъде използвано от всички балансъри'
      // },
      // online_proxy_placeholder: {
      //   ru: 'Например: http://proxy.com',
      //   uk: 'Наприклад: http://proxy.com',
      //   en: 'For example: http://proxy.com',
      //   zh: '例如：http://proxy.com',
      //   bg: 'Например: http://proxy.com'
      // },
      // filmix_param_add_title: {
      //   ru: 'Добавить ТОКЕН от Filmix',
      //   uk: 'Додати ТОКЕН від Filmix',
      //   en: 'Add TOKEN from Filmix',
      //   zh: '从 Filmix 添加 TOKEN',
      //   bg: 'Добави TOKEN от Filmix'
      // },
      // filmix_param_add_descr: {
      //   ru: 'Добавьте ТОКЕН для подключения подписки',
      //   uk: 'Додайте ТОКЕН для підключення передплати',
      //   en: 'Add a TOKEN to connect a subscription',
      //   zh: '添加 TOKEN 以连接订阅',
      //   bg: 'Добави TOKEN за вклюване на абонамента'
      // },
      // filmix_param_placeholder: {
      //   ru: 'Например: nxjekeb57385b..',
      //   uk: 'Наприклад: nxjekeb57385b..',
      //   en: 'For example: nxjekeb57385b..',
      //   zh: '例如：nxjekeb57385b..',
      //   bg: 'Например: nxjekeb57385b..'
      // },
      // filmix_param_add_device: {
      //   ru: 'Добавить устройство на Filmix',
      //   uk: 'Додати пристрій на Filmix',
      //   en: 'Add Device to Filmix',
      //   zh: '将设备添加到 Filmix',
      //   bg: 'Добави устройство в Filmix'
      // },
      // filmix_modal_text: {
      //   ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
      //   uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
      //   en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
      //   zh: '在您的授权帐户中的 https://filmix.ac/consoles 中输入！',
      //   bg: 'Въведете го на страницата https://filmix.ac/consoles във вашият акаунт'
      // },
      // filmix_modal_wait: {
      //   ru: 'Ожидаем код',
      //   uk: 'Очікуємо код',
      //   en: 'Waiting for the code',
      //   zh: '我们正在等待代码',
      //   bg: 'Очаквам код'
      // },
      // filmix_copy_secuses: {
      //   ru: 'Код скопирован в буфер обмена',
      //   uk: 'Код скопійовано в буфер обміну',
      //   en: 'Code copied to clipboard',
      //   zh: '代码复制到剪贴板',
      //   bg: 'Кода е копиран в буфера за обмен'
      // },
      // filmix_copy_fail: {
      //   ru: 'Ошибка при копировании',
      //   uk: 'Помилка при копіюванні',
      //   en: 'Copy error',
      //   zh: '复制错误',
      //   bg: 'Грешка при копиране'
      // },
      // filmix_nodevice: {
      //   ru: 'Устройство не авторизовано',
      //   uk: 'Пристрій не авторизований',
      //   en: 'Device not authorized',
      //   zh: '设备未授权',
      //   bg: 'Устройството не е оторизирано'
      // },
      // title_status: {
      //   ru: 'Статус',
      //   uk: 'Статус',
      //   en: 'Status',
      //   zh: '地位',
      //   bg: 'Статус'
      // },
      // online_voice_subscribe: {
      //   ru: 'Подписаться на перевод',
      //   uk: 'Підписатися на переклад',
      //   en: 'Subscribe to translation',
      //   zh: '订阅翻译',
      //   bg: 'Абонирай се за превода'
      // },
      // online_voice_success: {
      //   ru: 'Вы успешно подписались',
      //   uk: 'Ви успішно підписалися',
      //   en: 'You have successfully subscribed',
      //   zh: '您已成功订阅'
      // },
      // online_voice_error: {
      //   ru: 'Возникла ошибка',
      //   uk: 'Виникла помилка',
      //   en: 'An error has occurred',
      //   zh: '发生了错误',
      //   bg: 'Възникна грешка'
      // }
    });
    function resetTemplates() {
      Lampa.Template.add('online', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
      Lampa.Template.add('online_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }
    var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"v1.54\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>#{title_online}</span>\n    </div>";

    // нужна заглушка, а то при страте лампы говорит пусто
    Lampa.Component.add('online', component);

    //то же самое
    resetTemplates();
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        var btn = $(Lampa.Lang.translate(button));
        btn.on('hover:enter', function () {
          resetTemplates();
          Lampa.Component.add('online', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_online'),
            component: 'online',
            search: e.data.movie.title,
            search_one: e.data.movie.title,
            search_two: e.data.movie.original_title,
            movie: e.data.movie,
            page: 1
          });
        });
        e.object.activity.render().find('.view--torrent').after(btn);
      }
    });

    ///////ONLINE/////////

    // Lampa.Params.select('online_proxy_all', '', '');
    // Lampa.Params.select('online_proxy_videocdn', '', '');
    // Lampa.Params.select('online_proxy_rezka', '', '');
    // Lampa.Params.select('online_proxy_kinobase', '', '');
    // Lampa.Params.select('online_proxy_collaps', '', '');
    // Lampa.Params.select('online_proxy_cdnmovies', '', '');
    // Lampa.Template.add('settings_proxy', "<div>\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_all\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">#{online_proxy_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{online_proxy_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_videocdn\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Videocdn</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_rezka\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Rezka</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_kinobase\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Kinobase</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_collaps\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Collaps</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_cdnmovies\" placeholder=\"#{online_proxy_placeholder}\">\n        <div class=\"settings-param__name\">Cdnmovies</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n</div>");
    // function addSettingsProxy() {
    //   if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="proxy"]').length) {
    //     var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"proxy\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"46\" viewBox=\"0 0 42 46\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"1.5\" y=\"26.5\" width=\"39\" height=\"18\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                <circle cx=\"9.5\" cy=\"35.5\" r=\"3.5\" fill=\"white\"/>\n                <circle cx=\"26.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                <circle cx=\"32.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                <circle cx=\"21.5\" cy=\"5.5\" r=\"5.5\" fill=\"white\"/>\n                <rect x=\"31\" y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                <rect y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                <rect x=\"20\" y=\"14\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">#{title_proxy}</div>\n        </div>"));
    //     Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    //     Lampa.Settings.main().update();
    //   }
    // }
    // if (window.appready) addSettingsProxy();else {
    //   Lampa.Listener.follow('app', function (e) {
    //     if (e.type == 'ready') addSettingsProxy();
    //   });
    // }

    ///////FILMIX/////////

    // var network = new Lampa.Reguest();
    // var api_url = 'http://filmixapp.cyou/api/v2/';
    // var user_dev = '?user_dev_apk=1.1.3&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=';
    // var ping_auth;
    // Lampa.Params.select('filmix_token', '', '');
    // Lampa.Template.add('settings_filmix', "<div>\n    <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{filmix_param_placeholder}\">\n        <div class=\"settings-param__name\">#{filmix_param_add_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{filmix_param_add_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{filmix_param_add_device}</div>\n    </div>\n</div>");
    // Lampa.Storage.listener.follow('change', function (e) {
    //   if (e.name == 'filmix_token') {
    //     if (e.value) checkPro(e.value);else {
    //       Lampa.Storage.set("filmix_status", {});
    //       showStatus();
    //     }
    //   }
    // });
    // function addSettingsFilmix() {
    //   if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
    //     var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">Filmix</div>\n        </div>");
    //     Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    //     Lampa.Settings.main().update();
    //   }
    // }
    // if (window.appready) addSettingsFilmix();else {
    //   Lampa.Listener.follow('app', function (e) {
    //     if (e.type == 'ready') addSettingsFilmix();
    //   });
    // }
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'filmix') {
        e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
          var user_code = '';
          var user_token = '';
          var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
          Lampa.Modal.open({
            title: '',
            html: modal,
            onBack: function onBack() {
              Lampa.Modal.close();
              Lampa.Controller.toggle('settings_component');
              clearInterval(ping_auth);
            },
            onSelect: function onSelect() {
              Lampa.Utils.copyTextToClipboard(user_code, function () {
                Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
              });
            }
          });
          // ping_auth = setInterval(function () {
          //   checkPro(user_token, function () {
          //     Lampa.Modal.close();
          //     clearInterval(ping_auth);
          //     Lampa.Storage.set("filmix_token", user_token);
          //     e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
          //     Lampa.Controller.toggle('settings_component');
          //   });
          // }, 10000);
          // network.clear();
          // network.timeout(10000);
          // network.quiet(api_url + 'token_request' + user_dev, function (found) {
          //   if (found.status == 'ok') {
          //     user_token = found.code;
          //     user_code = found.user_code;
          //     modal.find('.selector').text(user_code);
          //     //modal.find('.broadcast__scan').remove()
          //   } else {
          //     Lampa.Noty.show(found);
          //   }
          // }, function (a, c) {
          //   Lampa.Noty.show(network.errorDecode(a, c));
          // });
        });
        // showStatus();
      }
    });
    // function showStatus() {
    //   var status = Lampa.Storage.get("filmix_status", '{}');
    //   var info = Lampa.Lang.translate('filmix_nodevice');
    //   if (status.login) {
    //     if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else info = status.login + ' - NO PRO';
    //   }
    //   var field = $(Lampa.Lang.translate("\n        <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{title_status}</div>\n            <div class=\"settings-param__value\">".concat(info, "</div>\n        </div>")));
    //   $('.settings [data-name="filmix_status"]').remove();
    //   $('.settings [data-name="filmix_add"]').after(field);
    // }
    // function checkPro(token, call) {
    //   network.clear();
    //   network.timeout(8000);
    //   network.silent(api_url + 'user_profile' + user_dev + token, function (json) {
    //     if (json) {
    //       if (json.user_data) {
    //         Lampa.Storage.set("filmix_status", json.user_data);
    //         if (call) call();
    //       } else {
    //         Lampa.Storage.set("filmix_status", {});
    //       }
    //       showStatus();
    //     }
    //   }, function (a, c) {
    //     Lampa.Noty.show(network.errorDecode(a, c));
    //   });
    // }

})();