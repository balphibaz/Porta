from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProcessedImage
from .serializers import ProcessedImageSerializer
from .utils import process_image_with_opencv
from django.core.files.base import ContentFile
import base64
from django.http import HttpResponse

class ImageProcessorViewSet(viewsets.ModelViewSet):
    queryset = ProcessedImage.objects.all()
    serializer_class = ProcessedImageSerializer

    @action(detail=False, methods=['post'])
    def process_image(self, request):
        try:
            # Obtener la imagen del request
            image_data = request.data.get('image')
            if not image_data:
                return Response(
                    {'error': 'No image data provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Procesar imagen con OpenCV
            processed_data = process_image_with_opencv(image_data)
            
            # Decodificar la imagen procesada
            format, imgstr = processed_data.split(';base64,')
            ext = format.split('/')[-1]
            processed_image_data = base64.b64decode(imgstr)

            # Devolver la imagen procesada en la respuesta
            response = HttpResponse(processed_image_data, content_type=f'image/{ext}')
            response['Content-Disposition'] = f'attachment; filename="processed.{ext}"'
            return response

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )