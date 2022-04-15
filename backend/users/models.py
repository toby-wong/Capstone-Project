from re import M
from django.db import models
from django.contrib.auth.models import AbstractUser
from drf_extra_fields.fields import Base64ImageField
import requests
import urllib.parse

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
STATUS = (
    ('pending', 'pending'),
    ('approved', 'approved'),
    ('cancelled', 'cancelled'),
    ('rejected', 'rejected')
)
SIZE = (
    ('Hatchback', 'Hatchback'),
    ('Sedan', 'Sedan'),
    ('4WD/SUV', '4WD/SUV'),
    ('Van', 'Van'),
)
class ParkingSpace(models.Model):
    provider = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    streetAddress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=3)
    postcode = models.CharField(max_length=4)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    price = models.IntegerField()
    size = models.CharField(max_length=50, choices=SIZE, default='Hatchback')
    notes = models.TextField(max_length=10000)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUS, default="pending")
    avg_rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    n_ratings = models.IntegerField(null=True, blank=True)
    latestTime = models.DateTimeField(null=True,  blank=True)
    is_active = models.BooleanField(default=True)

    def getCoords(self, address):
        import requests
        import os
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.replace(" ", "+") + '&key=AIzaSyCwTgq7juhaZiACJFsYWm-dZgvhQRvvFw4'
        response = requests.get(url).json()
        return (float(response['results'][0]['geometry']['location']['lat']), float(response['results'][0]['geometry']['location']['lng']))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        addressTuple = (self.streetAddress, self.city, self.state, self.postcode)
        address = ' '.join(addressTuple)
        print(address)
        coords = self.getCoords(address)
        self.longitude = coords[0]
        self.latitude = coords[1]
        #super().save(*args, **kwargs)

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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        latest = Transaction.objects.filter(parkingSpace = self.parkingSpace).latest('endTime').endTime
        parkingSpace = ParkingSpace.objects.filter(pk=self.parkingSpace.pk).first()
        parkingSpace.latestTime = latest
        parkingSpace.save()

    def delete(self, *args, **kwargs):    
        bookingSpace = self.parkingSpace
        super().delete(*args, **kwargs)
        if not Transaction.objects.filter(parkingSpace = bookingSpace).exists():
            parkingSpace = ParkingSpace.objects.filter(pk=bookingSpace.pk).first()
            parkingSpace.latestTime = None
            parkingSpace.save()
            return
        latest = Transaction.objects.filter(parkingSpace = bookingSpace).latest('endTime')
        parkingSpace = ParkingSpace.objects.filter(pk=bookingSpace.pk).first()
        parkingSpace.latestTime = latest.endTime
        parkingSpace.save()



    def __str__(self):
        return f"{self.consumer.username} booked {self.parkingSpace} between {self.startTime} and {self.endTime}"


class Image(models.Model):
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.CASCADE, related_name='images')
    image_data = models.CharField(max_length=1000000)

# # REVIEW MODELS
class Review(models.Model):
    parkingSpace = models.ForeignKey('ParkingSpace', on_delete=models.CASCADE)
    consumer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='consumer_review')
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    publishDate = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        count = Review.objects.filter(parkingSpace = self.parkingSpace).count()
        average = Review.objects.filter(parkingSpace = self.parkingSpace).aggregate(models.Avg('rating'))
        parkingSpace = ParkingSpace.objects.filter(pk=self.parkingSpace.pk).first()
        parkingSpace.avg_rating = average['rating__avg']
        parkingSpace.n_ratings = count
        parkingSpace.save()

    def delete(self, *args, **kwargs):
        reviewSpace = self.parkingSpace
        super().delete(*args, **kwargs)
        count = Review.objects.filter(parkingSpace = reviewSpace).count()
        average = Review.objects.filter(parkingSpace = reviewSpace).aggregate(models.Avg('rating'))
        parkingSpace = ParkingSpace.objects.filter(pk=reviewSpace.pk).first()
        parkingSpace.avg_rating = average['rating__avg']
        parkingSpace.n_ratings = count
        parkingSpace.save()

    def __str__(self):
        return f"{self.consumer.username} reviewed {self.parkingSpace}"
    

    
