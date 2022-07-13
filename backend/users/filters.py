from django_filters import (CharFilter, MultipleChoiceFilter, NumberFilter,
                            RangeFilter)
from django_filters.rest_framework import FilterSet
from users.models import SIZE
from users.utils import *


def RadiusFilter(queryset, address="Sydney", radius=9999):
    if int(radius) == 9999:
        return queryset
    lat, lon = getCoords(address)
    radius = int(radius)
    lat_min = lat - (radius * 1 / 111)
    lat_max = lat + (radius * 1 / 111)
    lon_min = lon - (radius * 1 / 111)
    lon_max = lon + (radius * 1 / 111)
    print(lat_min, lat_max, lon_min, lon_max)
    return queryset.filter(
        latitude__range=[lat_min, lat_max], longitude__range=[lon_min, lon_max]
    )


class ParkingSearchFilter(FilterSet):

    # ?size=Hatchback or ?size=Hatchback&size=Sedan
    size = MultipleChoiceFilter(choices=SIZE, field_name="size", lookup_expr="iexact")
    price__lte = NumberFilter(field_name="price", lookup_expr="lte")  # ?price__lte=100
    price__gte = NumberFilter(field_name="price", lookup_expr="gte")  # ?price__gte=100
    rating__lte = NumberFilter(
        field_name="avg_rating", lookup_expr="lte"
    )  # ?rating__lte=4.5
    rating__gte = NumberFilter(
        field_name="avg_rating", lookup_expr="gte"
    )  # ?rating__gte=4.5
