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
        const result = reader.result as string;
        setSelectedImage(result); // Solo asignamos si es un string
        uploadImage(result);
      };
      reader.readAsDataURL(file);
    }
  };


  const uploadImage = async (base64String:string) => {
    setIsLoading(true);
    setError(null);
     
      try {
        const imgprocess = await ImageProcessingService.processImage(base64String);
          setProcessedImage(`data:image;base64,${imgprocess}`);
        } catch {
          setError('Error processing image1');
        } finally {
          setIsLoading(false);
        }
    };
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Imágenes con OpenCV</h1>
        <p className="text-center text-black">
          Procesador de imágenes que utiliza OpenCV admitiendo que el usuario ingrese la imagen enviandola al backend para realizar la manipulacion con la libreria.
        </p>
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
            <div className="relative">
          </div>
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