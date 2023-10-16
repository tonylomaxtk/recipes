import { useState } from "react";
import RecipeTable from "./components/recipeTable";
import RecipeForm from "./components/recipeForm";
import { Recipe } from "./types";

function App() {
  const [rows, setRows] = useState<Recipe[]>([]);
  return (
    <div style={{ maxWidth: "75%", margin: "0 auto" }}>
      <h1>Recipes </h1>
      <RecipeTable rows={rows} setRows={setRows} />
      <RecipeForm setRows={setRows} />
    </div>
  );
}

export default App;
