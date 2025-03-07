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
    //   console.log('view', e);
    // });

    // Lampa.Player.listener.follow('start', function (e) {
    //   console.log('player start', e);
    // });

    // Lampa.Player.listener.follow('destroy', function (e) {
    //   console.log('player destroy', e);
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
        console.log('full complite', e);
        if (e.data && e.data.movie) {
          var card = e.data.movie;

          var hash = Lampa.Utils.hash(card.original_name ? [1, 1, card.original_name].join('') : card.original_title);
          console.log(hash);

          var hash_to_movie = Lampa.Storage.get('stats_movies_watched', {});
          hash_to_movie[hash] = {
            'id': card.id,
            'ot': card.original_name ? card.original_name : card.original_title,
            't': card.title,
            'g': card.genres,
            'i': card.img
          };
          Lampa.Storage.set('stats_movies_watched', hash_to_movie);

        }
      }
    });

    
    // monitor movies watched
    // 2 - store movie watch progress (timeline)
    Lampa.Timeline.listener.follow('update', function (e) {

      console.log('timeline update', e);
      if (e.data) { // {"data": { "hash": "277429999", "road": {"duration": 6617.36075, "time": 217.738667, "percent": 3, "profile": 378159}}}
        var hash = e.data.hash;
        var percent = e.data.road.percent;
        // var profile = e.data.road.profile;

        var movies_watched = Lampa.Storage.get('stats_movies_watched', {});
        var movie = movies_watched[hash]; // add movie watched percent
        movie['p'] = percent;
        movie['d'] = Date.now();
        console.log(movie);
        Lampa.Storage.set('stats_movies_watched', movies_watched);

      }

    });


    // *** GENERATE STATS ***
    function analyzeMovies(json) {
      var watchedMovies = 0;
      var watchedExamples = [];
      var genreCounts = {};
      var unwatchedMovies = 0;
      var unwatchedExamples = [];
      var moviesWithReactions = 0;
      var reactionCounts = {};
      var moviesWithoutD = 0;
      var moviesWithoutDExamples = [];
      var dayCounts = {};
      var seasonCounts = {};
      var monthCounts = {};
      var dates = [];
      var maxConsecutiveWatched = 0;
      var maxConsecutiveUnwatched = 0;

      for (var key in json) {
        var movie = json[key];
        if (movie.p > 90) {
          watchedMovies++;
          if (watchedExamples.length < 3) {
            watchedExamples.push({
              id: movie.id,
              ot: movie.ot,
              t: movie.t,
              i: movie.i
            });
          }
        }
        if (movie.p <= 90) {
          unwatchedMovies++;
          if (unwatchedExamples.length < 3) {
            unwatchedExamples.push({
              id: movie.id,
              ot: movie.ot,
              t: movie.t,
              i: movie.i
            });
          }
        }
        if (movie.r && movie.r.length > 0) {
          moviesWithReactions++;
        }
        if (!movie.d) {
          moviesWithoutD++;
          if (moviesWithoutDExamples.length < 3) {
            moviesWithoutDExamples.push({
              id: movie.id,
              ot: movie.ot,
              t: movie.t,
              i: movie.i
            });
          }
        }

        movie.g.forEach(function(genre) {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });

        if (movie.r) {
          movie.r.forEach(function(reaction) {
            reactionCounts[reaction] = (reactionCounts[reaction] || 0) + 1;
          });
        }

        if (movie.d) {
          var date = new Date(movie.d);
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var season = Math.floor((month % 12) / 3) + 1;

          dayCounts[day] = (dayCounts[day] || 0) + 1;
          monthCounts[month] = (monthCounts[month] || 0) + 1;
          seasonCounts[season] = (seasonCounts[season] || 0) + 1;
          dates.push(date);
        }
      }

      dates.sort(function(a, b) {
        return a - b;
      });

      var currentConsecutiveWatched = 0;
      var currentConsecutiveUnwatched = 0;
      for (var i = 1; i < dates.length; i++) {
        var diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentConsecutiveWatched++;
          if (currentConsecutiveWatched > maxConsecutiveWatched) {
            maxConsecutiveWatched = currentConsecutiveWatched;
          }
        } else {
          currentConsecutiveWatched = 0;
        }
        if (diff > 1) {
          currentConsecutiveUnwatched += diff - 1;
          if (currentConsecutiveUnwatched > maxConsecutiveUnwatched) {
            maxConsecutiveUnwatched = currentConsecutiveUnwatched;
          }
        } else {
          currentConsecutiveUnwatched = 0;
        }
      }

      var topGenres = Object.keys(genreCounts).sort(function(a, b) {
        return genreCounts[b] - genreCounts[a];
      }).slice(0, 3);

      var mostPopularReaction = Object.keys(reactionCounts).sort(function(a, b) {
        return reactionCounts[b] - reactionCounts[a];
      })[0];

      var mostPopularDay = Object.keys(dayCounts).sort(function(a, b) {
        return dayCounts[b] - dayCounts[a];
      })[0];

      var mostPopularSeason = Object.keys(seasonCounts).sort(function(a, b) {
        return seasonCounts[b] - seasonCounts[a];
      })[0];

      var mostPopularMonth = Object.keys(monthCounts).sort(function(a, b) {
        return monthCounts[b] - monthCounts[a];
      })[0];

      var firstMovieOfYear = new Date(dates[0]).getFullYear();

      return {
        "watchedMovies": {
          "count": watchedMovies,
          "examples": watchedExamples
        },
        "topGenres": {
          "genres": topGenres,
          "examples": topGenres.map(function(genre) {
            var example = Object.values(json).find(function(movie) {
              return movie.g.includes(Number(genre));
            });
            return {
              id: example.id,
              ot: example.ot,
              t: example.t,
              i: example.i
            };
          })
        },
        "unwatchedMovies": {
          "count": unwatchedMovies,
          "examples": unwatchedExamples
        },
        "moviesWithReactions": moviesWithReactions,
        "mostPopularReaction": mostPopularReaction,
        "moviesWithoutD": {
          "count": moviesWithoutD,
          "examples": moviesWithoutDExamples
        },
        "mostPopularDay": mostPopularDay,
        "mostPopularSeason": mostPopularSeason,
        "mostPopularMonth": mostPopularMonth,
        "firstMovieOfYear": firstMovieOfYear,
        "maxConsecutiveWatched": maxConsecutiveWatched,
        "maxConsecutiveUnwatched": Math.floor(maxConsecutiveUnwatched)
      };
    }

      
  }

  Lampa.SettingsApi.addComponent({
      component: 'stats',
      // icon: '',
      name: 'Статистика'
  });


  Lampa.SettingsApi.addParam({
      component: 'stats',
      param: {
          type: 'button'
      },
      field: {
          name: '2025',
      },
      onChange: ()=>{
          var stats = Lampa.Storage.get('stats_movies_watched');
          if (!stats) {
              Lampa.Noty.show('Отсутствуют данные для отображения статистики');
          } else {
            var result = analyzeMovies(stats);
            var result_str = JSON.stringify(result, null, 2);
            console.log(result_str);

            let modal = $('<div><div class="about">' + result_str + '</div><br><div class="broadcast__device selector" style="textalign: center">Готово</div></div>')
            Lampa.Modal.open({
                title: 'Статистика',
                html: modal,
                align: 'center',
                onBack: () => {
                    Lampa.Modal.close()
                },
                onSelect: () => { // on button click
                    Lampa.Modal.close()
                }
            })

          }
      }
  })





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
