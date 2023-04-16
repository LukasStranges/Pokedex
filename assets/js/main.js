const clickSearch = document.getElementById("clickSearch")
const search = document.getElementById("search")
const pokemonList = document.getElementById("pokemonList")
const pagination = document.getElementById("pagination")
const loadMoreButton = document.getElementById("loadMoreButton")
const loadLessButton = document.getElementById("loadLessButton")
let largura = window. screen.width;
const maxRecords = 151;
var limit = 12;
let offset = 0;


if(largura <= 376){
    limit = 3
    loadPokemonItens(offset,limit)
}else{
    loadPokemonItens(offset,limit)
}
//Proxima pagina de pokemons
loadMoreButton.addEventListener('click',morePage)
//Pagina anterior de pokemons
loadLessButton.addEventListener('click',loadLessPage)



clickSearch.addEventListener('click', () =>{
    let name = search.value.toLowerCase();
    loadPokemon(name)
})

document.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        let name = search.value.toLowerCase();
        loadPokemon(name)
    }
 }, false);




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
    })
}

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

function morePage(){
    offset += limit;
    const qtdPokemons = offset + limit;
    if(qtdPokemons >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset,limit)
    }
    if(offset != 0){
        loadLessButton.classList.remove("remover")
    }
}

function loadLessPage(){
    offset -= limit;
    if(offset == 0){
        loadLessButton.classList.add("remover")
    }
    if(!document.getElementById("loadMoreButton")){
        pagination.appendChild(loadMoreButton)
    }
    loadPokemonItens(offset,limit)
}

function keyPressed(e){
    e = e || window.event;
    var key = e.keyCode || e.which;
    return String.fromCharCode(key); 
}






