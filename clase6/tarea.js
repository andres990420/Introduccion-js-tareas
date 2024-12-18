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

function calcularPromedio(numeros)
{
    let sumaTotal = 0;
    for (let i = 0 ; i < numeros.length; i++)
        {
            sumaTotal += numeros[i];
        }
    return sumaTotal / numeros.length
}

function calcularMayor(numeros)
{
    let mayor = array[0];
    for(let i = 0; i < numeros.length; i++)
        {
            if (mayor < numeros[i])
                {
                    mayor = numeros[i];
                }
        }
    return mayor;
}

function calcularMenor(numeros)
{
    let menor = numeros[0];
    for(let i = 0; i < numeros.length; i++)
        {
            if (menor > numeros[i])
                {
                    menor = numeros[i];
                }
            }
    return menor;
}

function calcularSalarioMensualPromedio(salarioAnual)
{
    return salarioAnual / 12;
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
        document.querySelector("#cantidad-personas").value = null;
        $mayorSalario.hidden = true;
        $menorSalario.hidden = true;
        $promedioSalario.hidden = true;
        $promedioSalarioMensual.hidden = true;
    }

const $promedioEdad = document.querySelector("#promedio-edades");
const $mayorEdad = document.querySelector("#mayor-edad");
const $menorEdad = document.querySelector("#menor-edad");
const $menorSalario = document.querySelector("#menor-salario-anual");
const $mayorSalario = document.querySelector("#mayor-salario-anual");
const $promedioSalario = document.querySelector("#promedio-salario-anual");
const $promedioSalarioMensual = document.querySelector("#promedio-salario-mensual");
const $botonReset = document.getElementById("boton-reset");
const $botonCalcular = document.getElementById("boton-calcular");
const $divEdades = document.querySelector("#edades")

document.querySelector("#boton-enviar").onclick = function()
{
    $botonCalcular.hidden = false;
    $botonReset.hidden = false;
    for(let i=0; i < Number(document.querySelector("#cantidad-personas").value); i++)
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
            $botonAgregar.className = "boton-agregar";
            $botonAgregar.id = `boton-agregar-${i}`;
            $botonAgregar.textContent = "Agregar Salario";
            $divEdades.appendChild($botonAgregar);

            
            const $botonEliminar = document.createElement("button");
            $botonEliminar.className = "boton-eliminar"
            $botonEliminar.id = `boton-eliminar-${i}`;
            $botonEliminar.textContent = "Eliminar Salario";
            $botonEliminar.disabled = true;
            $divEdades.appendChild($botonEliminar);
        
            $divEdades.appendChild(document.createElement("br"));
    }

    document.querySelector(".boton-agregar").onclick = function()
    {
        let idNumber = this.id;
        idNumber = idNumber.substring(14);
        
        const $labelSalario = document.createElement("Label");
        $labelSalario.id = `label-salario-${idNumber}`;
        $labelSalario.textContent = "Salario anual"

        const $inputSalario = document.createElement("input");
        $inputSalario.id = `input-salario-${idNumber}`;
        $inputSalario.type = "number";
        
        const $breakpage = document.createElement("br");
        $breakpage.id = `br${idNumber}`
        $divEdades.insertBefore($labelSalario, document.getElementById(`boton-agregar-${idNumber}`));
        $divEdades.insertBefore($inputSalario,document.getElementById(`boton-agregar-${idNumber}`));
        $divEdades.insertBefore($breakpage,document.getElementById(`boton-agregar-${idNumber}`));

        document.getElementById(`boton-eliminar-${idNumber}`).disabled = false;
        document.getElementById(`boton-agregar-${idNumber}`).disabled = true;
    };

    document.querySelector(".boton-eliminar").onclick = function()
    {
        let idNumber = this.id;
        idNumber = idNumber.substring(15);
        
        document.getElementById(`boton-agregar-${idNumber}`).disabled = false;
        document.getElementById(`boton-eliminar-${idNumber}`).disabled = true;

        document.getElementById(`label-salario-${idNumber}`).remove();
        document.getElementById(`input-salario-${idNumber}`).remove();
        document.getElementById(`br${idNumber}`).remove();
    }
}

$botonCalcular.onclick = function()
{     
    let arrayEdades = [];
    let arraySalarios = [];
    for (let i = 0; i < Number(document.querySelector("#cantidad-personas").value); i++)
        {
            arrayEdades.push(Number(document.getElementById(`edad-${i}`).value));
            if(document.getElementById(`input-salario-${i}`))
                {
                    if (document.getElementById(`input-salario-${i}`).value !== null || ' ')
                        {
                            arraySalarios.push(Number(document.getElementById(`input-salario-${i}`).value))
                        }
                }
        }

    $promedioEdad.textContent = `El promedio de edades es tiene:${calcularPromedio(arrayEdades).toFixed(2)}`;
    $mayorEdad.textContent = `La persona con mayor edad tiene:${calcularMayor(arrayEdades)}`;
    $menorEdad.textContent = `La persona con menor edad tiene:${calcularMenor(arrayEdades)}`;
    $promedioSalario.textContent = `El promedio de los salarios anuales es:${calcularPromedio(arraySalarios).toFixed(2)}`;
    $mayorSalario.textContent = `El mayor salario anual es:${calcularMayor(arraySalarios)}`;
    $menorSalario.textContent = `El menor salario anual es:${calcularMenor(arraySalarios)}`;
    $promedioSalarioMensual.textContent = `El promedio de los salarios mensuales es:${calcularPromedio(calcularSalarioMensualPromedio(arraySalarios)).toFixed(2)}`;

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
