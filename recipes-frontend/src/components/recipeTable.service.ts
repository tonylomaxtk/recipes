import { GridRowId, GridRowModes } from "@mui/x-data-grid";
import axios from "axios";

export const handleDeleteClick =
  (id: GridRowId, rows: any[], setRows: any) => () => {
    axios.delete(`http://localhost:8000/api/recipe/recipes/${id}`);
    setRows(rows.filter((row: any) => row.id !== id));
  };

export const editRecipe = (id: number, updatedRow: any) => {
  console.log({ updatedRow });
  const updatedRecipeData = {
    ...updatedRow,
    ingredients: updatedRow.ingredients
      .replace(/ /g, "")
      .split(",")
      .map((ingredient: any) => {
        return { name: ingredient };
      }),
  };

  console.log({ updatedRecipeData });
  axios.patch(
    `http://localhost:8000/api/recipe/recipes/${id}/`,
    updatedRecipeData
  );
};

export const handleEditClick =
  (id: GridRowId, rowModesModel: any, setRowModesModel: any) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

export const handleSaveClick =
  (id: GridRowId, rowModesModel: any, setRowModesModel: any) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

export const handleCancelClick =
  (
    id: GridRowId,
    rowModesModel: any,
    setRowModesModel: any,
    rows: any,
    setRows: any
  ) =>
  () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };
