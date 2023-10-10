"""Serializers for recipes api"""

from rest_framework import serializers
from core.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes"""

    class Meta:
        model = Recipe
        fields= ["id", "name", "description","ingredients"]
        read_only_fields = ["id"]

