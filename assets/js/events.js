const clickSearch = document.getElementById("clickSearch")
const loadMoreButton = document.getElementById("loadMoreButton")
const loadLessButton = document.getElementById("loadLessButton")


//Proxima pagina de pokemons
loadMoreButton.addEventListener('click',loadMorePage)
//Pagina anterior de pokemons
loadLessButton.addEventListener('click',loadLessPage)

//Ativando a pesquisa com o botão Enter
document.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        let name = search.value.toLowerCase();
        loadPokemon(name)
    }
 }, false);

 
 function loadMorePage(){
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