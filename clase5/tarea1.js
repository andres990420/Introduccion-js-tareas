
const $botonCalcular = document.querySelector("#boton-calcular");


$botonCalcular.onclick = function()
{
    const salarioAnual = Number(document.querySelector("#salario-anual").value);
    const salarioMensual = document.querySelector("#salario-mensual");
    salarioMensual.value = salarioAnual / 12;
    return false;
};