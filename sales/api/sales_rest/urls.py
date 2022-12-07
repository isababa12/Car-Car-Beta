from django.urls import path
from sales_rest.views import api_list_sales_person, api_show_sales_person, api_list_customer, api_show_customer

urlpatterns = [
    path("salesperson/", api_list_sales_person, name="api_list_sales_person"),
    path("salesperson/<int:id>/", api_show_sales_person, name="api_show_sales_person"),
    path("customer/", api_list_customer, name="api_list_customer"),
    path("customer/<int:id>/", api_show_customer, name="api_show_customer"),
]
