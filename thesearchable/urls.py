from django.urls import path
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from wkhtmltopdf.views import PDFTemplateView


urlpatterns = [
    path('index', views.index, name='index'),
    path('layout', views.index, name='layout'),
    path('pdf', views.index, name='pdf'),
    path("entries/", views.EntryList.as_view()),
    path("entries/<int:pk>/", views.EntryDetail.as_view()),
    path('author/<int:pk>/', views.AuthorDetail.as_view()),
    path('entry/<int:id>/', views.index, name='entry'),
    path('thebook/<int:id>/', views.required_book, name='thebook'),
    path('thedoor/<int:idd>/', views.required_door, name='thedoor'),
    path('thepart/<int:iddd>/', views.required_part, name='thepart'),
    path('thechapter/<int:idddd>/', views.required_chapter, name=''),
    path("list/", views.ResultList, name="list"),
    path('thepdf', PDFTemplateView.as_view(template_name='frontend/thepdf.html', filename='my_pdf.pdf'), name='pdf'),
    path('articlepdf/<int:id>/', views.resume_pdf, name="resume-pdf")

]

urlpatterns = format_suffix_patterns(urlpatterns)