from accounts.dal.user_dal import (
    get_all_users, get_user_by_id, create_user, update_user, delete_user
)
from django.core.exceptions import ValidationError
from backend.utils.logger import get_logger

logger = get_logger(__name__)

def fetch_all_users():
    return get_all_users()

def fetch_user(user_id):
    return get_user_by_id(user_id)

def save_user(data):
    try:
        return create_user(data)
    except Exception as e:
        logger.error(f"User creation failed: {e}")
        raise ValidationError("Invalid user data")

def edit_user(user_id, data):
    try:
        user = get_user_by_id(user_id)
        return update_user(user, data)
    except Exception as e:
        logger.error(f"User update failed: {e}")
        raise ValidationError("Failed to update user")

def remove_user(user_id):
    try:
        user = get_user_by_id(user_id)
        delete_user(user)
    except Exception as e:
        logger.error(f"User deletion failed: {e}")
        raise ValidationError("Failed to delete user")
