import React from 'react';
import Portafolio from './components/index';
import Navbar from './components/Navbar';
import ImageProcessor from './components/ImageProcessor';
import Footer from'./components/Footer';
import Transpdf from './components/Transpdf';
import Processordata from './components/Processordata'; 
import Sobre from './components/Mi';
import InteractiveGrid from './components/nuevatab';
import ProjectsSection from './components/prototipo';
import '../dist/output.css';
function App() {
  return (
    <div class="bg-dark-bg text-dark-text min-h-screen p-8">
      <Navbar/>
      <Portafolio/>
      <InteractiveGrid/>
      <Sobre/>
      <ProjectsSection/>
      <Footer/>
    </div>
  );
}

export default App;
