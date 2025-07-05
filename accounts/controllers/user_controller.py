from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.services.user_service import (
    fetch_all_users, fetch_user, save_user, edit_user, remove_user
)
from backend.utils.logger import get_logger
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

logger = get_logger(__name__)
User = get_user_model()

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class UserView(APIView):
    def get(self, request):
        users = fetch_all_users()
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            user = save_user(request.data)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SingleUserView(APIView):
    def get(self, request, user_id):
        user = fetch_user(user_id)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

    def put(self, request, user_id):
        try:
            updated_user = edit_user(user_id, request.data)
            return Response(UserSerializer(updated_user).data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        try:
            remove_user(user_id)
            return Response({"detail": "User deleted"}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
