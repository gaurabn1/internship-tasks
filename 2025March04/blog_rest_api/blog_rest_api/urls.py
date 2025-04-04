from django.contrib import admin
from django.urls import path, include

API_PREFIX = 'api/v1'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_PREFIX}/', include('api.urls')),
]
