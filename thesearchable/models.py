from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

from .search import BlogPostIndex
class User(AbstractUser):
    pass

class author(models.Model):
    name = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='authorimage/')
    degree = models.CharField(max_length=300)
    about = models.TextField()
    def __str__ (self):
        return self.name


class categories(models.Model):
    thecategory = models.CharField(max_length=200)
    def __str__ (self):
        return self.thecategory

class classification(models.Model):
    theclass = models.CharField(max_length=200) 
    def __str__ (self):
        return self.theclass

class countries(models.Model):
    country = models.CharField(max_length=200)
    def __str__ (self):
        return self.country
    
class rating(models.Model):
    ratedUser = models.ForeignKey('User', on_delete=models.CASCADE)
    rate = models.IntegerField()
    def __str__ (self):
        return self.rate
    
        
class entry(models.Model):
    title = models.CharField(max_length=600)
    body = models.TextField()
    entryauthor = models.ManyToManyField('author', blank=True)
    chapterNumber = models.IntegerField( null=True, blank=True)
    entryOrigin = models.ForeignKey('countries', null=True, blank=True, on_delete=models.CASCADE)
    entryPubDate = models.DateField()
    submissionDate= models.DateTimeField(auto_now=True)
    downloadedUser = models.ManyToManyField('User', blank=True, related_name='downloadedusers')
    entryCover = models.ImageField(upload_to='entrycover', blank=True, null=True)
    viewedUsers = models.ManyToManyField('User', blank=True, related_name='viewedUsers')
    relatedRatings = models.ManyToManyField('rating', blank=True)
    bibiliography = models.TextField(blank=True, null=True)
    def __str__ (self):
        return self.title
    
class part(models.Model):
    name = models.CharField(max_length=500)
    relatedEntries = models.ManyToManyField('entry',  blank=True)
    def __str__(self):
        return self.name
    
class door(models.Model):
    name = models.CharField(max_length=500)
    relatedParts = models.ManyToManyField('part', blank=True)
    def __str__(self):
        return self.name
    

class book(models.Model):
    name = models.CharField(max_length=499)
    author = models.ManyToManyField('author', blank=True, max_length=300)
    containsParts = models.BooleanField(default=False)
    containsDoors = models.BooleanField(default=False)
    bookCategory = models.ForeignKey('categories', on_delete=models.CASCADE, default=None)
    publicationDate = models.DateField()
    cover = models.ImageField(upload_to='bookcover')
    relatedChapters = models.ManyToManyField('entry',  blank=True)
    relatedParts = models.ManyToManyField('part',  blank=True)
    relatedDoors = models.ManyToManyField('door', blank=True)
    def __str__ (self):
        return self.name


class userInfo(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    approvedcountries = models.ManyToManyField('countries',  blank=True)
    favouriteEntries = models.ManyToManyField('entry',  blank=True, related_name='favourites')
    downloadedEntries = models.ManyToManyField('entry',blank=True, related_name='downloadedbooks')
    viewedEntries = models.ManyToManyField('entry',  blank=True, related_name='viewedEntries')
    ratedbooks = models.ManyToManyField('rating', blank=True)


class BlogPost(models.Model):  
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogpost')   
    posted_date = models.DateField(default=timezone.now)   
    title = models.CharField(max_length=200)   
    text = models.TextField(max_length=1000)
    def indexing(self):   
        obj = BlogPostIndex(      meta={'id': self.id},      author=self.author.username,      posted_date=self.posted_date,      title=self.title,      text=self.text   )
        obj.save()   
        return obj.to_dict(include_meta=True)
