/* eslint-disable no-console */
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { readAllFilms, updateFilm, deleteFilm } from '../Models/films';

const FilmPage = () => {
  clearPage();
  renderGoBackHomeButton();
  console.log("appel renderFilm");
  renderListFilms();
  console.log("apres appel");
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

function createInputField(value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  return input;
}

function createInputCell(inputElement) {
  const cell = document.createElement('td');
  cell.appendChild(inputElement);
  return cell;
}

async function renderEditFields(film) {
  const line = document.querySelector(`#film-${film.id}`);
  line.style.display = 'none';

  const editRow = document.createElement('tr');
  editRow.id = `edit-film-${film.id+1}`;

  const editTitle = createInputField(film.title);
  const editDuration = createInputField(film.duration);
  const editBudget = createInputField(film.budget);

  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.addEventListener('click', () => {
    const updatedTitle = editTitle.value;
    const updatedDuration = editDuration.value;
    const updatedBudget = editBudget.value;

    updateFilm(film.id, updatedTitle, updatedDuration, updatedBudget);

    line.style.display = '';
    editRow.style.display = 'none';

    line.querySelector('.title-link').innerText = updatedTitle;
    line.querySelector('.duration').innerText = updatedDuration;
    line.querySelector('.budget').innerText = updatedBudget;
  });

  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', () => {
    line.style.display = '';
    editRow.style.display = 'none';
  });

  const actionCell = document.createElement('td');
  actionCell.colSpan = 4;
  actionCell.appendChild(saveButton);
  actionCell.appendChild(cancelButton);

  editRow.appendChild(document.createElement('td'));
  editRow.appendChild(createInputCell(editTitle));
  editRow.appendChild(createInputCell(editDuration));
  editRow.appendChild(createInputCell(editBudget));
  editRow.appendChild(actionCell);

  line.parentNode.insertBefore(editRow, line.nextSibling);
}

function renderListFilms() {
  const main = document.querySelector('main');
  const films = readAllFilms();
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-responsive pt-5';
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.id = 'table-films';
  table.className = 'table table-success';
  tableWrapper.appendChild(table);
  table.appendChild(tbody);
  const header = document.createElement('tr');
  const header1 = document.createElement('th');
  header1.innerText = 'Film';
  const header2 = document.createElement('th');
  header2.innerText = 'Durée';
  const header3 = document.createElement('th');
  header3.innerText = 'Budget';
  const header4 = document.createElement('th');
  header4.innerText = 'Actions';

  header.appendChild(header1);
  header.appendChild(header2);
  header.appendChild(header3);
  header.appendChild(header4);
  tbody.appendChild(header);

  films?.forEach((film) => {
    const line = document.createElement('tr');
    line.id = `film-${film.id}`;
    const title = document.createElement('td');
    const duration = document.createElement('td');
    const budget = document.createElement('td');
    const action = document.createElement('td');

    const titleLink = document.createElement('a');
    titleLink.href = film.link;
    titleLink.innerText = film.title;
    titleLink.className = 'title-link';

    duration.innerText = film.duration;
    duration.className = 'duration';
    budget.innerText = film.budget;
    budget.className = 'budget';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', async () => {
      await renderEditFields(film);
      // FilmPage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'del';
    deleteButton.addEventListener('click', () => {
      deleteFilm(film.id);
      FilmPage();
    });

    action.appendChild(editButton);
    action.appendChild(deleteButton);

    title.appendChild(titleLink);
    line.appendChild(title);
    line.appendChild(duration);
    line.appendChild(budget);
    line.appendChild(action);
    tbody.appendChild(line);
  });

  main.appendChild(table);
}

export default FilmPage;
