import logging
from employee_status.models import Status

logger = logging.getLogger(__name__)

def get_user_status(user):
    try:
        return Status.objects.get(user=user)
    except Status.DoesNotExist:
        logger.warning(f"Status not found for user {user}")
        return None

def get_team_statuses(exclude_user=None, filters=None):
    status_queryset = Status.objects.all()
    if filters:
        status_queryset = status_queryset.filter(value__in=filters)
    return status_queryset

def update_user_status(status_obj, value):
    status_obj.value = value
    status_obj.save()
    return status_obj
