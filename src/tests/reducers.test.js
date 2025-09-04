import { listReducer, detailsReducer } from '../store/reducers.js';
import {
  POKEMONS_FETCH_REQUEST,
  POKEMONS_FETCH_SUCCESS,
  POKEMON_MODAL_OPEN,
  POKEMON_DETAILS_FETCH_SUCCESS
} from '../store/constants.js';

test('listReducer toggles loading and appends results', () => {
  const s0 = listReducer(undefined, { type: '@@INIT' });
  const s1 = listReducer(s0, { type: POKEMONS_FETCH_REQUEST });
  expect(s1.loading).toBe(true);

  const payload = { results: [{ name: 'bulbasaur', url: 'u' }], next: null };
  const s2 = listReducer(s1, { type: POKEMONS_FETCH_SUCCESS, payload });
  expect(s2.loading).toBe(false);
  expect(s2.items).toHaveLength(1);
  expect(s2.next).toBe(null);
});

test('detailsReducer opens modal and stores details', () => {
  const s0 = detailsReducer(undefined, { type: '@@INIT' });
  const s1 = detailsReducer(s0, { type: POKEMON_MODAL_OPEN, name: 'pikachu' });
  expect(s1.open).toBe(true);
  expect(s1.name).toBe('pikachu');

  const data = { name: 'pikachu', id: 25 };
  const s2 = detailsReducer(s1, { type: POKEMON_DETAILS_FETCH_SUCCESS, payload: data });
  expect(s2.data).toEqual(data);
  expect(s2.loading).toBe(false);
});
