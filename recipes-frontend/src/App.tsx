import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const getRecipes = async () => {
    const recipes  = await fetch("http://localhost:8000/api/recipe/recipes/")
    console.log({recipes});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getRecipes}>
          Get Recipes
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
