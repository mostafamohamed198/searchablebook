from django.forms import ModelForm
from django import forms
from .models import *

class AuthorForm(ModelForm):
    class Meta:
        model = entry
        fields = '__all__'
        
        