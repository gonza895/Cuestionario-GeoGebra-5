import {info} from './data.js';

let listado = document.querySelector(".listado");

document.addEventListener("DOMContentLoaded", cargarListado);

function cargarListado(){
    let cant = info.length;

    for(let i=0;i<cant;i++){
        let li = document.createElement("li");
        li.innerHTML=`<p>${i+1}# ${info[i].titulo}</p> <a href="./index.html?id=${i}"><span class="btn"><i class="fa-solid fa-arrow-right"></i></span></a>`;
        listado.appendChild(li);
    }
}