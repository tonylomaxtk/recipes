import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import type { Recipe } from "../types";
import { createRecipe } from "../api/recipes";
import { retrieveRecipes } from "./recipeTable.service";
import * as S from "./recipeForm.style";

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
    <S.NewRecipeForm onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required={true}
            variant="outlined"
            style={{ marginBottom: "2rem" }}
          />
        )}
      />

      <label>Description</label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            style={{ marginBottom: "2rem" }}
          />
        )}
      />

      <label>Ingredients (Comma separated)</label>
      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={3}
            required={true}
            variant="outlined"
            style={{ marginBottom: "2rem" }}
          />
        )}
      />

      <S.SubmitRecipeButton type="submit" variant="contained">
        Create Recipe
      </S.SubmitRecipeButton>
    </S.NewRecipeForm>
  );
}

export default RecipeForm;
