# Controls what fields are packaged together

from webbrowser import get
from django.db import transaction
from .utils import AddressValidation, getCoords, getParkingSpace, getUser
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser, ParkingSpace, Image
from django.core.files.uploadedfile import InMemoryUploadedFile

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

# class ParkingCreationSerializer(ModelSerializer):
#     class Meta:
#         model = ParkingSpace
#         fields = (
#             'provider',
#             'streetAddress',
#             'city',
#             'state',
#             'postcode',
#             'price',
#             'image',
#             'size',
#             'notes',
#             'is_active',
#             'pk'  # primary key
#         )

    

class ParkingSpaceSerializer(ModelSerializer):
    class Meta:
        model = ParkingSpace
        # fields = []
        fields = (
            'provider',
            'streetAddress',
            'city',
            'state',
            'postcode',
            'longitude',
            'latitude',
            'price',
            'size',
            'notes',
            'is_active',
            # 'pk'  # primary key
        )
        # read_only_fields = ('provider', 'streetAddress','city', 'state', 'postcode')

    def save(self, request):
        cleanAddress = AddressValidation(request.data)
        if cleanAddress.errors:
            raise cleanAddress.errors
        parking = super().save()
        parking.streetAddress = cleanAddress['street_address']
        parking.city = cleanAddress['city']
        parking.state = cleanAddress['country_area']
        parking.postcode = cleanAddress['postal_code']
        address = ''.join(f'{v} ' for i, v in enumerate(cleanAddress.__dict__.values()) if i < 4)
        coords = getCoords(address)
        print(coords)
        parking.longitude = coords[0]
        parking.latitude = coords[1]        
        print(self.data.get('provider'))
        parking.provider = getUser(self.data.get('provider'))
        parking.price = self.data.get('price')
        parking.size = self.data.get('size')
        parking.notes = self.data.get('notes')
        parking.is_active = True # need to change to False when we implement the admin panel
        parking.save()
        try:
            for i in self.data.get('images'):
                ImageSerializer(parkingID=parking.id, image=i)
        except:
            pass
        return parking

    def edit(self, request):
        parkingInstance = self.Meta.model.objects.get(id=request.data.get('pk'))
        parkingInstance.__dict__ = {**parkingInstance.__dict__, **request.data}
        parkingInstance.save()
        # parkingInstance.price = request.data.get('price')
        # parkingInstance.image = request.data.get('image')
        # parkingInstance.size = request.data.get('size')
        # parkingInstance.notes = request.data.get('notes')

    def delete(self, request):
        parkingInstance = self.Meta.model.objects.get(id=request.data.get('pk'))
        # parkingInstance.is_active = False
        # parkingInstance.save()
        parkingInstance.delete()

class ImageSerializer:
    class Meta:
        model = Image
        fields = (
            'key',
            'image'
        )

    def get(self, request):
        parkingID = request.data.get('pk')
        return self.Meta.model.objects.filter(key=parkingID)

    def save(self, request):
        parkImage = super().save(request)
        parkImage.key = getParkingSpace(self.data.get('pk'))
        parkImage.image = self.data.get('image')
    