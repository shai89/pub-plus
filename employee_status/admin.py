from django.contrib import admin
from .models import Status

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ("user", "value", "updated_at")
    list_filter = ("value",)
    search_fields = ("user__username",)
