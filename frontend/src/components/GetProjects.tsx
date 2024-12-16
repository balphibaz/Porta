import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { MLProject } from '../types';

const MLProjectProcessor = () => {
  const [image, setImage] = useState<File | null>(null);
  const [processedProject, setProcessedProject] = useState<MLProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const processMLImage = async () => {
    if (!image) {
      setError('Por favor, selecciona una imagen');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const project = await apiService.uploadImage(image);
      setProcessedProject(project);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="bg-gray-50 py-20" id="Proyectos">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Procesamiento de Machine Learning</h2>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      <button 
        onClick={processMLImage}
        disabled={!image || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Procesar Imagen ML'}
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
    </section>
  ); 
};

export default MLProjectProcessor;
