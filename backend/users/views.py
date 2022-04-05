# "Queries" for Django database
from urllib import request
from users.forms import *
from users.models import CustomUser, ParkingSpace, Transaction
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
import datetime as dt
from drf_spectacular.utils import extend_schema

# Create your views here.
# @login_required(login_url='http://127.0.0.1:8000/')
class RemoveUserView(GenericAPIView):
    serializer_class = RemoveUserSerializer

    def delete(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        if not serializer.errors:
            serializer.delete(request)
            return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'User not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class ParkingSpaceView(GenericAPIView):
    serializer_class = ParkingSpaceSerializer

    # def get(self, request):
    #     # serializer = self.get_serializer(data=request.data)
    #     return ParkingSpace.objects.filter(id=request.data.get('pk'))
    def post(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # print(serializer.errors)
        serializer.save(request)
        if not serializer.errors:
            return Response({'message': 'Parking space added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Parking space not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        if not serializer.errors:
            serializer.edit(request)
            return Response({'message': 'Parking space updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Parking space not updated'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        if not serializer.errors:
            serializer.delete(request)
            return Response({'message': 'Parking space deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'Parking space not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ImageView(GenericAPIView):
    serializer_class = ImageSerializer

    def get(self, request):
        # serializer = self.get_serializer(data=request.data)
        return Image.objects.filter(key=request.data.get('pk'))

    def save(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        if not serializer.errors:
            serializer.save(request)
            return Response({'message': 'Images uploaded'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Images not uploaded'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class Booking(RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

class Favourite(RetrieveUpdateDestroyAPIView):
    serializer_class = FavouriteSerializer
    queryset = Favourite.objects.all()

class FavouriteList(ListAPIView):
    serializer_class = FavouriteSerializer
    def get_queryset(self):
        # need to fix this so it filters for only a given car space
        user = self.request.user
        return Favourite.objects.filter(consumer=user)


class Vehicle(RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    

class ProviderHistory(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(provider=user)

class ConsumerHistory(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(consumer=user)

class Review(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class ReviewList(ListAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        # need to fix this so it filters for only a given car space
        space = self.kwargs['pk']
        return Review.objects.filter(parkingSpace=space)

class ParkingSpaceSchedule(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        # need to fix this so it filters for only a given car space
        space = self.kwargs['pk']
        return Transaction.objects.filter(parkingSpace=space)

    

    
    
