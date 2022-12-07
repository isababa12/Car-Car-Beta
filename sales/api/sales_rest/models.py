from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=4)

    class Meta:
        verbose_name = "Sales Person"
        verbose_name_plural = "Sales People"

class SalesCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=30)

class SalesRecord(models.Model):
    sale_price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="salespeople",
        on_delete=models.CASCADE,
    )
    sales_customer = models.ForeignKey(
        SalesCustomer,
        related_name="customers",
        on_delete=models.CASCADE,
    )
