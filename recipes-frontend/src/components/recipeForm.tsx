import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { Button, Input, TextField } from "@mui/material";

type Inputs = {
  name: string;
  description: string;
  ingredients: any;
};

function RecipeForm() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
      ingredients: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any, e: any) => {
    e.preventDefault();
    const ingredients = data.ingredients.split(",").map((ingredient: any) => {
      return { name: ingredient };
    });
    const submittedRecipe = { ...data, ingredients };
    await axios.post(
      "http://localhost:8000/api/recipe/recipes/",
      submittedRecipe
    );
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
