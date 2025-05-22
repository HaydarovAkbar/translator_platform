from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class LanguageManager(models.Manager):
    def get_queryset(self):
        return super(LanguageManager, self).get_queryset().filter(is_active=True)


class Language(models.Model):
    name = models.CharField(max_length=255)
    attr = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    is_active = models.BooleanField(default=True)

    objects = LanguageManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Languages'
        verbose_name = 'Language'
        db_table = 'languages'

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super(Language, self).save(*args, **kwargs)
        return self