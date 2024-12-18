/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

function calculoPromedio(array)
{
    let sumaTotal = 0;
    for (let i = 0 ; i < array.length; i++)
        {
            sumaTotal += array[i];
        }
    return sumaTotal / array.length
}

function calculoMayor(array)
{
    let mayor = array[0];
    for(let i = 0; i < array.length; i++)
        {
            if (mayor < array[i])
                {
                    mayor = array[i];
                }
        }
    return mayor;
}

function calculoMenor(array)
{
    let menor = array[0];
    for(let i = 0; i < array.length; i++)
        {
            if (menor > array[i])
                {
                    menor = array[i];
                }
            }
    return menor;
}

function calculoSalariosMensual(salariosAnuales)
{
    let salariosMensuales = [];
    for (let i=0; i< salariosAnuales.length; i++)
        {
            salariosMensuales.push(salariosAnuales[i]/12);
        }
    return salariosMensuales;
}

function limpiarDiv()
{
    while($divEdades.firstChild)
        {
            $divEdades.removeChild($divEdades.firstChild);
        }
}

function limpiarFormulario()
    {
        $botonReset.hidden = true;
        $botonCalcular.hidden = true;
        $promedioEdad.hidden = true;
        $mayorEdad.hidden = true;
        $menorEdad.hidden = true;
        document.querySelector("#cantidadPersonas").value = null;
        $mayorSalario.hidden = true;
        $menorSalario.hidden = true;
        $promedioSalario.hidden = true;
        $promedioSalarioMensual.hidden = true;
    }

const $promedioEdad = document.querySelector("#promedioEdades");
const $mayorEdad = document.querySelector("#mayorEdad");
const $menorEdad = document.querySelector("#menorEdad");
const $menorSalario = document.querySelector("#menorSalarioAnual");
const $mayorSalario = document.querySelector("#mayorSalarioAnual");
const $promedioSalario = document.querySelector("#promedioSalarioAnual");
const $promedioSalarioMensual = document.querySelector("#promedioSalarioMensual");
const $botonReset = document.getElementById("botonReset");
const $botonCalcular = document.getElementById("botonCalcular");
const $divEdades = document.querySelector("#edades")

document.querySelector("#botonEnviar").onclick = function()
{
    $botonCalcular.hidden = false;
    $botonReset.hidden = false;
    for(let i=0; i < Number(document.querySelector("#cantidadPersonas").value); i++)
        {
            const $label = document.createElement("label");
            $label.id = `label-${i}`;
            $label.textContent = `Ingrese la edad de la persona.`;
            $divEdades.appendChild($label);
            
            const $input = document.createElement("input");
            $input.id = `edad-${i}`

            $divEdades.appendChild($input);
            $divEdades.appendChild(document.createElement("br"));

            const $botonAgregar = document.createElement("button");
            $botonAgregar.id = `botonAgregar-${i}`;
            $botonAgregar.textContent = "Agregar Salario";
            $divEdades.appendChild($botonAgregar);
            $botonAgregar.onclick = function()
            {
                const $labelSalario = document.createElement("Label");
                $labelSalario.id = `labelSalario-${i}`;
                $labelSalario.textContent = "Salario anual"

                const $inputSalario = document.createElement("input");
                $inputSalario.id = `inputSalario-${i}`;
                $inputSalario.type = "number";
                
                const $breakpage = document.createElement("br");
                $breakpage.id = `br${i}`
                $divEdades.insertBefore($labelSalario, $botonAgregar);
                $divEdades.insertBefore($inputSalario,$botonAgregar);
                $divEdades.insertBefore($breakpage,$botonAgregar);

                $botonEliminar.disabled = false;
                $botonAgregar.disabled = true;
            };
            
            const $botonEliminar = document.createElement("button");
            $botonEliminar.id = `botonEliminar-${i}`;
            $botonEliminar.textContent = "Eliminar Salario";
            $botonEliminar.disabled = true;
            $divEdades.appendChild($botonEliminar);
            $botonEliminar.onclick = function()
            {
                $botonAgregar.disabled = false;
                $botonEliminar.disabled = true;
                let idNumber = this.id;
                idNumber = idNumber.substring(14);
                document.getElementById(`labelSalario-${idNumber}`).remove();
                document.getElementById(`inputSalario-${idNumber}`).remove();
                document.getElementById(`br${idNumber}`).remove();
            }
            $divEdades.appendChild(document.createElement("br"));
        }
}

$botonCalcular.onclick = function()
{     
    let arrayEdades = [];
    let arraySalarios = [];
    for (let i = 0; i < Number(document.querySelector("#cantidadPersonas").value); i++)
        {
            arrayEdades.push(Number(document.getElementById(`edad-${i}`).value));
            if(document.getElementById(`inputSalario-${i}`))
                {
                    if (document.getElementById(`inputSalario-${i}`).value !== null || ' ')
                        {
                            arraySalarios.push(Number(document.getElementById(`inputSalario-${i}`).value))
                        }
                }
        }

    $promedioEdad.textContent = `El promedio de edades es tiene:${calculoPromedio(arrayEdades).toFixed(2)}`;
    $mayorEdad.textContent = `La persona con mayor edad tiene:${calculoMayor(arrayEdades)}`;
    $menorEdad.textContent = `La persona con menor edad tiene:${calculoMenor(arrayEdades)}`;
    $promedioSalario.textContent = `El promedio de los salarios anuales es:${calculoPromedio(arraySalarios).toFixed(2)}`;
    $mayorSalario.textContent = `El mayor salario anual es:${calculoMayor(arraySalarios)}`;
    $menorSalario.textContent = `El menor salario anual es:${calculoMenor(arraySalarios)}`;
    $promedioSalarioMensual.textContent = `El promedio de los salarios mensuales es:${calculoPromedio(calculoSalariosMensual(arraySalarios)).toFixed(2)}`;

    $promedioEdad.hidden = false;
    $mayorEdad.hidden = false;
    $menorEdad.hidden = false;
    $promedioSalario.hidden = false;
    $menorSalario.hidden = false;
    $mayorSalario.hidden = false;
    $promedioSalarioMensual.hidden = false;
}    

$botonReset.onclick = function()
{
    limpiarDiv();
    limpiarFormulario();
}
