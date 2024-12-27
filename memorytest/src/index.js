const coloresBase = ["rojo", "verde", "amarillo"];
const $tablero = document.querySelector("#tablero");
const $finJuego = document.querySelector("#fin-juego");
const $botonIniciar = document.querySelector("#iniciar");
const $botonReiniciar = document.querySelector("#reiniciar");
const $cuadros = document.querySelectorAll(".cuadro");

let primerCuadro = null;
let parejasEncontradas = 0;


function generarColores(coloresBase) 
{
    const colores = coloresBase.slice();
    const cantidadColores = coloresBase.length;
    let listaColores = [];
    for(let i = cantidadColores; i > 0; i--)
    {
        const index = Math.floor(Math.random() * (colores.length - 1 - 0 + 1));
        listaColores.push(colores[index]);
        colores.splice(index, 1);
    }
    listaColores = listaColores.concat(listaColores);
    return listaColores;
}

$botonIniciar.onclick = function () 
{
    $botonIniciar.classList.add("disabled");
    const colores = generarColores(coloresBase);
    $cuadros.forEach((cuadro) => 
    {
        const index = Math.floor(Math.random() * (colores.length - 1 - 0 + 1));
        cuadro.id = colores[index];
        colores.splice(index, 1);
    });

    $tablero.onclick = (event) => 
    {
        const cuadro = event.target;
        buscarPareja(cuadro);
    };
};

let enVerificacion = false;

function buscarPareja(cuadroActual) 
{
    if (cuadroActual.id && !enVerificacion) 
    {
        mostrarCuadro(cuadroActual);
        if (primerCuadro === null && cuadroActual.id) 
        {
            primerCuadro = cuadroActual;
        } 
        else 
        {
            enVerificacion = true;
            setTimeout(() => 
            {
                verificarPareja(primerCuadro, cuadroActual);
                primerCuadro = null;
                enVerificacion = false;
            }, 300);
        }
    }
}

function mostrarCuadro(cuadro) 
{
  cuadro.classList.add(cuadro.id);
}

function ocultarCuadros(cuadro1, cuadro2) 
{
    setTimeout(() => 
    {
        cuadro1.classList.remove(cuadro1.id);
        cuadro2.classList.remove(cuadro2.id);
    }, 200);
}

function eliminarPareja(cuadro1, cuadro2) 
{
    cuadro1.classList.add("invisible");
    cuadro2.classList.add("invisible");

    cuadro1.parentElement.style["background-color"] = "black";
    cuadro1.parentElement.style.opacity = 0.25;

    cuadro2.parentElement.style["background-color"] = "black";
    cuadro2.parentElement.style.opacity = 0.25;
}

function verificarPareja(primerCuadro, segundoCuadro) 
{
    if (primerCuadro.id !== null) 
    {
        if (primerCuadro.id === segundoCuadro.id && primerCuadro !== segundoCuadro) 
        {
            eliminarPareja(primerCuadro, segundoCuadro);
            parejasEncontradas++;

            if (parejasEncontradas === coloresBase.length) 
            {
                $finJuego.classList.remove("invisible");
                $tablero.classList.add("invisible");
                $botonReiniciar.classList.remove("disabled");
            }
        }
    }
    ocultarCuadros(primerCuadro, segundoCuadro);
}

$botonReiniciar.onclick = () => 
{
    $cuadros.forEach((cuadro) => 
    {
        cuadro.classList.remove("invisible");
        cuadro.classList.remove(cuadro.id);
        cuadro.id = null;
        cuadro.parentElement.style.removeProperty("background-color");
        cuadro.parentElement.style.removeProperty("opacity");
    });

    $tablero.classList.remove("invisible");
    $finJuego.classList.add("invisible");

    parejasEncontradas = 0;

    $tablero.onclick = null;
    $botonIniciar.classList.remove("disabled");
    $botonReiniciar.classList.add("disabled");
};