from django.urls import path
from . import views
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
    path('author/<int:pk>/', views.AuthorDetail.as_view()),
    path('bookdetail/<int:pk>/', views.BookDetail.as_view()),
    path('categorydetail/<int:pk>/',views.CategoryDetail.as_view()),
    path('userinfodetails/<int:pk>/', views.UserInfoDetail.as_view()),
    path('addpart/<int:pk>/', views.addpartViewSet.as_view(), name="addpart" ),
    path('adddoor/<int:pk>/', views.addDoorViewSet.as_view(), name="addpart" ),
    path('entry/<int:id>/', views.entryPage, name='entry'),
    path('', views.landing, name='landing'),
    path('results/<str:stringvalue>/', views.results, name='results'),
    path('results/', views.landing, name='resultsw'),
    path('thebook/<int:id>/', views.required_book, name='thebook'),
    path('thedoor/<int:idd>/', views.required_door, name='thedoor'),
    path('thepart/<int:iddd>/', views.required_part, name='thepart'),
    path('thechapter/<int:idddd>/', views.required_chapter, name=''),
    path('resultsapproval/', views.resultsPage),
    # path("list/", views.ResultList, name="list"),
    path("userform/", views.userform, name="userform"),
    path('thepdf/<int:id>/', PDFTemplateView.as_view(template_name='frontend/thepdf.html', filename='my_pdf.pdf'), name='pdf'),
    path('articlepdf/<int:id>/', views.resume_pdf, name="resume-pdf"),
    # path('articlepdf/<int:id>/', views.index, name="resume-pdf"),
    # path('product_search/<str:query>/', views.EntryyDocumentView.as_view())
    path('catentries/<int:catid>/', views.categoriezed_entries, name='catentries'),
    path('auth_info/<int:authid>/', views.author_info),
    path('authordetails/<int:theauthid>',views.authordetails, name='authordetails'),
    path('category/<int:catid>',views.categoryPage, name='category'),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),
    path("authentication_state", views.authentication_state, name='authentication_state'),
    path("form", views.formsPage, name="form"),
    path("favourites/", views.landing, name="favourites"),
    path("putFavourites/<int:id>", views.putFavourites, name="putFavourites"),
    path("users", views.usersGroupPage, name="users"),
    path('userinfo/<int:id>', views.usersPage, name="userinfo"),
    path('useredit/<int:id>', views.usersPage, name="useredits"),
    # path('api/posts/', views.PostView.as_view(), name= 'posts_list'),
    path('bookform', views.formsPage, name='bookform'),
    path('entrybookform', views.formsPage, name='entrybookform'),
     path('authorform', views.formsPage, name='authorform')
]

urlpatterns = format_suffix_patterns(urlpatterns)

