import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import {
  POKEMONS_FETCH_REQUEST,
  POKEMON_MODAL_OPEN,
  POKEMON_DETAILS_FETCH_REQUEST
} from './constants';
import {
  fetchPokemonsSuccess, fetchPokemonsFailure,
  fetchPokemonDetailsSuccess, fetchPokemonDetailsFailure
} from './actions';

const selectNextUrl = (state) => state.list.next;

/** @returns {Promise<import('./types').PokemonListResponse>} */
function fetchList(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error('Network error');
    return r.json();
  });
}

/** @returns {Promise<import('./types').PokemonDetails>} */
function fetchDetails(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(r => {
      if (!r.ok) throw new Error('Not found');
      return r.json();
    });
}

function* handleFetchPokemons() {
  try {
    const nextUrl = yield select(selectNextUrl);
    if (!nextUrl) return; 
    const data = yield call(fetchList, nextUrl);
    yield put(fetchPokemonsSuccess({ results: data.results, next: data.next }));
  } catch (err) {
    yield put(fetchPokemonsFailure(err.message));
  }
}

function* onModalOpen({ name }) {
  yield put({ type: POKEMON_DETAILS_FETCH_REQUEST, name });
}

function* handleFetchDetails({ name }) {
  try {
    const data = yield call(fetchDetails, name);
    yield put(fetchPokemonDetailsSuccess(data));
  } catch (err) {
    yield put(fetchPokemonDetailsFailure(err.message));
  }
}

export function* rootSaga() {
  yield takeLatest(POKEMONS_FETCH_REQUEST, handleFetchPokemons);
  yield takeEvery(POKEMON_MODAL_OPEN, onModalOpen);
  yield takeLatest(POKEMON_DETAILS_FETCH_REQUEST, handleFetchDetails);
}
