const inputForm = document.getElementById("input-group");
const searchInput = document.getElementById("search-input");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


const getPokemon = async () => {
    try {
        const pokemonIdOrName = searchInput.value.toLowerCase();
        searchInput.value = "";

        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIdOrName}`);
        const data = await response.json();

        pokemonImg.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`

        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = data.id;
        weight.textContent = data.weight;
        height.textContent = data.height;
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        types.innerHTML = data.types
        .map((obj)=>`<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
        .join(" ");
    } catch (err) {
        resetDisplay();
        alert("Pokémon not found");
        console.log(`Pokémon not found: ${err}`);
    }
};

const resetDisplay = () => {
    speed.textContent = 0;
    specialDefense.textContent = 0;
    specialAttack.textContent = 0;
    defense.textContent = 0;
    attack.textContent = 0;
    hp.textContent = 0;
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    pokemonId.textContent = '';
    pokemonName.textContent = '';
    pokemonImg.innerHTML = '';
    searchInput.value = '';
}

inputForm.addEventListener('submit', e => {
    e.preventDefault();
    getPokemon();
});