import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a className="text-2xl font-bold text-gray-800" href="#">Portafolio</a>
        <div className="space-x-4">
          <a className="text-gray-600 hover:text-gray-800" href="#inicio">Inicio</a>
          <a className="text-gray-600 hover:text-gray-800" href="#sobre-mi">Sobre mí</a>
          <a className="text-gray-600 hover:text-gray-800" href="#Proyectos">Mis Proyectos y APIs</a>
          <a className="text-gray-600 hover:text-gray-800" href="#contacto">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

