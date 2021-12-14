import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Divider, Stack } from "@mui/material";

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

  function setPokemonIdInInput(event) {
    setPokemonId(event.target.value);
  }

  console.log({ pokemon, pokemonId });

  return (
    <Container maxWidth="sm" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TextField
        sx={{ my: 3 }}
        label="PokemonId"
        variant="outlined"
        type="number"
        min="1"
        max="898"
        onChange={setPokemonIdInInput}
      />
      {pokemon !== null ? (
        <Card>
          <CardContent>
            <Typography variant="h3" component="h2" xs={{}}>
              {pokemon.name}
            </Typography>
            <Box width="100%">
              <Stack
                direction="row"
                justifyContent="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                {pokemon.types.map((type) => (
                  <Chip label={type.type.name} color="secondary" />
                ))}
              </Stack>
            </Box>
            <img
              src={pokemon.sprites.front_shiny}
              alt="pokemon"
              width="300"
              height="300"
            />
          </CardContent>
        </Card>
      ) : (
        <>Loading....</>
      )}
    </Container>
  );
}

export default App;
