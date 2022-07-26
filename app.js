//Import
import {data} from "./data.js";

//Variables
let comenzar = document.querySelector("#comenzar");
let contenidoPrincipal = document.querySelector(".contenido");
let cuestionario = document.querySelector(".cuestionario");

let caracteres = ["A", "B", "C", "D"];

let cantPreguntas = 0;
let totalPreguntas = data.length;
let correctas = 0;

//Eventos
comenzar.addEventListener("click", () => {
    cuestionario.classList.add("active");
    contenidoPrincipal.style.display="none";

    cargarOpciones();
});

//Clases
class Preguntas{
    constructor(pregunta, opciones,respuesta){
        this.pregunta=pregunta;
        this.opciones=opciones;
        this.respuesta=respuesta;
    }
}

class UI{
    opcionesUI(pregunta, cantPreguntas, totalPreguntas){
        let porcentaje = ((cantPreguntas+1)*100)/totalPreguntas;
        
        let opcionesDiv = document.createElement("div");
        opcionesDiv.className="opciones";

        let p = document.createElement("p");
        p.className="pregunta";
        p.textContent=`${pregunta.pregunta}`;

        cuestionario.appendChild(p);

        for(let i=0;i<pregunta.opciones.length;i++){
            let opcion = document.createElement("div");
            opcion.className="opcion";

            opcion.setAttribute("value",pregunta.opciones[i]);

            opcion.innerHTML=`
            <div class="contenedor-valor">
                <span class="valor" value="${pregunta.opciones[i]}">${caracteres[i]}</span>
            </div>
            <p class="op" value="${pregunta.opciones[i]}">${pregunta.opciones[i]}</p>
            `;

            opcion.addEventListener("click", (e)=>{

                if(e.target.classList.contains("op")){
                    let valor = e.target.getAttribute("value");

                    if(valor==pregunta.respuesta){
                        e.target.parentElement.firstElementChild.children[0].innerHTML='<i class="fa-solid fa-check"></i>';
                        e.target.parentElement.classList.add("correcto");
                        correctas++;
                        this.mostrarIncorrectas(valor);
                    }else{
                        e.target.parentElement.firstElementChild.children[0].innerHTML='<i class="fa-solid fa-xmark"></i>';
                        e.target.parentElement.classList.add("incorrecto");
                        this.mostrarIncorrectas(valor);
                        this.mostrarCorrecta(pregunta.respuesta);
                    }
                }
               
            });
            opcionesDiv.appendChild(opcion);
        }

        let siguiente = document.createElement("div");
        siguiente.className="siguiente";
        
        if(cantPreguntas+1==totalPreguntas){
            siguiente.innerHTML=`<p class="sigui-parra"> Finalizar</p> <span class="sigui-icon"><i class="fa-solid fa-angle-right"></i> </span>`;
        }else{
            siguiente.innerHTML=`<p class="sigui-parra"> Siguiente</p> <span class="sigui-icon"><i class="fa-solid fa-angle-right"></i> </span>`;
        }

        let barra = document.createElement("div");
        barra.className='div-progreso';

        barra.innerHTML=`
            <div class="barra">
                <div class="progreso" style="width: ${porcentaje}%;"></div>
            </div>
            <p class="cant">Pregunta ${cantPreguntas+1} de ${totalPreguntas}</p>
        `;

        siguiente.addEventListener("click", cargarOpciones);


        cuestionario.appendChild(opcionesDiv);
        cuestionario.appendChild(siguiente);
        cuestionario.appendChild(barra);
    }

    mostrarResultados(total, cant){
        borrarOpciones();
        let div = document.createElement("div");
        div.className="resultados";

        let recargar = document.createElement("button");
        recargar.id="recargar";
        recargar.textContent="Volver a intentarlo";

        div.innerHTML=`
            <p class="resultados-title">Cuestionario finalizado</p>
            <hr class="linea">
            <p class="resultado">Has respondido correctamente ${cant} de ${total}<p>
        `;

        div.appendChild(recargar);

        recargar.addEventListener("click", ()=>{
            cantPreguntas = 0;
            correctas = 0;
            cargarOpciones();
        
        });

        cuestionario.appendChild(div);
    }   

    mostrarIncorrectas(valor){
        let opciones = document.querySelectorAll(".opcion");
    
        for(let i=0; i<opciones.length;i++){
            if(opciones[i].getAttribute("value")!=valor){
                opciones[i].firstElementChild.children[0].innerHTML='<i class="fa-solid fa-xmark"></i>';
                opciones[i].classList.add("incorrectoParcial");
            }
        }
    }
    
    mostrarCorrecta(valor){
        let opciones = document.querySelectorAll(".opcion");
    
        for(let i=0; i<opciones.length;i++){
            if(opciones[i].getAttribute("value")==valor){
                opciones[i].firstElementChild.children[0].innerHTML='<i class="fa-solid fa-check"></i>';
                opciones[i].classList.remove("incorrectoParcial");
                opciones[i].classList.add("correcto");
                opciones[i].classList.add("correctoParcial");
            }
        }
    }
    
}


function cargarOpciones(){
    let ui = new UI();

    if(cantPreguntas!=totalPreguntas){
        let pregunta = new Preguntas(data[cantPreguntas].quiz, data[cantPreguntas].choices, data[cantPreguntas].answer);

        borrarOpciones();
        ui.opcionesUI(pregunta, cantPreguntas, totalPreguntas);

        cantPreguntas++;
    }else{
        ui.mostrarResultados(totalPreguntas, correctas);
    }
}

function borrarOpciones(){
    while(cuestionario.firstElementChild){
        cuestionario.firstElementChild.remove();
    }
}


