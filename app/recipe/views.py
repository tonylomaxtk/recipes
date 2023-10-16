"""Views for recipe api"""

from rest_framework import viewsets

from core.models import (Recipe, Ingredient)

from recipe import serializers

class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage recipe APIs"""

    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        """Return queryset results"""   

        name_param = self.request.query_params.get('name')

        print("name_param",name_param)
        if name_param is not None:
            filtered_results = self.queryset.filter(name__contains=name_param)
            return filtered_results
        
        else:
            return  Recipe.objects.all()