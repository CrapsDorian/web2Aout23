import { getAuthenticatedUser } from "../utils/auths";

async function readAllFilms(){
    const response = await fetch('/api/films');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const films = await response.json();

    return films;
    
}


async function updateFilm(idFilm, updatedTitle, updatedDuration, updatedBudget){

    const authenticatedUser = getAuthenticatedUser();


    const options = {
        method: 'PATCH',
        body: JSON.stringify({
          title: updatedTitle,
          duration: updatedDuration,
          budget: updatedBudget
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  const response = await fetch(`/api/films/${idFilm}`,options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const films = await response.json();
  return films;
    
}

async function deleteFilm(idFilm){

    const authenticatedUser = getAuthenticatedUser();

    const options = {
        method: 'DELETE',
        body: JSON.stringify({
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  const response = await fetch(`/api/films/${idFilm}`,options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const films = await response.json();
  return films;
}


async function addFilms(title,duration,budget,link){

        const authenticatedUser = getAuthenticatedUser();

      const options = {
        method: 'POST',
        body: JSON.stringify({
          title,
          duration,
          budget,
          link,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  const response = await fetch('/api/films',options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const films = await response.json();

  return films;
}
export { readAllFilms, updateFilm ,deleteFilm, addFilms }