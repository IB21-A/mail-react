from django.urls import path

from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("emails", views.compose, name="compose"),
    path("emails/<int:email_id>", views.email, name="email"),
    path("emails/<str:mailbox>", views.mailbox, name="mailbox"),
    path("api/test", views.api_test, name="api_test"),
    path("api/login", views.login_api, name="login_api"),
    path("api/emails/edit/<int:email_id>", views.email, name="email"),
    path("api/emails/get/<int:email_id>", views.email, name="email"),
    path("api/emails/<str:mailbox>/", views.mailbox, name="mailbox"),
    path("api/emails/compose", views.compose, name="compose"),

    # Token Routes
    path('api/token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
]
