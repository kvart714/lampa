(function() {
  'use strict';

  function startPlugin() {
    var manifest = {
      type: 'other',
      version: '0.1.0',
      name: 'Статистика',
      description: 'Плагин для ведения статистики использования Лампы',
      component: 'stats',
    };
    Lampa.Manifest.plugins = manifest;


    // not used currently
    // Lampa.Timeline.listener.follow('view', function (e) {
    //   console.log('Stats', 'view', e);
    // });

    // Lampa.Player.listener.follow('start', function (e) {
    //   console.log('Stats', 'player start', e);
    // });

    // Lampa.Player.listener.follow('destroy', function (e) {
    //   console.log('Stats', 'player destroy', e);
    // });


    // *** REACTIONS ***
    function updateReactions(json1, json2) {
      // if record doesn't exist in json2, then reaction is ignored - there is no way to calculate hash
      for (var key in json1.value) {
        if (json1.value.hasOwnProperty(key)) {
          var id = key.split('_')[1]; // 'movie_519182' -> '519182'

          for (var json2Key in json2) {
            if (json2.hasOwnProperty(json2Key) && json2[json2Key].id == id) {
              json2[json2Key]['r'] = json1.value[key];
              console.log('Stats', 'New reaction(s) found for movie ' + id, json1.value[key]);
              break;
            }
          }

        }
      }

      return json2;
    }


    // monitor reactions
    Lampa.Storage.listener.follow('change', function (e) {
      if (e.name == 'mine_reactions') {
        console.log('Stats', 'storage change - mine_reactions', e);
        // {
        //  "name": "mine_reactions",
         // "value": {
         //   "movie_519182": [
         //     "nice",
         //     "fire"
         //   ],
         //   "movie_533535": [
         //     "think"
         //   ],
         //   "tv_156484": [
         //     "fire"
         //   ]
         // }
        // }
        var movies_watched = Lampa.Storage.get('stats_movies_watched', {});
        var movies_watched_updated = updateReactions(e, movies_watched);
        Lampa.Storage.set('stats_movies_watched', movies_watched_updated);
      }
    });


    // *** SEARCH HISTORY ***
    Lampa.Storage.listener.follow('change', function (e) {
      if (e.name == 'search_history') {
        console.log('Stats', 'storage change - search_history', e);
      }
    });




    // *** MOVIES WATCHED ***


    // monitor movies watched
    // 1 - store movie data when movie card is shown
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        console.log('Stats', 'full complite', e);
        if (e.data && e.data.movie) {
          var card = e.data.movie; // sample json for tv series: https://pastebin.com/aV4dkKyW
          console.log('Stats', 'card', card);

          if (card.seasons) {
            // let hash = Lampa.Utils.hash(element.season ? [element.season,element.episode,object.movie.original_title].join('') : object.movie.original_title);  // tv
            var hash = Lampa.Utils.hash(card.original_name ? [1, 1, card.original_name].join('') : card.original_title); 
          } else {
            var hash = Lampa.Utils.hash(card.original_name ? [1, 1, card.original_name].join('') : card.original_title);  // movie
          }


          console.log('Stats', 'hash', hash);

          var hash_to_movie = Lampa.Storage.get('stats_movies_watched', {});
          hash_to_movie[hash] = {
            'id': card.id,
            'ot': card.original_name ? card.original_name : card.original_title,
            't': card.title,
            'g': card.genres,
            'i': card.img,
            'ty': card.seasons ? 'tv' : 'movie',
            'y': new Date().getFullYear()
          };
          Lampa.Storage.set('stats_movies_watched', hash_to_movie);

        }
      }
    });


    // monitor movies watched
    // 2 - store movie watch progress (timeline)
    Lampa.Timeline.listener.follow('update', function (e) {

      console.log('Stats', 'timeline update', e);
      if (e.data) { // {"data": { "hash": "277429999", "road": {"duration": 6617.36075, "time": 217.738667, "percent": 3, "profile": 378159}}}
        var hash = e.data.hash;
        var percent = e.data.road.percent;
        // var profile = e.data.road.profile;

        var movies_watched = Lampa.Storage.get('stats_movies_watched', {});
        var movie = movies_watched[hash]; // add movie watched percent
        movie['p'] = percent;
        movie['d'] = Date.now();
        console.log('Stats', 'movie', movie);
        Lampa.Storage.set('stats_movies_watched', movies_watched);

      }

    });



  }

    // *** GENERATE STATS ***
   function getMovieDetails(movie) {
      return {
        id: movie.id,
        ot: movie.ot,
        t: movie.t,
        i: movie.i,
        ty: movie.ty
      };
    }

    function analyzeMovies(json, ignoreSeries = true) {
      
      // ignore series
      var filteredJson = {}; 
      if (ignoreSeries) {
        for (var key in json) {
          if (json[key].ty !== 'tv') {
            filteredJson[key] = json[key];
          }
        }
      } else {
        filteredJson = json;
      }

      // filter records by current year
      var currentYear = new Date().getFullYear();
      var filteredJsonYear = {};
      for (var key in filteredJson) {
        if (filteredJson[key].y == currentYear) {
          filteredJsonYear[key] = filteredJson[key];
        }
      }
      filteredJson = filteredJsonYear;


      // console.log('Stats', 'filteredJson', filteredJson);

      var watchedMovies = 0;
      var watchedExamples = [];
      var genreCounts = {};
      var unwatchedMovies = 0;
      var unwatchedExamples = [];
      var moviesWithReactions = 0;
      var reactionCounts = {};
      var cardsViewedOnly = 0;
      var cardsViewedOnlyExamples = [];
      var dayCounts = {};
      var seasonCounts = {};
      var monthCounts = {};
      var firstMovieOfYear = null;


      for (var key in filteredJson) {

        // calculate watchedMovies and unwatchedMovies
        var movie = filteredJson[key];
        if (movie.p && movie.p > 90) {
          watchedMovies++;
          if (watchedExamples.length < 3) {
            watchedExamples.push(getMovieDetails(movie));
          }

          if (movie.d && (!firstMovieOfYear || movie.d < firstMovieOfYear.date)) {
            firstMovieOfYear = {
              date: movie.d,
              movie: getMovieDetails(movie)
            };
          }

        }
        if (movie.p && movie.p <= 90) {
          unwatchedMovies++;
          if (unwatchedExamples.length < 3) {
            unwatchedExamples.push(getMovieDetails(movie));
          }
        }

        // calculate moviesWithReactions
        if (movie.r && movie.r.length > 0) {
          moviesWithReactions++;
        }
        
        // calculate cardsViewedOnly
        if (!movie.d) {
          cardsViewedOnly++;
          if (cardsViewedOnlyExamples.length < 3) {
            cardsViewedOnlyExamples.push(getMovieDetails(movie));
          }
        }

        // ???
        if (movie.g) {
          movie.g.forEach(function(genre) {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
        }


        if (movie.d) {
          var date = new Date(movie.d);
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();

          // calculate number of movies per day and per month
          dayCounts[day] = (dayCounts[day] || 0) + 1;
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        }

        
        // count number of each reaction, will be used later
        if (movie.r) {
          movie.r.forEach(function(reaction) {
            reactionCounts[reaction] = (reactionCounts[reaction] || 0) + 1;
          });
        }        
      }


      var topGenre = Object.keys(genreCounts).sort(function(a, b) {
        return genreCounts[b] - genreCounts[a];
      }).slice(0, 1);


      var mostPopularReaction = Object.keys(reactionCounts).sort(function(a, b) {
        return reactionCounts[b] - reactionCounts[a];
      })[0];

      var mostPopularDay = Object.keys(dayCounts).sort(function(a, b) {
        return dayCounts[b] - dayCounts[a];
      })[0];

      var mostPopularMonth = Object.keys(monthCounts).sort(function(a, b) {
        return monthCounts[b] - monthCounts[a];
      })[0];


      var result = {
        "watchedMovies": { // +
          "count": watchedMovies,
          "examples": watchedExamples
        },
        "topGenre": { // +
          "genre": topGenre,
          "examples": topGenre.map(function(genre) {
            var example = Object.values(filteredJson).find(function(movie) {
              return movie.g.includes(Number(genre));
            });
            return getMovieDetails(example);
          })
        },
        "unwatchedMovies": { // +
          "count": unwatchedMovies,
          "examples": unwatchedExamples
        },
        "moviesWithReactions": moviesWithReactions,
        "mostPopularReaction": mostPopularReaction, // +
        "cardsViewedOnly": {
          "count": cardsViewedOnly, // +
          "examples": cardsViewedOnlyExamples
        },
        "mostPopularDay": mostPopularDay,
        "mostPopularMonth": mostPopularMonth,
        "firstMovieOfYear": firstMovieOfYear ? firstMovieOfYear.movie : null
      };


      return result;

    }


  // *** MENU ***

  Lampa.SettingsApi.addComponent({
      component: 'stats',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" fill="#ffffff"><path d="M6 21H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1z"/></svg>',
      name: 'Статистика'
  });


  // TEMP - doesn't work
  // setTimeout(() => { 
  //   var parentContainer = document.querySelector('.settings__body .scroll__body > div');
  //   var statsElement = document.querySelector('.settings__body .settings-folder[data-component="stats"]');
  //   parentContainer.insertBefore(statsElement, parentContainer.firstChild);
  // }, 2000);

  Lampa.SettingsApi.addParam({
      component: 'stats',
      param: {
          type: 'button'
      },
      field: {
          name: 'JSON',
      },
      onChange: ()=>{
          var stats = Lampa.Storage.get('stats_movies_watched');
          if (!stats) {
              Lampa.Noty.show('Отсутствуют данные для отображения статистики');
          } else {
            var result = analyzeMovies(stats);
            var result_str = JSON.stringify(result, null, 2);
            console.log('Stats', 'results', result);

            let modal = $('<div class="about"><div class="about__rules"><pre>' + result_str + '</pre></div></div>')

            Lampa.Modal.open({
                title: 'Статистика',
                html: modal,
                size: 'medium',
                onBack: () => {
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('settings_component');

                }
            });



          }
      }
  });


    /*
     * param  iNumber Integer Число на основе которого нужно сформировать окончание
     * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
     *         например ['яблоко', 'яблока', 'яблок']
     * return String
     */
    function getNumEnding(iNumber, aEndings)
    {
        var sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber>=11 && iNumber<=19) {
            sEnding=aEndings[2];
        }
        else {
            i = iNumber % 10;
            switch (i)
            {
                case (1): sEnding = aEndings[0]; break;
                case (2):
                case (3):
                case (4): sEnding = aEndings[1]; break;
                default: sEnding = aEndings[2];
            }
        }
        return sEnding;
    }


  // generate menu with stats
  var stats = Lampa.Storage.get('stats_movies_watched');
  if (stats) {
    var result = analyzeMovies(stats);

    console.log('Stats', 'results', result);    


    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: result['firstMovieOfYear'].t,
            description: 'первый фильм 2025 года'
        }
    });

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: result['watchedMovies'].count,
            description: getNumEnding(result['watchedMovies'].count, ['фильм просмотрен', 'фильма просмотрено', 'фильмов просмотрено'])
        }
    });    

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: result['moviesWithReactions'],
            description: getNumEnding(result['watchedMovies'].count, ['фильм', 'фильма', 'фильмов']) + ' с оценкой'
        }
    });       

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: result['unwatchedMovies'].count,
            description: getNumEnding(result['unwatchedMovies'].count, ['фильм недосмотрен', 'фильма недосмотрено', 'фильмов недосмотрено'])
        }
    }); 

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: result['cardsViewedOnly'].count,
            description: getNumEnding(result['cardsViewedOnly'].count, ['карточка фильма просмотрена', 'карточки фильмов просмотрено', 'карточек фильмов просмотрено'])

        }
    });      

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: Lampa.Api.sources.tmdb.getGenresNameFromIds('movie', [result['topGenre'].genre])[0],
            description: 'самый популярный жанр'
        }
    });              

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: Lampa.Lang.translate('reactions_'+result['mostPopularReaction']),
            description: 'самая частая реакция'
        }
    });   

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: Lampa.Lang.translate('day_'+result['mostPopularDay']),
            description: 'самый популярный день для просмотра фильмов'
        }
    });   

    Lampa.SettingsApi.addParam({
        component: 'stats',
        param: {
            type: 'static'
        },
        field: {
            name: Lampa.Lang.translate('month_'+result['mostPopularMonth']),
            description: 'самый популярный месяц для просмотра фильмов'
        }
    }); 




  }




  // *** CLEANUP ***  
  function filterJsonByYear(json, year) {
    console.log('Stats', 'Removing old entries...');

    var filteredJson = {};

    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        var entry = json[key];

        if (entry.y >= year) { // leave records with date equal or later than given year
          filteredJson[key] = entry;
        }
      }
    }

    return filteredJson;
  }

  function cleanupStorage() {
      console.log('Stats', 'Checking if clean up is needed...');
      var statsCleanup = Lampa.Storage.get('stats_cleanup', {});

      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var previousYear = currentYear - 1;
      var currentMonth = currentDate.getMonth() + 1;
      
      if (!statsCleanup[previousYear]) { // no clean up made before
          if (currentMonth >= 2) { // if it is February or later
              var watchedMovies = Lampa.Storage.get('stats_movies_watched', {});
              var cleanedMovies = filterJsonByYear(watchedMovies, currentYear);
              Lampa.Storage.set('stats_movies_watched', cleanedMovies);

              statsCleanup[previousYear] = true;
              Lampa.Storage.set('stats_cleanup', statsCleanup);
          }
      }
  }





  if (window.appready) {
    cleanupStorage(); // remove old records
    startPlugin();
  } else {
    Lampa.Listener.follow('app', function(e) {
      console.log('Stats', 'app', e);
      if (e.type == 'ready') {
        startPlugin();
      }
    });
  }
})();
