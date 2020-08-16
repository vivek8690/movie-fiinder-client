import API from './api';
import API_ENDPOINTS from '../_shared/constants/api.endpoints';

const getMovies = async (query) => {
    let params = {
        search: query.search,
        sortBy: query.sortBy.value,
        genre: query.genre ? query.genre.map(cat => cat.value).join(',') : null,
    }

    return API.get(`${API_ENDPOINTS.MOVIES.GET_MOVIES}`, params);
};

const deleteMovieDetails = async (movieId) => {
    return API.deleteIt(`${API_ENDPOINTS.MOVIES.DELETE_MOVIE}/${movieId}`);
}

const addMovieDetails = async (movie) => {
    return API.post(`${API_ENDPOINTS.MOVIES.DELETE_MOVIE}`, movie);
}

const updateMovieDetails = async (movie) => {
    return API.put(`${API_ENDPOINTS.MOVIES.DELETE_MOVIE}/${movie._id}`, movie);
}

export { getMovies, deleteMovieDetails, updateMovieDetails, addMovieDetails};
