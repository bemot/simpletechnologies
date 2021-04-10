
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from technologies import views                            # add this
        
router = routers.DefaultRouter()                      # add this
router.register(r'operations', views.OperationView, 'operation')     # add this
router.register(r'technologies', views.TechnologieView, 'technologie')        
urlpatterns = [
    path('admin/', admin.site.urls),           
    path('api/', include(router.urls))                # add this
]
