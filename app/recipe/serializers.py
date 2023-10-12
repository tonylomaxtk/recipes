"""Serializers for recipes api"""

from rest_framework import serializers
from core.models import (Recipe, Ingredient)


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredients."""

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'recipe_id']
        read_only_fields = ['id']
        
class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes"""

    ingredients = IngredientSerializer(many=True, required=False) 
    class Meta:
        model = Recipe
        fields= ["id", "name", "description", "ingredients"]
        read_only_fields = ["id"]
        depth = 1


    def _create_ingredients(self, ingredients, recipe):
        """Handle creating ingredients"""

        for ingredient in ingredients: 
            
            try:
                existing_ingredient = Ingredient.objects.get(**ingredient)
            except Ingredient.DoesNotExist:
                newly_created_ing, created = Ingredient.objects.get_or_create(**ingredient)
                recipe.ingredients.add(newly_created_ing)



    def create(self, validated_data):
        """Create a recipe"""
        
        ingredients = validated_data.pop("ingredients", [])

        

        recipe = Recipe.objects.create(**validated_data)

        for item in ingredients:
            item.update({"recipe_id": recipe.id}) 

        self._create_ingredients(ingredients, recipe)

        return recipe


    def update(self, instance, validated_data):
        """Update recipe"""

        print("validated_data", validated_data)

        new_ingredients = validated_data.pop("ingredients", None)        
        
        if new_ingredients is not None:

            current_ingredients = list(instance.ingredients.filter(recipe_id=instance.id).values("name"))

            ingredients_to_add = []    
            ingredients_to_remove = []    

            for new_ingredient in new_ingredients:
                if new_ingredient not in current_ingredients:
                    ingredients_to_add.append(new_ingredient)

            for current_ingredient in current_ingredients:
                if current_ingredient not in new_ingredients:
                    ingredients_to_remove.append(current_ingredient)

            for ingredient_to_remove in ingredients_to_remove:
                Ingredient.objects.filter(name=ingredient_to_remove["name"], recipe_id=instance.id).delete()    

            for item in ingredients_to_add:
                item.update({"recipe_id": instance.id}) 
    
            self._create_ingredients(ingredients_to_add, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    


