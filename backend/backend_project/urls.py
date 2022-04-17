"""backend_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from .views import AddAdminView, RemoveAdminView
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('admin/users/customuser/<id>/change', AddAdminView.as_view(), name='add_admin'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')), 
    path('dj-rest-auth/registration/account-confirm-email/<str:key>/', ConfirmEmailView.as_view(),), # Needs to be defined before the registration path
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('dj-rest-auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('dj-rest-auth/password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # issue is to do with CSRF verification failing
    # path('admin/remove_user/', RemoveAdminView.as_view(), name='remove_admin'), # may have to do with current url being admin/
    # path('booking/', include('booking.urls')),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)

    # moved within users.urls

