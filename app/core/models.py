"""
Database models"""

from django.db import models
from django.conf import settings


class Recipe(models.Model):
    """recipe object"""
    name=models.CharField(max_length=255)
    description=models.TextField(blank=True)
    

    def __str__(self):
        return self.name    

class Ingredient(models.Model):
    """ingredient object"""   

    name=models.CharField(max_length=255)
    recipe=models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name