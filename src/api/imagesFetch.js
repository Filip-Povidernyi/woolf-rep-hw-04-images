import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = "40365251-7556fc461aeff4605ce69e2bc";

const fetchImages = async (query, page, perPage = 12) => {
    try {
        const response = await axios.get(
            `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    };
};

export default fetchImages;