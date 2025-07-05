from django.urls import path
from employee_status.controllers.status_controller import (
    MyStatusController,
    TeamStatusController,
    EmployeeListController
)

urlpatterns = [
    path("my-status/", MyStatusController.as_view()),
    path("team-statuses/", TeamStatusController.as_view()),
    path("employees/", EmployeeListController.as_view()),
]
