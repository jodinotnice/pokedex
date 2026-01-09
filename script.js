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
  console.log(allPokemons);
  getPokemons(pokemons);
}

const mainContainer = document.querySelector(".container-pokedex");
const filterContainer = document.querySelector(".section-filter");
const triContainer = document.querySelector(".section-tri");
const searchpokemon = document.getElementById("search-pokemon");
const formPokemon = document.getElementById("form-pokemon");
const azSort = document.querySelector(".AZ-sort");
const zaSort = document.querySelector(".ZA-sort");
const ascSort = document.querySelector(".asc-sort");
const descAscSort = document.querySelector(".desc-asc-sort");
const resetSort = document.querySelector(".reset-sort");

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
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");
    const statsContainer = document.createElement("div");
    const imgSprite = document.createElement("img");

    const statsHp = document.createElement("p");
    const statsAtk = document.createElement("p");
    const statsDef = document.createElement("p");
    const statsSatk = document.createElement("p");
    const statsSdef = document.createElement("p");
    const statsSpeed = document.createElement("p");

    pokemonContainer.className = "pokemon-container";
    pokemonContainer.id = `${pokemon.name}`;
    displayName.className = "pokemon-name";
    pokemonNumber.className = "pokemon-number";
    typeContainer.className = "type-container";
    flipCardInner.className = "flip-card-inner";
    flipCardFront.className = "flip-card-front";
    flipCardBack.className = "flip-card-back";
    displayName.innerText = `${pokemon.name}`;
    pokemonNumber.innerText = `#${pokemon.pokedexId}`;
    imgPokemon.src = `${pokemon.image}`;
    statsHp.innerText = `HP: ${pokemon.stats.HP}`;
    statsAtk.innerText = `ATK: ${pokemon.stats.attack}`;
    statsDef.innerText = `DEF: ${pokemon.stats.defense}`;
    statsSatk.innerText = `SPATK: ${pokemon.stats.special_attack}`;
    statsSdef.innerText = `SPDEF: ${pokemon.stats.special_defense}`;
    statsSpeed.innerText = `SPD: ${pokemon.stats.speed}`;
    imgSprite.src = `${pokemon.sprite}`;

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

    statsContainer.appendChild(statsHp);
    statsContainer.appendChild(statsAtk);
    statsContainer.appendChild(statsDef);
    statsContainer.appendChild(statsSatk);
    statsContainer.appendChild(statsSdef);
    statsContainer.appendChild(statsSpeed);
    flipCardBack.appendChild(imgSprite);
    flipCardBack.appendChild(statsContainer);

    flipCardFront.appendChild(imgPokemon);
    flipCardFront.appendChild(pokemonNumber);
    flipCardFront.appendChild(displayName);
    typeContainer.appendChild(pokemonType);
    typeContainer.appendChild(pokemonType2);
    flipCardFront.appendChild(typeContainer);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    pokemonContainer.appendChild(flipCardInner);
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

function alphabeticSortAz() {
  const sortedAZ = allPokemons.toSorted((a, b) => a.name.localeCompare(b.name));
  console.log(allPokemons);
  getPokemons(sortedAZ);
}

function alphabeticSortZa() {
  const sortedZA = allPokemons.toSorted((a, b) => b.name.localeCompare(a.name));

  getPokemons(sortedZA);
}

azSort.addEventListener("click", () => alphabeticSortAz());

zaSort.addEventListener("click", () => alphabeticSortZa());

resetSort.addEventListener("click", () => getPokemons(allPokemons));

function ascDescendingSort() {
  const descPokemons = allPokemons.toReversed();
  getPokemons(descPokemons);
}

descAscSort.addEventListener("click", () => ascDescendingSort());
