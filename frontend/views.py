
# Create your views here.
from django.shortcuts import render
from django.template.loader import render_to_string
from weasyprint import HTML
from django.contrib.auth import login, logout
from django.db import IntegrityError
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, FileResponse
from docx import *
from thesearchable.models import Entry, UserInfo, User
import tempfile


def get_generated_problems_in_pdf(request,id):

    # queryset
    theEntry = Entry.objects.get(id = id)

    # context passed in the template
    # context = {'entry' : theEntry, 'entrybody': markdown(theEntry.body) }
    context = {'entry' : theEntry, 'entrybody': theEntry.body }
    # return render(request, "frontend/thepdf.html", context)

    # render
    html_string = render_to_string(
        'frontend/thepdf.html',context)
    html = HTML(string=html_string)
    result = html.write_pdf()

    # http response
    response = HttpResponse(content_type='application/pdf;')
    response['Content-Disposition'] = 'inline; filename=problem_list.pdf'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())

    return response




def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "frontend/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            UserInfo.objects.create(user = user)
        except IntegrityError:
            return render(request, "frontend/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("landing"))
    else:
        return render(request, "frontend/register.html")

def index(request, id):
    return render(request, 'frontend/index.html')

def landing(request):
    return render(request, 'frontend/index.html')

def results(request, stringvalue):
    return render(request, 'frontend/index.html')

