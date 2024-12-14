const $botonResultado = document.querySelector("#botonEnviar");
const $labelInicial = document.querySelector("#labelInicial");

$botonResultado.onclick = function()
{
    $botonResultado.remove();
    $labelInicial.remove();
    const $cantidadVideos = document.querySelector("#cantidadVideos");
    $cantidadVideos.remove();
    
    const $explicacion = document.createElement("p");
    $explicacion.textContent = "Ingrese las horas, minutos y segundos correspondiente a cada video"
    document.querySelector("body").appendChild($explicacion);
    
    const arrayElementos = [];

    for (let i=1; i<(Number($cantidadVideos.value)+1);i++)
        {
            document.querySelector("body").appendChild(document.createElement("h2").appendChild(document.createTextNode(`Video ${i}`)));
            document.querySelector("body").appendChild(document.createElement("br"));
            document.querySelector("body").appendChild(document.createElement("p").appendChild(document.createTextNode("Horas:Minutos:Segundos")));
            document.querySelector("body").appendChild(document.createElement("br"));
            
            arrayElementos.push([
                document.querySelector("body").appendChild(document.createElement("input")),
                document.querySelector("body").appendChild(document.createElement("input")),
                document.querySelector("body").appendChild(document.createElement("input"))
            ]);
            document.querySelector("body").appendChild(document.createElement("br"))
        }
    
    for (let y= 0; y<arrayElementos.length;y++)
        {
            arrayElementos[y][0].className = `videos-horas`;
            arrayElementos[y][1].className = `videos-minutos`;
            arrayElementos[y][2].className = `videos-segundos`;
        }
    
    const $botonCalcularHoras = document.createElement("button");
    $botonCalcularHoras.type = "button";
    $botonCalcularHoras.textContent = "Calcular Numero de Horas"
    
    document.querySelector("body").appendChild(document.createElement("br"))
    document.querySelector("body").appendChild($botonCalcularHoras);
    document.querySelector("body").appendChild(document.createElement("br"))
    
    function calculoHorasTotales()
    {
        let arrayHoras = document.querySelectorAll(".videos-horas");
        let horasTotales = 0;
        for(let i=0; i < arrayHoras.length;i++)
            {
                horasTotales += Number(arrayHoras[i].value);
            }
        return horasTotales;
    }

    function calculoMinutosTotales()
    {
        let arrayMinutos = document.querySelectorAll(".videos-minutos");
        let minutosTotales = 0;
        for(let i=0; i < arrayMinutos.length;i++)
            {
                minutosTotales += Number(arrayMinutos[i].value);
            }
        return minutosTotales;
    }

    function calculoSegundosTotales()
    {
        let arraySegundos = document.querySelectorAll(".videos-segundos");
        let segundosTotales = 0;
        for(let i=0; i < arraySegundos.length;i++)
            {
                segundosTotales += Number(arraySegundos[i].value);
            }
        return segundosTotales;
    }
    
    function calculoTiempoTotal (horasTotales, minutosTotales, segundosTotales)
    {
        
        return (horasTotales*3600) + (minutosTotales * 60) + (segundosTotales);
    }
    
    
    $botonCalcularHoras.onclick = function()
    {
        const resultadoCalculo = calculoTiempoTotal(calculoHorasTotales(),calculoMinutosTotales(),calculoSegundosTotales())
        
        const $parrafoFinal = document.createElement("p")
        $parrafoFinal.textContent = "Los videos de r/argentina programa suman un total de: "
        $parrafoFinal.fontSize = "300px"

        const $tiempoTotal = document.createElement("strong");
        $tiempoTotal.textContent = `${resultadoCalculo} segundos`;
        $tiempoTotal.style = "color : red"
        
        $parrafoFinal.appendChild($tiempoTotal);
        document.querySelector("body").appendChild($parrafoFinal);
    }
}
