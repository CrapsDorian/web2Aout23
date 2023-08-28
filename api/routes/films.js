var express = require('express');
const { serialize, parse } = require('../utils/json');
const { authorize, isAdmin } = require('../utils/auths');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';


const FILMS = [{
  id : 1,
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
},
{
  id : 2,
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
},
{
  id : 3,
  title: 'Harry...',
  duration: 120,
  budget: 111,
  link: 'https://amazing-javascript.world',
}];



// films	GET	READ ALL : Lire toutes les ressources de la collection
// films?minimum-duration=value	GET	READ ALL FILTERED : Lire toutes les ressources de la collection selon le filtre donné
// films/{id}	GET	READ ONE : Lire la ressource identifiée
// films	POST	CREATE ONE : Créer une ressource basée sur les données de la requête
// films/{id}	DELETE	DELETE ONE : Effacer la ressource identifiée
// films/{id}	PATCH	UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("get all films");
  const minimumDuration = req?.query?.minimumduration;
  let allFilms = parse(jsonDbPath, FILMS);
  console.log(allFilms);
  if (minimumDuration) {
    allFilms = allFilms.filter((a) => a.duration >= minimumDuration);
  } 
  res.json(allFilms);
});

router.get('/:id', (req, res) => {
  const indexFilm = films.findIndex((film) => film.id == req.params.id);
  if (indexFilm < 0) return res.sendStatus(404);
  res.json(films[indexFilm]);
});


router.post('/' , authorize, isAdmin, (req, res) => {

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget ||!link) res.sendStatus(404);

  const films = parse(jsonDbPath, FILMS);

  const lastItemIndex = films.length !== 0 ? films.length -1 : 0;
  let idNewFilm = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  idNewFilm += 1;
  
  const newFilm = {
    id : idNewFilm,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  }

  films.push(newFilm);

  res.json(newFilm);
});

router.delete('/:id', authorize, isAdmin,(req, res) => {
  const idToDelete = req.params.id; // Récupère l'ID à partir des paramètres de la requête

  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id == idToDelete);

  if (foundIndex === -1) {
    console.log(foundIndex);
    return res.sendStatus(404); // Si l'ID n'est pas trouvé, renvoie un code 404
  }

  const deletedFilm = films.splice(foundIndex, 1)[0]; // Supprime le film du tableau

  serialize(jsonDbPath, films);

  res.json(deletedFilm); // Renvoie le film supprimé en réponse
});

/*
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);
  const foundIndex = films.findIndex(e => e.id === req.params.id);
  
  console.log(foundIndex);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemRemoved = films.splice(foundIndex,1);
  res.json(itemRemoved[0]);
});

*/

router.patch('/:id', authorize, isAdmin, (req, res) => {

  console.log("rentre patch");
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if ((!title && !duration && !budget) || title?.length === 0 || duration > 0 || budget > 0) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0)  return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  res.json(updatedFilm);
});

module.exports = router;
