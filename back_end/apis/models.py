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

    def process_image(self, image):
        """
        Función genérica de procesamiento de imagen para proyectos de machine learning.
        Este método puede ser implementado con cualquier algoritmo de ML (como clasificación, predicción, etc.)
        """
        print(f"Procesando imagen con técnica de machine learning para el proyecto: {self.name}")
        return "Resultado del procesamiento de ML"


class BackgroundRemovalProject(models.Model):
    """
    Proyecto específico para eliminación de fondos
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    input_image = models.ImageField(upload_to='input_images/')
    processed_image = models.ImageField(upload_to='processed_images/', null=True)
    background_color = models.CharField(max_length=20, null=True)
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

    def process_background_removal(self):
        """
        Lógica específica para la eliminación de fondo de la imagen.
        Puede usar bibliotecas como OpenCV, PIL o técnicas de segmentación de imágenes.
        """
        # Lógica para eliminar el fondo de la imagen
        print(f"Eliminando fondo para el proyecto: {self.name}")
        # Supón que aquí se procesa la imagen, se elimina el fondo y se actualiza el campo `processed_image`
        self.processed_image = 'ruta/a/imagen/procesada.jpg'  # Actualiza con la ruta correcta
        self.save()  # Guardar el objeto con la imagen procesada
        return "Imagen procesada con fondo eliminado"


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

    def __str__(self):
        return self.name

    def transform_pdf(self):
        """
        Lógica para transformar el PDF según el tipo de transformación
        """
        print(f"Transformando PDF con el tipo: {self.transformation_type} para el proyecto: {self.name}")
        # Aquí iría la lógica de compresión, conversión o encriptado
        self.output_pdf = 'ruta/a/pdf/procesado.pdf'  # Actualiza con la ruta del PDF procesado
        self.save()  # Guardar el objeto con el PDF procesado
        return "PDF transformado con éxito"
