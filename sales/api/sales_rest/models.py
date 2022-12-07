from django.db import models

# Create your models here.
class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=4)

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=30)
