from django.urls import path
from sales_rest.views import api_list_sales_person, api_show_sales_person, api_list_sales_customer, api_show_sales_customer, api_list_sales_record, api_show_sales_record

urlpatterns = [
    path("salesperson/", api_list_sales_person, name="api_list_sales_person"),
    path("salesperson/<int:id>/", api_show_sales_person, name="api_show_sales_person"),
    path("salescustomer/", api_list_sales_customer, name="api_list_sales_customer"),
    path("salescustomer/<int:id>/", api_show_sales_customer, name="api_show_sales_customer"),
    path("salesrecord/", api_list_sales_record, name="api_list_sales_record"),
    path("salesrecord/<int:id>/", api_show_sales_record, name="api_show_sales_record"),
]
