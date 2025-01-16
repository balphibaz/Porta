from rest_framework import serializers
from .models import ProcessedImage, ConversionPDF 

class ProcessedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedImage
        fields = ['id', 'original_image', 'processed_image', 'status', 'created_at']

class ConversionPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConversionPDF
        fields = ['id', 'original_pdf', 'processed_pdf', 'status', 'created_at']

class ProcessedTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedImage
        fields = ['id', 'original_image', 'processed_image', 'status', 'created_at']
