
import { useState } from "react"
import Transpdf from './Transpdf';
import { Card, CardContent } from '@mui/material';



const Tablas = () => {
  const [activeTab, setActiveTab] = useState('Transpdf');
  const renderContent = () => {
    switch (activeTab) {
      case 'Transpdf':
        return <Transpdf/>;
        default:
      
        return null;
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        
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
                    className={`tab ${activeTab === 'Transpdf' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Transpdf')}
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