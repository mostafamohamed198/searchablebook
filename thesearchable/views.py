from django.shortcuts import render
from .forms import * 
from .models import *
from markdown2 import markdown
import markdown as md
from django import template
from django.template.defaultfilters import stringfilter
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, HttpResponseRedirect
from .utils import render_to_pdf
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer,PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
import reportlab
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
import pdfkit
from django.template.loader import get_template
from django.conf import settings
import os
from wkhtmltopdf.views import PDFTemplateResponse 

# Create your views here.

def index(request, id):
    return render(request, 'frontend/index.html')


class EntryList(generics.ListCreateAPIView):
    queryset = entry.objects.all()
    serializer_class = EntrySerializer


class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = entry.objects.all()
    serializer_class = EntrySerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = author.objects.all()
    serializer_class = AuthorSerializer


@api_view(['GET', 'PUT', 'DELETE'])
def required_book(request, id):
    snippet = 0
    thechabpterbook = entry.objects.get(id = id)
    for object in book.objects.all():
        for chapter in object.relatedChapters.all():
            if int(chapter.id) == int(id):
                snippet = book.objects.get(id = object.id)
                print(object.id)

    if request.method == 'GET':
        serializer = BookSerializer(snippet)
        return Response(serializer.data)
    
@api_view(['GET', 'PUT', 'DELETE'])
def required_door(request, idd):
    try:
        thedoor = door.objects.get(id = idd)
    except book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoorSerializer(thedoor)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def required_part(request, iddd):
    try:
        thepart = part.objects.get(id = iddd)
    except part.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PartSerializer(thepart)
        return Response(serializer.data)
    
@api_view(['GET', 'PUT', 'DELETE'])
def required_chapter(request, idddd):
    try:
        thechapter = entry.objects.get(id = idddd)
    except thechapter.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EntrySerializer(thechapter)
        return Response(serializer.data)






def ResultList(request):

    template_name = "frontend/thepdf.html"
    theentry = entry.objects.get(id = 2)

    pdf = render_to_pdf(
        template_name,
        {
            "entry": theentry
        }, 
    )
    return HttpResponse(pdf, content_type='application/pdf')

def new(request):
    buffer = io.BytesIO()
    doc = canvas.Canvas(buffer)
    pdfmetrics.registerFont(TTFont('Arabic','C:/Users/mostafa mohamed/newsearch/searchablebooks/alfont_com_29LTZawi-Regular.ttf'))
    styles = getSampleStyleSheet()
    arabic_text_style = ParagraphStyle(
    'border', # border on
    parent = styles['Normal'] , # Normal is a defaul style  in  getSampleStyleSheet
    borderColor= '#333333',
    borderWidth =  1,
    borderPadding  =  2,
    fontName="Arabic" #previously we named our custom font "Arabic"
    )
    storys = []
    
    arabic_text =""" عندما يريد العالم أن ‪يتكلّم ‬ ، فهو يتحدّث بلغة
    يونيكود. تسجّل الآن لحضور المؤتمر الدولي العاشر ليونيكود (Unicode Conference)، الذي سيعقد في 10-12 آذار 1997 بمدينة مَايِنْتْس، ألمانيا. و سيجمع المؤتمر بين خبراء
    من كافة قطاعات الصناعة على الشبكة العالمية انترنيت ويونيكود، حيث ستتم، على الصعيدين الدولي والمحلي على حد سواء مناقشة سبل استخدام يونكود في النظم القائمة وفيما يخص التطبيقات الحاسوبية، الخطوط، تصميم النصوص والحوسبة متعددة اللغات."""

    # reshape the text 
    rehaped_text = arabic_reshaper.reshape(arabic_text)
    bidi_text = get_display(rehaped_text)

    # add the text to pdf
    ## dont forget to add the style arabic_text_style
    storys.append(Paragraph(bidi_text,arabic_text_style))
    storys.append(Spacer(1,8)) # set the space here
    storys.append(Paragraph(bidi_text,arabic_text_style))
    doc = SimpleDocTemplate('mydoc.pdf',pagesize = letter)
    ## add the storys array to the pdf document
    buffer.seek(0)
   
    return FileResponse(request, as_attachment=True, filename='mydoc')


wkhtml_to_pdf = os.path.join(
    settings.BASE_DIR, "wkhtmltopdf.exe")


def resume_pdf(request,id):
    options = {
        'page-size': 'A4',
        'page-height': "13in",
        'page-width': "10in",
        'margin-top': '0in',
        'margin-right': '0in',
        'margin-bottom': '0in',
        'margin-left': '0in',
        'encoding': "UTF-8",
        'no-outline': None
    }

    template_path = 'frontend/thepdf.html'
    template = get_template(template_path)
    
    context = {"name": "Areeba Seher"}
    html = template.render(context)

    config = pdfkit.configuration(wkhtmltopdf=wkhtml_to_pdf)

    pdf = pdfkit.from_string(html, False, configuration=config, options=options)

    # Generate download
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="resume.pdf"'
    theEntry = entry.objects.get(id= id)
    context = {'entry' : theEntry, 'entrybody': markdown(theEntry.body) }
    # print(response.status_code)
    if response.status_code != 200:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    # return response
    return PDFTemplateResponse(request=request, cmd_options={'disable-javascript':True}, template=template, context=context)

