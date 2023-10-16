import axiosInstance from "../axiosConfig";
import { RecipeModel } from "../types";

export const getRecipes = async () => {
  return await axiosInstance.get("/");
};

export const deleteRecipe = (id: number) => {
  axiosInstance.delete(`/${id}`);
};

export const updateRecipe = (id: number, updatedRecipe: RecipeModel) => {
  axiosInstance.patch(`/${id}/`, updatedRecipe);
};

export const createRecipe = async (recipeToCreate: RecipeModel) => {
  await axiosInstance.post(`/`, recipeToCreate);
};
