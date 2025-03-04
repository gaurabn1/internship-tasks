from django.contrib import admin
from api.models import Blog, Category, CustomUser

admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(CustomUser)

