"""
Tests for recipe api
"""

from decimal import Decimal

from django.test import TestCase
from django.urls import reverse

from rest_framework import status 
from rest_framework.test import APIClient

from core.models import Recipe

from recipe.serializers import (
    RecipeSerializer,
    RecipeDetailSerializer
)                         



RECIPES_URL = reverse('recipe:recipe-list')


def create_recipe(**params):
    """create and return a sample recipe"""

    defaults = {
        "name": "test recipe",
        "description": "a random test recipe",
    }

    defaults.update(params) 

    recipe = Recipe.objects.create(**defaults)

    return recipe


def detail_url(recipe_id):
    """Create and return a recipe detail URL"""

    return reverse("recipe:recipe-detail", args=[recipe_id])

class RecipeAPITests(TestCase):
    """Test api requests"""

    def set_up(self):
        self.client = APIClient()

    def test_retrieve_recipes(self):
        """Test getting a list of recipes"""    

        create_recipe()
        create_recipe()

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.all().order_by("id")

        serializer = RecipeSerializer(recipes, many=True)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, serializer.data)


    def test_get_recipe_detail(self):
        """Test get recipe detail"""

        recipe = create_recipe()

        url = detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeDetailSerializer(recipe)

        self.assertEqual(res.data, serializer.data)

    def test_create_recipe(self):
        """Test creating a recipe"""

        payload = {
            'name': 'sample recipe',
            'description': 'I am a sample recipe'
        }
            
        res = self.client.post(RECIPES_URL, payload)

        self.assertEqual(res.status_code, 201)
        recipe = Recipe.objects.get(id=res.data["id"])
        for k, v in payload.items():
            self.assertEqual(getattr(recipe, k), v) 