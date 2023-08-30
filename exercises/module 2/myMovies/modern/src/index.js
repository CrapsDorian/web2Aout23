/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import cameraImage from './img/camera.jpg'; // Importez vos images ici
import ticketImage from './img/ticket.jpg';

// app.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('#myForm');
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire
  
      // Récupérer les valeurs des champs
      const lignes = parseInt(form.querySelector("#lignes").value, 10);
      const colones = parseInt(form.querySelector("#colones").value, 10);
      const string = form.querySelector("#string").value;
  
      // Créer le tableau et la table HTML
      const tableArray = createArray(lignes, colones, string);
      const tableHtml = createHtmlTableAsString(tableArray);
  
      // Afficher la table
      const wrapper = document.querySelector('#tableWrapper');
      wrapper.innerHTML = tableHtml;
    });
  });
  
  function createArray(lignes, colones, string) {
    const table = [];
  
    for (let i = 0; i < lignes; i++) {
      const ligne = []
      for (let j = 0; j < colones; j++) {
        ligne.push(`${string}[${i}][${j}]`);
      }
      table.push(ligne);
    }
    return table;
  }
  
  function createHtmlTableAsString(tableArray) {
    let tableHtml = `<table class="table table-bordered">`;
  
    for (let i = 0; i < tableArray.length; i++) {
      tableHtml += `<tr>`;
      for (let j = 0; j < tableArray[i].length; j++) {
        tableHtml += `<td>${tableArray[i][j]}</td>`;
      }
      tableHtml += `</tr>`;
    }
  
    tableHtml += `</table>`;
    return tableHtml;
  }
  

document.addEventListener("DOMContentLoaded", () => {
  const films = [
     {
        id: 1,
        title: 'photo de camera',
        src: cameraImage, // Utilisation des chemins relatifs
    },{
        id: 2,
        title: 'photo de tiquet',
        src: ticketImage,
    },
];

// const form = document.querySelector('#myForm');


renderFilmsFromString(films)

function renderFilmsFromString(film) {
    const menuTableAsString = getFilmsTableAsString(film);
  
    const idFilms = document.querySelector('main');
  
    idFilms.innerHTML += menuTableAsString;
}

function getFilmsTableAsString(film) {
    const menuTableLines = getAllTableLinesAsString(film);
    const menuTable = addLinesToTableHeadersAndGet(menuTableLines);
    return menuTable;
}

function addLinesToTableHeadersAndGet(tableLines) {
    const menuTable = `
    <div class="table-responsive pt-5">
      <table class="table table-danger">
        <tr>
          <th>FILMS</th>
          <th>Description</th>
        </tr>
        ${tableLines}    
      </table>
    </div>
    `;
    return menuTable;
}

function getAllTableLinesAsString(menu){
    let tableLines = '';

    menu?.forEach((film) => {
        const image = new Image(); // or document.createElement('img');
        image.src = film.src;
        image.height = 50;

        tableLines += `<tr>
            <td>${film.title}</td>
            <td>${image.outerHTML}</td>
        </tr>`;
    });

    return tableLines;
}

/*
form.addEventListener("submit", (event) => {
    console.log("ici");
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupérer les valeurs des champs
    const lignes = parseInt(form.querySelector("#lignes").value, 10);
    const colones = parseInt(form.querySelector("#colones").value, 10);
    const string = form.querySelector("#string").value;

    console.log(`test ligne : ${lignes}`);
    console.log(`test colones : ${colones}`);
    console.log(`test string : ${string}`);

   // const tableArray = createArray(lignes,colones,string);
    const tableHtml = createTableHtml(string, lignes,colones);

    const formArray = document.querySelector('#formArray');

    formArray.appendChild(tableHtml);

});

/*
function createArray(lignes,colones,string){

    const table = [];

    for (let i = 0; i < lignes; i++) {
        const ligne = []
        for (let j = 0 ; j < colones; j++){
            ligne.push(`${string}${i}${j}`);
        }
        table.push(ligne);
    }
    return table;
};



function createTableHtml(string, lignes, colones){
    let table = ``;
    for (let i =  1; i < lignes ; i++){
        table += `
        <tr>
            ${createligne(string,colones, i)}
        </tr>
        `
    };
    return table;
};

function createligne(string, colones, nbrLigne){
    let ligne = ``;
    for (let i = 1 ; i < colones ;i++ ){
         ligne += `
            <td>
                ${string}[${nbrLigne}][${i}]
            </td>
        `
    }
    return ligne;
}
*/
});




