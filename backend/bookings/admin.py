from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'hall_name', 'date', 'start_time', 'end_time')
    list_filter = ('hall_name', 'date')
    search_fields = ('name', 'hall_name')
