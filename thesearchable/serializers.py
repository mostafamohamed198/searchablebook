from .models import *
from rest_framework import serializers
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from.documents import EntryDocument

from django.contrib.auth import get_user_model, authenticate
class EntrySerializer(serializers.ModelSerializer):
    # entryauthor = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='name'
    # )
    entryauthor = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='author_dictionary'
    )
   
    class Meta:
        model = entry
        fields = (
            'id',
            'title',
            'body',
            'entryOrigin',
            'entryauthor',
            'entryPubDate',
            'bibiliography',
            'entryCategory',
            'entryClassification',
            'entryCover',
            'favouriteusers', 
        )

class EntryBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = entry
        fields = (
            'id',
            'title',
            'entryCover',
           
        )
class PartSerializer(serializers.ModelSerializer):

    relatedEntries = serializers.SerializerMethodField()
    class Meta:
        model = part
        fields = '__all__'

    def get_relatedEntries(self, instance):
        entry = instance.relatedEntries.order_by('id')
        return EntryBookSerializer(entry, many=True).data
       

class DoorSerializer(serializers.ModelSerializer):
    relatedParts = serializers.SerializerMethodField()

    class Meta:
        model = door
       
        fields = ('id', 'name', 'relatedParts')
    
    def get_relatedParts(self, instance):
        part = instance.relatedParts.order_by('id')
        return PartSerializer(part, many=True).data


class BookSerializer(serializers.ModelSerializer):
    

    relatedDoors = serializers.SerializerMethodField()

    
    relatedParts = serializers.SerializerMethodField()

    relatedChapters = serializers.SerializerMethodField()

    bookCategory = serializers.SlugRelatedField(
     
        read_only = True,
        slug_field='categories_dictionary'
    )

    bookClassification = serializers.SlugRelatedField(
        many=True,
        read_only = True,
        slug_field='classification_dictionary'
    )

    author = serializers.SlugRelatedField(
        many=True,
        read_only = True,
        slug_field= 'authors_dictionary'
    )

    bookOrigin = serializers.SlugRelatedField(
        read_only = True,
        slug_field= 'countries_dictionary'
    )
    # relatedDoors = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = book
        fields = '__all__'

    def get_relatedDoors(self, instance):
        doors = instance.relatedDoors.order_by('id')
        return DoorSerializer(doors, many=True).data
    
    def get_relatedParts(self, instance):
        part = instance.relatedParts.order_by('id')
        return PartSerializer(part, many=True).data

    def get_relatedChapters(self, instance):
        entry = instance.relatedChapters.order_by('id')
        return EntryBookSerializer(entry, many=True).data
       
        # fields = ['id', 'name', 'author', 'containsParts', 'containsDoors', 'bookCategory', 'bookClassification', 'publicationDate', 'cover', 'relatedChapters', 'relatedParts', 'relatedDoors' ]
                                                                                                     
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# UserModel = get_user_model()

# class UserRegisterSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserModel
# 		fields = '__all__'
# 	def create(self, clean_data):
# 		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
# 		user_obj.username = clean_data['username']
# 		user_obj.save()
# 		return user_obj

# class UserLoginSerializer(serializers.Serializer):
# 	email = serializers.EmailField()
# 	password = serializers.CharField()
# 	##
# 	def check_user(self, clean_data):
# 		user = authenticate(username=clean_data['email'], password=clean_data['password'])
# 		if not user:
# 			raise ValidationError('user not found')
# 		return user

# class UserSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserModel
# 		fields = ('email', 'username')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = author
        fields = ('id','name', 'picture', 'degree', 'about')


    

class DoorFormSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = door
        fields = ('id', 'name', 'relatedParts')
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = categories
        fields = '__all__'

class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = countries
        fields = '__all__'

class ClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = classification
        fields = '__all__'

class EntryEditFormSerializer(serializers.ModelSerializer):
    entryauthor = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='authors_dictionary'
    )
    entryCategory = serializers.SlugRelatedField(
        many=False,
        read_only = True,
        slug_field="categories_options_dictionary"
    )
    entryClassification = serializers.SlugRelatedField(
        many = True,
        read_only = True,
        slug_field= "classification_dictionary"
    )

    entryOrigin = serializers.SlugRelatedField(
        many = False,
        read_only = True,
        slug_field= "countries_options_dictionary"
    )

    class Meta:
        model = entry
        fields = (
            'id',
            'title',
            'body',
            'entryOrigin',
            'entryauthor',
            'entryPubDate',
            'bibiliography',
            'entryCategory',
            'entryClassification',
            'entryCover',
            'favouriteusers', 
        )
        


class EntryFavourtiesSerializer(serializers.ModelSerializer):
    entryauthor = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='author_dictionary'
    )
    entryCategory = serializers.SlugRelatedField(
        many=False,
        read_only = True,
        slug_field="categories_dictionary"
    )
    # entryClassification = serializers.SlugRelatedField(
    #     many = True,
    #     read_only = True,
    #     slug_field= "classification_dictionary"
    # )

    class Meta:
        model = entry
        fields = (
            'id',
            'title',
            'body',
            'entryOrigin',
            'entryauthor',
            'entryPubDate',
            'bibiliography',
            'entryCategory',
            'entryClassification',
            'entryCover',
            'favouriteusers', 
        )

class BookFavourtiesSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='author_dictionary'
    )
    bookCategory = serializers.SlugRelatedField(
        many=False,
        read_only = True,
        slug_field="categories_dictionary"
    )
    # entryClassification = serializers.SlugRelatedField(
    #     many = True,
    #     read_only = True,
    #     slug_field= "classification_dictionary"
    # )

    class Meta:
        model = book
        fields = '__all__'
        


class UserInfoSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        many=False,
        read_only = True,
        slug_field='user_dictionary'
    )
    approvedcountries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='countries_dictionary'
    )
    approvedcategories = serializers.SlugRelatedField(
        many=True,
        read_only = True,
        slug_field='categories_dictionary'
    )

    favouriteEntries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='entry_dictionary'
    )

    downloadedEntries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='entry_dictionary'
    )

    viewedEntries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='entry_dictionary'
    )

    submittedentries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='entry_dictionary'
    )

    submittedAuthors = serializers.SlugRelatedField(
        many = True,
        read_only=True,
        slug_field='author_dictionary'
    )
    submittedBooks = serializers.SlugRelatedField(
        many = True,
        read_only=True,
        slug_field='book_dictionary'
    )



    class Meta:
        model = userInfo
        fields = ['user', 'lastPaid', 'lastDatePayment', 'is_admin', 'approved', 'approvedcountries','approvedcategories','favouriteEntries','downloadedEntries', 'viewedEntries','submittedentries', 'submittedAuthors','submittedBooks']

class UserInfoPutSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = userInfo
        fields = ['id','user', 'lastPaid', 'lastDatePayment', 'is_admin', 'approved', 'approvedcountries','approvedcategories','favouriteEntries','downloadedEntries', 'viewedEntries','submittedentries', 'submittedAuthors','submittedBooks']


class EntryFormSerializer(serializers.ModelSerializer):
    
    entryCover = serializers.ImageField(required=False)
    class Meta:
        model = entry
        fields = ['id','title', 'body', 'entryauthor', 'entryOrigin', 'entryPubDate',  'entryCategory','bibiliography','entryCover', 'entryClassification', 'submittedUser']
    # def to_representation(self, instance):
    #     self.fields['submittedUser'] =  UserSerializer(read_only=True)
    #     return super(EntryFormSerializer, self).to_representation(instance)
    # def save(self):
    #     user =  self.context['request'].user
class AuthorFormSerializer(serializers.ModelSerializer):
    
    picture = serializers.ImageField(required=False)
    class Meta:
        model = author
        fields = ['id','name', 'degree', 'picture', 'about']

class BookFormSerializer(serializers.ModelSerializer):
    cover = serializers.ImageField(required=False)
    class Meta:
        model = book
        fields = ['id','cover', 'name', 'author', 'containsParts', 'containsDoors', 'bookClassification','bookCategory','bookOrigin' ,'publicationDate', 'relatedChapters', 'relatedParts', 'relatedDoors' ]


                                                                                            #     name = models.CharField(max_length=499)
                                                                                                # author = models.ManyToManyField('author', blank=True, max_length=300)
                                                                                                # containsParts = models.BooleanField(default=False)
                                                                                                # containsDoors = models.BooleanField(default=False)
                                                                                                # bookCategory = models.ForeignKey('categories', on_delete=models.CASCADE, default=None)
                                                                                                # publicationDate = models.DateField()
                                                                                                # cover = models.ImageField(upload_to='bookcover')
                                                                                                # relatedChapters = models.ManyToManyField('entry',  blank=True)
                                                                                                # relatedParts = models.ManyToManyField('part',  blank=Tr                                                                   # relatedDoors = models.ManyTo
# class MyModelSerializer(serializers.ModelSerializer):

#     creator = serializers.ReadOnlyField(source='creator.username')
#     creator_id = serializers.ReadOnlyField(source='creator.id')
#     image_url = serializers.ImageField(required=False)

#     class Meta:
#         model = MyModel
#         fields = ['id', 'creator', 'creator_id', 'title', 'description', 'image_url']
