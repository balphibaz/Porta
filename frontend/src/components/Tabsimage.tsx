
import { useState } from "react"
import Transpdf from './Transpdf';
import { Card, CardContent } from '@mui/material';



const Tablas = () => {
  const [activeTab, setActiveTab] = useState('imageProcessor');
  const renderContent = () => {
    switch (activeTab) {
      case 'ImagentoText':
        return <Transpdf/>;
        default:
      
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
                    PDF a Word
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

export default Tablas;