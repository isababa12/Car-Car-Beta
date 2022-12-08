from django.urls import path
from .views import api_technicians, api_appointments

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        "appointments/",
        api_appointments,
        name="api_appointments",
    ),
]
