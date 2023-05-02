import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35817909-7eb30b2bd2710e4d1f9e56635';

async function getImages(query, page, perPage) {
  return await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
}
export { getImages };
