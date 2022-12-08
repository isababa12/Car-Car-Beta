from django.urls import path
from .views import api_technicians, api_list_appointments, api_get_appointments_by_vin

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments",
    ),
    path(
        "appointments/<str:vin>",
        api_get_appointments_by_vin,
        name="api_get_appointments",
    )

]
