from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from account.models import User, Organization


# ===========================
# Application model
# ===========================
class ApplicationManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True, is_delete=False)


class Application(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='applications/', null=True, blank=True)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_applications')

    is_active = models.BooleanField(default=True)
    is_delete = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ApplicationManager()

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'applications'
        ordering = ['-created_at']
        verbose_name = _("Ariza")
        verbose_name_plural = _("Arizalar")


# ===========================
# Application → send to organization
# ===========================
class ApplicationTarget(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='targets')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    STATUS_CHOICES = [
        ('sent', _('Yuborilgan')),
        ('in_progress', _('Ko‘rib chiqilmoqda')),
        ('done', _('Ko‘rib chiqilgan')),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='sent')

    deadline = models.DateField(null=True, blank=True)
    viewed_at = models.DateTimeField(null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('application', 'organization')
        db_table = 'application_targets'
        verbose_name = _("Yuborilgan tashkilot")
        verbose_name_plural = _("Tashkilotlar uchun holatlar")

    def __str__(self):
        return f"{self.application.title} → {self.organization.title}"


# ===========================
# sent by organization app response
# ===========================
class ApplicationResponse(models.Model):
    target = models.ForeignKey(ApplicationTarget, on_delete=models.CASCADE, related_name='responses')
    responder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.TextField()
    file = models.FileField(upload_to='application_responses/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'application_responses'
        ordering = ['-created_at']
        verbose_name = _("Javob")
        verbose_name_plural = _("Tashkilot javoblari")

    def __str__(self):
        return f"{self.target.application.title} → {self.target.organization.title}"
