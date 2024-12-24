from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apis.views import ImageProcessorViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'images', ImageProcessorViewSet)

urlpatterns = [
    path ('admin/', admin.site.urls),
    path('', include(router.urls)),
]