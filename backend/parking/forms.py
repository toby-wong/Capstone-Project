from django import forms
from .models import ParkingSpace, Transaction

class ParkingCreation(forms.Form):
    
    class Meta:
        model = ParkingSpace
        fields = (
            'provider',
            'streetAddress',
            'city',
            'state',
            'postcode',
            'price',
            'image',
            'approved',      
        )