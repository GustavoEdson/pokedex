const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generetePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((reponse) => reponse.json())
    );

const fetchPokemon = () => {
  const pokemonPromises = generetePokemonPromises();

  Promise.all(pokemonPromises)
    .then((pokemons) => {
      return (lisPokemons = pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

        accumulator += `
                <li class="card ${types[0]}">
                <img class="card-image" alt="${
                  pokemon.name
                }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.id
        }.png"/>
                 <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
                 <p class="card-subtitle">${types.join(" | ")}</p>
                </li>
                `;
        return accumulator;
      }, ""));
    })
    .then((pokemons) => {
      const ul = document.querySelector('[data-js="pokedex"]');
      ul.innerHTML = pokemons;
    });
};

fetchPokemon();
