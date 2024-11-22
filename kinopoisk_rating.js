(function () {
    'use strict';
    var network = new Lampa.Reguest();


    // get 20 first records only if limit is true
    function getKinopoiskRatings(offset=0, limit=true, showResult=true)
    {
        var oauth = Lampa.Storage.get('kinopoisk_access_token');

        // google script is used to act as CORS proxy
        // one request returns 20 records only
        console.log('Kinopoisk Ratings', 'Getting the rating of the next 20 movies starting from ' + String(offset) + '...');
        network.silent('https://script.google.com/macros/s/AKfycbxCnQNiTTapsXuXABm_l4hvxcm6Nt-pUkYhJkOPiQBsyYQYyxN4FC_cRJUx2UWeST9j/exec?method=getRated&oauth=' + oauth + '&offset=' + String(offset),
            function (data) { // on success
                if (data && data.data.userProfile && data.data.userProfile.userData && data.data.userProfile.userData.ratedOrWatchedMovies) {
                    var ratingsCount = data.data.userProfile.userData.ratedOrWatchedMovies.total;
                    console.log('Kinopoisk Ratings', 'The total count of ratings found: ' + String(ratingsCount));
                    var receivedRatings = data.data.userProfile.userData.ratedOrWatchedMovies.items;

                    var kinopoiskRatingsReceived = {};
                    receivedRatings.forEach(m => {
                        if (m.item.movieUserVote.voting.value) {
                            kinopoiskRatingsReceived[m.item.id] = String(m.item.movieUserVote.voting.value);
                        }
                    });
                    console.log('Kinopoisk Ratings', 'Ratings received and parsed', kinopoiskRatingsReceived);

                    var kinopoiskRatingsStored = Lampa.Storage.get('kinopoisk_my_ratings', {});
                    for (var attrname in kinopoiskRatingsReceived) { kinopoiskRatingsStored[attrname] = kinopoiskRatingsReceived[attrname]; }
                    Lampa.Storage.set('kinopoisk_my_ratings', kinopoiskRatingsStored);

                    if (!limit && ratingsCount > offset+20) { // continue to get remaining records
                        getKinopoiskRatings(offset+20, limit);
                    } else {
                        if (showResult) Lampa.Noty.show('Процесс импорта оценок c Кинопоиска завершен');
                    }
                } else {
                    console.log('Kinopoisk Ratings', 'Unable to parse ratings received', data);
                }
            },
            function (data) { // on error
                console.log('Kinopoisk Ratings', 'Error, google script', data);
            }
        );
    }

    function getColorBasedOnRate(rate) {
        if (rate >= 1 && rate <= 4) {
            return '#EA4E4E';
        } else if (rate >= 5 && rate <= 7) {
            return '#999';
        } else if (rate > 7) {
            return '#79D29E';
        }
    }

    function addReaction(data, type, add) {
        let mine = Lampa.Storage.get('mine_reactions',{})
        let id   = (data.movie.name ? 'tv' : 'movie') + '_' + data.movie.id

        if(!mine[id]) mine[id] = []

        let ready = mine[id].indexOf(type) >= 0

        if(add){
            if(!ready) mine[id].push(type)
            Lampa.Storage.set('mine_reactions',mine)
        }

        return ready
    }


    function startPlugin() {
        window.kinopoisk_rating_ready = true;

        var manifest = {
            type: 'video',
            version: '0.1.1',
            name: 'Кинопоиск Оценки',
            description: 'Отображает в Лампе оценки фильмов на Кинопоиске, позволяет оценивать фильмы на Кинопоиске через Лампу',
            component: 'kinopoisk_rating'
        };
        Lampa.Manifest.plugins = manifest;


        var oauth = Lampa.Storage.get('kinopoisk_access_token');
        if (oauth) { // update last 20 records on each plugin start
            getKinopoiskRatings(0, true, false); // don't show result
        }


        Lampa.Listener.follow('full', function (e) {
            // $(".button--kinopoisk_rating").remove();

            if (e.type == 'complite') {

                $('.full-start-new__buttons')
                  .append(`
                    <div class="full-start__button selector button--kinopoisk_rating">
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z" stroke="currentColor" stroke-width="2.2"></path>
                        </svg>
                        <span>Оценить на Кинопоиске</span>
                    </div>
                  `);

                var kinopoiskRatings = Lampa.Storage.get('kinopoisk_my_ratings', {});

                // kinopoisk id is needed, trying to get it if missing
                var kinopoiskId = e.data.movie.kinopoisk_id;
                var tmdbId = e.data.movie.id;
                if (!kinopoiskId) {
                    console.log('Kinopoisk Ratings', 'Kinopoisk id not found, trying to get it...');
                    network.silent('https://api.alloha.tv/?token=04941a9a3ca3ac16e2b4327347bbc1&tmdb=' + tmdbId,
                        function (data) { // on success
                            if (data && data.data && data.data.id_kp) {
                                kinopoiskId = data.data.id_kp;
                                console.log('Kinopoisk Ratings', 'Kinopoisk id found: ' + String(kinopoiskId));

                                var rate = kinopoiskRatings[kinopoiskId];
                                var color = getColorBasedOnRate(rate);
                                $('.button--kinopoisk_rating svg path').attr('stroke', color);
                            } else {
                                console.log('Kinopoisk Ratings', 'Failed to find Kinopoisk id');
                            }
                        },
                        function (data) { // on error
                            console.log('Kinopoisk Ratings', 'Failed to get Kinopoisk id', data);
                        }
                  );
                } else {
                    console.log('Kinopoisk Ratings', 'Kinopoisk id is known: ' + String(kinopoiskId));
                    var rate = kinopoiskRatings[kinopoiskId];
                    var color = getColorBasedOnRate(rate);
                    $('.button--kinopoisk_rating svg path').attr('stroke', color);

                }

                $('.button--kinopoisk_rating').on('hover:enter', function (card) {


                    if (e.data && e.data.movie) {


                        if (kinopoiskId) {
                            console.log('Kinopoisk Ratings', 'Reading ratings from the storage');

                            var kinopoiskRating = kinopoiskRatings[kinopoiskId];
                            console.log('Kinopoisk Ratings', 'Kinopoisk id: ' + String(kinopoiskId) + ', rating: ' + kinopoiskRating);

                            let items = [
                                {title: '10', selected: kinopoiskRating ==='10'},
                                {title: '9', selected: kinopoiskRating === '9'},
                                {title: '8', selected: kinopoiskRating === '8'},
                                {title: '7', selected: kinopoiskRating === '7'},
                                {title: '6', selected: kinopoiskRating === '6'},
                                {title: '5', selected: kinopoiskRating === '5'},
                                {title: '4', selected: kinopoiskRating === '4'},
                                {title: '3', selected: kinopoiskRating === '3'},
                                {title: '2', selected: kinopoiskRating === '2'},
                                {title: '1', selected: kinopoiskRating === '1'},
                                {title: 'Удалить оценку'}
                            ]

                            items.forEach(a=>{
                                a.template = 'selectbox_icon'
                                a.icon = ''
                                // a.name
                                // a.value
                                // a.icon     = '<img src="https://cub.red/img/reactions/' + a.type + '.svg'+'" />'
                                // a.ghost    = this.vote(a.type)
                                // a.noenter  = a.ghost
                            })

                            Lampa.Select.show({
                                title: 'Оценка',
                                items: items,
                                onSelect: (a)=>{

                                    var oauth = Lampa.Storage.get('kinopoisk_access_token');

                                    if (a.title !== 'Удалить оценку') {

                                        if(!a.noselect) {

                                            items.forEach(element => {
                                                element.selected = false
                                            })

                                            a.selected = true

                                            console.log('Kinopoisk Ratings', 'Changing the rating of movie ' + String(kinopoiskId) + ' (TMDB id: ' + String(tmdbId) + ') to ' + a.title)



                                            network.silent('https://script.google.com/macros/s/AKfycbxCnQNiTTapsXuXABm_l4hvxcm6Nt-pUkYhJkOPiQBsyYQYyxN4FC_cRJUx2UWeST9j/exec?method=setVote&oauth=' + oauth + '&movie=' + String(kinopoiskId) + '&rate=' + a.title,
                                                function (data) { // on success
                                                    if (data && data.data && data.data.movie && data.data.movie.vote && data.data.movie.vote.set && data.data.movie.vote.set.status == 'SUCCESS') {
                                                        kinopoiskRatings[kinopoiskId] = a.title;
                                                        Lampa.Storage.set('kinopoisk_my_ratings', kinopoiskRatings);
                                                        console.log('Kinopoisk Ratings', 'Final list of stored ratings', Lampa.Storage.get('kinopoisk_my_ratings', {}));

                                                        var color = getColorBasedOnRate(Number(a.title));
                                                        $('.button--kinopoisk_rating svg path').attr('stroke', color);

                                                        Lampa.Noty.show('Оценка фильма обновлена на Кинопоиске');


                                                        // delete the movie from the list of movies to be watched on Kinopoisk
                                                        if (Lampa.Storage.get('kinopoisk_remove_to_be_watched', true)) {

                                                            console.log('Kinopoisk Ratings', 'Removing the movie ' + String(kinopoiskId) + ' (TMDB id: ' + String(tmdbId) + ') from the list of movies to be watched on Kinopoisk');

                                                            network.silent('https://script.google.com/macros/s/AKfycbxCnQNiTTapsXuXABm_l4hvxcm6Nt-pUkYhJkOPiQBsyYQYyxN4FC_cRJUx2UWeST9j/exec?method=setWatchLater&oauth=' + oauth + '&movie=' + String(kinopoiskId),
                                                                function (data) { // on success
                                                                    if (data && data.data && data.data.movie && data.data.movie.plannedToWatch && data.data.movie.plannedToWatch.remove && data.data.movie.plannedToWatch.remove.status == 'SUCCESS') {
                                                                        console.log('Kinopoisk Ratings', 'Movie ' + String(kinopoiskId) + ' removed from the list of movies to be watched on Kinopoisk');
                                                                    } else {
                                                                        console.log('Kinopoisk Ratings', 'Failed to remove the movie ' + String(kinopoiskId) + ' from the list of movies to be watched on Kinopoisk');
                                                                    }
                                                                },
                                                                function (data) { // on error
                                                                    console.log('Kinopoisk Ratings', 'Error when deleting the movie from the list of movies to be watched on Kinopoisk, google script', data);
                                                                }
                                                            );

                                                        }

                                                        // duplicate as reaction
                                                        if (Lampa.Storage.get('kinopoisk_add_reaction', true)) {
                                                            console.log('Kinopoisk Ratings', 'Duplicating the rating as user reaction in Lampa')

                                                            var rate = Number(a.title);
                                                            var type = '';
                                                            
                                                            if (rate >= 1 && rate <= 2) {
                                                                type = 'shit';
                                                            } else if (rate >= 3 && rate <= 4) {
                                                                type = 'bore'
                                                            } else if (rate >= 5 && rate <= 6) {
                                                                type = 'think'
                                                            } else if (rate >= 7 && rate <= 8) {
                                                                type = 'nice';
                                                            } else if (rate > 8) {
                                                                type = 'fire';
                                                            }

                                                            // https://github.com/yumata/lampa-source/blob/main/src/components/full/start.js#L354
                                                            Lampa.Api.sources.cub.reactionsAdd({
                                                                method: e.data.movie.name ? 'tv' : 'movie',
                                                                id: e.data.movie.id,
                                                                type: type
                                                            },()=>{

                                                                addReaction(e.data, type, true);
                                                                let find = e.data.reactions.result.find(r=>r.type == type);
                                                                if (find) {
                                                                    find.counter++;
                                                                } else {
                                                                    e.data.reactions.result.push({
                                                                        type: type,
                                                                        counter: 1
                                                                    })
                                                                }

                                                                $('.reaction--'+type).addClass('reaction--voted');

                                                            },(e)=>{
                                                                Lampa.Noty.show('Не удалось добавить реакцию');
                                                            })

                                                        }

                                                    } else {
                                                        Lampa.Noty.show('Не удалось обновить оценку фильма');
                                                        console.log('Kinopoisk Ratings', 'Error to update movie rating', data);
                                                    }
                                                },
                                                function (data) { // on error
                                                    Lampa.Noty.show('Не удалось обновить оценку фильма');
                                                    console.log('Kinopoisk Ratings', 'Error when updating the rating, google script', data);
                                                }
                                            );



                                        }

                                    } else {
                                        // delete the rating
                                        console.log('Kinopoisk Ratings', 'Deleting the rating of the movie ' + String(kinopoiskId) + ' (TMDB id: ' + String(tmdbId) + ')')
                                        network.silent('https://script.google.com/macros/s/AKfycbxCnQNiTTapsXuXABm_l4hvxcm6Nt-pUkYhJkOPiQBsyYQYyxN4FC_cRJUx2UWeST9j/exec?method=removeVote&oauth=' + oauth + '&movie=' + String(kinopoiskId),
                                            function (data) { // on success
                                                if (data && data.data && data.data.movie && data.data.movie.vote && data.data.movie.vote.remove && data.data.movie.vote.remove.status == 'SUCCESS') {
                                                    delete kinopoiskRatings[kinopoiskId];
                                                    Lampa.Storage.set('kinopoisk_my_ratings', kinopoiskRatings);
                                                    $('.button--kinopoisk_rating svg path').attr('stroke', 'currentColor');
                                                    Lampa.Noty.show('Оценка фильма удалена');
                                                } else {
                                                    Lampa.Noty.show('Не удалось удалить оценку');
                                                    console.log('Kinopoisk Ratings', 'Error to delete the rating', data);
                                                }
                                            },
                                            function (data) { // on error
                                                Lampa.Noty.show('Не удалось удалить оценку');
                                                console.log('Kinopoisk Ratings', 'Error when deleting the rating, google script', data);
                                            }
                                        );
                                    }

                                },
                                onBack: ()=>{
                                    Lampa.Controller.toggle('full_start')
                                }
                            })
                        } else {
                            Lampa.Noty.show('Подождите несколько секунд для завершение получения идентификатора фильма на Кинопоиске');
                            console.log('Kinopoisk Ratings', 'No kinopoisk id found', e.data);
                        }
                    } else {
                        Lampa.Noty.show('Ошибка обработки данных, оценить фильм невозможно');
                        console.log('Kinopoisk Ratings', 'No movie data found', e.data);
                    }


                });
            }

        }); // Lampa.Listener.follow('full'

        // SETTINGS
        Lampa.SettingsApi.addComponent({
            component: 'kinopoisk',
            icon: '<svg width=\"239\" height=\"239\" viewBox=\"0 0 239 239\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\"><path fill=\"currentColor\" d=\"M215 121.415l-99.297-6.644 90.943 36.334a106.416 106.416 0 0 0 8.354-29.69z\" /><path fill=\"currentColor\" d=\"M194.608 171.609C174.933 197.942 143.441 215 107.948 215 48.33 215 0 166.871 0 107.5 0 48.13 48.33 0 107.948 0c35.559 0 67.102 17.122 86.77 43.539l-90.181 48.07L162.57 32.25h-32.169L90.892 86.862V32.25H64.77v150.5h26.123v-54.524l39.509 54.524h32.169l-56.526-57.493 88.564 46.352z\" /><path d=\"M206.646 63.895l-90.308 36.076L215 93.583a106.396 106.396 0 0 0-8.354-29.688z\" fill=\"currentColor\"/></svg>',
            name: 'Кинопоиск'
        })

        Lampa.SettingsApi.addParam({
            component: 'kinopoisk',
            param: {
                type: 'title'
            },
            field: {
                name: 'Оценки',
            }
        })

        Lampa.SettingsApi.addParam({
            component: 'kinopoisk',
            param: {
                name: 'kinopoisk_add_reaction',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Дублировать в реакциях',
            }
        })

        Lampa.SettingsApi.addParam({
            component: 'kinopoisk',
            param: {
                name: 'kinopoisk_remove_to_be_watched',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Удалять фильм из Буду смотреть',
            }
        })


        Lampa.SettingsApi.addParam({
            component: 'kinopoisk',
            param: {
                type: 'button'
            },
            field: {
                name: 'Импортировать с Кинопоиска',
            },
            onChange: ()=>{
                var oauth = Lampa.Storage.get('kinopoisk_access_token');
                if (!oauth) {
                    Lampa.Noty.show('Пройдите авторизацию в плагине kinopoisk.js через меню Кинопоиск');
                } else {
                    Lampa.Noty.show('Процесс импорта оценок запущен в фоне, это может занять продолжительное время');

                    console.log('Kinopoisk Ratings', 'Starting to get Kinopoisk ratings data...');
                    getKinopoiskRatings(0, false); // download all records
                }
            }
        })

    } // startPlugin


    if (!window.kinopoisk_rating_ready) startPlugin();

})();
