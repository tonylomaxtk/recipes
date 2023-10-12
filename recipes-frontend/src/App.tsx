import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeTable from "./components/recipeTable"


function App() {
  return (
    <div className="App" style={{maxWidth:"75%", margin: "0 auto", marginTop: "10%"}}>
      <RecipeTable/>

    </div>
  );
}

export default App;
