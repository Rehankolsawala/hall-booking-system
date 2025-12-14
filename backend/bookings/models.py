from django.db import models

class Booking(models.Model):
    mobile = models.CharField(max_length=15)
    hall_name = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    purpose = models.TextField()

    booking_date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    rent = models.IntegerField(default=0)
    additional_charges = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    remark = models.TextField(blank=True)
    receipt_no = models.CharField(max_length=50)
    receipt_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.hall_name}"
