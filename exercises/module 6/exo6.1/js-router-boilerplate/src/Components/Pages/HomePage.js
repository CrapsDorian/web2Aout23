const HomePage = async () => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const joke = await response.json();
    renderJokeFromString(joke);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};



function renderJokeFromString(joke){
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-responsive pt-5';
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');  
  table.className = 'table table-success';
  tableWrapper.appendChild(table);
  table.appendChild(tbody);
  const header = document.createElement('tr');
  const header1 = document.createElement('th');
  header1.innerText = 'categorie';
  const header2 = document.createElement('th');
  header2.innerText = 'blague';
  header.appendChild(header1);
  header.appendChild(header2);
  tbody.appendChild(header);

  const line = document.createElement('tr');
      const title = document.createElement('td');
      const description = document.createElement('td');
      const reponce = document.createElement('td');
      title.innerText = joke.category;
      description.innerText = joke.setup;
      reponce.innerText = joke.delivery;
      line.appendChild(title);
      line.appendChild(description);
      line.appendChild(reponce);
      tbody.appendChild(line);


      const main = document.querySelector('main');
      main.appendChild(tableWrapper);
}

export default HomePage;
