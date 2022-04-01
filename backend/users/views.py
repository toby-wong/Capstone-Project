# "Queries" for Django database
from urllib import request
from users.forms import *
from users.models import CustomUser, ParkingSpace, Transaction
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from drf_spectacular.utils import extend_schema

# Create your views here.
# @login_required(login_url='http://127.0.0.1:8000/')
class RemoveUserView(GenericAPIView):
    serializer_class = UserSerializer

    def delete(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.errors is None:
            serializer.delete()
            return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'User not deleted'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddParkingSpaceView(GenericAPIView):
    serializer_class = ParkingCreationSerializer

    def post(self,request):
        serializer = ParkingCreationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)
        if serializer.errors is None:
            return Response({'message': 'Parking space added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Parking space not added'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def provider_transaction_list(reqeust):
    if request.method == 'GET':
        data = Transaction.objects.filter()
        serializer = TransactionSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':


class ProviderHistory(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(provider=user)
    
