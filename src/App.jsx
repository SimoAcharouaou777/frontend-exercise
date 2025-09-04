import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/index.css'
import PokemonGrid from './components/PokemonGrid'
import PokemonModal from './components/PokemonModal'

function App() {
  return (
    <div className="app">
      <div className="header">
        <div className="h1">pokemons</div>
        <div className="muted">Infinite scroll • Modal details • Redux & Sagas</div>
      </div>
      <PokemonGrid />
      <PokemonModal />
    </div>
  )
}

export default App
