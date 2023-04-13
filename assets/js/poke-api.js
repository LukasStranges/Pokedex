const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

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
