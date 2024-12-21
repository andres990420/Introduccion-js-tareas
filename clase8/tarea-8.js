/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias.

TIP: Las edades no pueden tener decimales.
*/


function calcularPromedio(numeros)
{
    let sumaTotal = 0;
    for (let i = 0 ; i < numeros.length; i++)
        {
            sumaTotal += numeros[i];
        }
    return sumaTotal / numeros.length
};

function calcularMayor(numeros)
{
    let mayor = numeros[0];
    for(let i = 0; i < numeros.length; i++)
        {
            if (mayor < numeros[i])
                {
                    mayor = numeros[i];
                }
        }
    return mayor;
};

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
};

function limpiarDiv()
{
    while($divEdades.firstChild)
        {
            $divEdades.removeChild($divEdades.firstChild);
        }
};

function limpiarFormulario()
{
    $botonEnviar.disabled = false;
    $botonReset.hidden = true;
    $botonCalcular.hidden = true;
    $promedioEdad.hidden = true;
    $mayorEdad.hidden = true;
    $menorEdad.hidden = true;
    $cantidadPersonas.value = null;
    $mayorSalario.hidden = true;
    $menorSalario.hidden = true;
    $promedioSalario.hidden = true;
    $promedioSalarioMensual.hidden = true;
};

function validarInputNumeroEntero(numero)
{
    if(numero === 0)
    {
        return 'El campo no puede ser 0';
    }
    if(numero < 0)
    {
        return 'El campo no puede ser un numero negativo';
    }
    if(!/^\d+$/.test(numero))
    {
        return 'El campo tiene que ser un numero entero';
    }
    
    return '';
};

function validarSalario(salario)
{
    if(salario < 0)
    {
        return 'El campo no puede ser un numero negativo';
    }
    return '';
}

// Funcion que le indica al usuario cuando hay un error en el input de cantidad de personas 
// y se lo muestra en un label
function manejarErroresNumerosDePesonas(errorNumeroDePersonas) 
{
    const error = errorNumeroDePersonas;
    if(error)    
    {
        if(!document.querySelector('#label-error-numero-personas'))
        {
            const $errorLabelNumeroPersonas = document.createElement("label");
            $errorLabelNumeroPersonas.id = `label-error-numero-personas`
            $errorLabelNumeroPersonas.innerText = ' ' + error;
            $botonEnviar.insertAdjacentElement('afterEnd' , $errorLabelNumeroPersonas)
        }else
        {
            document.querySelector('#label-error-numero-personas').innerText = ' ' + error;
        }
    }else
    {
        
        if(document.querySelector('#label-error-numero-personas'))
        {
            document.querySelector('#label-error-numero-personas').remove();
        }
        
    }
}

//Funcion que maneja los label que contiene los errores en los input de edad
function manejarLabelErrorEdad(indice, existeError) 
{
    const hayError = existeError;
    if(hayError)
    {
        if (!document.getElementById(`error-edad-${indice}`))
        {
            const errorLabelEdad = document.createElement('label')
            errorLabelEdad.id = `error-edad-${indice}`
            errorLabelEdad.innerText = validarInputNumeroEntero(Number(document.getElementById(`edad-${indice}`).value))
            document.getElementById(`edad-${indice}`).insertAdjacentElement('afterEnd' , errorLabelEdad)
        }
    }else
    {
        if(document.getElementById(`error-edad-${indice}`))
        {
            document.getElementById(`error-edad-${indice}`).remove()
        }
    }
}

// Funcion que maneja los label que contiene los errores en los input de salarios
function manejarLabelErrorSalario(indice, existeError) 
{
    const hayError = existeError;
    if(hayError)
    {
        if (!document.getElementById(`error-salario-${indice}`))
        {
            const errorLabelSalario = document.createElement('label')
            errorLabelSalario.id = `error-salario-${indice}`
            errorLabelSalario.innerText = validarSalario(Number(document.getElementById(`input-salario-${indice}`).value))
            document.getElementById(`input-salario-${indice}`).insertAdjacentElement('afterEnd' , errorLabelSalario)
        }
    }else
    {
        if(document.getElementById(`error-salario-${indice}`))
        {
            document.getElementById(`error-salario-${indice}`).remove()
        }
    }
}

// funcion que se encarga de manejar los errores para los input de salario y edad
function manejadorErrores(numeroIteraciones) 
{
    let contadorErrores = 0;
    for (let i = 0; i < numeroIteraciones; i++)
    {
        if(validarInputNumeroEntero(Number(document.getElementById(`edad-${i}`).value)) !== '')
        {
            document.getElementById(`edad-${i}`).className = 'error'
            manejarLabelErrorEdad(i,true);
            contadorErrores++;
        }
        else
        {
            manejarLabelErrorEdad(i,false);
            document.getElementById(`edad-${i}`).className = ''
        }
        
        if(document.getElementById(`input-salario-${i}`))
        {
            if (validarSalario(Number(document.getElementById(`input-salario-${i}`).value)) != '')
            {
                document.getElementById(`input-salario-${i}`).className = 'error'
                manejarLabelErrorSalario(i,true);
                contadorErrores++;
            }
            else if(document.getElementById(`input-salario-${i}`).value !== ' ')
            {
                manejarLabelErrorSalario(i,false);
                document.getElementById(`input-salario-${i}`).className = ''
            }
        }
    }
    return contadorErrores;
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
const $botonEnviar = document.querySelector("#boton-enviar");
const $divEdades = document.querySelector("#edades");
const $cantidadPersonas = document.querySelector("#cantidad-personas");


$botonEnviar.onclick = function()
{
    const errorNumeroDePersonas = validarInputNumeroEntero(Number($cantidadPersonas.value))
    if(errorNumeroDePersonas !== '')
    {
        $cantidadPersonas.className = 'error';
        manejarErroresNumerosDePesonas(errorNumeroDePersonas);
    }
    else
    {
        manejarErroresNumerosDePesonas(errorNumeroDePersonas);
        $botonEnviar.disabled = true;
        $cantidadPersonas.className = '';
        $botonCalcular.hidden = false;
        $botonReset.hidden = false;
        for(let i=0; i < Number($cantidadPersonas.value); i++)
        {
            const $label = document.createElement("label");
            $label.id = `label-${i}`;
            $label.textContent = `Ingrese la edad de la persona.`;
            $divEdades.appendChild($label);
            
            const $input = document.createElement("input");
            $input.type = 'Number';
            $input.id = `edad-${i}`

            $divEdades.appendChild($input);
            $divEdades.appendChild(document.createElement("br"));

            const $botonAgregar = document.createElement("button");
            $botonAgregar.className = "boton-agregar";
            $botonAgregar.id = `boton-agregar-${i}`;
            $botonAgregar.textContent = "Agregar Salario";
            $botonAgregar.onclick = agregarLabelsInputs;
            $divEdades.appendChild($botonAgregar);

            
            const $botonEliminar = document.createElement("button");
            $botonEliminar.className = "boton-eliminar"
            $botonEliminar.id = `boton-eliminar-${i}`;
            $botonEliminar.textContent = "Eliminar Salario";
            $botonEliminar.disabled = true;
            $botonEliminar.onclick = eliminarLabelsInputs;
            $divEdades.appendChild($botonEliminar);
        
            $divEdades.appendChild(document.createElement("br"));
        };

        function agregarLabelsInputs()
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
            $divEdades.insertBefore($inputSalario, document.getElementById(`boton-agregar-${idNumber}`));
            $divEdades.insertBefore($breakpage, document.getElementById(`boton-agregar-${idNumber}`));

            document.getElementById(`boton-eliminar-${idNumber}`).disabled = false;
            document.getElementById(`boton-agregar-${idNumber}`).disabled = true;
        };

        function eliminarLabelsInputs()
        {
            let idNumber = this.id;
            idNumber = idNumber.substring(15);
            
            document.getElementById(`boton-agregar-${idNumber}`).disabled = false;
            document.getElementById(`boton-eliminar-${idNumber}`).disabled = true;

            document.getElementById(`label-salario-${idNumber}`).remove();
            document.getElementById(`input-salario-${idNumber}`).remove();
            document.getElementById(`br${idNumber}`).remove();
        };
    }    
}

$botonCalcular.onclick = function()
{     
    const exito = manejadorErrores(Number($cantidadPersonas.value)) === 0;

    if(exito)
    {
        let arrayEdades = [];
        let arraySalarios = [];
        for (let i = 0; i < Number($cantidadPersonas.value); i++)
        {
            arrayEdades.push(Number(document.getElementById(`edad-${i}`).value));
            
            if(document.getElementById(`input-salario-${i}`))
            {
                if(document.getElementById(`input-salario-${i}`).value !== ' ')
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
        $promedioSalarioMensual.textContent = `El promedio de los salarios mensuales es:${calcularSalarioMensualPromedio(calcularPromedio(arraySalarios)).toFixed(2)}`;

        $promedioEdad.hidden = false;
        $mayorEdad.hidden = false;
        $menorEdad.hidden = false;
        $promedioSalario.hidden = false;
        $menorSalario.hidden = false;
        $mayorSalario.hidden = false;
        $promedioSalarioMensual.hidden = false;
    }
    
}    

$botonReset.onclick = function()
{
    limpiarDiv();
    limpiarFormulario();
}

