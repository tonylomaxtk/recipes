import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, Input, TextField } from "@mui/material";
import type { Recipe } from "../types";
import { createRecipe } from "../api/recipes";
import { retrieveRecipes } from "./recipeTable.service";

function RecipeForm({
  setRows,
}: {
  setRows: React.Dispatch<React.SetStateAction<Recipe[]>>;
}) {
  const { control, handleSubmit, reset } = useForm<Recipe>({
    defaultValues: {
      name: "",
      description: "",
      ingredients: "",
    },
  });

  const onSubmit = async (
    data: Recipe,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    const ingredients = data.ingredients
      .split(",")
      .map((ingredient: string) => {
        return { name: ingredient };
      });
    const submittedRecipe = { ...data, ingredients };
    await createRecipe(submittedRecipe);
    reset();
    setRows(await retrieveRecipes());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ marginRight: "5px" }}>Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} required={true} />}
        />

        <label style={{ marginRight: "5px" }}>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <label>Ingredients (Comma separated)</label>
        <Controller
          name="ingredients"
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline rows={3} required={true} />
          )}
        />

        <Button type="submit" variant="contained">
          Create Recipe
        </Button>
      </form>
    </div>
  );
}

export default RecipeForm;
