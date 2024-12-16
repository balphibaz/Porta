from rest_framework import serializers
from .models import MachineLearningProject, BackgroundRemovalProject, PDFTransformationProject

class MachineLearningProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineLearningProject
        fields = ['id', 'name', 'description', 'technology_stack', 'difficulty_level', 'created_at']

class BackgroundRemovalProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundRemovalProject
        fields = ['id', 'name', 'description', 'input_image', 'processed_image', 'background_color', 'technology_stack', 'difficulty_level', 'created_at']

class PDFTransformationProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFTransformationProject
        fields = ['id', 'name', 'description', 'input_pdf', 'output_pdf', 'transformation_type', 'technology_stack', 'difficulty_level', 'created_at']