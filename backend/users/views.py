# "Queries" for Django database
from users.forms import *
from users.models import CustomUser, ParkingSpace
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
            # user.delete()
            user.is_active = False
            return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'User not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddParkingSpace(GenericAPIView):

    def post(self,request):
        form = ParkingCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'Parking space added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Parking space not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)