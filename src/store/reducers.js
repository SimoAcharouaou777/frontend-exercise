import {
  POKEMONS_FETCH_REQUEST, POKEMONS_FETCH_SUCCESS, POKEMONS_FETCH_FAILURE,
  POKEMON_MODAL_OPEN, POKEMON_MODAL_CLOSE,
  POKEMON_DETAILS_FETCH_REQUEST, POKEMON_DETAILS_FETCH_SUCCESS, POKEMON_DETAILS_FETCH_FAILURE
} from './constants';

const listInitial = {
  items:  [],
  next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
  loading: false,
  error: null
};

export function listReducer(state = listInitial, action) {
  switch (action.type) {
    case POKEMONS_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case POKEMONS_FETCH_SUCCESS: {
      return {
        ...state,
        items: state.items.concat(action.payload.results),
        next: action.payload.next,
        loading: false
      };
    }
    case POKEMONS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.error || 'Error' };
    default:
      return state;
  }
}

const detailsInitial = {
  open: false,
  name: null,
  loading: false,
  data: null,
  error: null
};

export  function detailsReducer(state = detailsInitial, action) {
  switch (action.type) {
    case POKEMON_MODAL_OPEN:
      return { ...state, open: true, name: action.name, data: null, error: null };
    case POKEMON_MODAL_CLOSE:
      return { ...detailsInitial };

    case POKEMON_DETAILS_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case POKEMON_DETAILS_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case POKEMON_DETAILS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.error || 'Error' };

    default: return state;
  }
}
