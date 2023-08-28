/* eslint-disable no-console */
import { clearPage } from "../../utils/render";
import Navigate from "../Router/Navigate";
import { addFilms } from "../Models/films";
import { getAuthenticatedUser } from "../utils/auths";

const addFilm = () => {
  const authenticatedUser = getAuthenticatedUser();
  if (authenticatedUser?.username  !== 'admin'){
    clearPage();
    Navigate('/');
  }else{
    clearPage();
    renderGoBackHomeButton();
    renderFilmsForm(); 
  }
  
};



function renderGoBackHomeButton() {
    const main = document.querySelector('main');
    const submit = document.createElement('input');
    submit.value = 'Go back to HomePage';
    submit.className = 'btn btn-secondary mt-3';
    submit.addEventListener('click', () => {
      Navigate('/');
    });
  
    main.appendChild(submit);
  }

function renderFilmsForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title';
  title.required = true;
  title.className = 'form-control mb-3';
  const duration = document.createElement('input');
  duration.type = 'number';
  duration.id = 'duration';
  duration.required = true;
  duration.placeholder = 'time in minutes';
  duration.className = 'form-control mb-3';
  const budget = document.createElement('input');
  budget.type = 'number';
  budget.id = 'budget';
  budget.required = true;
  budget.placeholder = 'budget in millions'
  budget.className = 'form-control mb-3';
  const link = document.createElement('input');
  link.type = 'text';
  link.id = 'link';
  link.placeholder = 'link';
  link.required = true;
  link.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Submit';
  submit.id = 'submitFilms'
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    const film = {
      title: document.querySelector('#title').value,
      duration: document.querySelector('#duration').value,
      budget: document.querySelector('#budget').value,
      link: document.querySelector('#link').value,
    };
      addFilms(film.title,film.duration,film.budget,film.link);
      Navigate("/");
  } );
  form.appendChild(title);
  form.appendChild(duration);
  form.appendChild(budget)
  form.appendChild(link)
  form.appendChild(submit);
  main.appendChild(form);
  
}

export default addFilm;
