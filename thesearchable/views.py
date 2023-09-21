from django.shortcuts import render
from .models import *
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
# import markdown as md
# from django import template
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import os
from docx import *
from .forms import *
from django.http import Http404
import json

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        theuserInfo = UserInfo.objects.get(user = user)
      
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


    

@api_view(['GET',  'DELETE'])
def results_page(request):
    if request.user.is_authenticated:
        theUser = request.user
        theUserProfile = UserInfo.objects.get(user = theUser.id)
        if theUserProfile.approved:
            return Response({'approved': True})
            
        else:
            return Response({'approved': False})
    else:
        return Response({'approved': False})
    
class EntryListView(generics.ListCreateAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class AuthorListView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class CountryListView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountriesSerializer

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserListView(generics.ListCreateAPIView):
    queryset = UserInfo.objects.order_by('user__username')
    serializer_class = UserInfoSerializer

class FavouriteEntriesView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        requestedUser = request.user
        desiredEntries =  Entry.objects.filter(favouriteusers__in = [requestedUser.id])
        serializer = EntryFavourtiesSerializer(desiredEntries, many=True)
        return Response(serializer.data)
    
class FavouriteBooksView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        requestedUser = request.user
        desiredBooks =  Book.objects.filter(favouriteusers__in = [requestedUser.id])
        serializer = BookFavourtiesSerializer(desiredBooks, many=True)
        return Response(serializer.data)

class ClassificationListView(generics.ListCreateAPIView):
    queryset = Classification.objects.all()
    serializer_class = ClassificationSerializer

    
class EntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

class EntryEditDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntryEditFormSerializer


class EntryWithBookDetailView(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def get_entry(self, id):
        try:
            return Entry.objects.get(id = id)
        except Entry.DoesNotExist:
            raise Http404
    
    def get_book(self, id):
        thebook = Book.objects.filter(relatedChapters = id).last()
        return thebook
    
    def get(self, request,id, format=None):
        entry = self.get_entry(id)
        book = self.get_book(id)
        entry_serialzier =EntrySerializer(entry)
        book_serializer = BookSerializer(book)
        # return Response({'entry': entry_serialzier.data, 'book': book_serializer})
        return Response({'entry': entry_serialzier.data, 'book': book_serializer.data})
        
    
class EntryFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
        data = request.data
        serializer = EntryFormSerializer(data=data)
        theuserInfo = UserInfo.objects.get(user = request.user)
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
        theuserInfo = UserInfo.objects.get(user = request.user)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save(submittedUser = request.user)
            serializerData = serializer.data['id']
            theuserInfo.submittedAuthors.add(int(serializerData))
            theuserInfo.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


                                                                                                             
class EntryBookFormViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    @csrf_exempt
    def post(self, request, format=None):
      
        data = json.loads(request.body)
        serializer = EntryFormSerializer(data=data)
        if serializer.is_valid():
            theuserInfo = UserInfo.objects.get(user = request.user)
            if theuserInfo.is_admin is True:
                title = data.get('title')
                body = data.get('body')
                bibliography = data.get('bibiliography')
                bookId = data.get('book')
                partId = data.get('part')
                source = data.get('source')
                theBook = Book.objects.get(id = int(bookId))
              
                theBookOrigin = theBook.bookOrigin
                theBookCategory = theBook.bookCategory
                theBookClassification = theBook.bookClassification.all()
                theBookCover = theBook.cover.url[6:]
               
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
                    thePart = Part.objects.get(id = int(partId))
                    thePart.relatedEntries.add(newEntry)
                    thePart.save()
                theBook.relatedChapters.add(newEntry)
                theBook.save()
              
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
     
        serializer = BookFormSerializer(data=request.data, partial=True)
        theuserInfo = UserInfo.objects.get(user = request.user)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save(submittedUser = request.user, publisher = request.data['publisher'], isbn = request.data['isbn'])
            serializerData = serializer.data['id']
            theuserInfo.submittedBooks.add(int(serializerData))
            theuserInfo.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class BookChangeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put (self, request, pk):
        theuserInfo = UserInfo.objects.get(user = request.user)
        thebook = Book.objects.get(pk =pk)
        thedata = request.data
        serializer = BookFormSerializer(thebook, data=thedata, partial=True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theuserInfo = UserInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            thebook = Book.objects.get(pk =pk)
            thebook.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
    

class AuthorChangeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, pk):
        theuserInfo = UserInfo.objects.get(user = request.user)
        theauthor = Author.objects.get(pk = pk)
        thedata = request.data
        serializer = AuthorFormSerializer(theauthor, data=thedata, partial=True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theuserInfo = UserInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            theauthor = Author.objects.get(pk = pk)
            theauthor.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
        

class EntryChangeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, pk):
        theentry = Entry.objects.get(pk = pk)
        thedata = request.data
       
        theuserInfo = UserInfo.objects.get(user = request.user)
        serializer = EntryFormSerializer(theentry, data= thedata, partial = True)
        if serializer.is_valid() and theuserInfo.is_admin is True:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def delete(self, request, pk, format=None):
        theentry = Entry.objects.get(pk = pk)
        theuserInfo = UserInfo.objects.get(user = request.user)
        if theuserInfo.is_admin is True:
            theentry.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'messege' : 'cannot delete it'})
          

@api_view(['GET'])
def required_book(request, id):
    snippet = 0
    thechabpterbook = Entry.objects.get(id = id)
    for object in Book.objects.all():
        for chapter in object.relatedChapters.all():
            if int(chapter.id) == int(id):
                snippet = Book.objects.get(id = object.id)
               

    if request.method == 'GET':
        # if snippet.DoesNotExist:
        #      print ('doesnt')
        #      return Response(status=status.HTTP_204_NO_CONTENT)
        # else:
            
            serializer = BookSerializer(snippet)
           
            serializer.data['relatedDoors'] = 0
            return Response(serializer.data)
    
@api_view(['GET'])
def required_door(request, idd):
    try:
        thedoor = Door.objects.get(id = idd)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoorSerializer(thedoor)
        return Response(serializer.data)

@api_view(['GET'])
def required_part(request, iddd):
    try:
        thepart = Part.objects.get(id = iddd)
    except Part.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PartSerializer(thepart)
        return Response(serializer.data)
    
@api_view(['GET'])
def required_chapter(request, idddd):
    try:
        thechapter = Entry.objects.get(id = idddd)
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
 
class AddPartViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def post(self, request, pk, format=None):
        serializer = PartSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            relatedbook = Book.objects.get(id=pk)
            for object in serializer.data: 
                first_value = list(object.values())[0]
                relatedbook.relatedParts.add(int(first_value))
                relatedbook.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AddDoorViewSet(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def post(self, request, pk, format=None):
        serializer = DoorFormSerializer(data=request.data, many =True)
        if serializer.is_valid():
            serializer.save()
            relatedbook = Book.objects.get(id=pk)
            for object in serializer.data: 
                first_value = list(object.values())[0]
                relatedbook.relatedDoors.add(int(first_value))
                relatedbook.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# wkhtml_to_pdf = os.path.join(settings.BASE_DIR,"wkhtmltopdf-0.9.9-static-amd64.tar.bz2")
# wkhtml_to_pdf = 'C:/Users/mostafa mohamed/newsearch/searchablebooks/wkhtmltopdf.exe'



@api_view(['GET'])
def categoriezed_entries(request,  catid):
    neededCategory = Category.objects.get(id = catid)
    if request.method == 'GET':
        entrieslist = Entry.objects.filter(entryCategory = neededCategory).order_by('-id')[:9]
        serializer = EntrySerializer(entrieslist, many=True)
        return Response(serializer.data,)
    
@api_view(['GET'])
def author_info(request, authid):
    x = []
    y= []
    theauthor = Author.objects.get(id=authid)
    theentries = Entry.objects.filter(entryauthor = theauthor)
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

    return Response ({"id": theauthor.id, "name": theauthor.name, 'degree':theauthor.degree, 'about': theauthor.about,'picture':theauthor.picture.url, 'relatedEntries':x, 'categories': y})

@api_view(['GET',  'DELETE'])
def authentication_state(request):
    if request.user.is_authenticated:
        return Response ({"authentication" : True, 'userid': request.user.id})
    else:
        return Response ({"authentication" : False})

class PutFavouritesView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, id):
        data = request.data
        favouriteEntry = Entry.objects.get(id= id)
        user = request.user
        info = UserInfo.objects.get(user= user)
        snippet = 0
        for object in Book.objects.all():
            for chapter in object.relatedChapters.all():
                if int(chapter.id) == int(id):
                    snippet = Book.objects.get(id = object.id)
                  
        if data['fav'] == True:
            favouriteEntry.favouriteusers.remove(user)
            
            info.favouriteEntries.remove(favouriteEntry)
        else: 
            favouriteEntry.favouriteusers.add(user)
            snippet.favouriteusers.add(user)
            info.favouriteEntries.add(favouriteEntry)
            info.favouriteBooks.add(snippet)
            
        return Response({"message": "bid added successfully."}, status=201)


class PutBookFavouritesView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request, id):
        data = request.data
        favouriteBook = Book.objects.get(id= id)
        user = request.user
        info = UserInfo.objects.get(user= user)
        if data['fav'] == True:
            favouriteBook.favouriteusers.remove(user)
            info.favouriteBooks.remove(favouriteBook)
            info.save
        else: 
            favouriteBook.favouriteusers.add(user)
            info.favouriteBooks.add(favouriteBook)
            info.save()
            
        return Response({"message": "bid added successfully."}, status=201)




    
class UserFormView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser] 
    @csrf_exempt
    def put(self, request):
        if request.user.is_superuser:
            data = request.data
            userid = data['id']
        
            theUserInfo = UserInfo.objects.get(user = userid)
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
    
