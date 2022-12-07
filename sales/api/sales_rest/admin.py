from django.contrib import admin
from .models import SalesPerson, SalesCustomer, SalesRecord, AutomobileVO


# Register your models here.
@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesCustomer)
class SalesCustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass
