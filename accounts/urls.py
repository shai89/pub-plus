from django.urls import path
from accounts.controllers.user_controller import UserView, SingleUserView
from accounts.controllers.token_controller import TokenObtainPairViewCustom, TokenRefreshViewCustom

urlpatterns = [
    path("users/", UserView.as_view(), name="users"),
    path("users/<uuid:user_id>/", SingleUserView.as_view(), name="single_user"),
    path('token/', TokenObtainPairViewCustom.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshViewCustom.as_view(), name='token_refresh'),

]
