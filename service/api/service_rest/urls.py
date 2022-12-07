from django.urls import path
from .views import api_technicians, api_appointments, api_automobiles

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
    path(
        "automobiles/",
        api_automobiles,
        name="api_automobiles",
    ),
]
