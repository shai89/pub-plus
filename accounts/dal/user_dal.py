from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()

def get_all_users():
    return User.objects.all()

def get_user_by_id(user_id):
    return get_object_or_404(User, id=user_id)

def create_user(data):
    return User.objects.create_user(**data)

def update_user(user, data):
    for attr, value in data.items():
        setattr(user, attr, value)
    user.save()
    return user

def delete_user(user):
    user.delete()
