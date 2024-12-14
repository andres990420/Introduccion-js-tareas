const $botonResultado = document.querySelector("#boton-resultado");

$botonResultado.onclick = function()
{
    const tituloBienvenida = document.querySelector("#titulo-bienvenida");
    
    const nombresUsuario = document.querySelector("#nombres-usuario").value;
    const apellidosUsuario = document.querySelector("#apellidos-usuario").value;
    const edadUsuario = Number(document.querySelector("#edad-usuario").value);

    tituloBienvenida.innerText = `Bienvenido, ${nombresUsuario}`;
    document.querySelector("#resultado").innerText = `Nombre(s):${nombresUsuario}\nApellido(s):${apellidosUsuario}\nEdad:${edadUsuario}`

    return false;
}