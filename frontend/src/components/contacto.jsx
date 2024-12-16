// src/components/Contacto.js
import React from 'react';

const Contacto = () => {
  return (
    <section className="bg-gray-50 py-20" id="contacto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Contacto</h2>
        <div className="mt-8 max-w-lg mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600" htmlFor="nombre">Nombre</label>
              <input className="w-full p-2 border border-gray-300 rounded" id="nombre" type="text"/>
            </div>
            <div>
              <label className="block text-gray-600" htmlFor="email">Correo Electrónico</label>
              <input className="w-full p-2 border border-gray-300 rounded" id="email" type="email"/>
            </div>
            <div>
              <label className="block text-gray-600" htmlFor="mensaje">Mensaje</label>
              <textarea className="w-full p-2 border border-gray-300 rounded" id="mensaje"></textarea>
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacto;

