from django.db import models

# class AutomobileVO(models.Model):
#     vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    customer_name = models.CharField(max_length=150)
    appointment_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    customer_vin = models.CharField(max_length=17)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    # automobile = models.ForeignKey(
    #     AutomobileVO,
    #     related_name="appointments",
    #     on_delete=models.CASCADE,
    #     null=True
    # )
