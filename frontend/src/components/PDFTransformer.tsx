import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { PDFTransformationProject } from '../types';

const PDFTransformation: React.FC = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [transformationType, setTransformationType] = useState<string>('');
  const [processedProject, setProcessedProject] = useState<PDFTransformationProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdf(file);
    }
  };

  const handleTransformationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransformationType(event.target.value);
  };

  const processPDF = async () => {
    if (!pdf || !transformationType) {
      setError('Por favor, selecciona un archivo PDF y un tipo de transformación');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const project = await apiService.transformPDF(pdf, transformationType);
      setProcessedProject(project);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transformación de PDF</h2>
      
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handlePdfUpload}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      
      <select 
        onChange={handleTransformationTypeChange}
        className="mb-4 block w-full text-sm text-gray-500 border rounded p-2"
      >
        <option value="">Seleccionar tipo de transformación</option>
        <option value="compress">Comprimir</option>
        <option value="convert">Convertir</option>
        <option value="encrypt">Encriptar</option>
      </select>

      <button 
        onClick={processPDF}
        disabled={!pdf || !transformationType || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Transformar PDF'}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {processedProject && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Proyecto Procesado</h3>
          <p>ID: {processedProject.id}</p>
          <p>Nombre: {processedProject.name}</p>
        </div>
      )}
    </div>
  );
};

export default PDFTransformation;