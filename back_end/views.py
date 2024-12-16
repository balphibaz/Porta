from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MachineLearningProject, BackgroundRemovalProject, PDFTransformationProject
from .serializers import MachineLearningProjectSerializer, BackgroundRemovalProjectSerializer, PDFTransformationProjectSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import uuid

class MachineLearningProjectList(APIView):
    """
    Vista para listar todos los proyectos de Machine Learning.
    """
    def get(self, request):
        projects = MachineLearningProject.objects.all()
        serializer = MachineLearningProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MachineLearningProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BackgroundRemovalProjectList(APIView):
    """
    Vista para listar y crear proyectos de eliminación de fondo.
    """
    def get(self, request):
        projects = BackgroundRemovalProject.objects.all()
        serializer = BackgroundRemovalProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BackgroundRemovalProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BackgroundRemovalProcess(APIView):
    """
    Vista para procesar la eliminación de fondo en un proyecto.
    """
    def post(self, request, project_id):
        try:
            project = BackgroundRemovalProject.objects.get(id=project_id)
        except BackgroundRemovalProject.DoesNotExist:
            return Response({"error": "Proyecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Aquí iría la lógica para procesar la imagen
        project.process_background_removal()  # Se procesa la imagen

        serializer = BackgroundRemovalProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PDFTransformationProjectList(APIView):
    """
    Vista para listar y crear proyectos de transformación de PDF.
    """
    def get(self, request):
        projects = PDFTransformationProject.objects.all()
        serializer = PDFTransformationProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PDFTransformationProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PDFTransformationProcess(APIView):
    """
    Vista para transformar un PDF según el tipo de transformación.
    """
    def post(self, request, project_id):
        try:
            project = PDFTransformationProject.objects.get(id=project_id)
        except PDFTransformationProject.DoesNotExist:
            return Response({"error": "Proyecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Aquí iría la lógica para transformar el PDF
        project.transform_pdf()  # Se procesa el PDF

        serializer = PDFTransformationProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)
