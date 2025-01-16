import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { convertPDFService} from '../services/apiService';
const Transpdf = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      convertToWord(file);
    }
  };

  const convertToWord = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/pdf-to-word/convert_pdf/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error al convertir el archivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setConvertedFile(url);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Convertir PDF a Word</h1>
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
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Mostrar archivo seleccionado */}
        {selectedFile && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold">Archivo PDF Seleccionado</h2>
            <p>{selectedFile.name}</p>
          </div>
        )}

        {/* Mostrar archivo convertido */}
        {isLoading && <Loader className="w-8 h-8 text-gray-500 animate-spin" />}
        {convertedFile && (
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold">Archivo Word Convertido</h2>
            <a href={convertedFile} download="converted.docx" className="text-blue-500 underline">
              Descargar archivo convertido
            </a>
          </div>
        )}

        {/* Mostrar error */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Transpdf;