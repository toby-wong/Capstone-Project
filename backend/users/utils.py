from i18naddress import InvalidAddress, normalize_address, get_validation_rules
import base64
import io
from PIL import Image
from .models import CustomUser
class AddressValidation:
    


    def __init__(self, data):
        self.street_address = data.pop('streetAddress')
        self.city = data.pop('city')
        self.country_area = data.pop('state')
        self.postal_code = data.pop('postcode')
        self.country_code = 'AU'
        self.errors = {}
        

    def validate(self):
        validation_rules = get_validation_rules(self)
        # valid_address = normalize_address(clean_data)
        try:
            valid_address = normalize_address(clean_data.data)
        except InvalidAddress as e:
            errors = e.errors
            valid_address = None
            for field, error_code in errors.items():
                if field == 'postal_code':
                    examples = validation_rules.postal_code_examples
                    msg = 'Invalid value, use format like XXXX' % examples
                elif field == 'country_area':
                    examples = validation_rules.country_area_examples
                    msg = 'Invalid state' % examples
                elif field == 'city':
                    examples = validation_rules.city_examples
                    msg = 'Invalid city' % examples
                else:
                    msg = 'Address not found' # TODO: look into implementation of this
                clean_data.add_error(field, msg)
        return valid_address # or clean_data

    def __getitem__(self,key):
        return getattr(self,key)

def getCoords(address):
    import requests
    import urllib.parse

    url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(address) +'?format=json'

    response = requests.get(url).json()
    print(response[0]["lat"])
    print(response[0]["lon"])
    return(response[0]["lat"], response[0]["lon"])

def getUser(username):
    print(username)
    print(CustomUser.objects.values())
    user_obj = CustomUser.objects.get(username=username)
    return user_obj