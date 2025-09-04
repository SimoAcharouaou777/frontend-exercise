import {
  POKEMONS_FETCH_REQUEST, POKEMONS_FETCH_SUCCESS, POKEMONS_FETCH_FAILURE,
  POKEMON_MODAL_OPEN, POKEMON_MODAL_CLOSE,
  POKEMON_DETAILS_FETCH_REQUEST, POKEMON_DETAILS_FETCH_SUCCESS, POKEMON_DETAILS_FETCH_FAILURE
} from './constants.js';


export const fetchPokemonsRequest = () => ({ type: POKEMONS_FETCH_REQUEST });
export const fetchPokemonsSuccess = (payload) => ({ type: POKEMONS_FETCH_SUCCESS, payload });
export const fetchPokemonsFailure = (error) => ({ type: POKEMONS_FETCH_FAILURE, error });

export const openPokemonModal  = (name) => ({ type: POKEMON_MODAL_OPEN, name });
export const closePokemonModal = () => ({ type: POKEMON_MODAL_CLOSE });

export const fetchPokemonDetailsRequest = (name) => ({ type: POKEMON_DETAILS_FETCH_REQUEST, name });
export const fetchPokemonDetailsSuccess = (payload) => ({ type: POKEMON_DETAILS_FETCH_SUCCESS, payload });
export const fetchPokemonDetailsFailure = (error) => ({ type: POKEMON_DETAILS_FETCH_FAILURE, error });
