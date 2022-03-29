# Controls what fields are packaged together

from django.db import transaction
from .forms import AddressValidationForm

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser, ParkingSpace

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
        user = CustomUser.objects.get(username=username)
        user.is_active = False
        user.save()

class ParkingCreationSerializer(ModelSerializer):
    class Meta:
        model = ParkingSpace
        fields = (
            'provider',
            'streetAddress',
            'city',
            'state',
            'postcode',
            'price',
            # 'image',
            'notes',
            'is_active',      
        )

    def save(self, request):
        print(request.data)
        cleanAddress = AddressValidationForm(request.data)
        cleanAddress.clean()
        if cleanAddress.errors:
            raise cleanAddress.errors
        parking.streetAddress = cleanAddress.get('streetAddress')
        parking.city = cleanAddress.get('city')
        parking.state = cleanAddress.get('state')
        parking.postcode = cleanAddress.get('postcode')

        parking.provider = self.data.get('provider')
        parking.price = self.data.get('price')
        # parking.image = self.data.get('image')
        parking.notes = self.data.get('notes')
        parking.is_active = self.data.get('is_active')
        parking.save()
        return parking