// import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';

const gallery = document.querySelector('gallery');

async function getImages(page = 1) {
  return await axios.get(
    `https://pixabay.com/api?key=35817909-7eb30b2bd2710e4d1f9e56635&q&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  // if (!resp.ok) {
  //   throw new Error(
  //     Notiflix.Notify(
  //       `Sorry, there are no images matching your search query. Please try again.`
  //     )
  //   );
  // }
  // return await resp.json();
}

// getImages()
//   .then(data => {
//     gallery.insertAdjacentHTML('beforeend', createMarkup);
//   })
//   .catch(err => console.log(err));
getImages()
  .then(data => console.log(data))
  .catch(err => console.log(err));

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}" target="_parent">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}
