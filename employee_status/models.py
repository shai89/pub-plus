import uuid
from django.db import models
from django.contrib.auth import get_user_model

class StatusChoices(models.TextChoices):
    WORKING = "WORKING", "Working"
    REMOTE = "REMOTE", "Working Remotely"
    VACATION = "VACATION", "On Vacation"
    BUSINESS_TRIP = "BUSINESS_TRIP", "Business Trip"

class Status(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="status"
    )

    value = models.CharField(
        max_length=20,
        choices=StatusChoices.choices
    )

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}: {self.get_value_display()}"

    class Meta:
        verbose_name = "Employee Status"
        verbose_name_plural = "Employee Statuses"
        ordering = ["-updated_at"]
