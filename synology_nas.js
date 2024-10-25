(function () {
    'use strict';


    function synology(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };


      // local proxy is needed for Synology NAS with old upnp sdk used (CORS restricted)
      // UPnP/1.0, Portable SDK for UPnP devices/1.6.18: https://github.com/pupnp/pupnp/commit/542c318acff73bf9be85b886a6e447bc473f57f2 
      this.getProxyURL = function (url) {
        var proxy = Lampa.Storage.get('synology_dlna_proxy');
        if (proxy) {
          if (proxy.indexOf('http') === -1) proxy = 'http://' + proxy;  
          url = proxy + (proxy.endsWith('/') ? '' : '/') + url;
        }
        return url;        
      }

			this.levenshtein = function (a, b) {
			  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

			  for (let i = 0; i <= a.length; i++) {
			    matrix[i][0] = i;
			  }

			  for (let j = 0; j <= b.length; j++) {
			    matrix[0][j] = j;
			  }

			  for (let i = 1; i <= a.length; i++) {
			    for (let j = 1; j <= b.length; j++) {
			      if (a[i - 1] === b[j - 1]) {
			        matrix[i][j] = matrix[i - 1][j - 1];
			      } else {
			        matrix[i][j] = Math.min(
			          matrix[i - 1][j] + 1,      // Удаление
			          matrix[i][j - 1] + 1,      // Вставка
			          matrix[i - 1][j - 1] + 1   // Замена
			        );
			      }
			    }
			  }

			  return matrix[a.length][b.length];
			}


      this.cleanTitle = function (title) {
			  return title.replace(/\.\d{4}\./g, '') // Удаляем годы
          .replace(/\.(SDR|WEBDL|4K|2160p|480p|720p|1080p)\./g, '') // Удаляем разрешения и форматы
          .replace(/\./g, ' ') // Заменяем точки на пробелы
          .trim(); // Убираем пробелы с начала и конца строки
			}

			this.transliterate = function (text) {
			  const translitMap = {
			    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z',
			    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
			    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
			    'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
			  };
			  return text.split('').map(char => translitMap[char.toLowerCase()] || char).join('');
			}			


			this.findSimilarTitles = function (search_one, search_two, titles) {
			  const cleanedSearchOne = cleanTitle(search_one);
			  const cleanedSearchTwo = cleanTitle(search_two);
			  const transliteratedSearchOne = transliterate(cleanedSearchOne);

			  const similarities = titles.map(title => {
			    const cleanedTitle = cleanTitle(title);
			    const distanceOne = levenshtein(cleanedTitle, cleanedSearchOne);
			    const distanceTwo = levenshtein(cleanedTitle, cleanedSearchTwo);
			    const distanceTranslit = levenshtein(cleanedTitle, transliteratedSearchOne);
			    return { title, distance: Math.min(distanceOne, distanceTwo, distanceTranslit) };
			  });

			  similarities.sort((a, b) => a.distance - b.distance);

			  return similarities.slice(0, 3).map(item => item.title);
			}


			this.findFolderId = function (filesAndDirectories, folderName) {
				console.log(filesAndDirectories);
			    for (let folder of filesAndDirectories) {
			        if (folder.title === folderName) {
			            return folder.id;
			        }
			    }
			    return null;
			}			

			this.getFilesInFolder = async function(nas_folder) {
				  var _this = this;
			    let folder_id = 0; // Начинаем с корневой папки
			    let folderNames = nas_folder.replace(/^\/+|\/+$/g, '').split('/'); // Удаляем слеши в начале и конце пути и разделяем путь на части

			    let filesAndDirectories = [];
			    filesAndDirectories = await _this.getDLNAfiles(folder_id);

			    if (nas_folder !== '') {
				    for (let folderName of folderNames) {
				        folder_id = await _this.findFolderId(filesAndDirectories, folderName);
				        if (folder_id === null) {
				        	  Lampa.Noty.show(`Synology NAS: папка "${folderName}" не найдена`);
				            console.error(`Synology NAS: папка "${folderName}" не найдена`);
				            return;
				        }
				        filesAndDirectories = await _this.getDLNAfiles(folder_id);
				    }
				  }
				  // console.log(`Содержимое папки "${nas_folder}":`, filesAndDirectories);
			    _this.displayResult(filesAndDirectories);
			    
			}			


			this.displayResult = function(filesAndDirectories) {
				console.log('Synology NAS', filesAndDirectories);
       	append([{
                      // episode: parseInt(media.episode),
                      // season: media.season,
                      title: 'Test',
                      quality: '480p ',
                      link: 'http:\/\/192.168.1.125:9118\/proxy\/http:\/\/192.168.1.5:50002\/v\/NDLNA\/6449.mkv'
                      // translation: media.translation
                    }]);
      	component.loading(false); 
			}

      this.getDLNAfiles = async function (folder_id=0) {
        var _this = this;

        var serverDLNA = Lampa.Storage.get('synology_nas_server');
        var folder = Lampa.Storage.get('synology_nas_server_folder');

        var serviceURL = serverDLNA + (serverDLNA.endsWith('/') ? '' : '/') + 'ContentDirectory/control';
        if (serviceURL.indexOf('http') === -1) serviceURL = 'http://' + serviceURL;

        serviceURL = this.getProxyURL(serviceURL);

        console.log('Synology NAS', serviceURL, folder_id);

        var soapAction = '"urn:schemas-upnp-org:service:ContentDirectory:1#Browse"';
        var soapBody = `
          <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <s:Body>
                  <u:Browse xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1">
                      <ObjectID>`+folder_id+`</ObjectID>
                      <BrowseFlag>BrowseDirectChildren</BrowseFlag>
                      <Filter>*</Filter>
                      <StartingIndex>0</StartingIndex>
                      <RequestedCount>1000</RequestedCount>
                      <SortCriteria></SortCriteria>
                  </u:Browse>
              </s:Body>
          </s:Envelope>`;
        return new Promise(function (resolve, reject) {
	        $.ajax({
	          url: serviceURL,
	          type: "POST",
	          dataType: "xml",
	          data: soapBody,
	          headers: {
	            "SOAPAction": soapAction,
	            "Content-Type": "text/xml"
	          },
	          success: function(response) {
	            var filesAndDirectories = _this.parseDLNAXmlResponse(response.documentElement.outerHTML);
	            console.log('Synology NAS', filesAndDirectories);
	            resolve(filesAndDirectories);
	          },
	          error: function(data) {
	          	Lampa.Noty.show('Synology NAS: Не удалось подключиться к DLNA-серверу');
	            console.log('Synology NAS', "SOAP request failed", data);
	            resolve([]);
	          }
	        });
      	});
      };

      this.parseDLNAXmlResponse = function (xmlResponse) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
        var result = xmlDoc.getElementsByTagName('Result')[0].textContent;
        var decodedResult = decodeURIComponent(result);
        var resultDoc = parser.parseFromString(decodedResult, "text/xml");
        var containers = resultDoc.getElementsByTagName('container');
        var items = resultDoc.getElementsByTagName('item');
        var filesAndDirectories = [];
        var parseNode = function(node) {
          var nodeInfo = {};
          for (var i = 0; i < node.attributes.length; i++) {
            nodeInfo[node.attributes[i].name] = node.attributes[i].value;
          }
          for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType === 1) { // if element node
              var name = node.childNodes[i].nodeName
              if(name === 'dc:title') name = 'title';
              if(name === 'upnp:class') name = 'type';
              if(name === 'res') name = 'url';
              if(nodeInfo[name]) continue;
              nodeInfo[name] = node.childNodes[i].textContent;
              for (var j = 0; j < node.childNodes[i].attributes.length; j++) {
                 nodeInfo[node.childNodes[i].attributes[j].name] = node.childNodes[i].attributes[j].value;
              }
            }
          }
          return nodeInfo;
        };
        for (var i = 0; i < containers.length; i++) {
          filesAndDirectories.push(parseNode(containers[i]));
        }
        for (var i = 0; i < items.length; i++) {
          filesAndDirectories.push(parseNode(items[i]));
        }
        return filesAndDirectories;
      }

      /**
       * Начать поиск
       * @param {Object} _object 
       */
      this.search = function (_object) {
        console.log("synology search", _object);

        var nasServerFolder = Lampa.Storage.get('synology_nas_server_folder');

        
        // this.find(172878);
      	
      	results = 
			{
			    "id": 173787,
			    "title": "\u0414\u0438\u043a\u0438\u0439 \u0440\u043e\u0431\u043e\u0442",
			    "original_title": "The Wild Robot",
			    "year": 2024,
			    "last_episode": null,

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
			        "playlist": []
			    }
			};
        var json = results;
        extractData(json);
        append(filtred());

				// this.getFilesInFolder(nasServerFolder);
      	component.loading(false);        
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
       * Получить информацию о фильме
       * @param {Arrays} data
       */
      function extractData(data) {
      	console.log('extractData', data);

        extract = {};
        var pl_links = data.player_links;
        if (pl_links.movie && pl_links.movie.length > 0) {
          var _transl_id = 0;
          for (var _ID in pl_links.movie) {
            var _file_episod = pl_links.movie[_ID];
            ++_transl_id;
            var file_url = _file_episod.link.replace(/\[(.+[\d]),?\]/i, '480');
            extract[_transl_id] = {
              file: file_url,
              translation: _file_episod.translation,
              quality: '480',
              qualities: '480'
            };
          }
        }
        console.log('extractData', extract);
      }

      /**
       * Найти поток
       * @param {Object} element
       * @param {Int} max_quality
       * @returns string
       */
      function getFile(element, max_quality) {
      	console.log('getFile', element, max_quality);
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
        console.log('getFile', {file: file, quality: quality});
        return {
          file: file,
          quality: quality
        };
      }


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
      	console.log('append', items);
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
          var item = Lampa.Template.get('synology_nas', element);
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
              console.log('append first', first);
              console.log('append playlist', playlist);
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
      var balanser = Lampa.Storage.get('synology_nas_balanser', 'synology');
      var last_bls = Lampa.Storage.cache('online_last_balanser', 200, {});
      if (last_bls[object.movie.id]) {
        balanser = last_bls[object.movie.id];
      }
      var sources = {
        synology: new synology(this, object),
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
      var filter_sources = ['synology'];
      var kiposk_sources = [];

      if (filter_sources.indexOf(balanser) == -1) {
        balanser = 'synology';
        Lampa.Storage.set('synology_nas_balanser', 'synology');
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
        filter.onSearch = function (value) {
          Lampa.Activity.replace({
            search: value,
            clarification: true
          });
        };
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
        this.reset();
        this.find();
      };
      this.find = function () {
      	sources['synology'].search(object);
      };
      this.saveChoice = function (choice) {
        var data = Lampa.Storage.cache('synology_nas_choice_' + balanser, 500, {});
        data[selected_id || object.movie.id] = choice;
        Lampa.Storage.set('synology_nas_choice_' + balanser, data);
      };

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
        this.empty(Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('synology_nas_query_end'));
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
        sources.synology.destroy();
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
      synology_nas_balanser: {
        ru: 'Балансер',
        uk: 'Балансер',
        en: 'Balancer',
        zh: '平衡器',
        bg: 'Балансър'
      },
      online_query_start: {
        ru: 'По запросу',
        uk: 'На запит',
        en: 'On request',
        zh: '根据要求',
        bg: 'По запитване'
      },
      synology_nas_query_end: {
        ru: 'нет результатов',
        uk: 'немає результатів',
        en: 'no results',
        zh: '没有结果',
        bg: 'няма резултати'
      },
      synology_nas_title: {
        ru: 'Synology NAS',
        uk: 'Synology NAS',
        en: 'Synology NAS',
        zh: 'Synology NAS',
        bg: 'Synology NAS'
      }
    });
    function resetTemplates() {
      Lampa.Template.add('synology_nas', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
      Lampa.Template.add('synology_nas_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }
    var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"v0.01\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>#{synology_nas_title}</span>\n    </div>";

    // нужна заглушка, а то при страте лампы говорит пусто
    Lampa.Component.add('synology_nas', component);

    //то же самое
    resetTemplates();
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        var btn = $(Lampa.Lang.translate(button));
        btn.on('hover:enter', function () {
          resetTemplates();
          Lampa.Component.add('synology_nas', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('synology_nas_title'),
            component: 'synology_nas',
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

    //настройки
    // https://github.com/yumata/lampa-source/blob/main/src/components/settings/api.js
    Lampa.SettingsApi.addComponent({
      component: 'synology_nas_config',
      name: 'Synology NAS',
      icon: "<svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:3;}</style></defs><rect class=\"a\" x=\"5.5\" y=\"5.5\" width=\"37\" height=\"33.1724\" rx=\"1.252\"/><line class=\"a\" x1=\"27.8276\" y1=\"5.5\" x2=\"27.8276\" y2=\"38.6724\"/><line class=\"a\" x1=\"33.5898\" y1=\"12.2251\" x2=\"36.7378\" y2=\"12.2251\"/><line class=\"a\" x1=\"33.5898\" y1=\"17.3047\" x2=\"36.7378\" y2=\"17.3047\"/><rect class=\"a\" x=\"8.1292\" y=\"38.6724\" width=\"5.1034\" height=\"3.8276\"/><rect class=\"a\" x=\"34.8687\" y=\"38.6724\" width=\"5.1034\" height=\"3.8276\"/></svg>"
    });
    Lampa.SettingsApi.addParam({
      component: 'synology_nas_config',
      param: {
        name: 'synology_nas_server',
        type: 'input', //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        default: ''
      },
      field: {
        name: 'DLNA-сервер на Synology NAS',
        description: 'Например, 192.168.1.5:50001'
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'synology_nas_config',
      param: {
        name: 'synology_nas_server_folder',
        type: 'input', 
        placeholder: '',
        values: '',
        default: ''
      },
      field: {
        name: 'Папка с видео на DLNA-сервере',
        description: 'Например, video/Фильмы'
      }
    });    
    Lampa.SettingsApi.addParam({
      component: 'synology_nas_config',
      param: {
        name: 'synology_nas_proxy',
        type: 'input', //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        default: ''
      },
      field: {
        name: 'Прокси',
        description: 'Например, 127.0.0.1:9118/proxy'
      }
    });         

})();