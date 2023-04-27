
const search = document.getElementById("search")
const pokemonList = document.getElementById("pokemonList")
const pagination = document.getElementById("pagination")
const card_pokemon = document.getElementById("card") 
const imgpok = document.getElementById("img")





let largura = window.screen.width;
const maxRecords = 151;
var limit = 16;
let offset = 0;


if(largura <= 420){
    limit = 4
    loadPokemonItens(offset,limit)
}else{
    loadPokemonItens(offset,limit)
}

function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml =  pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type} fundo">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}">
                </div>
            </li>`).join("")
        
        pokemonList.innerHTML = newHtml;

        const element = pokemonList.querySelectorAll('li')
        for (let i = 0; i < element.length; i++) {
            const pokemonInfo = element[i];
            pokemonInfo.addEventListener('click',() =>{
                const info = pokemonInfo.childNodes

                for (let i = 0; i < pokemons.length; i++) {

                    if(info[1].textContent == pokemons[i].number){

                        const pokemonSele = pokemons[i]

                        card_pokemon.style.display = 'block';

                        card_pokemon.innerHTML = card(pokemonSele)

                        const infos_status = document.getElementById('infos-status');
                        infos_status.innerHTML = about(pokemonSele)

                        document.getElementById('about').addEventListener('click',() => {
                            infos_status.innerHTML = about(pokemonSele)
                        })
                        document.getElementById('base_stats').addEventListener('click',() => {
                            infos_status.innerHTML = base_stats(pokemonSele)
                        })
                        document.getElementById('evolution').addEventListener('click',() => {
                            infos_status.innerHTML = evoltution(pokemonSele)
                        })
                        
                        card_pokemon.classList.add(`${pokemonSele.type}`)                            
                        
                        const close_card = document.getElementById("close")
                        close_card.addEventListener('click', () => {
                            card_pokemon.classList.remove(`${pokemonSele.type}`)
                            card_pokemon.style.display = 'none';
                        })
                    }
                }
            })            
        }
               
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









