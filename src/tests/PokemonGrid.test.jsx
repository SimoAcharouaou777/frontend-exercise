import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, combineReducers } from "redux";
import { render, screen } from "@testing-library/react";
import { listReducer, detailsReducer } from "../store/reducers.js";
import PokemonGrid from "../components/PokemonGrid.jsx";

function renderWithStore(ui, preloadedState) {
  const rootReducer = combineReducers({ list: listReducer, details: detailsReducer });
  const store = createStore(rootReducer, preloadedState); 
  store.dispatch = vi.fn();
  return render(<Provider store={store}>{ui}</Provider>);
}

test("renders grid and sentinel", () => {
  renderWithStore(<PokemonGrid />, {
    list: { items: [{ name: "bulbasaur", url: "u" }], next: null, loading: false, error: null },
    details: { open: false, name: null, loading: false, data: null, error: null },
  });
  expect(screen.getByTestId("grid")).toBeInTheDocument();
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/End/i)).toBeInTheDocument();
});