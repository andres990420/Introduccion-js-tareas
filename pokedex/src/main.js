const pokeApiListaPokemons = fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025');
const pokeapi = fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
const $listaPokemons = $('select')
const $nombrePokemon = $('#nombre-pokemon')
const $tipo1Pokemon = $('#tipo1-pokemon')
const $tipo2Pokemon = $('#tipo2-pokemon')
const $iconoTipo1 = $('#tipo-1-svg')
const $iconoTipo2 = $('#tipo-2-svg')
const $habilidadPokemon = $('#habilidad-pokemon')
const $habilidadOcultaPokemon = $('#habilidad-oculta-pokemon')
const $idPokemon = $('#id-pokemon')
const $imagenPokemon = $('#imagen-pokemon');
const $botonSiguiente = $('#boton-siguiente');
const $botonAnterior = $('#boton-anterior');

pokeApiListaPokemons
    .then(response => response.json())
    .then(response =>
        {
            Object.values(response.results).forEach((pokemon) =>
                {
                    let name = pokemon.name[0].toUpperCase() + (pokemon.name).substring(1);
                    $('select').append(`<option>${name}`)
                })
        })

$listaPokemons.on( "change", ()=>
{
    const pokemon = $listaPokemons.val().toLowerCase()
    if(pokemon !== 'Buscar')
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(response => response.json())
                .then(response =>
                    {              
                        response.id !== 1 ? $botonAnterior.attr('disabled', false) : '';
                        response.id >= 1025 ? $botonSiguiente.attr('disabled', true) : $botonSiguiente.attr('disabled', false);
                        
                        definirId(response.id);
                        definirNombre(response.name);
                        cambiarImagenPokemon(response.sprites);
                        definirTipos(response.types);
                        definirHabilidades(response.abilities);
                    });
        }
});

$botonSiguiente.on('click', ()=>
    {
        let idActual;
        $idPokemon.text() !== '???' ? idActual = Number($idPokemon.text()) : idActual = 0;

        fetch(`https://pokeapi.co/api/v2/pokemon/${idActual+1}`)
            .then(response => response.json())
            .then(response =>
                {
                    response.id !== 1 ? $botonAnterior.attr('disabled', false) : '';
                    response.id >= 1025 ? $botonSiguiente.attr('disabled', true) : $botonSiguiente.attr('disabled', false);

                    definirId(response.id);
                    definirNombre(response.name);
                    
                    cambiarImagenPokemon(response.sprites);
                    
                    definirTipos(response.types);
                    
                    definirHabilidades(response.abilities);
                });
    });

$botonAnterior.on('click', ()=>
    {
        const idActual = Number($idPokemon.text())
        if(idActual > 1 && idActual < 1026)
            {
                $botonSiguiente.attr('disabled', false)
                fetch(`https://pokeapi.co/api/v2/pokemon/${idActual-1}`)
                    .then(response => response.json())
                    .then(response =>
                        {
                            definirId(response.id);
                            definirNombre(response.name);
                            
                            cambiarImagenPokemon(response.sprites);
                            
                            definirTipos(response.types);
                            
                            definirHabilidades(response.abilities);
                        });
            }
        else
            {
                $botonAnterior.attr('disabled', true)
            }
    });

function cambiarImagenPokemon(spritePokemon) 
{
    $imagenPokemon.attr('src', spritePokemon['front_default']);
}

function definirNombre(nombrePokemon)
{
    let nombre = nombrePokemon[0].toUpperCase() + nombrePokemon.substring(1);
    $nombrePokemon.text(nombre);
}

function definirId(idPokemon)
{
    $idPokemon.text(idPokemon);
}

function definirHabilidades(habilidadesPokemonJson) {
    
    const habilidadesPokemon = habilidadesPokemonJson;
    let listaHabilidades = [];
    let habilidadOculta;
    
    habilidadesPokemon.forEach(abilities => {
        if (abilities.is_hidden) 
            {
                habilidadOculta = abilities['ability']['name'];
            }
        else 
            {
                listaHabilidades.push(abilities['ability']['name']);
            }
    });

    $habilidadPokemon.text(listaHabilidades.length > 1 ? `${listaHabilidades[0]} / ${listaHabilidades[1]}` : listaHabilidades[0]);
    $habilidadOcultaPokemon.text(habilidadOculta !== undefined ? habilidadOculta : '');
}

function definirTipos(tiposPokemonJson) {

    const tiposPokemon = tiposPokemonJson;
    let listaTipos = [];

    tiposPokemon.forEach(type => {
        listaTipos.push(type['type']['name']);
    });

    if (listaTipos.length > 1) 
        {
            $tipo1Pokemon.text(listaTipos[0]);
            $iconoTipo1.attr('src', `icons/pokemon-type-icons/icons/${listaTipos[0]}.svg`);
            $tipo2Pokemon.text('/ ' + listaTipos[1]);
            $iconoTipo2.attr('hidden', false);
            $iconoTipo2.attr('src', `icons/pokemon-type-icons/icons/${listaTipos[1]}.svg`);
        }

    else 
        {
            $tipo1Pokemon.text(listaTipos[0]);
            $iconoTipo1.attr('src', `icons/pokemon-type-icons/icons/${listaTipos[0]}.svg`);
            $tipo2Pokemon.text('');
            $iconoTipo2.attr('hidden', true);
        }
}

