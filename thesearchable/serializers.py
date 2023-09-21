from .models import *
from rest_framework import serializers


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
        model = Entry
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
        model = Entry
        fields = (
            'id',
            'title',
            'entryCover',
           
        )
class PartSerializer(serializers.ModelSerializer):

    relatedEntries = serializers.SerializerMethodField()
    class Meta:
        model = Part
        fields = '__all__'

    def get_relatedEntries(self, instance):
        entry = instance.relatedEntries.order_by('id')
        return EntryBookSerializer(entry, many=True).data
       

class DoorSerializer(serializers.ModelSerializer):
    relatedParts = serializers.SerializerMethodField()

    class Meta:
        model = Door
       
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
        model = Book
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



class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','name', 'picture', 'degree', 'about')


    

class DoorFormSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Door
        fields = ('id', 'name', 'relatedParts')
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class ClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classification
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
        model = Entry
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
        model = Entry
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
        model = Book
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
        model = UserInfo
        fields = ['user', 'lastPaid', 'lastDatePayment', 'is_admin', 'approved', 'approvedcountries','approvedcategories','favouriteEntries','downloadedEntries', 'viewedEntries','submittedentries', 'submittedAuthors','submittedBooks']

class UserInfoPutSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = UserInfo
        fields = ['id','user', 'lastPaid', 'lastDatePayment', 'is_admin', 'approved', 'approvedcountries','approvedcategories','favouriteEntries','downloadedEntries', 'viewedEntries','submittedentries', 'submittedAuthors','submittedBooks']


class EntryFormSerializer(serializers.ModelSerializer):
    
    entryCover = serializers.ImageField(required=False)
    class Meta:
        model = Entry
        fields = ['id','title', 'body', 'entryauthor', 'entryOrigin', 'entryPubDate',  'entryCategory','bibiliography','entryCover', 'entryClassification', 'submittedUser']
    # def to_representation(self, instance):
    #     self.fields['submittedUser'] =  UserSerializer(read_only=True)
    #     return super(EntryFormSerializer, self).to_representation(instance)
    # def save(self):
    #     user =  self.context['request'].user
class AuthorFormSerializer(serializers.ModelSerializer):
    
    picture = serializers.ImageField(required=False)
    class Meta:
        model = Author
        fields = ['id','name', 'degree', 'picture', 'about']

class BookFormSerializer(serializers.ModelSerializer):
    cover = serializers.ImageField(required=False)
    class Meta:
        model = Book
        fields = ['id','cover', 'name', 'author', 'containsParts', 'containsDoors', 'bookClassification','bookCategory','bookOrigin' ,'publicationDate', 'relatedChapters', 'relatedParts', 'relatedDoors' ]

