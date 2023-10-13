import { GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";
import type { Recipe, RecipeModel } from "../types";
import { deleteRecipe, updateRecipe, getRecipes } from "../api/recipes";

export const handleDeleteClick =
  (
    id: GridRowId,
    rows: Recipe[],
    setRows: React.Dispatch<React.SetStateAction<Recipe[]>>
  ) =>
  () => {
    deleteRecipe(Number(id));
    setRows(rows.filter((row: Recipe) => row.id !== id));
  };

export const editRecipe = (id: number, updatedRow: Recipe) => {
  const updatedRecipeData = {
    ...updatedRow,
    ingredients: updatedRow.ingredients
      .replace(/ /g, "")
      .split(",")
      .map((ingredient: string) => {
        return { name: ingredient };
      }),
  };

  updateRecipe(id, updatedRecipeData);
};

export const handleEditToggle = (
  id: GridRowId,
  rowModesModel: GridRowModesModel,
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
  mode: GridRowModes
) => {
  setRowModesModel({ ...rowModesModel, [id]: { mode } });
};

export const handleCancelClick =
  (
    id: GridRowId,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>
  ) =>
  () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

export const retrieveRecipes = async () => {
  try {
    const res = await getRecipes();
    return res.data.map((recipe: RecipeModel) => {
      const joinedIngredients = recipe.ingredients
        .map((ingredient: { name: string }) => ingredient.name)
        .join(", ");
      return { ...recipe, ingredients: joinedIngredients };
    });
  } catch (error) {
    console.error(error);
  }
};
