

from django_elasticsearch_dsl import Document, fields, Index
from django_elasticsearch_dsl.registries import registry
from django.conf import settings
from .models import *
from elasticsearch_dsl import analyzer, tokenizer


autocomplete_analyzer = analyzer('autocomplete_analyzer',
            tokenizer=tokenizer('trigram', 'ngram', min_gram=1, max_gram=20),
            filter=['lowercase']
        )

entry_index=Index('entries')
# See Elasticsearch Indices API reference for available settings
# entry_index.settings(
#     number_of_shards=1,
#     number_of_replicas=0
# )

# @entry_index.document
@registry.register_document
class EntryDocument(Document):
    id = fields.IntegerField(attr='id')
    title = fields.TextField(
        attr='title',
        fields={
            'raw': fields.TextField(analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField(),
            'key': fields.KeywordField(),
           
            
        }
    )
    body = fields.TextField(
        attr='body',
        fields={
            'raw': fields.TextField(analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField(),
           
        }
    )

    entryauthor = fields.NestedField(
        attr='entryauthor',
        properties = {
        'id': fields.IntegerField(),
        'name': fields.TextField(
         attr='name',
        fields={
                'raw': fields.TextField(),
                'key': fields.KeywordField(),
               
                }
        ) },   )
    

    entryOrigin = fields.ObjectField(
        attr = 'entryOrigin',
        properties={
        'id': fields.IntegerField(),
        'country': fields.TextField(
        attr='country',
        fields={
                'raw': fields.KeywordField(),
               
                }
        )
        }
    )

    entryCategory = fields.ObjectField(
        attr='entryCategory',
        properties = {
        'id': fields.IntegerField(),
        'thecategory':  fields.TextField(
            attr='thecategory',
            fields={
        'key': fields.KeywordField(),
        'raw': fields.TextField()
            }
        ),

       
       
        
        }
    )

    entryClassification = fields.ObjectField(
        attr='entryClassification',
        properties = {
        'theclass':  fields.TextField(
        attr='theclass',
        fields={
        'key': fields.KeywordField(),
       
        }
        ),
        
        }
    )

    
    entryCover = fields.FileField(attr='entryCover')
    entryPubDate= fields.DateField(attr='entryPubDate')
    bibiliography = fields.TextField(
        attr='bibilography',
        fields = {
        'bibilography': fields.TextField(analyzer='keyword')
        }
    )
    favouriteusers = fields.ObjectField(
        attr='favouriteusers',
        properties = {
        'id':  fields.IntegerField(),
        
        }
    )
    viewsCounts = fields.IntegerField(attr='viewsCounts')

    class Index:
        name = 'entries'
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            'max_ngram_diff': 20 
        }


    class Django:
        model = entry
        fields= []
