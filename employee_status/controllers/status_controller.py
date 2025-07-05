from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as drf_status
from django.contrib.auth import get_user_model
from employee_status.models import Status

from employee_status.services.status_service import update_status_for_user, get_filtered_team_statuses
from employee_status.serializers import StatusSerializer
import logging

User = get_user_model()

logger = logging.getLogger(__name__)


class MyStatusController(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            status = Status.objects.select_related('user').get(user=request.user)
            return Response(StatusSerializer(status).data, status=drf_status.HTTP_200_OK)
        except Status.DoesNotExist:
            return Response({"detail": "Status not found"}, status=drf_status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            user = request.user
            status = request.data.get("status")
            print("sdjfklsdjf", status)
            updated = update_status_for_user(user, status)
            return Response(StatusSerializer(updated).data, status=drf_status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"MyStatus update error: {e}")
            return Response({"detail": str(e)}, status=drf_status.HTTP_400_BAD_REQUEST)


class TeamStatusController(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            data = get_filtered_team_statuses(request.user, request.query_params.get("filter"))
            return Response(StatusSerializer(data, many=True).data, status=drf_status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"TeamStatus fetch error: {e}")
            return Response({"detail": str(e)}, status=drf_status.HTTP_400_BAD_REQUEST)





class EmployeeListController(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        statuses = Status.objects.select_related("user")
        data = [
            {
                "id": s.user.id,
                "name": s.user.get_full_name() or s.user.username,
                "status": s.value
            } for s in statuses
        ]
        return Response(data)
