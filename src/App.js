import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

function getPokemonById(id, setPokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => setPokemon(data))
    .catch((e) => console.log(e));
}

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(() => {
    if (pokemonId !== "") getPokemonById(pokemonId, setPokemon);
  }, [pokemonId]);

  console.log({ pokemon, pokemonId });

  function setPokemonIdInInput(event) {
    setPokemonId(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <label>PokemonId </label>
      <input type="number" min="1" max="898" onChange={setPokemonIdInInput} />
      {pokemon !== null ? (
        <>
          <p>Name: {pokemon.name}</p>
          <img
            src={pokemon.sprites.front_shiny}
            alt="pokemon"
            width="300"
            height="300"
          />
        </>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
}

export default App;
