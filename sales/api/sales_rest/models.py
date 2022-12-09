from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    model = models.CharField(max_length=100, null=True)
    manufacturer = models.CharField(max_length=100, null=True)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=100, null=True)
    sold = "sold"
    available="available"
    status=[
        (sold, "sold"),
        (available, "available")
    ]
    status = models.CharField(max_length=100, choices=status, default=available)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin":self.vin})

    def __str__(self):
        return self.vin

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=4, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Sales Person"
        verbose_name_plural = "Sales People"

class SalesCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class SalesRecord(models.Model):
    sale_price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    sales_customer = models.ForeignKey(
        SalesCustomer,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.automobile} for {self.sales_customer}'
