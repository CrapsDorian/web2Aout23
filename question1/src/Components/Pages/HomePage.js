import { clearPage } from "../../utils/render";
import { addQuestion } from "../data/question";
import Navigate from "../Router/Navigate";
  

  
  const HomePage = () => {
    clearPage();
    renderTrainingPage();
  };
  

  
function renderTrainingPage() {

  const main = document.querySelector('main');
  const form = document.createElement('form');
  const titrePage = document.createElement('h1');
  titrePage.innerText = "Etape d entrainement";
  main.appendChild(titrePage);
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'question';
  title.placeholder = 'question';
  title.required = true;
  title.className = 'form-control mb-3';
  const duration = document.createElement('input');
  duration.type = 'text';
  duration.id = 'reponce';
  duration.required = true;
  duration.placeholder = 'reponce';
  duration.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Submit';
  submit.id = 'submitFilms'
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  submit.addEventListener('click', (event) => {
    event.preventDefault();
      addQuestion(document.querySelector('#question').value,document.querySelector('#reponce').value);
      document.querySelector('#question').value = "";
      document.querySelector('#reponce').value = "";
  } );
  form.appendChild(title);
  form.appendChild(duration);
  form.appendChild(submit);
 
  main.appendChild(form);
  const form2 = document.createElement('form');
  const changePage = document.createElement('input');
  changePage.value = 'changePage';
  changePage.id = 'changePage'
  changePage.type = 'submit';
  changePage.className = 'btn btn-danger';
  changePage.addEventListener('click', (event) => {
    event.preventDefault();
    Navigate('/questionPage')
  } );
 

  form2.appendChild(changePage);
  main.appendChild(form2);
  
}

  export default HomePage;
  