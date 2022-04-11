from operator import itemgetter
from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import CustomUser, Transaction
from i18naddress import normalize_address, get_validation_rules


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

class RemoveUserForm(forms.Form):

    class Meta:
        model = CustomUser
        fields = []
    

class AddressValidationForm(forms.Form):
    
    def __init__(self, data):
        super(AddressValidationForm,self).__init__
        self.street_address = data.pop('streetAddress')
        self.city = data.pop('city')
        self.country_area = data.pop('state')
        self.postal_code = data.pop('postcode')
        self.country_code = 'AU'
        
    def clean(self):
        super(AddressValidationForm,self).__init__
        validation_rules = get_validation_rules(self)
        valid_address = normalize_address(clean_data)
        # try:
        #     valid_address = normalize_address(clean_data.data)
        # except InvalidAddress as e:
        #     errors = e.errors
        #     valid_address = None
        #     for field, error_code in errors.items():
        #         if field == 'postal_code':
        #             examples = validation_rules.postal_code_examples
        #             msg = 'Invalid value, use format like XXXX' % examples
        #         elif field == 'country_area':
        #             examples = validation_rules.country_area_examples
        #             msg = 'Invalid state' % examples
        #         elif field == 'city':
        #             examples = validation_rules.city_examples
        #             msg = 'Invalid city' % examples
        #         else:
        #             msg = 'Address not found' # TODO: look into implementation of this
        #         clean_data.add_error(field, msg)
        return valid_address # or clean_data


class TransactionSerializer(forms.Form):
    class Meta:
        model = Transaction
        fields = (
            'provider',
            'consumer',
            'vehicle',
            'parkingSpace',
            'startTime',
            'endTime',
            'totalCost',
        )
        
