# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.urls import path, include
from rest_framework import routers
from .views import LoginAPIView, CreateUserviewset, logout

router = routers.DefaultRouter()
router.register('register', CreateUserviewset, 'register')
urlpatterns = [
    path('', include((router.urls, 'account'), namespace='account')),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', logout, name='logout'),
]

app_name = 'account'
