const API_BASE_URL = 'http://localhost:8000/';

class ImageProcessingService {
  static async processImage(imageData: string) {
    try {
      const response = await fetch(`${API_BASE_URL}images/process_image/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const proceso = await response.json();
      return proceso.image;
    } catch (error) {
      console.error('Error processing image2:', error);
      throw error;
    }
  }
}

class convertPDFService {
  static async convertPDFToWord(formData: FormData) {
    try {
      const response = await fetch(`${API_BASE_URL}pdf-to-word/convert_pdf/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Error converting PDF to Word:', error);
      throw error;
    }
  }
}

class DataProcessingService {
  static async processData(data: unknown) {
    try {
      const response = await fetch(`${API_BASE_URL}data/process_data/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error processing data:', error);
      throw error;
    }
  }
} 
class ImagentoTextService {
  static async TexttoImage(imageData: string) {
    try {
      const response = await fetch(`${API_BASE_URL}text/process_text/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error processing image:1', error);
      throw error;
    }
  }
}

export {ImageProcessingService, convertPDFService,DataProcessingService,ImagentoTextService};