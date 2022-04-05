from django.urls import include, path, re_path
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView, UserDetailsView
from users.views import *

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),    
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    path('registration/account-confirm-email/<str:key>/', ConfirmEmailView.as_view(),), # Needs to be defined before the registration path
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('delete/user', RemoveUserView.as_view(), name='remove_user'), # redundant if we use HTTP method on /auth/user?
    path('provider/<int:provider>/parking', ProviderParkingSpace.as_view(), name='provider_parking_space'),
    path('provider/parking/<int:pk>', ParkingSpaceView.as_view(), name='parking_space_functions'),
    # path('provider/parking/<int:pk>', ParkingSpaceView.as_view(), name='parking_space_functions'),
    path('provider/parking/images/', ImageView.as_view(), name='parking_images'),
    path('provider/history', ProviderHistory.as_view(), name='provider_history'),
    path('consumer/book', Booking.as_view(), name='booking'),
    path('consumer/vehicle', Vehicle.as_view(), name='vehicle'),
    path('consumer/favourite', Favourite.as_view(), name='favourite'),
    path('consumer/review', Review.as_view(), name='review'),
    path('consumer/favourite/all', FavouriteList.as_view(), name='favourite_list'),
    path('provider/<int:pk>/review', ReviewList.as_view(), name='review_list'),
    path('provider/<int:pk>/schedule', ParkingSpaceSchedule.as_view(), name='parking_space_schedule'),

]