import { api } from "./api";

export async function getPokemon(pokemon: number | string) {
  const response = (await api.get(`pokemon/${pokemon}`)).data;
  return response;
}

export async function getAllPokemons(limit, offset) {
  const response = (await api.get(`pokemon?limit=${limit}&offset=${offset}`)).data;
  return response;
}

export async function getAllTypeData() {
  const response = (await api.get(`type`)).data;
  return response;
}

export async function getTypeData(url) {
  const response = (await api.get(url)).data;
  return response;
}