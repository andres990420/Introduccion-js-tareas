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
    $cantidadPersonas.value = null;

    $botonCalcular.classList.remove('btn');
    $botonCalcular.classList.remove('btn-primary');
    $botonReset.classList.remove('btn');
    $botonReset.classList.remove('btn-danger');

    ocultarElementos();
};

function ocultarElementos() {
    document.querySelectorAll('.visible').forEach((elemento) => {
        elemento.classList.remove('visible');
        elemento.classList.add('invisible');
    }
    );
}

function mostrarElementos() {
    document.querySelectorAll('.invisible').forEach((elemento) => {
        elemento.classList.add('visible');
        elemento.classList.remove('invisible');
    }
    );
}


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


// funcion que se encarga de manejar los errores para los input de salario y edad
function manejadorErrores(numeroIteraciones) 
{
    let contadorErrores = 0;
    for (let i = 0; i < numeroIteraciones; i++)
    {
        const errorEdad = validarInputNumeroEntero(Number(document.getElementById(`edad-${i}`).value))
        if( errorEdad !== '')
        {
            document.getElementById(`edad-${i}`).classList.add('is-invalid')
            document.getElementById(`invalid-edad-${i}`).innerText = errorEdad;
            contadorErrores++;
        }
        else
        {
            document.getElementById(`edad-${i}`).classList.remove('is-invalid')
        }
        
        if(document.getElementById(`input-salario-${i}`))
        {
            const errorSalario = validarSalario(Number(document.getElementById(`input-salario-${i}`).value))
            if ( errorSalario != '')
            {
                document.getElementById(`input-salario-${i}`).classList.add('is-invalid');
                document.getElementById(`invalid-salario-${i}`).innerText = errorSalario;
                contadorErrores++;
            }
            else if(document.getElementById(`input-salario-${i}`).value !== ' ')
            {
                document.getElementById(`input-salario-${i}`).classList.remove('is-invalid');
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
        $cantidadPersonas.classList.add('is-invalid');
        document.querySelector('#validationNumeroPersonas').innerText = errorNumeroDePersonas;
    }
    else
    {
        document.querySelector('#div-card').classList.add('visible');
        document.querySelector('#div-card').classList.remove('invisible');
        
        $cantidadPersonas.classList.remove('is-invalid');

        $botonEnviar.disabled = true;
        
        $botonCalcular.classList.remove('invisible');
        $botonReset.classList.remove('invisible');

        $botonCalcular.classList.add('visible')
        $botonCalcular.classList.add('btn')
        $botonCalcular.classList.add('btn-primary')
        
        $botonReset.classList.add('visible')
        $botonReset.classList.add('btn')
        $botonReset.classList.add('btn-danger')

        for(let i=0; i < Number($cantidadPersonas.value); i++)
        {
            const $label = document.createElement("label");
            $label.id = `label-${i}`;
            $label.classList.add('form-label')
            $label.classList.add('d-block')
            $label.classList.add('mt-2')
            $label.textContent = `Ingrese la edad de la persona.`;
            $divEdades.appendChild($label);
            
            const $input = document.createElement("input");
            $input.type = 'Number';
            $input.classList.add('form-control')
            $input.id = `edad-${i}`
            $divEdades.appendChild($input);

            const $invalidEdad = document.createElement("div");
            $invalidEdad.classList.add('invalid-feedback')
            $invalidEdad.id = `invalid-edad-${i}`
            $divEdades.appendChild($invalidEdad)

            $divEdades.appendChild(document.createElement("br"));

            const $botonAgregar = document.createElement("button");
            $botonAgregar.classList.add("btn");
            $botonAgregar.classList.add("btn-outline-primary")
            $botonAgregar.classList.add("btn-sm");
            $botonAgregar.id = `boton-agregar-${i}`;
            $botonAgregar.textContent = "Agregar Salario";
            $botonAgregar.onclick = agregarLabelsInputs;
            $divEdades.appendChild($botonAgregar);

            
            const $botonEliminar = document.createElement("button");
            $botonEliminar.classList.add('btn')
            $botonEliminar.classList.add('btn-outline-danger')
            $botonEliminar.classList.add("btn-sm");
            $botonEliminar.classList.add('disabled')
            $botonEliminar.id = `boton-eliminar-${i}`;
            $botonEliminar.textContent = "Eliminar Salario";
            $botonEliminar.onclick = eliminarLabelsInputs;
            $divEdades.appendChild($botonEliminar);
        };

        function agregarLabelsInputs()
        {
            let idNumber = this.id;
            idNumber = idNumber.substring(14);
            
            const $labelSalario = document.createElement("Label");
            $labelSalario.classList.add('form-label')
            $labelSalario.classList.add('d-block')
            $labelSalario.id = `label-salario-${idNumber}`;
            $labelSalario.textContent = "Salario anual"

            const $inputSalario = document.createElement("input");
            $inputSalario.classList.add('form-control')
            $inputSalario.classList.add('mb-2')
            $inputSalario.id = `input-salario-${idNumber}`;
            $inputSalario.type = "number";

            const $invalidSalario = document.createElement("div");
            $invalidSalario.classList.add('invalid-feedback');
            $invalidSalario.id = `invalid-salario-${idNumber}`;
            
            $divEdades.insertBefore($labelSalario, document.getElementById(`boton-agregar-${idNumber}`));
            $divEdades.insertBefore($inputSalario, document.getElementById(`boton-agregar-${idNumber}`));
            $divEdades.insertBefore($invalidSalario, document.getElementById(`boton-agregar-${idNumber}`));

            document.getElementById(`boton-eliminar-${idNumber}`).classList.remove('disabled');
            document.getElementById(`boton-agregar-${idNumber}`).classList.add('disabled');
        };

        function eliminarLabelsInputs()
        {
            let idNumber = this.id;
            idNumber = idNumber.substring(15);
            
            document.getElementById(`boton-agregar-${idNumber}`).classList.remove('disabled');
            document.getElementById(`boton-eliminar-${idNumber}`).classList.add('disabled');

            document.getElementById(`label-salario-${idNumber}`).remove();
            document.getElementById(`input-salario-${idNumber}`).remove();
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

        if(arraySalarios > 0)
        {
            $promedioSalario.classList.remove('d-none');
            $mayorSalario.classList.remove('d-none');
            $menorSalario.classList.remove('d-none');
            $promedioSalarioMensual.classList.remove('d-none');
        }else
        {
            $promedioSalario.classList.add('d-none');
            $mayorSalario.classList.add('d-none');
            $menorSalario.classList.add('d-none');
            $promedioSalarioMensual.classList.add('d-none');
        }
        
        mostrarElementos();
    }
    
}    

$botonReset.onclick = function()
{
    limpiarDiv();
    limpiarFormulario();
}


