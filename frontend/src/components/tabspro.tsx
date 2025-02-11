import { useState } from "react"
import '../assets/styles/Tabs.css';
import ImageProcessor from './ImageProcessor';
import ImagentoText from './Imagentotext';
import '../../dist/output.css';
import { Card, CardContent } from '@mui/material';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('imagentoText');
  const renderContent = () => {
    switch (activeTab) {
        default:
      case 'ImagentoText':
        return <ImagentoText />;
      case 'imageProcessor':
        return <ImageProcessor />;
      
        return null;
    }
  };

  return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
          <Card sx={{
                maxWidth:1200,
                backgroundColor:'#00796b', 
                '&:hover':{
                    backgroundColor: '#48a999',
                },
                transition: 'background-color 0.3s ease',
                }} >
            
            <CardContent>
              <div className="tabs-container">
                <div className="tabs flex flex-wrap justify-center gap-4">
                  <button
                    className={`tab ${activeTab === 'ImagentoText' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ImagentoText')}
                  >
                    OCR
                  </button>
                  <button
                    className={`tab ${activeTab === 'imageProcessor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('imageProcessor')}
                  >
                    OpenCV
                  </button>
                </div>
                <div className="tab-content">
                  {renderContent()}
                </div>
              </div>
            </CardContent>
          </Card>
        
      </div>
  );
};

export default Tabs;