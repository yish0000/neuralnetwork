from django.urls import path
from . import views

app_name = 'digits'
urlpatterns = [
	path('', views.index, name='index'),
	path('identify/', views.identify, name='identify'),
]