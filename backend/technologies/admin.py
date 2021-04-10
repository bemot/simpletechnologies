
# technologies/admin.py
from django.contrib import admin
from .models import Operation # add this
from .models import Technologie
class OperationAdmin(admin.ModelAdmin):  # add this
  list_display = ('id','technologie','title', 'description', 'completed') # add this

class TechnologieAdmin(admin.ModelAdmin):  # add this
  list_display = ('id','title', 'description') # add this


# Register your models here.
admin.site.register(Operation, OperationAdmin) # add this
admin.site.register(Technologie, TechnologieAdmin)
