import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ProjectCard from"./tabspro";
import Tablas from"./Tabsimage";
import Zaima from "./tablaapis";
import { Card } from '@mui/material';

interface Project {
  id: string
  title: string
  description: string
  type: "text" | "image" | "data" | "pdf"
  component: React.ComponentType
}
  

const Tabs: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "imagen",
      title: "Procesador de imagenes",
      description: "Manipulacion de imagenes con diferentes librerias",
      type: "text",
      component: ProjectCard,
    },
    {
      id: "Archivos",
      title: "Procesador de Archivos",
      description: "Procesamiento de archivos con diferentes formatos",
      type: "image",
      component: Tablas,
    },
    {
      id:"Apis",
      title:"Apis",
      description:"Consumo de APIs",
      type:"text",
      component: Zaima,
    }

  ]

    
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12"id="Mis proyectos y APIs">
      
      <Card sx={{
                maxWidth:1200,
                backgroundColor:'#00796b', 
                '&:hover':{
                    backgroundColor: '#48a999',
                },
                transition: 'background-color 0.3s ease',
                }} >
      <div
      
        className="relative rounded-lg p-6 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-dark-text text-center">Mis proyectos y APIs</h2>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 mt-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#e0e0e0] rounded-lg p-4 hover:bg-[#005b4f] transition-colors duration-200 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{project.title}</h3>
            <p className="text-gray-700 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className="mt-6 bg-dark-terceary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">{selectedProject.title}</h3>
          <selectedProject.component />
        </div>
      )}
    </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
          
      </Card>
    </div>
  
  );
  };
  export default Tabs;