from django.db import models
import uuid

class ProcessedImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    original_image = models.ImageField(upload_to='original/')
    processed_image = models.ImageField(upload_to='processed/', null=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image {self.id}"

class ConversionPDF(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    original_pdf = models.FileField(upload_to='pdfs/')
    converted_docx = models.FileField(upload_to='docx/', null=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"PDF {self.id}"
    
class ProcessedText(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    original_image = models.ImageField(upload_to='original/')
    processed_image = models.ImageField(upload_to='processed/', null=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image {self.id}"