const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.weight = (pokeDetail.weight/10);
    pokemon.height = (pokeDetail.height/10);
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.abilites = pokeDetail.abilities.map((abilites) => abilites.ability.name);

    //Pegando a especie é egg_groups
    fetch(pokeDetail.species.url)
        .then((response) => response.json())
        .then((species) => {
            pokemon.species = species.genera[7].genus;

            const groups = species.egg_groups.map((groups) => groups.name)
            pokemon.egg_groups = groups[0];
            pokemon.egg_cycle = groups[1];
            
        })

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response => response.json()))
            .then(convertPokemonApiDetailToPokemon)
}


pokeApi.getPokemons = async (offset,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;
    const detailRequest = pokemons.map(pokeApi.getPokemonDetail);
    const pokemonDetails = await Promise.all(detailRequest);
    return pokemonDetails;
        
}
pokeApi.getPokemonsName = async (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);
    const jsonBody = await response.json();
    const detailRequest = convertPokemonApiDetailToPokemon(jsonBody)
    return detailRequest;
        
}
//                    COM FETCH
// pokeApi.getPokemons = (offset = 0,limit = 10) => {
//     const url = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
//     return fetch(url)
//         .then((response) => response.json())
//         .then((jsonBody) => jsonBody.results)
//         .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
//         .then((detailRequest) => Promise.all(detailRequest))
//         .then((pokemonDetails) => pokemonDetails)
        
// }
