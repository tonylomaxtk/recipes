import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  handleDeleteClick,
  handleEditToggle,
  handleCancelClick,
  editRecipe,
  retrieveRecipes,
} from "./recipeTable.service";
import type { Recipe } from "../types";

export default function RecipeTable({
  rows,
  setRows,
}: {
  rows: Recipe[];
  setRows: React.Dispatch<React.SetStateAction<Recipe[]>>;
}) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    (async () => {
      setRows(await retrieveRecipes());
    })();
  }, []);

  useEffect(() => {
    console.log({ rows });
  }, [rows]);

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
              onClick={() => {
                handleEditToggle(
                  id,
                  rowModesModel,
                  setRowModesModel,
                  GridRowModes.View
                );
              }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, rowModesModel, setRowModesModel)}
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
            onClick={() =>
              handleEditToggle(
                id,
                rowModesModel,
                setRowModesModel,
                GridRowModes.Edit
              )
            }
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
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
        processRowUpdate={(newRow: Recipe) => {
          editRecipe(newRow.id, newRow);

          setRows(
            rows.map((row: Recipe) => (row.id === newRow.id ? newRow : row))
          );
          return newRow;
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
