from django.contrib import admin
from .models import Application, ApplicationTarget, Organization, ApplicationResponse


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['title', 'inn', 'phone_number', 'is_active']
    search_fields = ['title', 'inn', 'phone_number']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_by', 'created_at']
    search_fields = ['title', 'created_by__username']
    list_filter = ['created_at']
    list_per_page = 20


@admin.register(ApplicationTarget)
class ApplicationTargetAdmin(admin.ModelAdmin):
    list_display = ['application', 'organization', 'status', 'deadline', 'viewed_at']
    list_filter = ['status', 'deadline']


@admin.register(ApplicationResponse)
class ApplicationResponseAdmin(admin.ModelAdmin):
    list_display = ['target', 'responder', 'comment', 'created_at']
    list_filter = ['responder', 'created_at']
