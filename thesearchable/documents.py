from django_elasticsearch_dsl import Document, fields, Index
from django_elasticsearch_dsl.registries import registry
from django.conf import settings
from .models import *
from elasticsearch_dsl import analyzer, tokenizer, connections


autocomplete_analyzer = analyzer('autocomplete_analyzer',
            tokenizer=tokenizer('trigram', 'ngram', min_gram=3, max_gram=20),
            filter=['lowercase']
        )
arabic_analyzer = analyzer("rebuilt_arabic", 
                           tokenizer=tokenizer('trigram','ngram', min_gram=3, max_gram=10),
                        #    filter=["lowercase","decimal_digit", "arabic_normalization"]
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

    entryauthor = fields.ObjectField(
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
        'id':  fields.IntegerField(
            attr='id',
            fields={
                'key': fields.KeywordField()
            }
        ),
        
        }
    )
    viewsCounts = fields.IntegerField(attr='viewsCounts')

    source = fields.TextField(
        attr='source',
        fields={
            'raw': fields.TextField(analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField(),
            'key': fields.KeywordField(),
           
            
        }
    )
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








book_index=Index('books')


@registry.register_document
class BookDocument(Document):
    id = fields.IntegerField(attr='id')
    name = fields.TextField(
        attr='name',
        fields={
            'raw': fields.TextField(analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField(),
            'key': fields.KeywordField(),
           
            
        }
    )
    # body = fields.TextField(
    #     attr='body',
    #     fields={
    #         'raw': fields.TextField(analyzer=autocomplete_analyzer),
    #         'suggest': fields.CompletionField(),
           
    #     }
    # )

    author = fields.ObjectField(
        attr='author',
        properties = {
        'id': fields.IntegerField(),
        'name': fields.TextField(
         attr='name',
        fields={
                'raw': fields.TextField(),
                'key': fields.KeywordField(),
               
                }
        ) },   )
    

    bookOrigin = fields.ObjectField(
        attr = 'bookOrigin',
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

    bookCategory = fields.ObjectField(
        attr='bookCategory',
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

    bookClassification = fields.ObjectField(
        attr='bookClassification',
        properties = {
        'theclass':  fields.TextField(
        attr='theclass',
        fields={
        'key': fields.KeywordField(),
       
        }
        ),
        
        }
    )

    
    cover = fields.FileField(attr='cover')
    publicationDate= fields.DateField(attr='publicationDate')
    
  
 
    class Index:
        name = 'books'
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            'max_ngram_diff': 20 
        }


    class Django:
        model = book
        fields= []