
# technologies/views.py

from django.shortcuts import render
from rest_framework import viewsets          # add this

from .serializers import OperationSerializer      # add this
from .serializers import TechnologieSerializer

from .models import Operation                     # add this
from .models import Technologie

class OperationView(viewsets.ModelViewSet):       # add this
  serializer_class = OperationSerializer          # add this
  queryset = Operation.objects.all()              # add this
 
class TechnologieView(viewsets.ModelViewSet):       # add this
  serializer_class = TechnologieSerializer          # add this
  queryset = Technologie.objects.all()              # add this


 
