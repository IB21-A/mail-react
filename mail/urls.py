from django.urls import path

from . import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [

    # API Routes
    path("register/", views.register, name="register"),
    path("emails/compose/", views.compose, name="compose"),
    path("emails/edit/<int:email_id>", views.email, name="email"),
    path("emails/get/<int:email_id>", views.email, name="email"),
    path("emails/<str:mailbox>/", views.mailbox, name="mailbox"),
    path("emails/delete/<int:email_id>",
         views.delete_email, name="delete_email"),

    # Token Routes
    path('token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
]
