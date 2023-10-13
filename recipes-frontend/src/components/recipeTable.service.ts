import { GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";
import axios from "axios";
import type { Recipe } from "../types";

export const handleDeleteClick =
  (
    id: GridRowId,
    rows: Recipe[],
    setRows: React.Dispatch<React.SetStateAction<Recipe[]>>
  ) =>
  () => {
    axios.delete(`http://localhost:8000/api/recipe/recipes/${id}`);
    setRows(rows.filter((row: Recipe) => row.id !== id));
  };

export const editRecipe = (id: number, updatedRow: Recipe) => {
  console.log({ updatedRow });
  const updatedRecipeData = {
    ...updatedRow,
    ingredients: updatedRow.ingredients
      .replace(/ /g, "")
      .split(",")
      .map((ingredient: string) => {
        return { name: ingredient };
      }),
  };

  axios.patch(
    `http://localhost:8000/api/recipe/recipes/${id}/`,
    updatedRecipeData
  );
};

export const handleEditClick =
  (
    id: GridRowId,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>
  ) =>
  () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

export const handleSaveClick =
  (
    id: GridRowId,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>
  ) =>
  () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
