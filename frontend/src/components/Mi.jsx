import { FadeInSection } from './animaciones/FadeInSection';
import { Card, CardHeader, CardContent } from '@mui/material'
import '../../dist/output.css';
const Sobre = () => {
  return (
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
                    <typography variant ="h2" className="text-3xl font-bold text-dark-text text-center">
                    Acerca de mí
                    </typography>
                }   
            />
            <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3">
        <img 
            src="/imagenes/descarga.png"
            alt="Profile" 
            className="rounded-full transform hover:scale-105 transition-transform"
        />
        </div>
        <div className="w-full md:w-2/3">
        <p className="text-dark-text">
        Soy un desarrollador Backend apasionado por la creacion de soluciones robustas y escalables. Mi enfoque principal esta en el diseño e implementacion de APIs utilizando tecnologias como Python y Django, ademas de integrar Frameworks modernos como TypeScript, TailwindCSS y React en proyectos con un enfoque en Full Stack.<br /><br />
        Cuento con experiencia en el analisis de datos y machine Learning, aplicando herramientas como Numpy y Pandas para resolver problemas complejos e impulsar desiciones basadas en datos.<br /><br />Me especializo en construir proyectos que combinan desarrollo de APIs personalizadas con el consumo de APIs externas, demostrando mi habilidad para integrar sistemas y trabajar con flujos de datos en tiempo real. Siempreestoy buscando formas de mejorar mis habilidades y crear proyectos que demustren mi compromiso con la calidad y la innovacion tecnologica .
        </p>
        </div>
        </CardContent>
        </Card>
        </FadeInSection>
        </div>
  );
};
export default Sobre;