const BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  // Método para crear un proyecto de eliminación de fondo
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('input_image', file);  // El campo 'input_image' coincide con el modelo

    try {
      const response = await fetch(`${BASE_URL}/removal-projects/`, {  // Usamos la URL correcta
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image processing failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image', error);
      throw error;
    }
  },

  // Método para convertir un PDF
  convertPDF: async (file: File, format: string) => {
    const formData = new FormData();
    formData.append('input_pdf', file);  // Usamos 'input_pdf' para subir el archivo PDF
    formData.append('transformation_type', format);  // 'transformation_type' para el tipo de transformación

    try {
      const response = await fetch(`${BASE_URL}/pdf-projects/`, {  // Usamos la URL correcta
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('PDF conversion failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error converting PDF', error);
      throw error;
    }
  },

  // Método para eliminar el fondo de la imagen
  removeBackground: async (image: File) => {
    const formData = new FormData();
    formData.append('input_image', image);  // Usamos 'input_image' para enviar la imagen

    try {
      const response = await fetch(`${BASE_URL}/removal-projects/`, {  // Usamos la URL correcta
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Background removal failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing background', error);
      throw error;
    }
  },

  // Método para transformar el PDF (según el tipo de transformación)
  transformPDF: async (pdf: File, transformationType: string) => {
    const formData = new FormData();
    formData.append('input_pdf', pdf);  // Usamos 'input_pdf' para el archivo PDF
    formData.append('transformation_type', transformationType);  // 'transformation_type' es el tipo de transformación

    try {
      const response = await fetch(`${BASE_URL}/pdf-projects/`, {  // Usamos la URL correcta para los proyectos de PDF
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('PDF transformation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error transforming PDF', error);
      throw error;
    }
  }
};
