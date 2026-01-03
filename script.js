let allPokemons = [];

async function displayPokemonTypes() {
  const response = await fetch("https://pokebuildapi.fr/api/v1/types");

  const types = await response.json();
  return types;
}

async function displayPokemonsGen1() {
  const response = await fetch(
    "https://pokebuildapi.fr/api/v1/pokemon/generation/1"
  );
  const pokemons = await response.json();
  allPokemons = pokemons;
  getPokemons(pokemons);
}

const mainContainer = document.querySelector(".container-pokedex");
const filterContainer = document.querySelector(".nav-filter");
const searchpokemon = document.getElementById("search-pokemon");
const formPokemon = document.getElementById("form-pokemon");

const pokemonData = displayPokemonsGen1();

const getPokemons = (arr) => {
  mainContainer.innerHTML = "";

  for (pokemon of arr) {
    const displayName = document.createElement("p");
    const pokemonContainer = document.createElement("div");
    const imgPokemon = document.createElement("img");
    const typeContainer = document.createElement("div");
    const pokemonType = document.createElement("p");
    const pokemonType2 = document.createElement("p");
    const pokemonNumber = document.createElement("p");

    pokemonContainer.className = "pokemon-container";
    pokemonContainer.id = `${pokemon.name}`;
    displayName.className = "pokemon-name";
    pokemonNumber.className = "pokemon-number";
    typeContainer.className = "type-container";
    displayName.innerText = `${pokemon.name}`;
    pokemonNumber.innerText = `#${pokemon.pokedexId}`;
    imgPokemon.src = `${pokemon.image}`;
    const [type1, type2] = pokemon.apiTypes;

    if (pokemon.apiTypes.length === 1) {
      pokemonType.innerText = `${type1.name}`;
      pokemonType.className = `pokemon-type ${type1.name}`;
    } else {
      pokemonType.className = `pokemon-type ${type1.name}`;
      pokemonType2.className = `pokemon-type ${type2.name}`;
      pokemonType.innerText = `${type1.name}`;
      pokemonType2.innerText = `${type2.name}`;
    }

    pokemonContainer.appendChild(imgPokemon);
    pokemonContainer.appendChild(pokemonNumber);
    pokemonContainer.appendChild(displayName);
    typeContainer.appendChild(pokemonType);
    typeContainer.appendChild(pokemonType2);
    pokemonContainer.appendChild(typeContainer);
    mainContainer.appendChild(pokemonContainer);
  }
};

const getTypes = async () => {
  let pokemonTypes = await displayPokemonTypes();
  const ulTypes = document.createElement("ul");
  const buttonAll = document.createElement("button");
  const liAll = document.createElement("li");

  ulTypes.classList = "ul-flex";
  buttonAll.innerText = "Tous";
  buttonAll.classList = "pokemon-type All button-type";

  liAll.appendChild(buttonAll);
  ulTypes.appendChild(liAll);

  buttonAll.addEventListener("click", () => {
    getPokemons(allPokemons);
    console.log("button clicked");
  });

  for (type of pokemonTypes) {
    const buttonTypes = document.createElement("button");
    const liTypes = document.createElement("li");

    buttonTypes.innerText = `${type.name}`;
    buttonTypes.className = `pokemon-type ${type.name} button-type`;

    liTypes.appendChild(buttonTypes);
    ulTypes.appendChild(liTypes);
    filterContainer.appendChild(ulTypes);

    buttonTypes.addEventListener("click", () => {
      const match = (type) => type.name === buttonTypes.innerText;
      const filteredPokemon = allPokemons.filter((pokemon) =>
        pokemon.apiTypes.some(match)
      );

      getPokemons(filteredPokemon);
    });
  }
};

searchpokemon.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  if (searchText.length >= 3) {
    const filteredSearch = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText)
    );

    getPokemons(filteredSearch);
  }

  if (!searchText.length) {
    getPokemons(allPokemons);
  }
});

getTypes();
