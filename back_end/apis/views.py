from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProcessedImage, ConversionPDF,ProcessedText
from .serializers import ProcessedImageSerializer, ConversionPDFSerializer,ProcessedTextSerializer
from .utils import process_image_with_opencv, convert_pdf,process_text
from django.core.files.base import ContentFile
import base64
from django.http import HttpResponse
import os
from pdf2docx import Converter

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

                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

            # Procesar imagen con Ocr
            processed_data = ProcessedText(image_data)

            # Devolver la imagen procesada en la respuesta
            response = HttpResponse(processed_data, content_type='text/plai')
            return response

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)