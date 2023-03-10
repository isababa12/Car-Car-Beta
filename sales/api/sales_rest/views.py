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
        'model',
        'manufacturer',
        'color',
        'year',
        "vin",
        "import_href",
        "status"
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'number',
        'id',
    ]

class SalesCustomerEncoder(ModelEncoder):
    model = SalesCustomer
    properties = [
        'name',
        'address',
        'phone',
        'id',
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        'id',
        'sale_price',
        'automobile',
        'sales_person',
        'sales_customer',
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonEncoder(),
        "sales_customer": SalesCustomerEncoder(),
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
        sales_person = SalesPerson.objects.create(**content)
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
            {"sales_customer": sales_customer},
            encoder=SalesCustomerEncoder
        )
    else:
        content = json.loads(request.body)
        sales_customer = SalesCustomer.objects.create(**content)
        return JsonResponse(
            sales_customer,
            encoder=SalesCustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales_record(request):

    if request.method == "GET":
        sales_record = SalesRecord.objects.all()
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        automobile = AutomobileVO.objects.get(vin=content["automobile"])
        content["automobile"] = automobile
        AutomobileVO.objects.filter(vin=content["automobile"]).update(status="sold")

        sales_person = SalesPerson.objects.get(id=content["sales_person"])
        content["sales_person"] = sales_person
        sales_customer = SalesCustomer.objects.get(id=content["sales_customer"])
        content["sales_customer"] = sales_customer
        sales_record = SalesRecord.objects.create(**content)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_automobile_vos(request):
    if request.method=="GET":
        automobile=AutomobileVO.objects.all()
        return JsonResponse(
            automobile,
            encoder=AutomobileVODetailEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def api_show_sales(request, pk):
    if request.method == "GET":
        sales = SalesRecord.objects.filter(sales_person=pk)
        return JsonResponse(
            {"sales_record": sales},
            encoder=SalesRecordEncoder,
            safe=False)
