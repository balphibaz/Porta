import React from 'react';
import '../../dist/output.css';
const Navbar = () => {
  return (
    <nav className="bg-[#004d40] shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a className="text-2xl font-bold text-white hover:text-gray-500" href="#">Portafolio</a>
        <div className="space-x-4 text-sm sm:text-base md:text-lg lg:text-xl">
          <a className="text-white-600 hover:text-gray-500" href="#inicio">Inicio</a>
          <a className="text-white-600 hover:text-gray-500" href="#sobre-mi">Sobre mí</a>
          <a className="text-white-600 hover:text-gray-500" href="#Mis proyectos y APIs">Mis Proyectos y APIs</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

