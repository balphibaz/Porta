import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { PDFTransformationProject } from '../types';

const PDFTransformer: React.FC = () => {
  const [pdf, setPDF] = useState<File | null>(null);
  const [transformationType, setTransformationType] = useState<string>('convert');
  const [transformedProject, setTransformedProject] = useState<PDFTransformationProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPDF(file);
    }
  };

  const transformPDF = async () => {
    if (!pdf) {
      setError('Por favor, selecciona un archivo PDF');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const project = await apiService.transformPDF(pdf, transformationType);
      setTransformedProject(project);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transformación de PDFs</h2>
      
      <input 
        type="file" 
        accept=".pdf" 
        onChange={handlePDFUpload}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700
          hover:file:bg-green-100"
      />

      <select 
        value={transformationType}
        onChange={(e) => setTransformationType(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      >
        <option value="convert">Convertir</option>
        <option value="compress">Comprimir</option>
        <option value="encrypt">Encriptar</option>
      </select>

      <button 
        onClick={transformPDF}
        disabled={!pdf || loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Transformando...' : 'Transformar PDF'}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {transformedProject && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Proyecto Transformado</h3>
          <p>ID: {transformedProject.id}</p>
          <p>Nombre: {transformedProject.name}</p>
        </div>
      )}
    </div>
  );
};

export default PDFTransformer;