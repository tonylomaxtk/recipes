"""
Tests for recipe api
"""

from decimal import Decimal

from django.test import TestCase
from django.urls import reverse

from rest_framework import status 
from rest_framework.test import APIClient

from core.models import Recipe

from recipe.serializers import RecipeSerializer

RECIPES_URL = reverse('recipe:recipe-list')


def create_recipe(**params):
    """create and return a sample recipe"""

    defaults = {
        "name": "test recipe",
        "description": "a random test recipe",
        "ingredients": [{"ingredient":"ingredient1"},{"ingredient":"ingredient2"},{"ingredient":"ingredient3"}]
    }

    defaults.update(params) 

    recipe = Recipe.objects.create(**defaults)

    return recipe

class RecipeAPITests(TestCase):
    """Test api requests"""

    def set_up(self):
        self.client = APIClient()

    def test_retrieve_recipes(self):
        """Test getting a list of recipes"""    

        create_recipe()
        create_recipe()

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.all().order_by("-id")

        serializer = RecipeSerializer(recipes, many=True)
        self.assertEqual(res.status, status.HTTP_20O_OK)
        self.assertEqual(res.data, serializer.data)



