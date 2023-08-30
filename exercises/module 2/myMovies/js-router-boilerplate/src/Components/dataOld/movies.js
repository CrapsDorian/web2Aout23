/* eslint-disable no-path-concat */
// const { serialize, parse } = require('../utils/json');

// const jsonDbPath = `${__dirname  }/../datas/film.json`;


/* eslint-disable no-console */
const films = [];
films.push({
  id : 0,
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
},{
  id : 1,
  title: 'Potter...',
  duration: 340,
  budget: 1221,
  link: 'https://amazing-javascript.world',
});



function readAllFilms(){
   // const films = parse(jsonDbPath, FILMS);
    return films;
}


function addFilms(titleF,durationF,budgetF,linkF){
 // const films = parse(jsonDbPath,  FILMS);
    const lastID = films.lastIndexOf();
  
    films.push({
        id: lastID,
        title: titleF,
        duration: durationF,
        budget: budgetF,
        link: linkF,
      });

     // serialize(jsonDbPath, films);
    }


function deleteFilm(idFilm){
  console.log("rentre del");
  // const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id === idFilm);

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  // serialize(jsonDbPath, films);

  return itemRemoved;
}


function updateFilm(idFilm, editTitle, editDuration, editBudget){
 //  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id === idFilm);

  const film = films[foundIndex];

  console.log(film.id === idFilm);
  console.log("normalement TRUE");
  film.title = editTitle;
  film.budget = editBudget;
  film.duration = editDuration;

 // serialize(jsonDbPath, films);

}

export {readAllFilms , addFilms, deleteFilm, updateFilm};