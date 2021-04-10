
# technologies/serializers.py

from rest_framework import serializers
from .models import Operation
from .models import Technologie
      
class OperationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Operation
    fields = ('id', 'technologie','title', 'description', 'completed')

class TechnologieSerializer(serializers.ModelSerializer):
  class Meta:
    model = Technologie
    fields = ('id', 'title', 'description')

   
