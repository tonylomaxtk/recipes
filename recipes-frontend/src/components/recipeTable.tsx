import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowEditStopReasons,
  GridRowModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  handleDeleteClick,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  editRecipe,
} from "./recipeTable.service";
import axios from "axios";

export default function RecipeTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      editable: true,
    },
    {
      field: "ingredients",
      headerName: "Ingredients",
      width: 130,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id, rowModesModel, setRowModesModel)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(
                id,
                rowModesModel,
                setRowModesModel,
                rows,
                setRows
              )}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, rows, setRows)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, rowModesModel, setRowModesModel)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/recipe/recipes/");
      const formattedRows = res.data.map((recipe: any) => {
        const joinedIngredients = recipe.ingredients
          .map((ingredient: any) => {
            return ingredient.name;
          })
          .join(", ");
        return { ...recipe, ingredients: joinedIngredients };
      });

      setRows(formattedRows);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={getRecipes} variant="contained">
        Get Recipes
      </Button>
      <DataGrid
        rows={rows || []}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newRowModesModel) => {
          setRowModesModel(newRowModesModel);
        }}
        onRowEditStop={(params, event) => {
          if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
        processRowUpdate={(newRow: GridRowModel) => {
          const updatedRow = { ...newRow };

          editRecipe(newRow.id, updatedRow);

          setRows(
            rows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
          );
          return updatedRow;
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
