async function displayPokemonsGen1() {
  const response = await fetch(
    "https://pokebuildapi.fr/api/v1/pokemon/generation/1"
  );
  const pokemons = await response.json();
  return pokemons;
}

displayPokemonsGen1();

const mainContainer = document.querySelector(".container-pokedex");

const getPokemons = async () => {
  let pokemonData = await displayPokemonsGen1();

  console.log(pokemonData);
  for (pokemon of pokemonData) {
    const displayName = document.createElement("p");
    const pokemonContainer = document.createElement("div");
    const imgPokemon = document.createElement("img");
    const pokemonType = document.createElement("p");
    const pokemonNumber = document.createElement("p");

    pokemonContainer.className = "pokemon-container";
    displayName.innerText = `${pokemon.name}`;
    pokemonNumber.innerText = `#${pokemon.pokedexId}`;
    imgPokemon.src = `${pokemon.image}`;
    const [type1, type2] = pokemon.apiTypes;

    if (pokemon.apiTypes.length === 1) {
      pokemonType.innerText = `${type1.name}`;
    } else {
      pokemonType.innerText = `${type1.name} ${type2.name}`;
    }

    pokemonContainer.appendChild(imgPokemon);
    pokemonContainer.appendChild(pokemonNumber);
    pokemonContainer.appendChild(displayName);
    pokemonContainer.appendChild(pokemonType);
    mainContainer.appendChild(pokemonContainer);
  }
};

getPokemons();
