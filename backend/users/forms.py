from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import CustomUser 
 

#need to update this with the custom fields too
class CustomUserCreationForm(UserCreationForm):    
    class Meta:        
        model = CustomUser        
        fields = (
            'email', 
            'phone_number', 
            'card_number',
            'expiry_date',
            'cvc',
            'bsb',
            'account_number',
            'account_name',
        )  


class CustomUserChangeForm(UserChangeForm):    
    class Meta:        
        model = CustomUser        
        fields = UserChangeForm.Meta.fields

class RemoveUser(forms.Form):
    username = forms.CharField()
