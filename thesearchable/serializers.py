from .models import *
from rest_framework import serializers
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from.documents import EntryDocument

class EntrySerializer(serializers.ModelSerializer):
    # entryauthor = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='name'
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
    
class BookSerializer(serializers.ModelSerializer):
    relatedParts = serializers.SlugRelatedField(
        many=True,
        read_only = True,
        slug_field='part_dictionary'
    )
    # relatedDoors = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = book
        fields = '__all__'
        # fields = ['id', 'name', 'author', 'containsParts', 'containsDoors', 'bookCategory', 'bookClassification', 'publicationDate', 'cover', 'relatedChapters', 'relatedParts', 'relatedDoors' ]
                                                                                                     
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = author
        fields = ('id','name', 'picture', 'degree', 'about')

class PartSerializer(serializers.ModelSerializer):

    class Meta:
        model = part
        fields = '__all__'
    
class DoorSerializer(serializers.ModelSerializer):

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


    class Meta:
        model = userInfo
        fields = ['user', 'lastPaid', 'lastDatePayment', 'is_admin', 'approved', 'approvedcountries','approvedcategories','favouriteEntries','downloadedEntries', 'viewedEntries','submittedentries']


class EntryFormSerializer(serializers.ModelSerializer):
    
    entryCover = serializers.ImageField(required=False)
    class Meta:
        model = entry
        fields = ['title', 'body', 'entryauthor', 'entryOrigin', 'entryPubDate',  'entryCategory','bibiliography','entryCover', 'entryClassification']

class AuthorFormSerializer(serializers.ModelSerializer):
    
    picture = serializers.ImageField(required=False)
    class Meta:
        model = author
        fields = ['name', 'degree', 'picture', 'about']

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
                                                                                                # relatedParts = models.ManyToManyField('part',  blank=True)
                                                                                                # relatedDoors = models.ManyTo
# class MyModelSerializer(serializers.ModelSerializer):

#     creator = serializers.ReadOnlyField(source='creator.username')
#     creator_id = serializers.ReadOnlyField(source='creator.id')
#     image_url = serializers.ImageField(required=False)

#     class Meta:
#         model = MyModel
#         fields = ['id', 'creator', 'creator_id', 'title', 'description', 'image_url']
