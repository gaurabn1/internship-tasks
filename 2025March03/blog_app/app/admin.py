
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from app.models import *


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ('username', 'email')
    ordering = ('email',)
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'username')

    filter_horizontal = ()
    exclude = ('date_joined', 'last_login')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Blog)

