from django.shortcuts import render
from django.http import JsonResponse
from .models import SalesPerson, SalesCustomer, SalesRecord, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]

class SalesCustomerListEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        'name',
        'phone',
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'number',
    ]
    def get_extra_data(self, o):
        return {
            "id": o.id,
        }

class SalesCustomerDetailEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        'name',
        'address',
        'phone',
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        'sale_price',
        'automobile',
        'sales_person',
        'sales_customer',
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonEncoder(),
        "sales_customer": SalesCustomerListEncoder(),
    }

    def get_extra_data(self, o):
        return{
            "id": o.id,
        }

@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):

    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder
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
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_person(request, id):

    if request.method == "GET":
        sales_person = SalesPerson.objects.filter(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
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
        encoder=SalesPersonEncoder,
        safe=False,
    )

@require_http_methods(["GET", "POST"])
def api_list_sales_customer(request):

    if request.method == "GET":
        sales_customer = SalesCustomer.objects.all()
        return JsonResponse(
            {"sales_customers": sales_customer},
            encoder=SalesCustomerListEncoder
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
        sales_customer = SalesCustomer.objects.create(**content)
        return JsonResponse(
            sales_customer,
            encoder=SalesCustomerDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_customer(request, id):

    if request.method == "GET":
        sales_customer = SalesCustomer.objects.filter(id=id)
        return JsonResponse(
            sales_customer,
            encoder=SalesCustomerDetailEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = SalesCustomer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "sales_customer" in content:
                sales_customer = SalesCustomer.objects.get(id=content["sales_customer"])
                content["sales_customer"] = sales_customer
        except SalesCustomer.DoesNotExist:
            return JsonResponse(
                {"message": "This sales customer does not exist"},
                status=400,
            )
    SalesCustomer.objects.filter(id=id).update(**content)
    sales_customer = SalesCustomer.objects.get(id=id)
    return JsonResponse(
        sales_customer,
        encoder=SalesCustomerDetailEncoder,
        safe=False,
    )

@require_http_methods(["GET", "POST"])
def api_list_sales_record(request):

    if request.method == "GET":
        sales_record = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_record": sales_record},
            encoder=SalesRecordEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_id = content['vin']
            automobile = AutomobileVO.objects.get(vin=automobile_id)
            content['vin'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400
            )
        sales_record = SalesRecord.objects.create(**content)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_record(request, id):

    if request.method == "GET":
        sales_record = SalesRecord.objects.filter(id=id)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = SalesRecord.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "sales_record" in content:
                sales_record = SalesRecord.objects.get(id=content["sales_record"])
                content["sales_record"] = sales_record
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "This sales record do not exist"},
                status=400,
            )
    SalesRecord.objects.filter(id=id).update(**content)
    sales_record = SalesRecord.objects.get(id=id)
    return JsonResponse(
        sales_record,
        encoder=SalesRecordEncoder,
        safe=False,
    )
