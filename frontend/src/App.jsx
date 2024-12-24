import React from 'react';
import Portafolio from './components/index';
import Navbar from './components/Navbar';
import ImageProcessor from './components/ImageProcessor';
import Footer from'./components/Footer';
import Contacto from './components/contacto';

function App() {
  return (
    
    <div className="App">
        <Navbar />
      <Portafolio />
      <ImageProcessor />
      <Contacto/>
      <Footer/>
    </div>
  );
}

export default App;
