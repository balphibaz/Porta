import '../../dist/output.css';
import React from 'react';

const Portafolio = () => {
    return (
        <div>
            {/* Inicio */}
            <section className="bg-dark-primary py-20" id="inicio">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-300">Joel Esau Bazan Lopez</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white-600 mt-4">Desarrollador Python especializado en Backend</p>
                </div>
            </section>
        </div>
    );
}

export default Portafolio;