from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'hall_name',
        'mobile',
        'receipt_no',
        'receipt_date',
        'total',
    )
    list_filter = ('hall_name', 'receipt_date')
    search_fields = ('name', 'mobile', 'receipt_no')
