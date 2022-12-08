from django.urls import path
from sales_rest.views import api_list_sales_person, api_list_sales_customer, api_list_sales_record, api_show_sales, api_automobile_vos

urlpatterns = [
    path("salespeople/", api_list_sales_person, name="api_list_sales_person"),
    path("salescustomer/", api_list_sales_customer, name="api_list_sales_customer"),
    path("salesrecord/", api_list_sales_record, name="api_list_sales_record"),
    path("salesrecord/<int:pk>/", api_show_sales, name="api_show_sales"),
    path("auto_vos/", api_automobile_vos, name="api_automobile_vos")
]
