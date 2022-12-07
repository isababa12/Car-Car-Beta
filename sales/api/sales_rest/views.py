from django.shortcuts import render
from django.http import JsonResponse
from .models import SalesPerson, Customer
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'number',
    ]
    def get_extra_data(self, o):
        return {
            "id": o.id,
        }

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'phone',
    ]

class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'number',
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone',
    ]

@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):

    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonListEncoder
        )
    else:
        content = json.loads(request.body)
        # try:
        #     bin_id = content["bin"]
        #     bin = BinVO.objects.get(id=bin_id)
        #     content["bin"] = bin
        # except BinVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid bin id"},
        #         status=400
        #     )
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_person(request, id):

    if request.method == "GET":
        sales_person = SalesPerson.objects.filter(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonDetailEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "sales_person" in content:
                sales_person = SalesPerson.objects.get(id=content["sales_person"])
                content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "This sales person do not exist"},
                status=400,
            )
    SalesPerson.objects.filter(id=id).update(**content)
    sales_person = SalesPerson.objects.get(id=id)
    return JsonResponse(
        sales_person,
        encoder=SalesPersonDetailEncoder,
        safe=False,
    )

@require_http_methods(["GET", "POST"])
def api_list_customer(request):

    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        # try:
        #     bin_id = content["bin"]
        #     bin = BinVO.objects.get(id=bin_id)
        #     content["bin"] = bin
        # except BinVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid bin id"},
        #         status=400
        #     )
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, id):

    if request.method == "GET":
        customer = Customer.objects.filter(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "This customer does not exist"},
                status=400,
            )
    Customer.objects.filter(id=id).update(**content)
    customer = Customer.objects.get(id=id)
    return JsonResponse(
        customer,
        encoder=CustomerDetailEncoder,
        safe=False,
    )
