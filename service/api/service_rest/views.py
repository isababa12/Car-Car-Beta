from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]

    def get_extra_data(self, o):
        return {"id": o.id}


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "time",
        "reason",
        "vehicle_vin",
        "discount",
        "technician",
        "completed",
        "canceled",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "id": o.id,
        }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(pk=content["technician"])
            content["technician"] = technician
            try:
                automobile = AutomobileVO.objects.get(vin=content["vehicle_vin"])
                content["discount"] = True
            except:
                content["discount"] = False
            content["completed"] = False
            content["canceled"] = False
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET"])
def api_get_appointments_by_vin(request, vin):
    appointments = Appointment.objects.filter(vehicle_vin=vin)
    if len(appointments) > 0:
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        response = JsonResponse(
            {"message": "VIN does not exist"}
        )
        response.status_code = 404
        return response


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        {"canceled": appointment.canceled}
    )


def api_complete_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.complete()
    return JsonResponse(
        {"completed": appointment.completed}
    )
