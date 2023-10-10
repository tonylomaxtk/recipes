"""
Database models"""

from django.db import models
from django.conf import settings


class Recipe(models.Model):
    """recipe object"""
    name=models.CharField(max_length=255)
    description=models.TextField(blank=True)
    ingredients=models.JSONField()

    def __str__(self):
        return self.name