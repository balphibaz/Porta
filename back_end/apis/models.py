import uuid
from django.db import models

class MachineLearningProject(models.Model):
    """
    Modelo base para proyectos de machine learning
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    technology_stack = models.JSONField(default=list)
    difficulty_level = models.CharField(
        max_length=20, 
        choices=[
            ('beginner', 'Principiante'),
            ('intermediate', 'Intermedio'),
            ('advanced', 'Avanzado')
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class ImageProcessingProject(MachineLearningProject):
    """
    Modelo específico para proyectos de procesamiento de imágenes
    """
    input_image = models.ImageField(upload_to='input_images/')
    processed_image = models.ImageField(upload_to='processed_images/', null=True)
    processing_techniques = models.JSONField(default=list)
    
    def process_image(self):
        """
        Método abstracto para procesar imágenes
        Será implementado por cada técnica específica
        """
        raise NotImplementedError("Cada proyecto debe implementar su método de procesamiento")

class BackgroundRemovalProject(ImageProcessingProject):
    """
    Proyecto específico de eliminación de fondos
    """
    background_color = models.CharField(max_length=20, null=True)
    
    def process_background_removal(self):
        """
        Lógica específica de eliminación de fondo
        """
        pass

class PDFTransformationProject(MachineLearningProject):
    """
    Modelo para proyectos de transformación de PDFs
    """
    input_pdf = models.FileField(upload_to='input_pdfs/')
    output_pdf = models.FileField(upload_to='output_pdfs/', null=True)
    transformation_type = models.CharField(
        max_length=50, 
        choices=[
            ('compress', 'Comprimir'),
            ('convert', 'Convertir'),
            ('encrypt', 'Encriptar')
        ]
    )