import { useState } from "react";
import "./App.css";
import RecipeTable from "./components/recipeTable";
import RecipeForm from "./components/recipeForm";
import { Recipe } from "./types";

function App() {
  const [rows, setRows] = useState<Recipe[]>([]);
  return (
    <div
      className="App"
      style={{ maxWidth: "75%", margin: "0 auto", marginTop: "10%" }}
    >
      <RecipeTable rows={rows} setRows={setRows} />
      <RecipeForm setRows={setRows} />
    </div>
  );
}

export default App;
