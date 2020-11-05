import refs from './js/refs';
import renderImages from "./js/apiService";
import './styles.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    refs.root.append(moreBtn);
    moreBtn.textContent = 'show more';
  }
}

export function openModal(event){
    if(event.target.nodeName !== 'IMG'){
        return
    }else{
        const instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" width="800" height="600">`);
        instance.show();
    };
};

refs.form.addEventListener('submit', renderImages);