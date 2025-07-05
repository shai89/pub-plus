from rest_framework.exceptions import ValidationError, NotFound

class InvalidStatusValue(ValidationError):
    default_detail = "Invalid status value provided."
    default_code = "invalid_status_value"

class StatusNotFound(NotFound):
    default_detail = "Status entry not found for this user."
    default_code = "status_not_found"
