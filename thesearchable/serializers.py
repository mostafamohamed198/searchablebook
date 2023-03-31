from .models import *
from rest_framework import serializers

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = entry
        fields = (
            'title',
            'body',
            'entryauthor',
            'bibiliography'
        )

class BookSerializer(serializers.ModelSerializer):
    # relatedDoors = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = book
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = author
        fields = ('name', 'picture', 'degree', 'about')

class PartSerializer(serializers.ModelSerializer):

    class Meta:
        model = part
        fields = '__all__'
    
class DoorSerializer(serializers.ModelSerializer):

    class Meta:
        model = door
        fields = ('id', 'name', 'relatedParts')
    





