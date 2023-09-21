from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('index', views.index, name='index'),
    path('layout', views.index, name='layout'),
    path('pdf', views.index, name='pdf'),
    path('entry/<int:id>/', views.index, name='entry'),
    path('', views.landing, name='landing'),
    path('results/<str:stringvalue>/', views.results, name='results'),
    path('results/', views.landing, name='resultsw'),
    path('articlepdf/<int:id>/', views.get_generated_problems_in_pdf, name="resume-pdf"),
    path('authordetails/<int:id>',views.index, name='authordetails'),
    path('category/<int:id>',views.index, name='category'),
    path("login/", views.landing, name="login"),
    path("register/", views.register, name="register"),
    path("form", views.landing, name="form"),
    path("favourites/", views.landing, name="favourites"),
    path("users", views.landing, name="users"),
    path('userinfo/<int:id>', views.index, name="userinfo"),
    path('useredit/<int:id>', views.index, name="useredits"),
    path('bookform', views.landing, name='bookform'),
    path('entrybookform', views.landing, name='entrybookform'),
    path('authorform', views.landing, name='authorform'),
     path('editbook/<int:id>', views.index, name="editbook"),
     path('editauthor/<int:id>', views.index, name="editauthor"),
     path('editform/<int:id>', views.index, name="editform"),
     path('adminPageLinks/', views.landing, name="adminPage"),
     path('editPageLinks/', views.landing, name="adminPage"),
     path('book/<int:id>', views.index, name='book'),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)