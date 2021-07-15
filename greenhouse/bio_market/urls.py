# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.urls import path, include
from rest_framework import routers
from .views import weather, cab_share, agri_rec, Ebill, coins, itemviewset, useriewset, topicviewset, commentviewset, pest_data, donationviewset, jobviewset

router = routers.DefaultRouter()
router.register('items', itemviewset, 'items')
router.register('donate', donationviewset, 'donate')
router.register('user', useriewset, 'users')
router.register('topic', topicviewset, 'topic')
router.register('discuss', commentviewset, 'discuss')
router.register('opportunity', jobviewset, 'opportunity')

urlpatterns = [
    path('', include((router.urls, 'bio_market'), namespace='bio_market')),
    path('pest/', pest_data, name='pest_data'),
    path('weather/', weather, name='weather'),
    path('travel/', cab_share.as_view(), name='travel'),
    path('coins/', coins, name='coins'),
    path('Ebill/', Ebill, name='ebill'),
    path("agri_rec/", agri_rec, name='agri_rec')


]

app_name = 'bio_market'
