"""
Tests for recipe api
"""

from decimal import Decimal

from django.test import TestCase
from django.urls import reverse
 
from rest_framework.test import APIClient

from core.models import (Recipe, Ingredient)

from recipe.serializers import (
    RecipeSerializer
)                         



RECIPES_URL = reverse('recipe:recipe-list')


def create_recipe(**params):
    """create and return a sample recipe"""

    defaults = {
        "name": "test recipe",
        "description": "a random test recipe"
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

        serializer = RecipeSerializer(recipe)

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

    def test_partial_update(self):
        """Test partial recipe update"""        
        original_description = "Im the original description" 
        recipe = create_recipe(
            description = original_description 
        )

        payload = {
            "name": "new recipe name"
            }
        
        url = detail_url(recipe.id)

        res = self.client.patch(url, payload, content_type='application/json')

        print(res.content)

        self.assertEqual(res.status_code, 200)
        recipe.refresh_from_db()
        self.assertEqual(recipe.name, payload["name"])
        self.assertEqual(recipe.description, original_description)

    def test_full_update(self):
        """Test full update of recipe"""

        recipe = create_recipe()

        payload = {
           "name": "updated recipe", 
           "description": "I'm an updated recipe"
        }

        url = detail_url(recipe.id)
        res = self.client.put(url, payload, content_type='application/json')

        self.assertEqual(res.status_code, 200)
        recipe.refresh_from_db()
        for k, v in payload.items():
            self.assertEqual(getattr(recipe, k), v)


    def test_delete_recipe(self):
        """test deleteing a recipe"""

        recipe = create_recipe()

        url = detail_url(recipe.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, 204)
        self.assertFalse(Recipe.objects.filter(id=recipe.id).exists())

    def test_create_ingredient_on_update(self):
        """Test creating an ingredient when updating a recipe"""        
        recipe = create_recipe()

        payload={"ingredients": [{"name": "limes"}]}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, content_type='application/json')

        self.assertEqual(res.status_code, 200 )

            
        new_ingredient = Ingredient.objects.get(name="limes")
        print("new_ingredient",new_ingredient )
        
        self.assertIn(new_ingredient, recipe.ingredients.all())


    def test_clear_recipe_ingredients(self):
        """test clearing a recipes ingredients"""
        recipe = create_recipe()
        ingredient = Ingredient.objects.create(name="Garlic", recipe_id=recipe.id)
        
        recipe.ingredients.add(ingredient)

        payload = {"ingredients": []}
        url = detail_url(recipe.id)
        res= self.client.patch(url, payload,content_type='application/json' )

        self.assertEqual(res.status_code, 200)
        self.assertEqual(recipe.ingredients.count(), 0)