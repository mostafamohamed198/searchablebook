from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
# from wkhtmltopdf.views import PDFTemplateView
from rest_framework.routers import DefaultRouter
urlpatterns = [
 
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("entries/", views.EntryListView.as_view()),
    path('author/',views.AuthorListView.as_view()),
    path('countries/', views.CountryListView.as_view()),
    path('favouriteEntries/',views.FavouriteEntriesView.as_view()),
    path('favouriteBooks/',views.FavouriteBooksView.as_view()),
    path('userslist/', views.UserListView.as_view()),
    path('booklist/', views.BookListView.as_view()),
    path('categories/', views.CategoryListView.as_view()),
    path('classification/', views.ClassificationListView.as_view()),
    path('entryForm/', views.EntryFormViewSet.as_view()),
    path('authorpostForm/', views.AuthorFormViewSet.as_view()),
    path('postbook/',views.BookFormViewSet.as_view()),
    path('entrybookformpost/', views.EntryBookFormViewSet.as_view()),
    path("entries/<int:pk>/", views.EntryDetailView.as_view()),
    path("entrieseditdata/<int:pk>/", views.EntryEditDetailView.as_view()),
    path('author/<int:pk>/', views.AuthorDetailView.as_view()),
    path('bookdetail/<int:pk>/', views.BookDetailView.as_view()),
    path('categorydetail/<int:pk>/',views.CategoryDetailView.as_view()),
    path('userinfodetails/<int:pk>/', views.UserInfoDetailView.as_view()),
    path('addpart/<int:pk>/', views.AddPartViewSet.as_view(), name="addpart" ),
    path('adddoor/<int:pk>/', views.AddDoorViewSet.as_view(), name="addpart" ),
    # path('entry/<int:id>/', views.entryPage, name='entry'),
    path('thebook/<int:id>/', views.required_book, name='thebook'),
    path('thedoor/<int:idd>/', views.required_door, name='thedoor'),
    path('thepart/<int:iddd>/', views.required_part, name='thepart'),
    path('thechapter/<int:idddd>/', views.required_chapter, name=''),
    path('resultsapproval/', views.results_page),
     path("userform/", views.UserFormView.as_view(), name="userform"),
    # path('thepdf/<int:id>/', PDFTemplateView.as_view(template_name='frontend/thepdf.html', filename='my_pdf.pdf'), name='pdf'),
    path('catentries/<int:catid>/', views.categoriezed_entries, name='catentries'),
    path('auth_info/<int:authid>/', views.author_info),
    path("authentication_state", views.authentication_state, name='authentication_state'),
    path("putFavourites/<int:id>", views.PutFavouritesView.as_view(), name="putFavourites"),
    path("putBookFavourites/<int:id>", views.PutBookFavouritesView.as_view(), name="putBookFavourites"),
     path('bookchange/<int:pk>/', views.BookChangeView.as_view(), name='bookchange'),
     path('authorchange/<int:pk>/', views.AuthorChangeView.as_view()),
     path('entrychange/<int:pk>/', views.EntryChangeView.as_view(), name='entrychange'),
     path('entry-book/<int:id>' ,views.EntryWithBookDetailView.as_view(), name='entry-book')
    
]

urlpatterns = format_suffix_patterns(urlpatterns)

