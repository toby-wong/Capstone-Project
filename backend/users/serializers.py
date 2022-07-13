# Controls what fields are packaged together

from datetime import datetime

from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction
from django.db.models import Avg, Max
from drf_writable_nested.serializers import NestedUpdateMixin
from pkg_resources import require
from rest_framework import serializers
from rest_framework.serializers import (ModelSerializer,
                                        PrimaryKeyRelatedField,
                                        SlugRelatedField)

from .models import (CustomUser, Favourite, Image, ParkingSpace, Review,
                     Transaction, Vehicle)
from .utils import AddressValidation, getCoords


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "card_number",
            "expiry_date",
            "cvc",
            "bsb",
            "account_number",
            "account_name",
            "is_staff",
            "pk",
        )

        read_only_fields = ("first_name", "last_name", "username", "pk")


class CustomRegisterSerializer(RegisterSerializer):
    # here we define any additional fields we are adding to the dj-rest-auth RegisterSerializer
    # so we are basically extending what you need (or really what you can potentially provide) to register
    # in simple terms, it is looking for fields called "phone_number" in the JSON request and saving them into a variable

    phone_number = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)

    # you make it atomic so unless you get all the fields it will deny you
    @transaction.atomic
    # essentially we are redefining the function that takes JSON -> database
    def save(self, request):
        # user is a 'row' in the Users table, but it hasn't been added to the DB yet
        # the row needs to be populated with info from the JSON, and the super().save populates default fields
        user = super().save(request)
        # now we populate our custom fields
        user.phone_number = self.data.get("phone_number")
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        # insert row into DB
        user.save()
        # profit???
        return user


class RemoveUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = []

    def delete(self, request):
        username = request.data.get("username")
        user = self.Meta.model.objects.get(username=username)
        user.delete()
        # user.is_active = False
        # user.save()


class ImageSerializer(ModelSerializer):

    image_data = serializers.CharField()

    class Meta:
        model = Image
        fields = ("image_data", "pk")

        read_only_fields = ["pk"]


class ParkingSpaceSerializer(NestedUpdateMixin, ModelSerializer):

    images = ImageSerializer(many=True)
    provider = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    # add avg rating stuff here

    class Meta:
        model = ParkingSpace
        # fields = []
        fields = (
            "provider",
            "streetAddress",
            "city",
            "state",
            "postcode",
            "price",
            "size",
            "notes",
            "latitude",
            "longitude",
            "startTime",
            "endTime",
            "latestTime",
            "status",
            "images",
            "avg_rating",
            "n_ratings",
            "is_active",
            "pk",
        )

        read_only_fields = ("provider", "streetAddress", "city", "state", "postcode")

        # read_only_fields = ['pk', 'is_active', 'avg_rating', 'n_ratings', 'longitude', 'latitude', 'latestTime']

    def validate(self, data):

        method = self.context["view"].request.method

        if method == "POST":
            return data

        if "startTime" not in data or "endTime" not in data:
            return data

        pk = self.context["view"].kwargs["pk"]
        startTime = data["startTime"]
        endTime = data["endTime"]

        if startTime > endTime:
            raise serializers.ValidationError(
                "Parking space start time must be before the parking space end time"
            )
        qs = (
            Transaction.objects.filter(parkingSpace=pk)
            .exclude(startTime__date__gte=startTime)
            .exclude(endTime__date__lte=endTime)
        )
        if qs.exists():
            raise serializers.ValidationError(
                "This availability would violate existing bookings."
            )
        return data

    def create(self, validated_data):
        imgs_data = validated_data.pop("images")
        parkingSpace = ParkingSpace.objects.create(**validated_data)
        cleanAddress = AddressValidation(validated_data)
        cleanAddress = cleanAddress.validate()
        if not type(cleanAddress) == dict:
            raise serializers.ValidationError(cleanAddress.errors)
        parkingSpace.save()
        for img_data in imgs_data:
            Image.objects.create(parkingSpace=parkingSpace, **img_data)
        return parkingSpace


class VehicleSerializer(ModelSerializer):

    user = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Vehicle
        fields = (
            "user",
            "carMake",
            "carModel",
            "carYear",
            "carColour",
            "carRego",
            "pk",
        )

        read_only_fields = ["pk"]


class FavouriteSerializer(ModelSerializer):

    consumer = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())

    class Meta:
        model = Favourite
        fields = ("consumer", "parkingSpace", "pk")

        read_only_fields = ["pk"]


class TransactionSerializer(ModelSerializer):

    provider = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    consumer = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    vehicle = PrimaryKeyRelatedField(queryset=Vehicle.objects.all())
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())
    streetAddress = serializers.CharField(
        source="parkingSpace.streetAddress", required=False
    )
    city = serializers.CharField(source="parkingSpace.city", required=False)
    state = serializers.CharField(source="parkingSpace.state", required=False)
    postcode = serializers.CharField(source="parkingSpace.postcode", required=False)
    consumerName = serializers.CharField(source="consumer.username", required=False)
    consumerPhone = serializers.CharField(
        source="consumer.phone_number", required=False
    )
    consumerEmail = serializers.CharField(source="consumer.email", required=False)
    parkingSpaceSize = serializers.CharField(source="parkingSpace.size", required=False)

    class Meta:
        model = Transaction
        fields = (
            "provider",
            "consumer",
            "vehicle",
            "parkingSpace",
            "streetAddress",
            "city",
            "state",
            "postcode",
            "consumerName",
            "consumerPhone",
            "consumerEmail",
            "publishDate",
            "parkingSpaceSize",
            "startTime",
            "endTime",
            "totalCost",
            "pk",
        )

        read_only_fields = [
            "pk",
            "streetAddress",
            "city",
            "state",
            "postcode",
            "consumerName",
            "parkingSpaceSize",
        ]

    def validate(self, data):

        startTime = data["startTime"]
        endTime = data["endTime"]
        if data["provider"] == data["consumer"]:
            raise serializers.ValidationError("Cannot book own parking space")
        if startTime > endTime:
            raise serializers.ValidationError(
                "Booking start time must be before booking end time"
            )
        parkingSpace = ParkingSpace.objects.filter(pk=data["parkingSpace"].pk).first()
        if parkingSpace.status == "cancelled":
            raise serializers.ValidationError(
                "The parking space is no longer accepting new bookings"
            )
        if (
            parkingSpace.startTime > startTime
            or parkingSpace.endTime < endTime
            or parkingSpace.startTime > endTime
            or parkingSpace.endTime < startTime
        ):
            raise serializers.ValidationError(
                "This booking does not fit within the parking space availability."
            )
        qs = (
            Transaction.objects.filter(parkingSpace=data["parkingSpace"])
            .exclude(startTime__date__gt=endTime)
            .exclude(endTime__date__lt=startTime)
        )
        if qs.exists():
            raise serializers.ValidationError(
                "This booking overlaps with an existing booking."
            )
        return data


class ReviewSerializer(ModelSerializer):

    consumer = SlugRelatedField(
        queryset=CustomUser.objects.all(), slug_field="username"
    )
    parkingSpace = PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())

    class Meta:
        model = Review
        fields = ("parkingSpace", "consumer", "rating", "comment", "publishDate", "pk")

        read_only_fields = ["pk"]
