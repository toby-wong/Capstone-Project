from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import CustomUser, ParkingSpace
from i18naddress import InvalidAddress, normalize_address, get_validation_rules


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

class ParkingCreationForm(forms.Form):
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
            'notes',
            'is_active',      
        )
    
    def clean(self):
        clean_data = super(f'{ParkingCreationForm.streetAddress} {ParkingCreationForm.city} {ParkingCreationForm.state} {ParkingCreationForm.postcode} AU', self).clean() # stripped address details from form
        validation_rules = get_validation_rules(clean_data)
        try:
            valid_address = normalize_address(clean_data)
        except InvalidAddress as e:
            errors = e.errors
            valid_address = None
            for field, error_code in errors.items():
                if field == 'postal_code':
                    examples = validation_rules.postal_code_examples
                    msg = 'Invalid value, use format like XXXX' % examples
                else:
                    msg = ERROR_MESSAGES[error_code] # TODO: look into implementation of this
                self.add_error(field, msg)
        return valid_address or clean_data