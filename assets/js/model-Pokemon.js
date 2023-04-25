class Pokemon{
    number;
    name;
    type;
    types = [];
    photo;
    abilites;
    species;
    height;
    weight;
    egg_groups;
    egg_cycle;
    stats;
    total;
}

function about(pokemonSele){
    const about =`
            <div class="about">
                <ul>
                    <li class="left">Species</li>
                    <li>${pokemonSele.species}</li>
                    <li class="left">Height</li>
                    <li>${pokemonSele.height}0cm</li>
                    <li class="left">Weight</li>
                    <li>${pokemonSele.weight}0kg</li>
                    <li class="left">Abilities</li>
                    <li>${pokemonSele.abilites[0]}, ${pokemonSele.abilites[1]}</li>
                </ul>
                <h4>Breeding</h4>
                <ul>
                    <li class="left">Gender</li>
                    <li>Male / female</li>
                    <li class="left">Egg Groups</li>
                    <li>${pokemonSele.egg_groups}</li>
                    <li class="left">Egg Cycle</li>
                    <li>${pokemonSele.egg_cycle}</li>
                </ul>
            </div>
            `
    return about;
}
function base_stats(pokemonSele){
    const base_stats =`
    <div class="base_stats">
        <ul>
            <li class="left">Hp</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[0][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[0][0]}%;background-color: red;"></span> 
            </ul>
            <li class="left">Attack</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[1][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[1][0]}%;background-color: green;"></span>
            </ul>
            <li class="left">Defesa</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[2][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[2][0]}%;background-color: red;"></span>
            </ul>
            <li class="left">Sp.Atk</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[3][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[3][0]}%;background-color: green;"></span>
            </ul>
            <li class="left">Sp.Def</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[4][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[4][0]}%;background-color: green;"></span>
            </ul>
            <li class="left">Speed</li>
            <ul class="stats_">
                <li>${pokemonSele.stats[5][0]}</li>
                <span><hr style=" width: ${pokemonSele.stats[5][0]}%;background-color: red;"></span>
            </ul>
            <li class="left">Total</li>
            <ul class="stats_">
                <li>60</li>
                <span><hr></span>
            </ul>
        </ul>
        <h4>Type defenses</h4>                                
    </div>  
            `
    return base_stats;
}

function card(pokemonSele) {
    const card =  `
    <i id="close"><img src="https://img.icons8.com/ios-filled/50/null/long-arrow-left.png"/></i> 
    <div class="top-infos">                
        <span class="number-card">${pokemonSele.number}</span>
        <div class="detail">
            <span class="name-card">${pokemonSele.name}</span>                    
            <ol class="types">
                ${pokemonSele.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
            </ol>                            
        </div>                    
    </div>
    <div class="img-card">
        <img src="${pokemonSele.photo}" alt="pokemon ${pokemonSele.name}">
    </div>
    <div class="bottom_status">
        <ul class="status_header">
            <li id="about">About</li>
            <li id="base_stats">Base Stats</li>
            <li>Evolutions</li>
            <li>Moves</li>
        </ul>
        <div class="infos-status" id="infos-status">
        </div>
    </div>`
    return card;
}

