/* eslint-disable no-alert */
/* eslint-disable no-console */
import {clearPage} from "../../utils/render"


function TrainingPage(){
    clearPage();
    renderTrainForm();
}


async function renderTrainForm(){
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-4 border rounded'; // Ajout de classes Bootstrap pour le style
  
  const labelFr = document.createElement('label');
  labelFr.className = 'form-label'; // Classe Bootstrap pour les libellés
  labelFr.textContent = "Français: ";
  
  const francais = document.createElement('input');
  francais.className = 'form-control'; // Classe Bootstrap pour les champs de saisie
  francais.id = "fr";
  francais.type = "text";
  
  const labelEn = document.createElement('label');
  labelEn.className = 'form-label'; // Classe Bootstrap pour les libellés
  labelEn.textContent = "Anglais: ";
  
  const anglais = document.createElement('input');
  anglais.className = 'form-control'; // Classe Bootstrap pour les champs de saisie
  anglais.id = "en";
  anglais.type = "text";
  
  const submit = document.createElement('input');
  submit.className = 'btn btn-primary mt-2'; // Classe Bootstrap pour les boutons
  submit.type = "submit";
  submit.value = "Ajouter";
  
  form.appendChild(labelFr);
  form.appendChild(francais);
  form.appendChild(labelEn);
  form.appendChild(anglais);
  form.appendChild(submit);
  
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTrad(document.querySelector('#fr').value, document.querySelector('#en').value);
  });
  
  main.appendChild(form);
  
}


async function addTrad(fr,en){

  const options = {
    method: 'POST',
    body: JSON.stringify({
      fr,
      en
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
const response = await fetch('/api/trad',options);
if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
// const traductions = await response.json();

// return traductions;
}


export default TrainingPage;