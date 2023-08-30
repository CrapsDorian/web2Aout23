/* eslint-disable no-console */
import { clearPage } from "../../utils/render";
import { getAllQuestion } from "../data/question";
import Navigate from "../Router/Navigate";

const QuestionPage = () => {
    clearPage();
    renderAskQuestion();
    renderQuestionPage();
    renderButtonBack();
    
  };

  function renderAskQuestion(){

    const main = document.querySelector('main');
    const form = document.createElement('form');
    const titrePage = document.createElement('h1');
    titrePage.innerText = "ChatBot";
    main.appendChild(titrePage);
    form.className = 'p-5';
    const question = document.createElement('input');
    question.id = "question";
    question.type = 'text';
    question.required = true;
    question.placeholder = 'posez votre question';
    question.className = 'form-control mb-3';
    question.value = "posez votre question";
    const submit = document.createElement('input');
    submit.value = "poser";
    submit.id = 'submit'
    submit.type = 'submit';
    submit.className = 'btn btn-danger';
    submit.addEventListener('click', (e) => {
        e.preventDefault();

    })
    form.appendChild(question);
    form.appendChild(submit);
    main.appendChild(form);


    }


    function renderButtonBack(){
        const main = document.querySelector('main');
        const form2 = document.createElement('form');
        const changePage = document.createElement('input');
        changePage.value = 'changePage';
        changePage.id = 'changePage'
        changePage.type = 'submit';
        changePage.className = 'btn btn-danger';
        changePage.addEventListener('click', (event) => {
            event.preventDefault();
            Navigate('/')
        } );
        
    
        form2.appendChild(changePage);
        main.appendChild(form2);
    }
  
  function renderQuestionPage() {
    const menu = getAllQuestion();
    const menuTableAsString = getMenuTableAsString(menu);
  
    const main = document.querySelector('main');
  
    main.innerHTML += menuTableAsString;
  }
  
  function getMenuTableAsString(menu) {
    const menuTableLines = getAllTableLinesAsString(menu);
    const menuTable = addLinesToTableHeadersAndGet(menuTableLines);
    return menuTable;
  }
  
  function addLinesToTableHeadersAndGet(tableLines) {
    const menuTable = `
    <div class="table-responsive pt-5">
      <table class="table">
        <tr>
          <th>Question</th>
          <th>reponce</th>
        </tr>
        ${tableLines}    
      </table>
    </div>
    `;
    return menuTable;
  }
  
  function getAllTableLinesAsString(menu) {
    let pizzaTableLines = '';
  
    menu?.forEach((pizza) => {
      pizzaTableLines += `<tr>
        <td>${pizza.question}</td>
        <td>${pizza.reponce}</td>
      </tr>`;
    });
  
    return pizzaTableLines;
  }
  



  export default QuestionPage;