from re import M
from django.db import models
from django.contrib.auth.models import AbstractUser
from drf_extra_fields.fields import Base64ImageField

# USER MODELS
class CustomUser(AbstractUser):

    # blank = False means that the field cannot be left blank
    # null = True sets NULL on column in DB

    phone_number = models.CharField(max_length=20, unique=True)
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=5)
    cvc = models.CharField(max_length=3)
    bsb = models.CharField(max_length=6)
    account_number = models.CharField(max_length=10)
    account_name = models.CharField(max_length=100)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# # CONSUMER MODELS
class Vehicle(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    carMake = models.CharField(max_length=100)
    carModel = models.CharField(max_length=100)
    carYear = models.IntegerField()
    carColour = models.CharField(max_length=100)
    carRego = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.username}'s {self.carColour} {self.carMake} {self.carModel} ({self.carYear})"


class Favourite(models.Model):
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='consumer_favourite')
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.RESTRICT)

    def __str__(self):
        return f"{self.consumer.username} favourited {self.parkingSpace}"


# # PROVIDER MODELS
class ParkingSpace(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    streetAddress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=3)
    postcode = models.CharField(max_length=4)
    longitude = models.FloatField()
    latitude = models.FloatField()
    price = models.IntegerField()
    # image = models.ImageField(upload_to='media/parking_spaces')
    # image = Base64ImageField(max_length=None, use_url=True)
    # image = models.CharField(max_length=10000000, blank=True)
    size = models.CharField(max_length=100)
    notes = models.TextField(max_length=500)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.provider.username}'s car space at {self.streetAddress}, {self.city} {self.postcode}"

class Transaction(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='provider_transaction')
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='consumer_transaction')
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE, related_name='vehicle')
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.RESTRICT)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    totalCost = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.consumer.username} booked {self.parkingSpace} between {self.startTime} and {self.endTime}"


# # REVIEW MODELS
class Review(models.Model):
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.CASCADE)
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='consumer_review')
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    publishDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.consumer.username} reviewed {self.parkingSpace}"
    

class Image(models.Model):
    key = models.ForeignKey('ParkingSpace', on_delete=models.CASCADE)
    image = models.TextField()