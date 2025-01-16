import cv2
import numpy as np
import base64
from django.core.files.base import ContentFile
import io
import pytesseract
from PIL import Image
from pdf2docx import Converter
def convert_pdf(pdf_path):
    docx_path = pdf_path.replace('.pdf', '.docx')
    cv = Converter(pdf_path)
    cv.convert(docx_path, start=0, end=None)
    cv.close()
    return docx_path
def detect_shapes(image):
    # Convertir a escala de grises
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Aplicar desenfoque para reducir el ruido
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    # Detectar bordes en la imagen
    edged = cv2.Canny(blurred, 50, 150)
    # Encontrar contornos en la imagen
    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for contour in contours:
        # Aproximar el contorno
        epsilon = 0.04 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        # Obtener el nombre de la forma
        shape_name = get_shape_name(approx)
        # Dibujar el contorno y el nombre de la forma en la imagen
        cv2.drawContours(image, [approx], -1, (0, 255, 0), 2)
        x, y, w, h = cv2.boundingRect(approx)
        cv2.putText(image, shape_name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return image
def get_shape_name(approx):
    if len(approx) == 3:
        return "Triángulo"
    elif len(approx) == 4:
        # Verificar si es un cuadrado o un rectángulo
        (x, y, w, h) = cv2.boundingRect(approx)
        aspect_ratio = w / float(h)
        if 0.95 <= aspect_ratio <= 1.05:
            return "Cuadrado"
        else:
            return "Rectángulo"
    elif len(approx) == 5:
        return "Pentágono"
    elif len(approx) == 6:
        return "Hexágono"
    else:
        return "Círculo"

def process_image_with_opencv(image_data):
    # Decodificar la imagen base64
    format, imgstr = image_data.split(';base64,')
    ext = format.split('/')[-1]
    
    # Convertir base64 a imagen
    img_data = base64.b64decode(imgstr)
    img_array = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    # Aplicar procesamiento OpenCV para quitar el fondo
    # Convertir a escala de grises
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Aplicar umbralización para obtener una máscara binaria
    _, mask = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
    
    # Crear un fondo negro
    background = np.zeros_like(img, np.uint8)
    
    # Aplicar el algoritmo GrabCut
    mask = np.where((mask == 0), 0, 1).astype('uint8')
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    rect = (1, 1, img.shape[1]-1, img.shape[0]-1)
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_MASK)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    img = img * mask2[:, :, np.newaxis]
    
    # Detectar formas y etiquetarlas
    img = detect_shapes(img)
    
    # Convertir la imagen procesada a base64
    _, buffer = cv2.imencode(f'.{ext}', img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return f'data:image/{ext};base64,{img_base64}'

def process_text(image_path):
    try:
        # Abre la imagen usando Pillow
        image = Image.open(image_path)
        
        # Usa pytesseract para detectar texto en la imagen
        text = pytesseract.image_to_string(image)
        
        return text
    except Exception as e:
        return f"Error procesando la imagen: {e}"