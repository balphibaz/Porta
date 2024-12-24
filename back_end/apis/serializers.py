from rest_framework import serializers
from .models import ProcessedImage

class ProcessedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedImage
        fields = ['id', 'original_image', 'processed_image', 'status', 'created_at']