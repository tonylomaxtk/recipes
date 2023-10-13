import { useState } from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { handleDeleteClick } from './recipeTable.service'
import axios from "axios"


export default function RecipeTable() {
  const [rows, setRows] = useState<[]>([])


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'ingredients', headerName: 'Ingredients', width: 130 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, rows, setRows)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/recipe/recipes/")
      const formattedRows = res.data.map((recipe: any) => {
        const joinedIngredients = recipe.ingredients.map((ingredient: any) => {
          return ingredient.name
        }).join(", ")
        return { ...recipe, ingredients: joinedIngredients }
      })

      setRows(formattedRows)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button onClick={getRecipes} variant="contained">Get Recipes</Button>
      <DataGrid
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}




