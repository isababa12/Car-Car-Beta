from django.contrib import admin
from .models import  Appointment, Technician


admin.site.register(Technician)
admin.site.register(Appointment)
