from django.db import models
from django.contrib.auth.models import AbstractUser

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

    def __str__(self):
        return self.first_name + ' ' + self.last_name

# # CONSUMER MODELS
class Vehicle(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    carMake = models.CharField(max_length=100)
    carModel = models.CharField(max_length=100)
    carYear = models.IntegerField()
    carColour = models.CharField(max_length=100)
    carRego = models.CharField(max_length=6, unique=True)

# # PROVIDER MODELS
class ParkingSpace(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    streetAddress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=3)
    postcode = models.CharField(max_length=4)

class Transaction(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    # consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.RESTRICT)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    totalCost = models.DecimalField(max_digits=6, decimal_places=2)

# # REVIEW MODELS
class Review(models.Model):
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.CASCADE)
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    publishDate = models.DateTimeField(auto_now_add=True)