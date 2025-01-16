import { FadeInSection } from './animaciones/FadeInSection';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import '../assets/styles/Tabs.css';
import ImageProcessor from './ImageProcessor';
import PDFToWord from './Transpdf';
import Processordata from './Processordata';
import ImagentoText from './Imagentotext';
import '../../dist/output.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('imageProcessor');
  const renderContent = () => {
    switch (activeTab) {
      case 'ImagentoText':
        return <ImagentoText />;
      case 'imageProcessor':
        return <ImageProcessor />;
      case 'pdfToWord':
        return <PDFToWord />;
      case 'dataProcessor':
        return <Processordata />;
      default:
        return null;
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        <FadeInSection>
          <Card sx={{
                maxWidth:1200,
                backgroundColor:'#3E3B5B', 
                '&:hover':{
                    backgroundColor: '#4B4453',
                },
                transition: 'background-color 0.3s ease',
                }} >
            <CardHeader
              title={
                <typography variant="h2" className="text-3xl font-bold text-dark-text text-center">
                  Mis proyectos y APIs
                </typography>
              }
            />
            <CardContent>
              <div className="tabs-container">
                <div className="tabs flex flex-wrap justify-center gap-4">
                  <button
                    className={`tab ${activeTab === 'ImagentoText' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ImagentoText')}
                  >
                    Imagen a texto
                  </button>
                  <button
                    className={`tab ${activeTab === 'imageProcessor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('imageProcessor')}
                  >
                    Procesador de Imágenes
                  </button>
                  <button
                    className={`tab ${activeTab === 'dataProcessor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dataProcessor')}
                  >
                    Procesador de Datos
                  </button>
                  <button
                    className={`tab ${activeTab === 'pdfToWord' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pdfToWord')}
                  >
                    Convertidor de PDF a Word
                  </button>
                </div>
                <div className="tab-content">
                  {renderContent()}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>
      </div>
  );
};

export default Tabs;
