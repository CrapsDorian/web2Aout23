

const delayInSeconds = 2;
const delayInMiliSeconds = delayInSeconds * 1000;

document.addEventListener("DOMContentLoaded", () => { setTimeout(changement(),delayInMiliSeconds);});
const carreRouge = document.querySelector('#carre1');
const carreOrange = document.querySelector('#carre2');
const carreVert = document.querySelector('#carre3');


let color = "red";

function changement() {
    console.log(color);
    if (color === "green"){
        color = "red";
        carreVert.classList.remove("green");
        carreRouge.classList.add("red");
    }else if (color === "orange") {
        color = "green";
        carreOrange.classList.remove("orange");
        carreVert.classList.add("green");
    } else  if ( color === "red"){
        color = "orange";
        carreRouge.classList.remove("red");
        carreOrange.classList.add("orange");
    }

    setTimeout(changement(),delayInMiliSeconds);
}