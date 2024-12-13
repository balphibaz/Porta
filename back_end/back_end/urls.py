from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apis.views import (
    MachineLearningProjectViewSet,
    BackgroundRemovalViewSet,
    PDFTransformationViewSet
)

router = DefaultRouter()
router.register(r'projects', MachineLearningProjectViewSet)
router.register(r'background-removal', BackgroundRemovalViewSet)
router.register(r'pdf-transformation', PDFTransformationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]