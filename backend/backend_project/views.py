# "Queries" for Django database
from urllib import request
from users.forms import *
from users.models import CustomUser
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
# @login_required(login_url='http://127.0.0.1:8000/')
class AddAdminView(GenericAPIView):
    
    def add(self, request):
        admin_username = request.data.get('admin_username')
        username = request.data.get('username')
        existing_admin = CustomUser.objects.get(username=admin_username)
        user = CustomUser.objects.get(username=username)

        if existing_admin.is_staff and user is not None:
            if user.is_staff:
                return Response({'message': 'User is already admin'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            user.is_staff = True
            user.save()
            return Response({'message': 'User added as admin'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'User lacks permission to edit admin'}, status=status.HTTP_401_UNAUTHORIZED)


class RemoveAdminView(GenericAPIView):

    def remove(self, request):
        admin_username = request.data.get('admin_username')
        username = request.data.get('username')
        existing_admin = CustomUser.objects.get(username=admin_username)
        user = CustomUser.objects.get(username=username)

        if existing_admin.is_staff and user is not None:
            if user.is_staff:
                user.is_staff = False
                user.save()
                return Response({'message': 'User is removed as admin'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'message': 'User is not admin'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'message': 'User lacks permission to edit admin'}, status=status.HTTP_401_UNAUTHORIZED)