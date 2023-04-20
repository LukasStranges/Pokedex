
const search = document.getElementById("search")
const pokemonList = document.getElementById("pokemonList")
const pagination = document.getElementById("pagination")

let teste = [];
const imgpok = document.getElementById("img")




let largura = window.screen.width;
const maxRecords = 151;
var limit = 12;
let offset = 0;


if(largura <= 420){
    limit = 3
    loadPokemonItens(offset,limit)
}else{
    loadPokemonItens(offset,limit)
}



pokeApi.getPokemons(offset,limit).then((pokemon) =>{
    console.log(pokemon);
});


function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml =  pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type} fundo">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}">
                </div>
            </li>`).join("")
        
        pokemonList.innerHTML = newHtml;

        
        
        // const test = pokemonList.querySelectorAll('li')
        // for (let i = 0; i < test.length; i++) {
        //     const element = test[i];
        //     element.addEventListener('click',() =>{
        //         const ele = element.childNodes

        //         console.log(ele);


        //         const img = ele[5].childNodes
        //         console.log(img[3].src);

        //         imgpok.innerHTML += `<img src="${img[3].src}">`
                
        //     })
        // }
       
        
    })
}

clickSearch.addEventListener('click', () =>{
    let name = search.value.toLowerCase();
    loadPokemon(name)
})

function loadPokemon(name){
    pokeApi.getPokemonsName(name).then((pokemon = []) => {
        const newHtml =  `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}">
                </div>
            </li>`

        pokemonList.innerHTML = newHtml;
    })
}









