from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import *
from markdown2 import markdown
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
import markdown as md
from django.contrib.auth import authenticate, login, logout
from django import template
from django.template.defaultfilters import stringfilter
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from django.db import IntegrityError
from django.urls import reverse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .utils import render_to_pdf
import io
from django_elasticsearch_dsl_drf.pagination import PageNumberPagination
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer,PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
import reportlab
from reportlab.pdfbase.ttfonts import TTFont
from rest_framework.viewsets import ModelViewSet
import arabic_reshaper
from bidi.algorithm import get_display
import io
from rest_framework.authentication import TokenAuthentication
from django.http import FileResponse
from reportlab.pdfgen import canvas
import pdfkit
from django.template.loader import get_template
from django.conf import settings
import os
import json
from wkhtmltopdf.views import PDFTemplateResponse 
from django_elasticsearch_dsl_drf.constants import SUGGESTER_COMPLETION, SUGGESTER_PHRASE, SUGGESTER_TERM
from django_elasticsearch_dsl_drf.filter_backends import SearchFilterBackend, FilteringFilterBackend, SuggesterFilterBackend
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from .documents import EntryDocument
# from .serializers import EntryDocumentSerializer
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_EXCLUDE,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    
)
from elasticsearch_dsl import Q
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    FacetedSearchFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
)
from elasticsearch_dsl import Q
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("landing"))
        else:
            return render(request, "frontend/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "frontend/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("landing"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "frontend/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            userInfo.objects.create(user = user)
        except IntegrityError:
            return render(request, "frontend/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("landing"))
    else:
        return render(request, "frontend/register.html")

def index(request, id):
    return render(request, 'frontend/index.html')

def landing(request):
    return render(request, 'frontend/index.html')

def results(request, stringvalue):
    return render(request, 'frontend/index.html')

def authordetails(request, theauthid):
    return render(request, 'frontend/index.html')

def category(request, catid):
    return render(request, 'frontend/index.html')

def entryPage(request, id):
    if request.user.is_authenticated:
        theUser = request.user
        theUserProfile = userInfo.objects.get(user = theUser.id)
        theRequestedEntry = entry.objects.get(id = id)
        if theUserProfile.approved:
            if theRequestedEntry.entryOrigin in theUserProfile.approvedcountries.all() and theRequestedEntry.entryCategory in theUserProfile.approvedcategories.all():
                 return render(request, 'frontend/index.html')
            else: 
                return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
        else:
            return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
    else:
        return render(request, "frontend/login.html", {
                "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
            })
    
def formsPage(request):
    if request.user.is_authenticated:
        theUser = request.user
        theUserProfile = userInfo.objects.get(user = theUser.id)
        if theUserProfile.is_admin:
            return render(request, 'frontend/index.html')
        else:
            return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
       
    else:
        return render(request, "frontend/login.html", {
                "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
            })
    
def usersPage(request,id):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return render(request, 'frontend/index.html')
        else:
            return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
       
    else:
        return render(request, "frontend/login.html", {
                "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
            })
def usersGroupPage(request):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return render(request, 'frontend/index.html')
        else:
            return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
       
    else:
        return render(request, "frontend/login.html", {
                "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
            })
def categoryPage(request, catid):
    if request.user.is_authenticated:
        theUser = request.user
        theUserProfile = userInfo.objects.get(user = theUser.id)
        theRequestedCategory = categories.objects.get(id = catid)
        if theUserProfile.approved:
            if theRequestedCategory in theUserProfile.approvedcategories.all():
                 return render(request, 'frontend/index.html')
            else: 
                return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
        else:
            return render(request, "frontend/login.html", {
                "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
            })
    else:
        return render(request, "frontend/login.html", {
                "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
            })
    
# def resultsPage(request, stringvalue):
#     if request.user.is_authenticated:
#         theUser = request.user
#         theUserProfile = userInfo.objects.get(user = theUser.id)
#         if theUserProfile.approved:
#             return render(request, 'frontend/index.html')
            
#         else:
#             return render(request, "frontend/login.html", {
#                 "message": "ليس مصرح لك بعرض هذا المحتوي قم بتسجيل الدخول بحساب مصرح أو قم بالتواصل مع مسئولي الموقع"
#             })
#     else:
#         return render(request, "frontend/login.html", {
#                 "message": "يجب تسجيل الدخول بحساب مصرح له بعرض المحتوي"
#             })
@api_view(['GET',  'DELETE'])
def resultsPage(request):
    if request.user.is_authenticated:
        theUser = request.user
        theUserProfile = userInfo.objects.get(user = theUser.id)
        if theUserProfile.approved:
            return Response({'approved': True})
            
        else:
            return Response({'approved': False})
    else:
        return Response({'approved': False})
class EntryList(generics.ListCreateAPIView):
    queryset = entry.objects.all()
    serializer_class = EntrySerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = author.objects.all()
    serializer_class = AuthorSerializer

class BookList(generics.ListCreateAPIView):
    queryset = book.objects.all()
    serializer_class = BookSerializer

class CountriesList(generics.ListCreateAPIView):
    queryset = countries.objects.all()
    serializer_class = CountriesSerializer

class CategoriesList(generics.ListCreateAPIView):
    queryset = categories.objects.all()
    serializer_class = CategorySerializer

class UsersList(generics.ListCreateAPIView):
    queryset = userInfo.objects.order_by('user__username')
    serializer_class = UserInfoSerializer

class FavouriteEntries(APIView):
    def get(self, request, format=None):
        requestedUser = request.user
        desiredEntries =  entry.objects.filter(favouriteusers__in = [requestedUser.id])
        serializer = EntryFavourtiesSerializer(desiredEntries, many=True)
        return Response(serializer.data)

class ClassificationList(generics.ListCreateAPIView):
    queryset = classification.objects.all()
    serializer_class = ClassificationSerializer

    
class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = entry.objects.all()
    serializer_class = EntrySerializer


class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = author.objects.all()
    serializer_class = AuthorSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = book.objects.all()
    serializer_class = BookSerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = categories.objects.all()
    serializer_class = CategorySerializer

class UserInfoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = userInfo.objects.all()
    serializer_class = UserInfoSerializer


class EntryFormViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        serializer = EntryFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AuthorFormViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        serializer = AuthorFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EntryBookFormViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        print('working')
        data = json.loads(request.body)
        title = data.get('title')
        body = data.get('body')
        bibliography = data.get('bibiliography')
        bookId = data.get('book')
        partId = data.get('part')
        
        theBook = book.objects.get(id = int(bookId))
        print(theBook.bookOrigin.id)
        theBookOrigin = theBook.bookOrigin
        theBookCategory = theBook.bookCategory
        theBookClassification = theBook.bookClassification.all()
        theBookCover = theBook.cover.url[6:]
        print (theBookCover[6:])
        theBookAuthors = theBook.author.all()
        # print(theBookAuthors)
        
        # newEntry = entry.objects.create(title = title, body=body, bibiliography = bibliography, entryOrigin = theBook.bookOrigin, entryPubDate= theBook.publicationDate, entryauthor =theBook.author, entryCover = theBook.cover, entryClassification = theBook.bookClassification, entryCategory = theBook.bookCategory)
        newEntry = entry.objects.create(title = title, body=body, bibiliography = bibliography, entryOrigin = theBookOrigin, entryPubDate= theBook.publicationDate, entryCover=theBookCover,  entryCategory = theBookCategory)
        
        # if newEntry.is_valid():
        # newEntry.save() 
        newEntry.entryauthor.set(theBookAuthors)
        # newEntry.entryCover = theBookCover
        newEntry.entryClassification.set(theBookClassification)
        newEntry.save()
        if int(partId) != 0:
            thePart = part.objects.get(id = int(partId))
            thePart.relatedEntries.add(newEntry)
            thePart.save()
        theBook.relatedChapters.add(newEntry)
        theBook.save()
        return Response(data,status=status.HTTP_201_CREATED)
                                                                                                    
        # return Response(newEntry.errors, status=status.HTTP_400_BAD_REQUEST)                                                                                                
                                                                                                              
                                                                                                            
                                                                                                               
        # serializer = EntryFormSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data,status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookFormViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        serializer = BookFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET'])
def required_book(request, id):
    snippet = 0
    thechabpterbook = entry.objects.get(id = id)
    for object in book.objects.all():
        for chapter in object.relatedChapters.all():
            if int(chapter.id) == int(id):
                snippet = book.objects.get(id = object.id)
                print(object.id)

    if request.method == 'GET':
        serializer = BookSerializer(snippet)
        return Response(serializer.data)
    
@api_view(['GET'])
def required_door(request, idd):
    try:
        thedoor = door.objects.get(id = idd)
    except book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoorSerializer(thedoor)
        return Response(serializer.data)

@api_view(['GET'])
def required_part(request, iddd):
    try:
        thepart = part.objects.get(id = iddd)
    except part.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PartSerializer(thepart)
        return Response(serializer.data)
    
@api_view(['GET'])
def required_chapter(request, idddd):
    try:
        thechapter = entry.objects.get(id = idddd)
    except thechapter.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EntrySerializer(thechapter)
        return Response(serializer.data)

class addpartViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, pk, format=None):
        serializer = PartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            first_value = list(serializer.data.values())[0]
            print(first_value)
            relatedbook = book.objects.get(id=pk)
            relatedbook.relatedParts.add(first_value)
            relatedbook.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class addpartViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, pk, format=None):
        serializer = PartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            first_value = list(serializer.data.values())[0]
            print(first_value)
            relatedbook = book.objects.get(id=pk)
            print(f'the book is {relatedbook.id}')
            
            relatedbook.relatedParts.add(int(first_value))
            relatedbook.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class addDoorViewSet(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, pk, format=None):
        print(request.body)
        data = json.loads(request.body)
        content = data.get('content')
        for one in content:
            print('working')
            serializer = DoorSerializer(data=one)
            if serializer.is_valid():
                serializer.save()
                first_value = list(serializer.data.values())[0]
                print(first_value)
                relatedbook = book.objects.get(id=pk)
                relatedbook.relatedDoors.add(int(first_value))
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

wkhtml_to_pdf = os.path.join(
    settings.BASE_DIR, "wkhtmltopdf.exe")


def resume_pdf(request,id):
    # return render(request, 'frontend/index.html')
    options = {
        'page-size': 'A4',
        'page-height': "13in",
        'page-width': "10in",
        'margin-top': '0in',
        'margin-right': '0in',
        'margin-bottom': '0in',
        'margin-left': '0in',
        'encoding': "UTF-8",
        'no-outline': None
    }

    template_path = 'frontend/thepdf.html'
    template = get_template(template_path)
    
    context = {"name": "Areeba Seher"}
    html = template.render(context)

    config = pdfkit.configuration(wkhtmltopdf=wkhtml_to_pdf)

    pdf = pdfkit.from_string(html, False, configuration=config, options=options)

    # Generate download
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="resume.pdf"'
    theEntry = entry.objects.get(id= id)
    context = {'entry' : theEntry, 'entrybody': markdown(theEntry.body) }
    # print(response.status_code)
    if response.status_code != 200:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    # return response
    return PDFTemplateResponse(request=request, cmd_options={'disable-javascript':True}, template=template, context=context)


@api_view(['GET'])
def categoriezed_entries(request,  catid):
    neededCategory = categories.objects.get(id = catid)
    if request.method == 'GET':
        entrieslist = entry.objects.filter(entryCategory = neededCategory).order_by('-id')[:9]
        serializer = EntrySerializer(entrieslist, many=True)
        return Response(serializer.data,)
    
@api_view(['GET'])
def author_info(request, authid):
    x = []
    y= []
    theauthor = author.objects.get(id=authid)
    theentries = entry.objects.filter(entryauthor = theauthor)
    for oneentry in theentries:
   
        entrydata = {
            'id': oneentry.id,
            'title': oneentry.title,
            'entryCover': oneentry.entryCover.url,
            'entryCategory': oneentry.entryCategory.categories_dictionary,
            'entryPubDate': oneentry.entryPubDate

           
        }
        entrycategoriess = {
            'entryCategory': oneentry.entryCategory.thecategory,
            'catid' : oneentry.entryCategory.id
        }
        x.append(entrydata)
        # for cat in y:
        if entrycategoriess not in y:
            y.append(entrycategoriess)
              
    # y = list(set(y)) 
    print(y)
    return Response ({"name": theauthor.name, 'degree':theauthor.degree, 'about': theauthor.about,'picture':theauthor.picture.url, 'relatedEntries':x, 'categories': y})

@api_view(['GET',  'DELETE'])
def authentication_state(request):
    if request.user.is_authenticated:
        return Response ({"authentication" : True, 'userid': request.user.id})
    else:
        return Response ({"authentication" : False})


@csrf_exempt
def putFavourites (request, id):
    print('recieved')
    if request.method == 'PUT':
        data = json.loads(request.body)
        favouriteEntry = entry.objects.get(id= id)
        user = request.user
        info = userInfo.objects.get(user= user)
        if data.get('fav') == True:
            print('true')
            favouriteEntry.favouriteusers.remove(user)
            info.favouriteEntries.remove(favouriteEntry)
        else: 
            favouriteEntry.favouriteusers.add(user)
            info.favouriteEntries.add(favouriteEntry)
            print('false')
    return JsonResponse({"message": "bid added successfully."}, status=201)

@csrf_exempt
def userform(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        theUserInfo = userInfo.objects.get(id = data.get('id'))
        theUserInfo.lastPaid = data.get('lastPaid')
        theUserInfo.lastDatePayment = data.get('lastDatePayment')
        theUserInfo.approved = data.get('approved')
        theUserInfo.is_admin = data.get('is_admin')
        theUserInfo.approvedcountries.set(data.get('approvedcountries'))
        theUserInfo.approvedcategories.set(data.get('approvedcategories'))
        theUserInfo.save()
        return JsonResponse({"message": "User edited successfully."}, status=201)
    

# class MyModelViewSet(viewsets.ModelViewSet):
#     queryset = MyModel.objects.all()
#     serializer_class = MyModelSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(creator=self.request.user)


# class PostView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         print(request.data)
#         return Response(request.data)
        # posts_serializer = PostSerializer(data=request.data)
        # if posts_serializer.is_valid():
        #     posts_serializer.save()
        #     return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     print('error', posts_serializer.errors)
        #     return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class MyModelViewSet(viewsets.ModelViewSet):
#     queryset = MyModel.objects.all()
#     serializer_class = MyModelSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(creator=self.request.user)