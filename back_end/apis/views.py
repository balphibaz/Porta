from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
import cv2
import numpy as np
from PIL import Image
import io

from .models import (
    MachineLearningProject, 
    BackgroundRemovalProject, 
    PDFTransformationProject
)
from .serializers import (
    MachineLearningProjectSerializer, 
    BackgroundRemovalSerializer,
    PDFTransformationSerializer
)

class MachineLearningProjectViewSet(viewsets.ModelViewSet):
    queryset = MachineLearningProject.objects.all()
    serializer_class = MachineLearningProjectSerializer

class BackgroundRemovalViewSet(viewsets.ModelViewSet):
    queryset = BackgroundRemovalProject.objects.all()
    serializer_class = BackgroundRemovalSerializer

    @action(detail=False, methods=['POST'])
    def remove_background(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            # Lógica de eliminación de fondo con OpenCV
            input_image = request.FILES.get('input_image')
            img = cv2.imdecode(np.frombuffer(input_image.read(), np.uint8), cv2.IMREAD_COLOR)
            
            # Conversión a escala de grises
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Umbralización
            _, mask = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY)
            
            # Aplicar máscara
            result = cv2.bitwise_and(img, img, mask=mask)
            
            # Guardar imagen procesada
            _, buffer = cv2.imencode('.png', result)
            processed_image = Image.open(io.BytesIO(buffer))
            
            # Guardar en modelo
            project = serializer.save()
            
            return Response({
                'message': 'Background removed successfully',
                'project_id': project.id
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class PDFTransformationViewSet(viewsets.ModelViewSet):
    queryset = PDFTransformationProject.objects.all()
    serializer_class = PDFTransformationSerializer

    @action(detail=False, methods=['POST'])
    def transform_pdf(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            input_pdf = request.FILES.get('input_pdf')
            transformation_type = request.data.get('transformation_type', 'convert')
            
            # Lógica de transformación de PDF
            project = serializer.save()
            
            return Response({
                'message': f'PDF {transformation_type} successful',
                'project_id': project.id
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)