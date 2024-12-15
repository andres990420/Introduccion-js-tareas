/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

function promedioEdades(edades)
{
    let sumaEdades = 0;
    for (let i = 0 ; i < edades.length; i++)
        {
            sumaEdades += edades[i];
        }
    return sumaEdades / edades.length
}

function calculoMayor(edades)
{
    let mayor = edades[0];
    for(let i = 0; i < edades.length; i++)
        {
            if (mayor < edades[i])
                {
                    mayor = edades[i];
                }
        }
    return mayor;
}

function calculoMenor(edades)
{
    let menor = edades[0];
    for(let i = 0; i < edades.length; i++)
        {
            if (menor > edades[i])
                {
                    menor = edades[i];
                }
            }
    return menor;
}

const $botonEnviar = document.querySelector("#botonEnviar");
const $promedioEdad = document.querySelector("#promedioEdades");
const $mayorEdad = document.querySelector("#mayorEdad");
const $menorEdad = document.querySelector("#menorEdad");

$botonEnviar.onclick = function()
{
    const $cantidadPesonas = document.querySelector("#cantidadPersonas");
    const $divEdades = document.querySelector("#edades")
    
    let arrayInputs = [];
    
    for(let i=0; i < Number($cantidadPesonas.value); i++)
        {
            const $label = document.createElement("label");
            $label.id = `label-${i}`;
            $label.textContent = `Ingrese la edad de la persona.`;
            $divEdades.appendChild($label);
            $divEdades.appendChild(document.createElement("br"));
            
            const $input = document.createElement("input");
            $input.id = `edad-${i}`
            arrayInputs.push($input);
            $divEdades.appendChild($input);
            $divEdades.appendChild(document.createElement("br"));
        }
    const $botonCalcular = document.createElement("button");
    $botonCalcular.type = "button";
    $botonCalcular.id = "botonCalcular";
    $botonCalcular.textContent = "Calcular";
    $divEdades.append($botonCalcular);
    
    $botonCalcular.onclick = function()
    {     
        let arrayEdades = [];
        for (let i = 0; i < arrayInputs.length; i++)
            {
                arrayEdades.push(Number(arrayInputs[i].value));
            }

        $promedioEdad.textContent = `El promedio de edades es tiene:${promedioEdades(arrayEdades).toFixed(2)}`;
        $mayorEdad.textContent = `La persona con mayor edad tiene:${calculoMayor(arrayEdades)}`;
        $menorEdad.textContent = `La persona con menor edad tiene:${calculoMenor(arrayEdades)}`;

        $promedioEdad.hidden = false;
        $mayorEdad.hidden = false;
        $menorEdad.hidden = false;
        
        const $divResultados = document.querySelector("#resultados");

        function limpiarDiv()
        {
            while($divEdades.firstChild)
                {
                    $divEdades.removeChild($divEdades.firstChild);
                }
        }

        function limpiarFormulario()
            {
                $botonReset.remove();
                $botonCalcular.remove();
                $promedioEdad.hidden = true;
                $mayorEdad.hidden = true;
                $menorEdad.hidden = true;
                $cantidadPesonas.value = null;
            }
            
        const $botonReset = document.createElement("button");
        $botonReset.type = "button";
        $botonReset.id = "botonReset"
        $botonReset.textContent = "Reiniciar"
        
        $divResultados.appendChild($botonReset);

        $botonReset.onclick = function()
        {
            limpiarDiv();
            limpiarFormulario();
        }
    }
}

