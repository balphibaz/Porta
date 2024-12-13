from rest_framework import serializers
from .models import (
    MachineLearningProject, 
    ImageProcessingProject, 
    BackgroundRemovalProject, 
    PDFTransformationProject
)

class MachineLearningProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineLearningProject
        fields = ['field1', 'field2', 'field3']
        read_only_fields = ['id', 'created_at']

class ImageProcessingProjectSerializer(MachineLearningProjectSerializer):
    processed_image_url = serializers.SerializerMethodField()
    
    class Meta(MachineLearningProjectSerializer.Meta):
        model = ImageProcessingProject
        fields = MachineLearningProjectSerializer.Meta.fields + [
            'input_image', 
            'processed_image', 
            'processed_image_url',
            'processing_techniques'
        ]
    
    def get_processed_image_url(self, obj):
        return obj.processed_image.url if obj.processed_image else None

class BackgroundRemovalSerializer(ImageProcessingProjectSerializer):
    class Meta(ImageProcessingProjectSerializer.Meta):
        model = BackgroundRemovalProject
        fields = ImageProcessingProjectSerializer.Meta.fields + ['background_color']

class PDFTransformationSerializer(MachineLearningProjectSerializer):
    output_pdf_url = serializers.SerializerMethodField()
    
    class Meta(MachineLearningProjectSerializer.Meta):
        model = PDFTransformationProject
        fields = MachineLearningProjectSerializer.Meta.fields + [
            'input_pdf', 
            'output_pdf', 
            'output_pdf_url',
            'transformation_type'
        ]
    
    def get_output_pdf_url(self, obj):
        return obj.output_pdf.url if obj.output_pdf else None