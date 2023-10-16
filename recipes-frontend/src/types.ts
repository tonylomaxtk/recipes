export interface Recipe {
  id: number;
  description: string;
  ingredients: string;
  name: string;
}

export interface RecipeModel extends Omit<Recipe, "ingredients"> {
  ingredients: { name: string }[];
}
