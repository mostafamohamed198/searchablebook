from django.shortcuts import render
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import *
import functools
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from django.conf import settings
from django.views.generic import DetailView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from markdown2 import markdown
from .utils import render_to_pdf
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
# import markdown as md
from django.contrib.auth import authenticate, login, logout
# from django import template
from django.template.defaultfilters import stringfilter
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from django.db import IntegrityError
from django.urls import reverse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, FileResponse
# from .utils import render_to_pdf
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
import io
import pytesseract
# import  fitz
import os
from PIL import Image
from docx import *
from .forms import *


import io
from rest_framework.authentication import TokenAuthentication

from django.template.loader import get_template
from django.conf import settings

import json
from io import StringIO, BytesIO
from wkhtmltopdf.views import PDFTemplateResponse 

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        theuserInfo = userInfo.objects.get(user = user)
        print(theuserInfo.approvedcategories.all())
       
        countriesArray = []
        categoriesArray = []
        for country in theuserInfo.approvedcountries.all():
            countriesArray.append(country.id)
        for category in theuserInfo.approvedcategories.all():
            categoriesArray.append(category.id)
        # Add custom claims
        
        token['username'] = user.username
        # token['userid'] = user.userid
        token['superuser'] = user.is_superuser
        token['approvedcountries'] = countriesArray
        token['approvedcategories'] = categoriesArray
        token['is_admin'] =theuserInfo.is_admin
        token['approved'] =theuserInfo.approved
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



def get_generated_problems_in_pdf(request,id):

    # queryset
    theEntry = entry.objects.get(id = id)

    # context passed in the template
    # context = {'entry' : theEntry, 'entrybody': markdown(theEntry.body) }
    context = {'entry' : theEntry, 'entrybody': theEntry.body }
    # return render(request, "frontend/thepdf.html", context)

    # render
    html_string = render_to_string(
        'frontend/thepdf.html',context)
    html = HTML(string=html_string)
    result = html.write_pdf()

    # http response
    response = HttpResponse(content_type='application/pdf;')
    response['Content-Disposition'] = 'inline; filename=problem_list.pdf'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())

    return response




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
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        requestedUser = request.user
        desiredEntries =  entry.objects.filter(favouriteusers__in = [requestedUser.id])
        serializer = EntryFavourtiesSerializer(desiredEntries, many=True)
        return Response(serializer.data)
    
class FavouriteBooks(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        requestedUser = request.user
        desiredBooks =  book.objects.filter(favouriteusers__in = [requestedUser.id])
        serializer = BookFavourtiesSerializer(desiredBooks, many=True)
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

class EntryEditDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = entry.objects.all()
    serializer_class = EntryEditFormSerializer



    
class EntryFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        data = request.data
        serializer = EntryFormSerializer(data=data)
        theuserInfo = userInfo.objects.get(user = request.user)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save(submittedUser = request.user)
            serializerData = serializer.data['id']
            theuserInfo.submittedentries.add(int(serializerData))
            theuserInfo.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AuthorFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        serializer = AuthorFormSerializer(data=request.data)
        theuserInfo = userInfo.objects.get(user = request.user)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save(submittedUser = request.user)
            serializerData = serializer.data['id']
            theuserInfo.submittedAuthors.add(int(serializerData))
            theuserInfo.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class EntryBookFormViewSet(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser, JSONParser]
#     @csrf_exempt
#     def post(self, request, format=None):
#         print('working')
#         data = json.loads(request.body)
#         theuserInfo = userInfo.objects.get(user = request.user)
#         if theuserInfo.is_admin is True:
#             title = data.get('title')
#             body = data.get('body')
#             bibliography = data.get('bibiliography')
#             bookId = data.get('book')
#             partId = data.get('part')
#             theBook = book.objects.get(id = int(bookId))
#             print(theBook.bookOrigin.id)
#             theBookOrigin = theBook.bookOrigin
#             theBookCategory = theBook.bookCategory
#             theBookClassification = theBook.bookClassification.all()
#             theBookCover = theBook.cover.url[6:]
#             print (theBookCover[6:])
#             theBookAuthors = theBook.author.all()
#             # print(theBookAuthors)
            
#             # newEntry = entry.objects.create(title = title, body=body, bibiliography = bibliography, entryOrigin = theBook.bookOrigin, entryPubDate= theBook.publicationDate, entryauthor =theBook.author, entryCover = theBook.cover, entryClassification = theBook.bookClassification, entryCategory = theBook.bookCategory)
#             newEntry = entry.objects.create(title = title, body=body, bibiliography = bibliography, entryOrigin = theBookOrigin, entryPubDate= theBook.publicationDate, entryCover=theBookCover,  entryCategory = theBookCategory, submittedUser=request.user)
            
#             # if newEntry.is_valid():
#             # newEntry.save() 
#             newEntry.entryauthor.set(theBookAuthors)
#             # newEntry.entryCover = theBookCover
#             newEntry.entryClassification.set(theBookClassification)
#             newEntry.save()
#             if int(partId) != 0:
#                 thePart = part.objects.get(id = int(partId))
#                 thePart.relatedEntries.add(newEntry)
#                 thePart.save()
#             theBook.relatedChapters.add(newEntry)
#             theBook.save()
#             print(newEntry.id)
#             theuserInfo.submittedentries.add(int(newEntry.id))
#             theuserInfo.save()
#             data['id'] = int(newEntry.id)
     
#             return Response(data ,status=status.HTTP_201_CREATED)
#         return Response(data,status=status.HTTP_400_BAD_REQUEST)
                                                                                                             
class EntryBookFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        print('working')
        data = json.loads(request.body)
        serializer = EntryFormSerializer(data=data)
        if serializer.is_valid():
            theuserInfo = userInfo.objects.get(user = request.user)
            if theuserInfo.is_admin is True:
                title = data.get('title')
                body = data.get('body')
                bibliography = data.get('bibiliography')
                bookId = data.get('book')
                partId = data.get('part')
                source = data.get('source')
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
                newEntry = serializer.save(title = title, body=body, bibiliography = bibliography, entryOrigin = theBookOrigin, entryPubDate= theBook.publicationDate, entryCover=theBookCover,  entryCategory = theBookCategory, submittedUser=request.user, source= source)
                
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
                print(newEntry.id)
                theuserInfo.submittedentries.add(int(newEntry.id))
                theuserInfo.save()
            return Response(serializer.data ,status=status.HTTP_201_CREATED)
            # data['id'] = int(newEntry.id)
        else:
         
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        # return Response(data,status=status.HTTP_400_BAD_REQUEST)                                                                                                        
                                                                                                               
       
class BookFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def post(self, request, format=None):
        print(request.data)
        serializer = BookFormSerializer(data=request.data, partial=True)
        theuserInfo = userInfo.objects.get(user = request.user)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save(submittedUser = request.user, publisher = request.data['publisher'], isbn = request.data['isbn'])
            serializerData = serializer.data['id']
            theuserInfo.submittedBooks.add(int(serializerData))
            theuserInfo.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class book_change(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put (self, request, pk):
        theuserInfo = userInfo.objects.get(user = request.user)
        thebook = book.objects.get(pk =pk)
        thedata = request.data
        serializer = BookFormSerializer(thebook, data=thedata, partial=True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theuserInfo = userInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            thebook = book.objects.get(pk =pk)
            thebook.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
class Author_change(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, pk):
        theuserInfo = userInfo.objects.get(user = request.user)
        theauthor = author.objects.get(pk = pk)
        thedata = request.data
        serializer = AuthorFormSerializer(theauthor, data=thedata, partial=True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theuserInfo = userInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            theauthor = author.objects.get(pk = pk)
            theauthor.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
        

class Entry_change(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, pk):
        theentry = entry.objects.get(pk = pk)
        thedata = request.data
        print(thedata)
        theuserInfo = userInfo.objects.get(user = request.user)
        serializer = EntryFormSerializer(theentry, data= thedata, partial = True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theentry = entry.objects.get(pk = pk)
        theuserInfo = userInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            theentry.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
          

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
        # if snippet.DoesNotExist:
        #      print ('doesnt')
        #      return Response(status=status.HTTP_204_NO_CONTENT)
        # else:
            print('does')
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

# class addpartViewSet(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser, JSONParser] @csrf_exempt
#     @csrf_exempt
#     def post(self, request, pk, format=None):
#         serializer = PartSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             first_value = list(serializer.data.values())[0]
#             print(first_value)
#             relatedbook = book.objects.get(id=pk)
#             relatedbook.relatedParts.add(first_value)
#             relatedbook.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class addpartViewSet(APIView):
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def post(self, request, pk, format=None):
        print(request.data)
        serializer = DoorFormSerializer(data=request.data)
        if serializer.is_valid():
            print(request.data)
            serializer.save()
            first_value = list(serializer.data.values())[0]
            # print(first_value)
            relatedbook = book.objects.get(id=pk)
            # print(f'the book is {relatedbook.id}')
            
            relatedbook.relatedDoors.add(int(first_value))
            relatedbook.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def post(self, request, pk, format=None):
    #     # print(request.body)
    #     data = json.loads(request.body)
    #     content = data.get('content')
    #     # print(list(data.values())[0])
    #     #             print('ok')
    #     # for one in list(data.values())[0]:
    #     for one in list(data.values())[0]:
    #         print('working')
    #         serializer = DoorSerializer(data=one)
    #         if serializer.is_valid():
    #             serializer.save()
    #         #     first_value = list(serializer.data.values())[0]
    #         #     print(first_value)
    #         #     relatedbook = book.objects.get(id=pk)
    #         #     relatedbook.relatedDoors.add(int(first_value))
    #         #     return Response(serializer.data,status=status.HTTP_201_CREATED)
    #         # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         return Response('working')

# wkhtml_to_pdf = os.path.join(
#     settings.BASE_DIR, "wkhtmltopdf.exe")

wkhtml_to_pdf = os.path.join(settings.BASE_DIR,"wkhtmltopdf-0.9.9-static-amd64.tar.bz2")
# wkhtml_to_pdf = 'C:/Users/mostafa mohamed/newsearch/searchablebooks/wkhtmltopdf.exe'



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
    return Response ({"id": theauthor.id, "name": theauthor.name, 'degree':theauthor.degree, 'about': theauthor.about,'picture':theauthor.picture.url, 'relatedEntries':x, 'categories': y})

@api_view(['GET',  'DELETE'])
def authentication_state(request):
    if request.user.is_authenticated:
        return Response ({"authentication" : True, 'userid': request.user.id})
    else:
        return Response ({"authentication" : False})

class putFavourites(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, id):
        data = request.data
        favouriteEntry = entry.objects.get(id= id)
        user = request.user
        info = userInfo.objects.get(user= user)
        snippet = 0
        for object in book.objects.all():
            for chapter in object.relatedChapters.all():
                if int(chapter.id) == int(id):
                    snippet = book.objects.get(id = object.id)
                    print(object.id)
        if data['fav'] == True:
            favouriteEntry.favouriteusers.remove(user)
            
            info.favouriteEntries.remove(favouriteEntry)
        else: 
            favouriteEntry.favouriteusers.add(user)
            snippet.favouriteusers.add(user)
            info.favouriteEntries.add(favouriteEntry)
            info.favouriteBooks.add(snippet)
            
        return Response({"message": "bid added successfully."}, status=201)


class putBookFavourites(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, id):
        data = request.data
        favouriteBook = book.objects.get(id= id)
        user = request.user
        info = userInfo.objects.get(user= user)
        if data['fav'] == True:
            favouriteBook.favouriteusers.remove(user)
            info.favouriteBooks.remove(favouriteBook)
            info.save
        else: 
            favouriteBook.favouriteusers.add(user)
            info.favouriteBooks.add(favouriteBook)
            info.save()
            
        return Response({"message": "bid added successfully."}, status=201)




# @csrf_exempt
# def userform(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         theUserInfo = userInfo.objects.get(id = data.get('id'))
#         theUserInfo.lastPaid = data.get('lastPaid')
#         theUserInfo.lastDatePayment = data.get('lastDatePayment')
#         theUserInfo.approved = data.get('approved')
#         theUserInfo.is_admin = data.get('is_admin')
#         theUserInfo.approvedcountries.set(data.get('approvedcountries'))
#         theUserInfo.approvedcategories.set(data.get('approvedcategories'))
#         theUserInfo.save()
#         return JsonResponse({"message": "User edited successfully."}, status=201)
    
class userform(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request):
        if request.user.is_superuser:
            data = request.data
            userid = data['id']
            print(data)
            theUserInfo = userInfo.objects.get(user = userid)
            serializer = UserInfoPutSerializer(theUserInfo, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(data,status=status.HTTP_201_CREATED)
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    
    
# class userform(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser, JSONParser] 
#     @csrf_exempt
#     def post(self, request, pk, format=None):
#         serializer = PartSerializer(data=request.data)
#         if serializer.is_valid():
#             if request.user.is_superuser:
#                 serializer.save()
#                 first_value = list(serializer.data.values())[0]
#                 print(first_value)
#                 relatedbook = book.objects.get(id=pk)
#                 print(f'the book is {relatedbook.id}')
                
#                 relatedbook.relatedParts.add(int(first_value))
#                 relatedbook.save()
#                 return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
