// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

//get galleryItems items for work
const makeGalleryItemsLibrary = element => {
  const { preview, original, description } = element;

  return `
  <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" /> </a>`;
};

//set galleryItems on DOM
const images = document.querySelector('.gallery');

const makeSiteStructure = galleryItems.map(makeGalleryItemsLibrary).join('');

images.innerHTML = makeSiteStructure;

let lightbox = new SimpleLightbox('.photo-card a', {
  close: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: '250',
});
