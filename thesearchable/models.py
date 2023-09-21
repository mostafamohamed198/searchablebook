from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class User(AbstractUser):
    pass
    @property
    def user_dictionary(self):
        return{'id' : self.id, 'username':self.username, 'email':self.email}
    

class Author(models.Model):
    name = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='authorimage/')
    degree = models.CharField(max_length=300)
    about = models.TextField()
    submittedUser = models.ForeignKey('User', null=True, blank=True, related_name='SubmittedAuthorUser', on_delete=models.CASCADE)
    def __str__ (self):
        return self.name
    @property
    def author_dictionary(self):
        return {'id' : self.id, 'name': self.name, 'authorPicture': self.picture.url}
    @property
    def authors_dictionary(self):
        return {'label':self.name , 'value': self.id}


class Category(models.Model):
    thecategory = models.CharField(max_length=200)
    def __str__ (self):
        return self.thecategory
    @property
    def categories_dictionary(self):
        return {'id':self.id , 'thecategory': self.thecategory}
    @property
    def categories_options_dictionary(self):
        return {'label':self.thecategory , 'value': self.id}


class Classification(models.Model):
    theclass = models.CharField(max_length=200) 
    def __str__ (self):
        return self.theclass
    @property
    def classification_dictionary(self):
        return {'label':self.theclass , 'value': self.id}


class Ocrbook(models.Model):
    name= models.CharField(max_length=300)
    pdf = models.FileField(upload_to='books/',null=True, validators=[FileExtensionValidator(allowed_extensions=['pdf'])], blank=True)

   

class Country(models.Model):
    country = models.CharField(max_length=200)
    def __str__ (self):
        return self.country
    @property
    def countries_dictionary(self):
        return {'id': self.id, 'country':self.country}
    @property
    def countries_options_dictionary(self):
        return {'label': self.country, 'value':self.id}
    
class Rating(models.Model):
    ratedUser = models.ForeignKey('User', on_delete=models.CASCADE)
    rate = models.IntegerField()
    def __str__ (self):
        return self.rate
    
        
class Entry(models.Model):
    title = models.CharField(max_length=600)
    body = models.TextField()
    entryauthor = models.ManyToManyField('Author', blank=True)
    chapterNumber = models.IntegerField( null=True, blank=True)
    entryOrigin = models.ForeignKey('Country', null=True, blank=True, on_delete=models.CASCADE)
    entryPubDate = models.DateField(null=True, blank=True)
    submissionDate= models.DateTimeField(auto_now=True)
    entryCover = models.ImageField(upload_to='entrycover', blank=True, null=True)
    relatedRatings = models.ManyToManyField('Rating', blank=True)
    bibiliography = models.TextField(blank=True, null=True)
    entryCategory = models.ForeignKey('Category',blank=True, null=True, on_delete=models.CASCADE)
    entryClassification = models.ManyToManyField('Classification', blank=True)
    submittedUser = models.ForeignKey('User',blank=True,null=True, on_delete=models.CASCADE, related_name='submitteduser')
    views = models.ManyToManyField('User', blank=True, related_name='views')
    favouriteusers = models.ManyToManyField('User', blank=True, related_name='favouriteusers')
    viewsCounts = models.IntegerField(default=0)
    source = models.CharField(max_length=700,  blank=True, null=True)
   
    def __str__ (self):
        return self.title
    @property
    def entry_dictionary(self):
        return {'id': self.id, 'title':self.title, 'entryCover': self.entryCover.url}
    
class Part(models.Model):
    name = models.CharField(max_length=500)
    relatedEntries = models.ManyToManyField('Entry',  blank=True)
    def __str__(self):
        return self.name
    @property
    def part_dictionary(self):
        return {'id': self.id, 'name': self.name}
    @property
    def part_related_dictionary(self):
        return {'id': self.id, 'name': self.name, 'relatedEntries': self.relatedEntries.all().values('id', 'title')}
    
class Door(models.Model):
    name = models.CharField(max_length=500)
    relatedParts = models.ManyToManyField('Part', blank=True)
    def __str__(self):
        return self.name
    @property
    def door_dictionary(self):
        return {'id': self.id, 'name': self.name}
    @property
    def door_related_dictionary(self):
        return {'id': self.id, 'name': self.name, 'relatedParts': self.relatedParts.all().values('id', 'name')} 
    
    
    

class Book(models.Model):
    name = models.CharField(max_length=499)
    author = models.ManyToManyField('Author', blank=True, max_length=300)
    containsParts = models.BooleanField(default=False)
    containsDoors = models.BooleanField(default=False)
    bookCategory = models.ForeignKey('Category', on_delete=models.CASCADE, default=None)
    bookClassification = models.ManyToManyField('Classification', blank=True)
    bookOrigin = models.ForeignKey('Country', blank=True, null=True, on_delete=models.CASCADE)
    publicationDate = models.DateField()
    cover = models.ImageField(upload_to='bookcover')
    relatedChapters = models.ManyToManyField('Entry',  blank=True)
    relatedParts = models.ManyToManyField('Part',  blank=True)
    relatedDoors = models.ManyToManyField('Door', blank=True)
    submittedUser = models.ForeignKey('User', null=True, blank=True, related_name='submittedBookUser', on_delete=models.CASCADE)
    publisher = models.CharField(max_length=700, blank=True, null=True)
    favouriteusers = models.ManyToManyField('User', blank=True, related_name='bookfavouriteusers')
    isbn = models.CharField(max_length=700, blank=True, null=True )
    def __str__ (self):
        return self.name
    @property
    def book_dictionary(self):
        return {'id' : self.id, 'name': self.name, 'bookCover': self.cover.url}
   
    


class UserInfo(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    lastPaid = models.IntegerField(blank=True, null=True)
    lastDatePayment = models.DateField(blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    approvedcountries = models.ManyToManyField('Country',  blank=True)
    approvedcategories = models.ManyToManyField('Category', blank=True)
    favouriteEntries = models.ManyToManyField('Entry',  blank=True, related_name='favourites')
    favouriteBooks = models.ManyToManyField('Book', blank=True, related_name='favouriteBooks')
    downloadedEntries = models.ManyToManyField('Entry',blank=True, related_name='downloadedbooks')
    viewedEntries = models.ManyToManyField('Entry',  blank=True, related_name='viewedEntries')
    submittedentries = models.ManyToManyField('Entry',blank=True, related_name='submittedentries')
    submittedBooks = models.ManyToManyField('Book', blank=True, related_name='submittedBooks')
    submittedAuthors = models.ManyToManyField('Author', blank=True, related_name='submittedAuthors')

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)
