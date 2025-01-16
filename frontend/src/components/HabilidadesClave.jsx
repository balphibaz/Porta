import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { FadeInSection } from './animaciones/FadeInSection';
import { GitHub, JavaScript, Python, React as ReactIcon, Storage } from '@mui/icons-material'; // Ejemplo de íconos de Material UI
import '../../dist/output.css';

const Habilidades = () => {
  const [selectedSkill, setSelectedSkill] = useState(null); // Estado para gestionar la habilidad seleccionada

  // Función para renderizar los íconos según la habilidad seleccionada
  const renderIcons = () => {
    switch (selectedSkill) {
      case 'frontend':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <ReactIcon fontSize="large" className="text-blue-500" />
              <p>React</p>
            </div>
            <div className="flex justify-center items-center">
              <JavaScript fontSize="large" className="text-yellow-500" />
              <p>JavaScript</p>
            </div>
            <div className="flex justify-center items-center">
              <GitHub fontSize="large" className="text-gray-700" />
              <p>GitHub</p>
            </div>
          </div>
        );
      case 'backend':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <Python fontSize="large" className="text-green-500" />
              <p>Python</p>
            </div>
            <div className="flex justify-center items-center">
              <Storage fontSize="large" className="text-gray-500" />
              <p>Base de Datos</p>
            </div>
            <div className="flex justify-center items-center">
              <GitHub fontSize="large" className="text-gray-700" />
              <p>GitHub</p>
            </div>
          </div>
        );
      case 'machineLearning':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <Python fontSize="large" className="text-green-500" />
              <p>Python</p>
            </div>
            <div className="flex justify-center items-center">
              <Storage fontSize="large" className="text-gray-500" />
              <p>ML Frameworks</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <FadeInSection className="space-y-4">
        <Card
          sx={{
            maxWidth: 1200,
            backgroundColor: '#3E3B5B',
            '&:hover': {
              backgroundColor: '#4B4453',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <CardHeader
            title={
              <Typography variant="h2" className="text-white text-2xl font-semibold">
                Habilidades clave
              </Typography>
            }
          />
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform"
                onClick={() => setSelectedSkill('frontend')}
              >
                Desarrollo Frontend
              </button>
              <button
                className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform"
                onClick={() => setSelectedSkill('backend')}
              >
                Backend
              </button>
              <button
                className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform"
                onClick={() => setSelectedSkill('machineLearning')}
              >
                Machine Learning
              </button>
              <button
                className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform"
                onClick={() => setSelectedSkill(null)} // Esto es para quitar la selección
              >
                Limpiar Selección
              </button>
            </div>

            <div className="mt-6">
              {/* Renderizamos los íconos según la habilidad seleccionada */}
              {renderIcons()}
            </div>
          </CardContent>
        </Card>
      </FadeInSection>
    </div>
  );
};

export default Habilidades;
