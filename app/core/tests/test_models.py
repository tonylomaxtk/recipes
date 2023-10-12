"""
Tests for models
"""

from django.test import TestCase
from decimal import Decimal

from core import models


class ModelTests(TestCase):
    """test models"""

    def test_create_recipe(self):
        """Test creating a recipe is successful"""

        recipe = models.Recipe.objects.create(
            name="Test recipe name",
            description="A test recipe",
        )   

        self.assertEqual(str(recipe), recipe.name)

    def test_create_ingredient(self):
        """Test creating an ingredient is successful"""

        recipe = models.Recipe.objects.create(
            name="Test recipe name",
            description="A test recipe with ingredients",
        )   

        ingredient = models.Ingredient.objects.create(
            name="test ingredient",
            recipe=recipe
        )
