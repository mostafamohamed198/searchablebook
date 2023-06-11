from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


# class AppUserManager(BaseUserManager):
# 	def create_user(self, email, password=None):
# 		if not email:
# 			raise ValueError('An email is required.')
# 		if not password:
# 			raise ValueError('A password is required.')
# 		email = self.normalize_email(email)
# 		user = self.model(email=email)
# 		user.set_password(password)
# 		user.save()
# 		return user
# 	def create_superuser(self, email, password=None):
# 		if not email:
# 			raise ValueError('An email is required.')
# 		if not password:
# 			raise ValueError('A password is required.')
# 		user = self.create_user(email, password)
# 		user.is_superuser = True
# 		user.save()
# 		return user


# class AppUser(AbstractBaseUser, PermissionsMixin):
# 	user_id = models.AutoField(primary_key=True)
# 	email = models.EmailField(max_length=50, unique=True)
# 	username = models.CharField(max_length=50 )
# 	USERNAME_FIELD = 'email'
# 	REQUIRED_FIELDS = ['username']
# 	objects = AppUserManager()
# 	def __str__(self):
# 		return self.username

class User(AbstractUser):
    pass
    @property
    def user_dictionary(self):
        return{'id' : self.id, 'username':self.username, 'email':self.email}

class author(models.Model):
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


class categories(models.Model):
    thecategory = models.CharField(max_length=200)
    def __str__ (self):
        return self.thecategory
    @property
    def categories_dictionary(self):
        return {'id':self.id , 'thecategory': self.thecategory}
    @property
    def categories_options_dictionary(self):
        return {'label':self.thecategory , 'value': self.id}


class classification(models.Model):
    theclass = models.CharField(max_length=200) 
    def __str__ (self):
        return self.theclass
    @property
    def classification_dictionary(self):
        return {'label':self.theclass , 'value': self.id}


class ocrbook(models.Model):
    name= models.CharField(max_length=300)
    pdf = models.FileField(upload_to='books/',null=True, validators=[FileExtensionValidator(allowed_extensions=['pdf'])], blank=True)

   

class countries(models.Model):
    country = models.CharField(max_length=200)
    def __str__ (self):
        return self.country
    @property
    def countries_dictionary(self):
        return {'id': self.id, 'country':self.country}
    @property
    def countries_options_dictionary(self):
        return {'label': self.country, 'value':self.id}
    
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
    entryCover = models.ImageField(upload_to='entrycover', blank=True, null=True)
    relatedRatings = models.ManyToManyField('rating', blank=True)
    bibiliography = models.TextField(blank=True, null=True)
    entryCategory = models.ForeignKey('categories',blank=True, null=True, on_delete=models.CASCADE)
    entryClassification = models.ManyToManyField('classification', blank=True)
    submittedUser = models.ForeignKey('User',blank=True,null=True, on_delete=models.CASCADE, related_name='submitteduser')
    views = models.ManyToManyField('User', blank=True, related_name='views')
    favouriteusers = models.ManyToManyField('User', blank=True, related_name='favouriteusers')
    viewsCounts = models.IntegerField(default=0)
   
    def __str__ (self):
        return self.title
    @property
    def entry_dictionary(self):
        return {'id': self.id, 'title':self.title, 'entryCover': self.entryCover.url}
    
class part(models.Model):
    name = models.CharField(max_length=500)
    relatedEntries = models.ManyToManyField('entry',  blank=True)
    def __str__(self):
        return self.name
    @property
    def part_dictionary(self):
        return {'id': self.id, 'name': self.name}
    
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
    bookClassification = models.ManyToManyField('classification', blank=True)
    bookOrigin = models.ForeignKey('countries', blank=True, null=True, on_delete=models.CASCADE)
    publicationDate = models.DateField()
    cover = models.ImageField(upload_to='bookcover')
    relatedChapters = models.ManyToManyField('entry',  blank=True)
    relatedParts = models.ManyToManyField('part',  blank=True)
    relatedDoors = models.ManyToManyField('door', blank=True)
    submittedUser = models.ForeignKey('User', null=True, blank=True, related_name='submittedBookUser', on_delete=models.CASCADE)
    def __str__ (self):
        return self.name
    @property
    def book_dictionary(self):
        return {'id' : self.id, 'name': self.name, 'bookCover': self.cover.url}
   
    


class userInfo(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    lastPaid = models.IntegerField(blank=True, null=True)
    lastDatePayment = models.DateField(blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    approvedcountries = models.ManyToManyField('countries',  blank=True)
    approvedcategories = models.ManyToManyField('categories', blank=True)
    favouriteEntries = models.ManyToManyField('entry',  blank=True, related_name='favourites')
    downloadedEntries = models.ManyToManyField('entry',blank=True, related_name='downloadedbooks')
    viewedEntries = models.ManyToManyField('entry',  blank=True, related_name='viewedEntries')
    submittedentries = models.ManyToManyField('entry',blank=True, related_name='submittedentries')
    submittedBooks = models.ManyToManyField('book', blank=True, related_name='submittedBooks')
    submittedAuthors = models.ManyToManyField('author', blank=True, related_name='submittedAuthors')

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# class MyModel(models.Model):
   
#     title = models.CharField(
#         max_length=80, blank=False, null=False)
#     description = models.TextField()
#     image_url = models.ImageField(upload_to='search', blank=True, null=True)

