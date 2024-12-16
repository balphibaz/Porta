export interface MLProject {
  id: string;
  name: string;
  description: string;
  technologyStack: string[]; // Se especifican las tecnologías utilizadas
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'; // Nivel de dificultad
  createdAt: string; // Fecha de creación del proyecto
}

export interface ImageProcessingProject extends MLProject {
  inputImage: string; // Imagen original subida
  processedImage: string; // Imagen después del procesamiento (fondo removido)
  processingTechniques: string[]; // Técnicas utilizadas para procesar la imagen
}

export interface PDFTransformationProject extends MLProject {
  inputPdf: string; // PDF original
  outputPdf: string; // PDF procesado después de la transformación
  transformationType: 'compress' | 'convert' | 'encrypt'; // Tipo de transformación aplicada
}

export interface ProjectResponse {
  status: string; // El estado de la respuesta, como "success" o "error"
  message: string; // Un mensaje explicando el resultado de la operación
}

export type Project = ImageProcessingProject | PDFTransformationProject | MLProject;
