from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.serializers.user_serializer import EmailTokenObtainPairSerializer

from rest_framework.response import Response
from rest_framework import status as drf_status
from backend.utils.logger import get_logger

from accounts.serializers.user_serializer import EmailTokenObtainPairSerializer

logger = get_logger(__name__)

class TokenObtainPairViewCustom(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            logger.info(f"Login succeeded: {request.data.get('email')}")
            return Response(response.data, status=drf_status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Login failed: {e}")
            return Response({"detail": "Invalid credentials"}, status=drf_status.HTTP_401_UNAUTHORIZED)


class TokenRefreshViewCustom(TokenRefreshView):
    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            return Response(response.data, status=drf_status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Token refresh failed: {e}")
            return Response({"detail": "Token refresh failed"}, status=drf_status.HTTP_401_UNAUTHORIZED)
