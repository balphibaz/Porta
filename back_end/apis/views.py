from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProcessedImage, ConversionPDF,ProcessedText
from .serializers import ProcessedImageSerializer, ConversionPDFSerializer,ProcessedTextSerializer
from .utils import process_image_with_opencv, convert_pdf,proces_text
from django.core.files.base import ContentFile
import base64
from django.http import HttpResponse
import os
from pdf2docx import Converter
from io import BytesIO
from PIL import Image
import io

class PDF_convertViewSet(viewsets.ModelViewSet):
    queryset = ConversionPDF.objects.all()
    serializer_class = ConversionPDFSerializer

    @action(detail=False, methods=['post'])
    def convert_pdf(self, request):
        try:
            pdf_file = request.data.get('files')
            if not pdf_file:
                return Response(
                    {'error': 'No PDF file provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Convertir el archivo PDF a DOCX
            conversion = convert_pdf(pdf_file)

            # Devolver el archivo DOCX en la respuesta
            response = HttpResponse(conversion, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = f'attachment; filename="converted.docx"'
            return response 
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
            
            header, encoded = image_data.split(',', 1)
            image_data = base64.b64decode(encoded)
            # Procesar imagen con OpenCV
            processed_data = process_image_with_opencv(image_data)
            
            img_base64 = process_image_with_opencv(image_data)

            # Devolver la imagen procesada en la respuesta
            return Response({'image': img_base64}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProcessorViewSet(viewsets.ModelViewSet):
    queryset = ProcessedText.objects.all()
    serializer_class = ProcessedTextSerializer

    @action(detail=False, methods=['post'])
    def process_text(self, request):
        try:
            # Obtener la imagen del request
            image_data = request.data.get('image')
            if not image_data:
                return Response(
                    {'error': 'No image data provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            header, encoded = image_data.split(',', 1)
            image_data = base64.b64decode(encoded)

            # Procesar imagen con Ocr
            processed_data = proces_text(BytesIO(image_data))

            # Devolver la imagen procesada en la respuesta
            response = HttpResponse(processed_data, content_type='text/plai')
            return response

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)