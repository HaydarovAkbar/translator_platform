from django.contrib import admin
from django import forms
from django.contrib.auth.forms import UserChangeForm as BaseUserChangeForm
from .models import User, Permission


class CustomUserChangeForm(BaseUserChangeForm):
    password = forms.CharField(
        label="Parol (agar o‘zgartirilsa)",
        required=False,
        widget=forms.PasswordInput,
        help_text="To‘ldirilsa, parol o‘zgartiriladi. Bo‘sh qoldirilsa, o‘zgarish bo‘lmaydi."
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'is_active', 'is_staff', 'groups',
                  'organization']

    def clean_password(self):
        return self.cleaned_data.get("password", None)

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get("password")

        if password:
            user.set_password(password)
        else:
            existing = User.objects.get(pk=user.pk)
            user.password = existing.password

        if commit:
            user.save()
            self.save_m2m()

        return user


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    form = CustomUserChangeForm

    list_display = ["username", "first_name", "last_name", "email", "is_active", "is_staff"]
    search_fields = ["username", "first_name", "last_name", "email"]
    list_filter = ["is_active", "is_staff", "groups"]
    list_per_page = 20


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ["codename", "name"]
    search_fields = ["codename", "name"]