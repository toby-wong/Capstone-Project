# Controls what fields are packaged together

from django.db import transaction
from django.db.models import Avg
from pkg_resources import require
from .utils import AddressValidation, getCoords
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SlugRelatedField
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser, Favourite, ParkingSpace, Image, Transaction, Review, Vehicle
from drf_writable_nested.serializers import NestedUpdateMixin
from datetime import datetime

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'email',
            'username',
            'first_name',
            'last_name',
            'phone_number',
            'card_number',
            'expiry_date',
            'cvc',
            'bsb',
            'account_number',
            'account_name',
            'is_staff',
            'pk'
        )
        
        read_only_fields = ('first_name', 'last_name', 'username', 'pk')

class CustomRegisterSerializer(RegisterSerializer):
# here we define any additional fields we are adding to the dj-rest-auth RegisterSerializer
# so we are basically extending what you need (or really what you can potentially provide) to register
# in simple terms, it is looking for fields called "phone_number" in the JSON request and saving them into a variable

    phone_number = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)

    # you make it atomic so unless you get all the fields it will deny you
    @transaction.atomic
    # essentially we are redefining the function that takes JSON -> database
    def save(self, request):
        # user is a 'row' in the Users table, but it hasn't been added to the DB yet
        # the row needs to be populated with info from the JSON, and the super().save populates default fields
        user = super().save(request)
        # now we populate our custom fields
        user.phone_number = self.data.get('phone_number')
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        # insert row into DB
        user.save()
        # profit???
        return user

class RemoveUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = []
    
    def delete(self, request):
        username = request.data.get('username')
        user = self.Meta.model.objects.get(username=username)
        user.delete()
        # user.is_active = False
        # user.save()


class ImageSerializer(ModelSerializer):

    image_data = serializers.CharField()
    class Meta:
        model = Image
        fields = (
            'image_data',
            'pk'
        )

        read_only_fields = ['pk']


class ParkingSpaceSerializer(NestedUpdateMixin, ModelSerializer):


    images = ImageSerializer(many=True)
    provider = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    #add avg rating stuff here

    class Meta:
        model = ParkingSpace
        # fields = []
        fields = (
            'provider',
            'streetAddress',
            'city',
            'state',
            'postcode',
            'price',
            'size',
            'notes',
            'longitude',
            'latitude',
            'startTime',
            'endTime',
            'status',
            'images',
            'avg_rating',
            'n_ratings',
            'is_active',
            'pk',      
        )

        # read_only_fields = ('provider', 'streetAddress','city', 'state', 'postcode')

        read_only_fields = ['pk', 'is_active', 'status', 'avg_rating', 'n_ratings', 'longitude', 'latitude']


    def create(self, validated_data):
        imgs_data = validated_data.pop('images')
        parkingSpace = ParkingSpace.objects.create(**validated_data)
        cleanAddress = AddressValidation(validated_data)
        cleanAddress = cleanAddress.validate()
        if not type(cleanAddress) == dict:
            raise serializers.ValidationError(cleanAddress.errors)
        address = ' '.join(list(cleanAddress.values())[:4])
        coords = getCoords(address)
        parkingSpace.longitude = coords[0]
        parkingSpace.latitude = coords[1] 

        parkingSpace.save()
        for img_data in imgs_data:
            Image.objects.create(parkingSpace=parkingSpace, **img_data)
        return parkingSpace

class VehicleSerializer(ModelSerializer):

    user = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Vehicle
        fields = (
            'user',
            'carMake',
            'carModel',
            'carYear',
            'carColour',
            'carRego',
            'pk'
        )

        read_only_fields = ['pk']
        

class FavouriteSerializer(ModelSerializer):

    consumer = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())

    class Meta:
        model = Favourite
        fields = (
            'consumer',
            'parkingSpace',
            'pk'
        )

        read_only_fields = ['pk']

class TransactionSerializer(ModelSerializer):

    provider = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    consumer = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    vehicle = PrimaryKeyRelatedField(queryset=Vehicle.objects.all())
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())
    streetAddress = serializers.CharField(source="parkingSpace.streetAddress", required=False)
    city = serializers.CharField(source="parkingSpace.city", required=False) 
    state = serializers.CharField(source="parkingSpace.state", required=False)
    postcode = serializers.CharField(source="parkingSpace.postcode", required=False)
    consumerName = serializers.CharField(source="consumer.username", required=False)
    parkingSpaceSize = serializers.CharField(source="parkingSpace.size", required=False)


    class Meta:
        model = Transaction
        fields = (
            'provider',
            'consumer',
            'vehicle',
            'parkingSpace',
            'streetAddress',
            'city',
            'state',
            'postcode',
            'consumerName',
            'parkingSpaceSize',
            'startTime',
            'endTime',
            'totalCost',
            'pk'
        )

        read_only_fields = ['pk', 'streetAddress', 'city', 'state', 'postcode']
    
    def validate(self, data):
        startTime = data['startTime']
        endTime = data['endTime']
        if startTime > endTime:
            raise serializers.ValidationError('Booking start time must be before booking end time')
        parkingSpace = ParkingSpace.objects.filter(pk=data['parkingSpace'].pk).first()
        if parkingSpace.startTime > startTime or parkingSpace.endTime < endTime or parkingSpace.startTime > endTime or parkingSpace.endTime < startTime:
             raise serializers.ValidationError('This booking does not fit within the parking space availability.')
        qs = Transaction.objects.filter(parkingSpace=data['parkingSpace']).exclude(startTime__date__gt=endTime).exclude(endTime__date__lt=startTime)
        if qs.exists():
            raise serializers.ValidationError('This booking overlaps with an existing booking.')
        return data

        

class ReviewSerializer(ModelSerializer):

    consumer = SlugRelatedField(queryset=CustomUser.objects.all(), slug_field='username')
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())

    class Meta:
        model = Review
        fields = (
            'parkingSpace',
            'consumer',
            'rating',
            'comment',
            'publishDate',
            'pk'
        )

        read_only_fields = ['pk']

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        count = Review.objects.filter(parkingSpace = review.parkingSpace).count()
        average = Review.objects.filter(parkingSpace = review.parkingSpace).aggregate(Avg('rating'))
        parkingSpace = ParkingSpace.objects.filter(pk=review.parkingSpace.pk).first()
        parkingSpace.avg_rating = average['rating__avg']
        parkingSpace.n_ratings = count
        parkingSpace.save()

        return review
