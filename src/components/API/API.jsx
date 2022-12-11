const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30747871-d91efdefadb63ca506ce75120';

function fetchQuery(searchQuery, page) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}
      &image_type=photo&orientation=horizontal&page=
      ${page}&per_page=12`
  ).then(res => res.json());
}

export default fetchQuery;