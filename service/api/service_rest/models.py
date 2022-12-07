from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    customer_name = models.CharField(max_length=150)
    time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vehicle_vin = models.CharField(max_length=17)
    discount = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
