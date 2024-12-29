/// <reference types="jquery" />


const $fecha = $('#fecha');
const $montoACambiar = $('#cambio')
const $botonCalcular = $('#calcular')
const $monedaBase = $('#selector-1')
const $monedaCambio = $('#selector-2')
const $resultado = $('#resultado')
const tasaDeCambio = fetch('https://api.frankfurter.app/latest');

tasaDeCambio
    .then( respuesta => respuesta.json())
    .then(respuesta => 
        {
            $fecha.val(respuesta.date);
            Object.keys(respuesta.rates).forEach(moneda =>
                {
                    $monedaBase.append(`<option>${moneda}`)
                    $monedaCambio.append(`<option>${moneda}`)
                })
        })
    .catch(error=>{console.error(error)});

$botonCalcular.on("click", ()=>
    {
        let monedaBase = $monedaBase.val()
        let monedaACambiar = $monedaCambio.val()
        let fecha = $fecha.val()
        if(monedaBase === monedaACambiar)
        {
            $resultado.text('Su cambio es de: ').append(`<strong>${$montoACambiar.val()}${monedaACambiar}`);
        }
        else if(monedaACambiar !== 'Elige una moneda')
        {
            fetch(`https://api.frankfurter.app/${fecha}?base=${monedaBase}`)
                .then( respuesta => respuesta.json())
                .then(respuesta => 
                {
                    let resultado = calcularCambio($montoACambiar.val(), respuesta.rates[monedaACambiar]).toFixed(2)
                    $resultado.text('Su cambio es de: ').append(`<strong>${resultado}${monedaACambiar}`);
                    $calculo.text(`${resultado}${monedaACambiar}`);

                })
                .catch(error => {console.error(error)});
        } else 
        {
            $resultado.text('Debe elegir una moneda a la cual desea hacer el cambio')
        }
    });

function calcularCambio(monto, tasaDeCambio)
{
    return monto * tasaDeCambio
}