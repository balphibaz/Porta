import { MLProject, ImageProcessingProject, PDFTransformationProject } from '../types';

const BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  // Proyectos generales
  getProjects: async (): Promise<MLProject[]> => {
    try {
      const response = await fetch(`${BASE_URL}/projects/`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects', error);
      throw error;
    }
  },

  // Procesamiento de imágenes
  removeBackground: async (file: File): Promise<ImageProcessingProject> => {
    const formData = new FormData();
    formData.append('input_image', file);
    formData.append('name', 'Background Removal Project');
    formData.append('description', 'Automatic background removal');
    formData.append('difficulty_level', 'intermediate');

    try {
      const response = await fetch(`${BASE_URL}/background-removal/remove_background/`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Background removal failed');
      return await response.json();
    } catch (error) {
      console.error('Error removing background', error);
      throw error;
    }
  },

  // Transformación de PDFs
  transformPDF: async (file: File, transformationType: string): Promise<PDFTransformationProject> => {
    const formData = new FormData();
    formData.append('input_pdf', file);
    formData.append('transformation_type', transformationType);
    formData.append('name', `PDF ${transformationType.charAt(0).toUpperCase() + transformationType.slice(1)} Project`);
    formData.append('description', `PDF transformation using ${transformationType} method`);
    formData.append('difficulty_level', 'intermediate');

    try {
      const response = await fetch(`${BASE_URL}/pdf-transformation/transform_pdf/`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('PDF transformation failed');
      return await response.json();
    } catch (error) {
      console.error('Error transforming PDF', error);
      throw error;
    }
  }
};