import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import '../../dist/output.css';
import { FadeInSection } from './animaciones/FadeInSection';

const Habilidades =()=>{
    return(
      <div className="max-w-7xl mx-auto p-6 space-y-12"> 
        <FadeInSection className="space-y-4">
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
                <typography variant ="h2" className="text-white text-2xl font-semibold">
                  Habilidades clave
                </typography>
              }
            />
            <CardContent>
             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform">
                  Desarrollo Frontend y Backend
                </div>
                <div className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform">
                  Machine Learning
                </div>
                <div className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform">
                  APIs
                </div>
                <div className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform">
                 Optimización de código
                </div>
                <div className="p-4 bg-blue-300 rounded-lg text-center transform hover:scale-105 transition-transform">
              Control de versiones
            </div>
          </div>
          </CardContent>
        </Card>
    </FadeInSection>  
    </div> 
    );
};
export default Habilidades;