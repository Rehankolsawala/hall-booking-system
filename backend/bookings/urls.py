from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_bookings),
    path('create/', views.create_booking),
    path('update/<int:pk>/', views.update_booking),
    path('delete/<int:pk>/', views.delete_booking),
]