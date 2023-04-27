const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = "#"+pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.weight = (pokeDetail.weight/10);
    pokemon.height = (pokeDetail.height/10);
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.abilites = pokeDetail.abilities.map((abilites) => abilites.ability.name);
    //Pegando a os status
    pokemon.stats =    pokeDetail.stats.map((hp) => {
        let infos = [];
        infos.push(hp.base_stat);
        infos.push(hp.stat.name);
        return infos;
    })

    pokemon.evolutionChain = 
        pokeApi.getEvolutionChain(pokeDetail.species.url)
        .then((evolutionChain) => pokemon.evolutionChain = evolutionChain);


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
pokeApi.getEvolutionChain = async (speciesURL) => {
    const response = await fetch(speciesURL);
    const response_1 = await response.json();
    const evolutionChainURL = response_1.evolution_chain.url;
    const response_2 = await fetch(evolutionChainURL);
    const response_3 = await response_2.json();
    const evolutionChain = response_3.chain;
    
    let evolutionPath = [];

    evolutionPath.push(evolutionChain.species.name);
    evolutionChain.evolves_to.forEach((evolution) => {
        evolutionPath.push(evolution.species.name);
        evolution.evolves_to.forEach((evolution_1) => {
            evolutionPath.push(evolution_1.species.name);
        });
    });
    return evolutionPath;
};

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
