from django.contrib import admin
from .models import AutomobileVO, Appointment, Technician

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(Appointment)
