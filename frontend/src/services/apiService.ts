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

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }
}

export default ImageProcessingService;