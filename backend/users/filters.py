from dataclasses import field
from django_filters import RangeFilter, NumberFilter, MultipleChoiceFilter, CharFilter
from django_filters.rest_framework import FilterSet
from users.models import ParkingSpace, Transaction, STATUS, SIZE
from users.utils import *

def RadiusFilter(queryset, address='Sydney', radius=2):
    lat, lon = getCoords(address)
    radius = int(radius)
    lat_min = lat - (radius * 1/111)
    lat_max = lat + (radius * 1/111)
    lon_min = lon - (radius * 1/111)
    lon_max = lon + (radius * 1/111)
    return queryset.filter(
        latitude__range=[lat_min,lat_max], 
        longitude__range=[lon_min,lon_max])

class ParkingSearchFilter(FilterSet):

    size = MultipleChoiceFilter(choices=SIZE, field_name='size')
    price__lte = NumberFilter(field_name='price', lookup_expr='lte')
    price__gte = NumberFilter(field_name='price', lookup_expr='gte')
    avg_rating = RangeFilter(field_name='rating', lookup_expr='gte') # need to implement