from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apis.views import ImageProcessorViewSet,PDF_convertViewSet,ProcessorViewSet
from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'images', ImageProcessorViewSet)
router.register(r'pdf-to-word', PDF_convertViewSet)
router.register(r'text', ProcessorViewSet)

urlpatterns = [
    path ('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]