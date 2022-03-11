# Controls what fields are packaged together

from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'phoneNumber', 'username', 'firstName', 'lastName', 'password')