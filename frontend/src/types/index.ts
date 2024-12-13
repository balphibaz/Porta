export interface MLProject {
    id: string;
    name: string;
    description: string;
    technologyStack: string[];
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    createdAt: string;
  }
  
  export interface ImageProcessingProject extends MLProject {
    inputImage: string;
    processedImage: string;
    processingTechniques: string[];
  }
  
  export interface PDFTransformationProject extends MLProject {
    inputPdf: string;
    outputPdf: string;
    transformationType: 'compress' | 'convert' | 'encrypt';
  }