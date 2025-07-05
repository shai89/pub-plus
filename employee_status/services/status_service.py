from employee_status.dal.status_dal import get_user_status, get_team_statuses, update_user_status
from employee_status.models import StatusChoices
from employee_status.exceptions import InvalidStatusValue, StatusNotFound

def update_status_for_user(user, new_value):
    print(456)
    # breakpoint()
    if new_value:
        new_value = new_value.upper()
    if new_value not in StatusChoices.values:
        raise InvalidStatusValue()

    status = get_user_status(user)
    if not status:
        raise StatusNotFound()
    
    return update_user_status(status, new_value)

def get_filtered_team_statuses(user, filter_param):
    filters = []
    if filter_param:
        filters = [v for v in filter_param.split(',') if v in StatusChoices.values]
    
    return get_team_statuses(exclude_user=user, filters=filters)
