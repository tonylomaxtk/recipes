import { GridRowId } from '@mui/x-data-grid';
import axios from "axios"


export const handleDeleteClick = (id: GridRowId, rows: [], setRows: any) => () => {
    axios.delete(`http://localhost:8000/api/recipe/recipes/${id}`)
    setRows(rows.filter((row: any) => row.id !== id))
};
