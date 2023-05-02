import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createMarkup } from './js/markup';
import { getImages } from './js/api';

const searchForm = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

buttonLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onFormSubmit);
buttonLoadMore.addEventListener('click', onBtnLoad);

let lightbox = new simpleLightbox('.gallery a');
let query = '';
let page = 1;
const perPage = 40;

async function onFormSubmit(e) {
  e.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  query = e.currentTarget.searchQuery.value.trim();
  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  try {
    const { data } = await getImages(query, page, perPage);

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createMarkup(data.hits);
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      if (data.totalHits > perPage) {
        buttonLoadMore.classList.remove('is-hidden');
      }
    }
  } catch (err) {
    console.log(err);
  }
}
async function onBtnLoad() {
  page += 1;
  try {
    const { data } = await getImages(query, page, perPage);

    createMarkup(data.hits);
    lightbox.refresh();
    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page > totalPages) {
      buttonLoadMore.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}
