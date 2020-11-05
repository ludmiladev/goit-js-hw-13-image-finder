import refs from './refs';
import {fetchImg} from './fetchImage.js';
import {moreBtnCreate, openModal} from "../index.js";
import card from "../imageCard.hbs";
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const key = '17977888-d79c616f49d1f5bae461304f8';
let query;
let page;
let markup;

function renderImages(e) {
  e.preventDefault();
  query = refs.input.value;
  page = 1;

  fetchImg(query, page, key)
  .then(hits => {
    if (hits.length === 0) {
        error({
            title: 'There is no matches found. Please enter another request.',
            delay: 2000,
        });
        refs.form.reset();
        return;
    }

    markup = card(hits);
    refs.gallery.innerHTML = markup;

    moreBtnCreate();
    refs.form.reset();
        
    function showMore(){
        page += 1;

        fetchImg(query, page, key)
        .then(hits => {
        markup = card(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 1000);
    })
    };  
    document.querySelector('.more').addEventListener('click', showMore);
 });
 refs.gallery.addEventListener('click', openModal);
};

export default renderImages;