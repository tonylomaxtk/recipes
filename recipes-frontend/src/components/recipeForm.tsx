import { useForm, Controller } from "react-hook-form";
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
    try {
      e?.preventDefault();
      const formattedIngredients = data.ingredients
        .split(",")
        .map((ingredient: string) => {
          return { name: ingredient };
        });
      const submittedRecipe = { ...data, ingredients: formattedIngredients };
      await createRecipe(submittedRecipe);
      reset();
      setRows(await retrieveRecipes());
    } catch (error) {
      console.error("error submitting new recipe", error);
    }
  };

  return (
    <S.NewRecipeForm onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <S.FormInput {...field} required={true} variant="outlined" />
        )}
      />

      <label>Description</label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <S.FormInput {...field} variant="outlined" />}
      />

      <label>Ingredients (Comma separated)</label>
      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <S.FormInput
            {...field}
            multiline
            rows={3}
            required={true}
            variant="outlined"
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
