import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import Papa from 'papaparse';
import { DataProcessingService } from '../services/apiService';

const DataProcessor = () => {
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
  const [parsedData, setParsedData] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setSelectedFile(result);
        if (file.type === 'text/csv') {
          Papa.parse(result, {
            header: true,
            complete: (results) => {
              setParsedData(results.data);
              sendDataToApi(results.data);
            },
          });
        } else if (file.type === 'application/json') {
          const jsonData = JSON.parse(result);
          setParsedData(jsonData);
          sendDataToApi(jsonData);
        }
      }
    };
    reader.readAsText(file);
  };

  const sendDataToApi = async (data: unknown[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DataProcessingService.processData(data);
      setProcessedImage(response.image);
    } catch (error) {
      setError('Error sending data to API');
      console.error('Error sending data to API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Procesador de Datos</h1>
        <div className="w-full max-w-md">
      <label
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click para subir</span> o arrastra y suelta
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv,application/json"
          onChange={handleFileUpload}
        />
      </label>

      {/* Display Selected File */}
      {selectedFile && (
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold">Archivo Seleccionado</h2>
          <p className="text-sm text-gray-500">{typeof selectedFile === 'string' ? selectedFile : 'Archivo cargado'}</p>
        </div>
      )}

      {isLoading && <Loader className="w-8 h-8 text-gray-500 animate-spin" />}
      {error && <div className="error text-red-500 mt-2">{error}</div>}

      {/* Display Processed Image */}
      {processedImage && (
        <div className="w-full max-w-md mt-4">
          <h2 className="text-lg font-semibold">Processed Data Visualization</h2>
          <img src={`data:image/png;base64,${processedImage}`} alt="Processed" className="w-full h-auto" />
        </div>
      )}
      </div>
    </div>
  </div> 
  );
};

export default DataProcessor;