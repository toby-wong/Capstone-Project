# "Queries" for Django database
from django.shortcuts import render
from users.forms import *
from users.models import CustomUser
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
# @login_required(login_url='http://127.0.0.1:8000/')
class RemoveUserView(GenericAPIView):

    def delete(self,request):
        username = request.data.get('username')
        user = CustomUser.objects.get(username=username)
        if user is not None:
            user.delete()
            return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'User not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)