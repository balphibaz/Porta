import React from 'react';
import GetProyects from'./components/GetProjects';
import Portafolio from './components/index';
import Navbar from './components/Navbar';
import ImageProcessor from './components/ImageProcessor';
import PDFTransformer from './components/Pdftransformer';
import Footer from'./components/Footer';
import Contacto from './components/contacto';

function App() {
  return (
    
    <div className="App">
        <Navbar />
      <Portafolio />
      <GetProyects/>
      <ImageProcessor />
        <PDFTransformer />
        <Contacto/>
        <Footer/>
    </div>
  );
}

export default App;
