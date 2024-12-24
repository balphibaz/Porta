import cv2
import numpy as np
import base64
from django.core.files.base import ContentFile
import io
from PIL import Image

def process_image_with_opencv(image_data):
    # Decodificar la imagen base64
    format, imgstr = image_data.split(';base64,')
    ext = format.split('/')[-1]
    
    # Convertir base64 a imagen
    img_data = base64.b64decode(imgstr)
    img_array = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    # Aplicar procesamiento OpenCV
    # Ejemplo: Convertir a escala de grises y aplicar detección de bordes
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    
    # Convertir de nuevo a RGB para mejor visualización
    processed_img = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)
    
    # Convertir la imagen procesada a base64
    _, buffer = cv2.imencode(f'.{ext}', processed_img)
    img_str = base64.b64encode(buffer).decode()
    
    return f'data:image/{ext};base64,{img_str}'