from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from wkhtmltopdf.views import PDFTemplateView
from rest_framework.routers import DefaultRouter
# router = DefaultRouter()
# router.register('entry', views.EntryViewSet, basename='entry')
# router = DefaultRouter()
# router.register(r'mymodels', views.MyModelViewSet, basename='user')
urlpatterns = [
    path('index', views.index, name='index'),
    path('layout', views.index, name='layout'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('pdf', views.index, name='pdf'),
    path("entries/", views.EntryList.as_view()),
    path('author/',views.AuthorList.as_view()),
    path('countries/', views.CountriesList.as_view()),
    path('favouriteEntries/',views.FavouriteEntries.as_view()),
    path('userslist/', views.UsersList.as_view()),
    path('booklist/', views.BookList.as_view()),
    path('categories/', views.CategoriesList.as_view()),
    path('classification/', views.ClassificationList.as_view()),
    path('entryForm/', views.EntryFormViewSet.as_view()),
    path('authorpostForm/', views.AuthorFormViewSet.as_view()),
    path('postbook/',views.BookFormViewSet.as_view()),
    path('entrybookform/', views.EntryBookFormViewSet.as_view()),
    path("entries/<int:pk>/", views.EntryDetail.as_view()),
    path("entrieseditdata/<int:pk>/", views.EntryEditDetail.as_view()),
    path('author/<int:pk>/', views.AuthorDetail.as_view()),
    path('bookdetail/<int:pk>/', views.BookDetail.as_view()),
    path('categorydetail/<int:pk>/',views.CategoryDetail.as_view()),
    path('userinfodetails/<int:pk>/', views.UserInfoDetail.as_view()),
    path('addpart/<int:pk>/', views.addpartViewSet.as_view(), name="addpart" ),
    path('adddoor/<int:pk>/', views.addDoorViewSet.as_view(), name="addpart" ),
    # path('entry/<int:id>/', views.entryPage, name='entry'),
    path('entry/<int:id>/', views.index, name='entry'),
    path('', views.landing, name='landing'),
    path('results/<str:stringvalue>/', views.results, name='results'),
    path('results/', views.landing, name='resultsw'),
    path('thebook/<int:id>/', views.required_book, name='thebook'),
    path('thedoor/<int:idd>/', views.required_door, name='thedoor'),
    path('thepart/<int:iddd>/', views.required_part, name='thepart'),
    path('thechapter/<int:idddd>/', views.required_chapter, name=''),
    path('resultsapproval/', views.resultsPage),
     path("userform/", views.userform, name="userform"),
    path('thepdf/<int:id>/', PDFTemplateView.as_view(template_name='frontend/thepdf.html', filename='my_pdf.pdf'), name='pdf'),
    path('articlepdf/<int:id>/', views.get_generated_problems_in_pdf, name="resume-pdf"),
    path('catentries/<int:catid>/', views.categoriezed_entries, name='catentries'),
    path('auth_info/<int:authid>/', views.author_info),
    path('authordetails/<int:id>',views.index, name='authordetails'),
    path('category/<int:id>',views.index, name='category'),
    path("login/", views.landing, name="login"),
    path("register/", views.register, name="register"),
    path("authentication_state", views.authentication_state, name='authentication_state'),
    path("form", views.landing, name="form"),
    path("favourites/", views.landing, name="favourites"),
    path("putFavourites/<int:id>", views.putFavourites.as_view(), name="putFavourites"),
    path("users", views.landing, name="users"),
    path('userinfo/<int:id>', views.index, name="userinfo"),
    path('useredit/<int:id>', views.index, name="useredits"),
    path('bookform', views.landing, name='bookform'),
    path('entrybookform', views.landing, name='entrybookform'),
    path('authorform', views.landing, name='authorform'),
     
     path('editbook/<int:id>', views.index, name="editbook"),
     path('editauthor/<int:id>', views.index, name="editauthor"),
     path('bookchange/<int:pk>/', views.book_change.as_view(), name='bookchange'),
     path('authorchange/<int:pk>/', views.Author_change.as_view()),
     path('editform/<int:id>', views.index, name="editform"),
     path('entrychange/<int:pk>/', views.Entry_change.as_view(), name='entrychange'),
     path('adminPageLinks/', views.landing, name="adminPage"),
     path('editPageLinks/', views.landing, name="adminPage")
    
]

urlpatterns = format_suffix_patterns(urlpatterns)

