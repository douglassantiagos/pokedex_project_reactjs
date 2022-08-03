import axios from "axios";

const urlMainApi = "https://pokeapi.co/api/v2/";

export async function getPokemon(pokemon) {
  const response = await fetch(`${urlMainApi}pokemon/${pokemon}`);
  return await response.json();
}

export async function getAllPokemons(limit, offset) {
  const response = await fetch(`${urlMainApi}pokemon?limit=${limit}&offset=${offset}`);
  return await response.json()
}

export async function getAllTypeData() {
  const response = await fetch(`${urlMainApi}type`);
  return await response.json();
}

export async function getTypeData(url) {
  const response = await fetch(url);
  return await response.json();
}

export async function getAllSpeciesData(pokemonID) {
  const response = await fetch(`${urlMainApi}pokemon-species/${pokemonID}`)
  return await response.json();
}
