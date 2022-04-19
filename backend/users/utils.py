from i18naddress import InvalidAddress, normalize_address
from .models import CustomUser, ParkingSpace
class AddressValidation:

    def __init__(self, data):
        self.street_address = data.pop('streetAddress')
        self.city = data.pop('city')
        self.country_area = data.pop('state')
        self.postal_code = data.pop('postcode')
        self.country_code = 'AU'
        self.errors = {}
        

    def validate(self):
        valid_address = {}
        try:
            valid_address = normalize_address(self.__dict__)
        except InvalidAddress as e:
            self.errors = e.errors
        return valid_address or self

    def get(self,key, default=None):
        if key == 'country_code':
            return self.country_code
        elif key == 'country_area':
            return self.country_area
        elif key == 'city':
            return self.city
        elif key == 'postal_code':
            return self.postal_code
        else:
            return default
    
    def copy(self):
        return self.__dict__

def getCoords(address):
    w
    response = requests.get(url).json()
    return (float(response['results'][0]['geometry']['location']['lat']), float(response['results'][0]['geometry']['location']['lng']))


def getUser(pk):
    user_obj = CustomUser.objects.get(id=pk)
    return user_obj

def getParkingSpace(pk):
    parking_obj = ParkingSpace.objects.get(id=pk)
    return parking_obj

def getSuggestions(address):
    import requests
    import urllib.parse
    url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(address) + '?countrycodes=au&format=json'
    response = requests.get(url).json()
    return [''.join(i["display_name"].split(',')[:3]) + ''.join(i["display_name"].split(',')[-3:-1]) for i in response]
