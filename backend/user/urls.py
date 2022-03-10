from django.urls import path

from . import views

urlpatterns = [
    # eg. /user/
    path('', views.index, name='userIndexPage'),
    # eg. /user/register
    path('register/', views.register, name='loginPage'),
    # eg. /user/login
    path('login/', views.login, name='registerPage'),
    # eg. /user/forgot
    path('forgot/', views.forgot, name='forgotPasswordPage'),
    # eg. /user/code
    path('code/', views.code, name='checkVerificationCodePage'),
    # eg. /user/reset
    path('reset/', views.reset, name='resetPasswordPage'),
    # eg. /user/logout
    path('logout/', views.logout, name='logoutPage'),
]