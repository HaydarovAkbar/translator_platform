from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
import uuid
from translation.models import Language


# ===========================
# Organization model
# ===========================
class OrganizationManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class Organization(models.Model):
    title = models.CharField(max_length=250)
    attr = models.CharField(max_length=250, null=True, blank=True)
    inn = models.BigIntegerField(null=True, blank=True)
    phone_number = PhoneNumberField(
        _("Phone number"),
        help_text=_("Required. Only international format used"),
        error_messages={"unique": _("This phone number already exists.")},
        unique=True,
        blank=True,
        null=True,
    )
    address = models.CharField(max_length=350, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OrganizationManager()

    def __str__(self):
        return self.title

    class Meta:
        db_table = "organizations"
        verbose_name = _("Tashkilot")
        verbose_name_plural = _("Tashkilotlar")


# class UserManager(models.Manager):
#     def get_queryset(self):
#         return super().get_queryset().filter(is_active=True)


class User(AbstractUser):
    phone_number = PhoneNumberField(
        _("Phone number"),
        help_text=_("Required. Only international format used"),
        error_messages={
            "unique": _("User this phone number already exists.")
        },
        unique=True,
        blank=True,
        null=True, )
    address = models.CharField(max_length=255, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)

    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)

    # objects = UserManager()

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    class Meta:
        verbose_name_plural = 'Users'
        verbose_name = 'User'
        db_table = 'user'
        indexes = [
            models.Index(fields=['phone_number']),
            models.Index(fields=['username']),
        ]

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super(User, self).save(*args, **kwargs)
        return self
