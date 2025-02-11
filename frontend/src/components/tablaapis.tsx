
import { useState } from "react"
import Climas from './Clima';
import { Card, CardContent } from '@mui/material';



const Zaima = () => {
  const [activeTab, setActiveTab] = useState('Clima');
  const renderContent = () => {
    switch (activeTab) {
      case 'Clima':
        return <Climas/>;
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
                    className={`tab ${activeTab === 'Clima' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Clima')}
                  >
                    clima
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

export default Zaima;