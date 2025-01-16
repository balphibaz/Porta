import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import {ImageProcessingService} from '../services/apiService';

const ImageProcessor = () => {
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setSelectedImage(result); // Solo asignamos si es un string
        }
        uploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString().split(',')[1];
      if (base64String) {
        try {
          const blob = await ImageProcessingService.processImage(`data:${file.type};base64,${base64String}`);
          const processedImageUrl = URL.createObjectURL(blob);
          setProcessedImage(processedImageUrl);
        } catch {
          setError('Error processing image');
        } finally {
          setIsLoading(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Imágenes con OpenCV</h1>
        {/* Upload Section */}
        <div className="w-full max-w-md">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click para subir</span> o arrastra y suelta
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Display Selected Image */}
        {selectedImage && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold">Imagen Original</h2>
            <img src={selectedImage.toString()} alt="Selected" className="w-full h-auto" />
          </div>
        )}

        {/* Display Processed Image */}
        {isLoading && <Loader className="w-8 h-8 text-gray-500 animate-spin" />}
        {processedImage && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold">Imagen Procesada</h2>
            <img src={processedImage} alt="Processed" className="w-full h-auto" />
          </div>
        )}

        {/* Display Error */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};
export default ImageProcessor;