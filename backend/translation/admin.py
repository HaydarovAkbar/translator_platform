from django.contrib import admin
from .models import Language


@admin.register(Language)
class SettingsAdmin(admin.ModelAdmin):
    list_display = ('name', 'attr', 'is_active', 'created_at', 'updated_at')
