
import React from 'react';

const Portafolio = () => {
    return (
        <div className="font-roboto bg-gray-100 text-gray-900">
            {/* Inicio */}
            <section className="bg-white py-20" id="inicio">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Nombre del Desarrollador</h1>
                    <p className="text-xl text-gray-600 mt-4">Desarrollador Python especializado en Backend, APIs y Machine Learning</p>
                    <p className="text-gray-600 mt-4">Habilidades clave: Flask, Django, React, APIs, Data Science</p>
                </div>
            </section>

            {/* Sobre mí */}
            <section className="bg-gray-50 py-20" id="sobre-mi">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Sobre mí</h2>
                    <p className="text-gray-600 mt-4 text-center">Experiencia educativa y profesional en desarrollo backend y creación de proyectos de machine learning.</p>
                    <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                        <img alt="Foto del desarrollador" className="rounded-full" height="150" src="" width="150"/>
                        <div className="text-center md:text-left">
                            <p className="text-gray-600">experiencia en desarrollo de aplicaciones backend utilizando Python y frameworks como react y Django. Experiencia en la creación de APIs robustas y proyectos de machine learning.</p>
                        </div>
                    </div>
                </div>
            </section>

           

        </div>
    );
}

export default Portafolio;