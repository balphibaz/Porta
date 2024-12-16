from django.urls import path
from apis.views import (
    MachineLearningProjectList, 
    BackgroundRemovalProjectList, 
    BackgroundRemovalProcess,
    PDFTransformationProjectList, 
    PDFTransformationProcess
)

urlpatterns = [
    # Vistas de proyectos de Machine Learning
    path('api/ml-projects/', MachineLearningProjectList.as_view(), name='ml-projects-list'),
    
    # Vistas de proyectos de eliminación de fondo
    path('api/removal-projects/', BackgroundRemovalProjectList.as_view(), name='background-removal-projects-list'),
    path('api/removal-process/<uuid:project_id>/', BackgroundRemovalProcess.as_view(), name='background-removal-process'),
    
    # Vistas de proyectos de transformación de PDF
    path('api/pdf-projects/', PDFTransformationProjectList.as_view(), name='pdf-transformation-projects-list'),
    path('api/pdf-process/<uuid:project_id>/', PDFTransformationProcess.as_view(), name='pdf-transformation-process'),
]
