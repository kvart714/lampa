const network = new Lampa.Reguest();
class BackgroundWorker {
    private static instance: BackgroundWorker;

    private constructor(interval: number) {
        // setInterval(() => this.updateData(), interval);
        setInterval(() => this.addProgressBars(), interval);
    }

    static start(interval: number) {
        if (!BackgroundWorker.instance) {
            BackgroundWorker.instance = new BackgroundWorker(interval);
        }
    }

    async updateData() {
        const data = await this.getTransmissionData();
        const updatedData = await this.updateMovieInfo(data);
        await this.saveData(updatedData);
    }

    async getTransmissionData() {
        try {
            const data = await Transmission.GetTorrents();
            const existingData: Movie[] = Lampa.Storage.get('transmissionData') || [];

            return data.map(newItem => {
                const existingItem = existingData.find(item => item.id === newItem.id);
                return existingItem ? { ...existingItem, ...newItem } : newItem;
            });
        } catch (error) {
            log('Error fetching transmission data:', error);
            return [];
        }
    }

    async updateMovieInfo(source: Movie[]) {
        try {
            const movieToUpdate = source.find(movie => !movie.title);
            if (movieToUpdate) {
                // let url = 'https://apitmdb.cub.red/3/find/' + movieToUpdate.id + '?external_source=imdb_id&language=ru&api_key=4ef0d7355d9ffb5151e987764708ce96';
                let url = `https://api.themoviedb.org/3/movie/${movieToUpdate.id}?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru`
                network.silent(url, movieItem => {
                    if (movieItem) {
                        const index = source.findIndex(movie => movie.id === movieToUpdate.id);
                        source[index] = { ...source[index], ...movieItem };
                    } else {
                        log('No result found for ' + movieToUpdate.name, movieToUpdate);
                    }
                });
            }
            return source;
        } catch (error) {
            log('Error fetching movie info:', error);
            return source;
        }
    }

    // Function to save data
    async saveData(data: Movie[]) {
        try {
            Lampa.Storage.set('transmissionData', data);
        } catch (error) {
            log('Error saving data:', error);
        }
    }

    async addProgressBars() {
        const storedData: Movie[] = Lampa.Storage.get('transmissionData') || [];
        const matchedMovies: Movie[] = [];

        log('Starting to add progress bars');

        $('.card').each(function() {
            const title = $(this).find('.card__title').text().trim();
            const releaseYear = $(this).find('.card__age').text().trim();

            const matchingMovie = storedData.find(movie => {
                const movieReleaseYear = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : movie.release_year;
                return movie.title === title && movieReleaseYear === releaseYear;
            });

            if (matchingMovie) {
                matchedMovies.push(matchingMovie);
                if ($(this).find('.loading-icon').length === 0) {
                    $(this).append(`
                        <div class="loading-icon">
                        </div>
                    `);
                }
            }
        });

        log('Finished adding progress bars. Matched movies:', matchedMovies);
    }
}

