function calcularPromedio(array)
{
    let sumaTotal = 0;
    for (let i=0; i<array.length; i++)
        {
            sumaTotal += array[i];
        }
    return sumaTotal / array.length;
}

function calcularNumeroMenor(array)
{
    let numeroMenor;
    for (let i=0; i< array.length; i++)
        {
            if (numeroMenor === undefined)
                {
                    numeroMenor = array[i];
                }
            else if (array[i] < numeroMenor)
            {
                numeroMenor = array[i];
            }
        };
    return numeroMenor;
}

function calcularNumeroMayor(array)
{
    let numeroMayor;
    for (let i=0; i< array.length; i++)
        {
            if (numeroMayor === undefined)
                {
                    numeroMayor = array[i];
                }
            else if (array[i] > numeroMayor)
            {
                numeroMayor = array[i];
            }
        };
    return numeroMayor;
}

function calcularNumeroFrecuente(array)
{
    let numeroFrecuente;
    let contadorNumeroFrecuente = 0;
    for (let i=0; i< array.length; i++)
        {
            if (numeroFrecuente === undefined)
                {
                    numeroFrecuente = array[i];
                }
            let contador = 0;
            for (let y=0; y<array.length; y++)
            {
                if (array[i] === array[y])
                    {
                        contador += 1;
                    }    
            }

            if (contador > contadorNumeroFrecuente)
                {
                    contadorNumeroFrecuente = contador;
                    numeroFrecuente = array[i];
                }
        }
    return numeroFrecuente;
}

const $botonCalcular = document.querySelector("#botonCalcular");

$botonCalcular.onclick = function()
{
    const arrayNumeros = [];
    const numerosOl = document.querySelectorAll("ol");
    const numerosLi = document.querySelectorAll("li");

    for (let i=0; i<numerosLi.length;i++)
        {
            arrayNumeros.push(Number(numerosLi[i].innerText));
        }
    for (let i=0; i<numerosOl.length;i++)
        {
            arrayNumeros.push(Number(numerosOl[i].innerText));
        }
    
    const $promedioNumeros = document.querySelector("#promedioNumeros");
    const $numeroMasPequenio = document.querySelector("#numeroMasPequenio");
    const $numeroMasGrande = document.querySelector("#numeroMasGrande");
    const $numeroMasFrecuente = document.querySelector("#numeroMasFrecuente");

    $promedioNumeros.textContent = calcularPromedio(arrayNumeros).toFixed(2);
    $numeroMasPequenio.textContent = calcularNumeroMenor(arrayNumeros);
    $numeroMasGrande.textContent = calcularNumeroMayor(arrayNumeros);
    $numeroMasFrecuente.textContent = calcularNumeroFrecuente(arrayNumeros);
};