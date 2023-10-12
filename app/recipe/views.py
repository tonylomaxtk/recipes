"""Views for recipe api"""

from rest_framework import viewsets

from core.models import (Recipe, Ingredient)

from recipe import serializers

class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage recipe APIs"""

    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()

    def get_serializer_class(self):
        """Return the serializer class for request"""

        if self.action == "list":
            return serializers.RecipeSerializer
        
        return self.serializer_class


# class IngredientViewSet(RecipeViewSet):
#     """Manage ingredients in the db"""
#     serializer_class = serializers.IngredientSerializer
#     queryset = Ingredient.objects.all()    