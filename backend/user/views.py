from http.client import HTTPResponse
from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.template import loader
import sys
sys.path.append("..")
from mongoDB.query import initDB
import sys

def index(request):
    # Example of what we need to do, access html from frontend folders
    # And render it through these functions
    # return render(request, 'polls/index.html')

    # Example of using mongoDB in our backend
    dbHandle = initDB()
    if dbHandle is None:
        print("Error: Database not found")
        sys.exit(1)
    else:
        print('db initialized')

    collection = dbHandle.users
    result = collection.find_one({"email": "y0unggil0919@gmail.com"})
    if result:
        name = result["name"]
        request = "Welcome to Index page" + "\n" + name
        return HttpResponse(request)
    else:
        raise Http404("link not found lmao")
    
def register(request):
    # Example of initial setup - not recommended down the line
    request = "welcome to Registration Page"
    return HttpResponse(request)

def login(request):
    request = "Welcome to Login Page"
    return HttpResponse(request)

def forgot(request):
    request = "Forgot your password? You're in the right place"
    return HttpResponse(request)

def code(request):
    request = "Verify your code here"
    return HttpResponse(request)

def reset(request):
    request = "welcome to Reset Password Page"
    return HttpResponse(request)

def logout(request):
    request = "Thankful for Logout page"
    return HttpResponse(request)