# "Queries" for Django database

from users.filters import RadiusFilter
from users.filters import ParkingSearchFilter
from users.forms import *
from users.models import ParkingSpace, Transaction
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import datetime as dt
from drf_spectacular.utils import extend_schema
from django_filters import rest_framework as filters
from users.utils import *

# Create your views here.
# @login_required(login_url='http://127.0.0.1:8000/')

# Users

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

# PARKING SPACES

# Create a parking space

class CreateParkingSpace(CreateAPIView):
    serializer_class = ParkingSpaceSerializer
    queryset = ParkingSpace.objects.all()

class ParkingSpaceView(RetrieveUpdateDestroyAPIView):
    serializer_class = ParkingSpaceSerializer
    def get_queryset(self):
        space = self.kwargs['pk']
        return ParkingSpace.objects.filter(pk=space)


# Get all parking spaces owned by the user

class ParkingSpaceList(ListAPIView):
    serializer_class = ParkingSpaceSerializer
    def get_queryset(self):
        provider = self.request.user
        return ParkingSpace.objects.filter(provider=provider)

#Get all parking spaces owned by user that are pending

class PendingParkingSpaceList(ListAPIView):
    serializer_class = ParkingSpaceSerializer
    def get_queryset(self):
        provider = self.request.user
        return ParkingSpace.objects.filter(provider=provider).filter(status='pending')


#Get all parking spaces owned by user that are rejected

class RejectedParkingSpaceList(ListAPIView):
    serializer_class = ParkingSpaceSerializer
    def get_queryset(self):
        provider = self.request.user
        return ParkingSpace.objects.filter(provider=provider).filter(status='rejected')

#Get all parking spaces owned by user that are approved

class ApprovedParkingSpaceList(ListAPIView):
    serializer_class = ParkingSpaceSerializer
    def get_queryset(self):
        provider = self.request.user
        return ParkingSpace.objects.filter(provider=provider).filter(status='approved')

# IMAGES
       
# Upload an image
class CreateImage(CreateAPIView):   
    serializer_class = ImageSerializer
    
    def delete(self, request, *args, **kwargs):
        space = self.kwargs['parkingID']
        images = Image.objects.filter(parkingSpace=space)
        if images:
            images.delete()
            return Response({"status":"ok"}, status=status.HTTP_200_OK)
        return Response({'message': 'Image deletion failed'}, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        space = self.kwargs['parkingID']
        #Image.objects.filter(parkingSpace=space).delete()
        return Image.objects.filter(parkingSpace=space)

# Do stuff with an existing image

class ImageView(RetrieveUpdateAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        image = self.kwargs['imgID']
        return Image.objects.filter(pk=image)


# Get all images associated with a Parking Space

class ImageList(ListAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        space = self.kwargs['parkingID']
        return Image.objects.filter(parkingSpace=space)


# BOOKINGS

# Add a booking
class CreateBooking(CreateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

# Do stuff with an existing booking

class BookingView(RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        booking = self.kwargs['bookingID']
        return Transaction.objects.filter(pk=booking)


# Get all bookings associated with a Parking Space

class BookingList(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        space = self.kwargs['parkingID']
        return Transaction.objects.filter(parkingSpace=space)

# Get all bookings that involve the user as a Provider

class ProviderBookingHistory(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(provider=user)

# Get all bookings that involve the user as a Consumer   

class ConsumerBookingHistory(ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(consumer=user)


# FAVOURITE

# Favourite a parking space
class CreateFavourite(CreateAPIView):
    serializer_class = FavouriteSerializer
    queryset = Favourite.objects.all()

# Do stuff with an existing Favourite

class FavouriteView(RetrieveUpdateDestroyAPIView):
    serializer_class = FavouriteSerializer
    def get_queryset(self):
        favourite = self.kwargs['favID']
        return Favourite.objects.filter(pk=favourite)

# Get all favourites associated with a Parking Space

class FavouriteList(ListAPIView):
    serializer_class = FavouriteSerializer
    def get_queryset(self):
        user = self.request.user
        return Favourite.objects.filter(consumer=user)

# VEHICLE

# Add a vehicle
class CreateVehicle(CreateAPIView):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()

# Do stuff with an existing vehicle

class VehicleView(RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    def get_queryset(self):
        vehicle = self.kwargs['vehicleID']
        return Vehicle.objects.filter(pk=vehicle)

# Get all vehicles associated with a consumer

class VehicleList(ListAPIView):
    serializer_class = VehicleSerializer
    def get_queryset(self):
        user = self.request.user
        return Vehicle.objects.filter(user=user)


# REVIEW

# Add a review

class CreateReview(CreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


# Do stuff with an existing review

class ReviewView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        review = self.kwargs['reviewID']
        return Review.objects.filter(pk=review)

# Get all reviews associated with a parking space

class ReviewList(ListAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        space = self.kwargs['parkingID']
        return Review.objects.filter(parkingSpace=space)

# SEARCH

# Search for a parking space

class AddressSuggestions(APIView):
    def get(self, request):
        suggestions = []
        address = request.query_params.get('address', None)
        if address is not None:
            suggestions = getSuggestions(address)
        return Response(suggestions)

class ParkingSearchList(ListAPIView):
    serializer_class = ParkingSpaceSerializer
    queryset = ParkingSpace.objects.filter(is_active=True, status='approved')

    serializer_class = ParkingSpaceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ParkingSearchFilter
    
    def get_queryset(self):
        queryset = super(ParkingSearchList, self).get_queryset()
        try:
            address = self.request.query_params.get('address')
            radius = self.request.query_params.get('radius')
            queryset = RadiusFilter(queryset, address, radius)
        except:
            print("No address or radius")
            queryset = RadiusFilter(queryset) # query params does not include address and radius
        # acceptable address formats: 'address, city, state', 'city, state'
        try:
            startTime = dt.datetime.strptime(self.request.query_params.get('startTime'), '%Y-%m-%d %H:%M:%S')
            endTime = dt.datetime.strptime(self.request.query_params.get('endTime'), '%Y-%m-%d %H:%M:%S')
            for booking in Transaction.objects.exclude(startTime__date__gt=endTime, endTime__date__lt=startTime):
                if queryset.contains(booking.parkingSpace):
                    queryset = queryset.exclude(pk=booking.parkingSpace.pk)
            return queryset
        except:
            return queryset
