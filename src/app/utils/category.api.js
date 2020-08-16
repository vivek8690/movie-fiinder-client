import API from './api';
import API_ENDPOINTS from '../_shared/constants/api.endpoints';

const getCategories = async () => {
    return API.get(`${API_ENDPOINTS.CATEGORIES.GET_ALL}`);
};

export { getCategories };
