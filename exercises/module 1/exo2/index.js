const paragraphe = document.querySelector('#paragraphe');
const btn1 = document.querySelector('#myBtn1');

let cmp = 0;

btn1.addEventListener("click",compteur);

function compteur() {
    cmp++;
    console.log(cmp.toString());
    if (cmp > 5 && cmp < 10){
        paragraphe.textContent  = 'Bravo, bel échauffement !';
    }else if (cmp > 9){
        paragraphe.textContent = 'Vous êtes passé maître en l art du clic !';
    }
}