"""Views for recipe api"""

from rest_framework import viewsets

from core.models import Recipe
from recipe import serializers

class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage recipe APIs"""

    serializer_class = serializers.RecipeDetailSerializer
    queryset = Recipe.objects.all()

    def get_serializer_class(self):
        """Return the serializer class for request"""

        if self.action == "list":
            return serializers.RecipeSerializer
        
        return self.serializer_class
    