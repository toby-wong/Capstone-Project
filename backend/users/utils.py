from i18naddress import InvalidAddress, normalize_address, get_validation_rules
import base64
import io
from PIL import Image
from haversine import haversine
from .models import CustomUser, ParkingSpace, Transaction
class AddressValidation:

    def __init__(self, data):
        self.street_address = data.pop('streetAddress')
        self.city = data.pop('city')
        self.country_area = data.pop('state')
        self.postal_code = data.pop('postcode')
        self.country_code = 'AU'
        self.errors = {}
        

    def validate(self):
        # validation_rules = get_validation_rules(self)
        # valid_address = normalize_address(clean_data)
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
    import requests
    import urllib.parse

    url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(address) +'?format=json'

    response = requests.get(url).json()
    #print(response[0]["lat"])
    #print(response[0]["lon"])
    return(float(response[0]["lat"]), float(response[0]["lon"]))

def getUser(pk):
    # print(pk)
    # print(CustomUser.objects.values())
    user_obj = CustomUser.objects.get(id=pk)
    return user_obj

def getParkingSpace(pk):
    parking_obj = ParkingSpace.objects.get(id=pk)
    return parking_obj

class ParkingSearchAlgorithm:
    def __init__(self, address='Sydney', size=False, price=False, radius=2, rating=False, startTime=False, endTime=False):
        self.results = []
        self.size = size
        self.price = price
        self.radius = radius
        self.rating = rating
        self.startTime = startTime
        self.endTime = endTime
        self.address = address
        self.lat, self.lon = getCoords(address)
    
        self.lat_min = self.lat - (radius * 1/111)
        self.lat_max = self.lat + (radius * 1/111)
        self.lon_min = self.lon - (radius * 1/111)
        self.lon_max = self.lon + (radius * 1/111)

    def search(self):
        parking_spaces = ParkingSpace.objects.filter(
            latitude__range=[self.lat_min,self.lat_max], 
            longitude__range=[self.lon_min,self.lon_max],
            is_active=True
            )
        if self.size:
            sizes = ["Hatchback", "Sedan", "4WD/SUV", "Van"]
            parking_spaces = parking_spaces.filter(size__in=sizes[sizes.index(self.size):])
        if self.price:
            parking_spaces = parking_spaces.filter(price__lte=self.price)
        if self.rating:
            parking_spaces = parking_spaces.filter(rating__gte=self.rating)
        for parking_space in parking_spaces:
            if haversine((self.lat, self.lon), (parking_space.latitude, parking_space.longitude)) <= self.radius:
                self.results.append(parking_space)
        return self.results