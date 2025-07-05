from rest_framework import serializers
from .models import Status, StatusChoices

class StatusSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Status
        fields = ['id', 'username', 'value', 'updated_at']
        read_only_fields = ['id', 'username', 'updated_at']

    def validate_value(self, value):
        if value not in StatusChoices.values:
            raise serializers.ValidationError("Invalid status value.")
        return value
