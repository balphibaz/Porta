import { useState } from "react"
import '../assets/styles/Tabs.css';
import ImageProcessor from './ImageProcessor';
import ImagentoText from './Imagentotext';
import '../../dist/output.css';
import { Card, CardContent } from '@mui/material';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('imageProcessor');
  const renderContent = () => {
    switch (activeTab) {
      case 'ImagentoText':
        return <ImagentoText />;
        default:
      case 'imageProcessor':
        return <ImageProcessor />;
      
        return null;
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        
          <Card sx={{
                maxWidth:1200,
                backgroundColor:'#3E3B5B', 
                '&:hover':{
                    backgroundColor: '#4B4453',
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