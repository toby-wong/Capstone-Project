from django.db import models
from django.contrib.auth.models import AbstractUser

# # PROVIDER MODELS
class ParkingSpace(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    streetAddress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=3)
    postcode = models.CharField(max_length=4)
    price = models.IntegerField()
    image = models.ImageField(upload_to='images/')
class Transaction(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.RESTRICT)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    totalCost = models.DecimalField(max_digits=6, decimal_places=2)
