const lists__pokemons = document.getElementById("lists__pokemons");
const lists_pokemonsFav = document.getElementById("poke_container");

const buttons = document.getElementById("buttons");
let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let templateHtml;
let addPoke;
// let favorites;

const favorites = localStorage.getItem("pokemon")
  ? JSON.parse(localStorage.getItem("pokemon"))
  : [];

// console.log("⏮⏩");

const GetPokemons = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    // console.log(results);
    DataPokemons(results.results);
    DataPokemonsfav(results.results);

    btnNext = results.next
      ? `<button class="btn" data-url=${results.next}>⏩</button>`
      : "";
    btnPrevious = results.previous
      ? `<button class="btn" data-url=${results.previous}>⏮</button>`
      : "";
    buttons.innerHTML = btnPrevious + " " + btnNext;
  } catch (error) {
    console.log(error);
  }
};
GetPokemons(urlPokemon);

const DataPokemons = async (data) => {
  // lists__pokemons.innerHTML = " ";
  try {
    for (let index of data) {
      const resp = await fetch(index.url);
      // console.log(index);
      const resul = await resp.json();
      console.log(favorites);

      templateHtml = `
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
<button class="add" onclick="addFovorit(${resul.id})" >добавит в корзину</button>
            `;

      lists__pokemons.innerHTML += templateHtml;
    }
  } catch (error) {
    console.log(error);
  }
};

const DataPokemonsfav = async (data) => {
  try {
    for (let index of data) {
      const resp = await fetch(index.url);
      const resul = await resp.json();
      if (favorites.indexOf(resul.id) !== -1) {
        templateHtml = `
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
<button class="delete" onclick="removeFavorite(${resul.id})" >удалить из корзины</button>
            `;

        lists_pokemonsFav.innerHTML += templateHtml;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    let value = e.target.dataset.url;
    console.log(value);
    GetPokemons(value);
  }
});

function addFovorit(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("pokemon", JSON.stringify(favorites));
  } else {
    alert("Pokemon уже в избранных");
  }
  console.log(favorites);
}

function removeFavorite(id) {
  const leftItems = favorites.filter((favId) => favId !== id);
  localStorage.setItem("pokemon", JSON.stringify(leftItems));
  window.location.reload();
  console.log(leftItems);
}

// console.log(favorites);

/////////////////////
