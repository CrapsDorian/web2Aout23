/* eslint-disable no-console */
import {clearPage} from "../../utils/render"

function traductionPage(){
    clearPage();
    
    renderTraductionFromFR();
    renderTraductionFromEN();
}


function renderTraductionFromFR(){

    const main = document.querySelector('main');
    const form = document.createElement('form');

    const label = document.createElement('label');
    label.textContent = "Francais: ";
    label.className = "d-block";

    const fr = document.createElement('input');
    fr.value = "";
    fr.id = "fr";
    fr.type = "text";
    fr.className = "d-block";

    const submit = document.createElement('input');
    submit.value = "traduire";
    submit.type = "submit";
    submit.className = "d-block";

    submit.addEventListener('click', async (e) => {
        e.preventDefault();
        const en = await traduireFromFR(document.querySelector("#fr").value);

        afficherTradFromFr(en.en);
        
    })
    const labelReponceFromFr = document.createElement('label');
    labelReponceFromFr.textContent = "Traduction Anglaise : ";
    labelReponceFromFr.id = "tradFr";
    label.className = "d-block";

    form.appendChild(label);
    form.appendChild(fr);
    form.appendChild(submit);
    form.appendChild(labelReponceFromFr);


    main.appendChild(form);

}

async function traduireFromFR(query){
    
    const response = await fetch(`/api/trad/fr?query=${query}`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const traductions = await response.json();

    return traductions;
}

function afficherTradFromFr(en){
    const tradFr = document.querySelector('#tradFr');
    tradFr.textContent = `Traduction Anglaise : ${en}`;
}

function renderTraductionFromEN(){
    const main = document.querySelector('main');
    const form = document.createElement('form');

    const label = document.createElement('label');
    label.textContent = "Anglais : ";
    label.className = "d-block";

    const en = document.createElement('input');
    en.value = "";
    en.id = "en";
    en.type = "text";
    en.className = "d-block";

    const submit = document.createElement('input');
    submit.value = "transalte";
    submit.type = "submit";
    submit.className = "d-block";
    submit.addEventListener('click', async (e)  => {
        e.preventDefault();
        const fr = await traduireFromEN(document.querySelector("#en").value);
        console.log(fr);
        afficherTradFromEN(fr.fr);
        
    })
    
    const labelReponceFromEn = document.createElement('label');
    labelReponceFromEn.textContent = "Traduction Francaise : ";
    labelReponceFromEn.id = "tradEn";
    labelReponceFromEn.className = "d-block";

    form.appendChild(label);
    form.appendChild(en);
    form.appendChild(submit);
    form.appendChild(labelReponceFromEn);

    main.appendChild(form);
}


async function traduireFromEN(en){


    const response = await fetch(`/api/trad/en?query=${en}`);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const traductions = await response.json();

    return traductions;
}

function afficherTradFromEN(fr){
    const tradEn = document.querySelector('#tradEn');
    tradEn.textContent = `Traduction Francaise : ${fr}`;
   
}

export default traductionPage;