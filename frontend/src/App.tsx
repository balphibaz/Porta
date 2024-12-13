import React from 'react';
import ImageProcessor from './components/ImageProcessor';
import PDFTransformer from './components/PDFConverter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageProcessor />
        <PDFTransformer />
      </div>
    </div>
  );
};

export default App;