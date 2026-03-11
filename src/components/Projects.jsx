import React, { useState, useEffect } from 'react';
import Folder from './Folder';
import ProjectModal from './ProjectModal';
import { PROJECTS } from '../constants';

// Import local images
import BirthdayImg from '../assets/birthday-site.png';
import LandingImg from '../assets/landing-page.png';
import GreetingImg from '../assets/greeting-card.png';
import JournalImg from '../assets/journal-system.png';
import UMKMImg from '../assets/umkm-marketing.png';

// Mapping object for dynamic lookups
const imageMap = {
  "birthday-site.png": BirthdayImg,
  "landing-page.png": LandingImg,
  "greeting-card.png": GreetingImg,
  "journal-system.png": JournalImg,
  "umkm-marketing.png": UMKMImg,
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Responsive scale logic
  const getFolderSize = () => {
    if (windowWidth < 480) return 1.05;
    if (windowWidth < 768) return 1.35;
    return 2;
  };

  // Grouping projects for folder display
  const folders = [
    {
      name: "Web Apps",
      color: "#6366f1",
      items: PROJECTS.slice(0, 2),
    },
    {
      name: "Creative UI",
      color: "#a855f7",
      items: PROJECTS.slice(2, 4),
    }
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="container px-6 mx-auto">
        <h2 className="section-title">My Projects</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto -mt-4 mb-20">
          Explore my work categories. Click a folder to open and see individual projects.
        </p>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-48 items-center pt-10">
          {folders.map((folder, fIndex) => (
            <div key={folder.name} className="flex flex-col items-center gap-12 md:gap-16">
              <Folder 
                color={folder.color}
                size={getFolderSize()}
                items={folder.items.map((item, i) => (
                  <div key={item.title} className="w-full h-full p-2 flex flex-col items-center justify-center text-center">
                    <img 
                      src={imageMap[item.image]} 
                      alt={item.title}
                      className="w-full h-[60%] object-cover rounded shadow-inner mb-2"
                    />
                    <h4 className="text-[10px] font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                    <p className="text-[8px] text-slate-500 line-clamp-2 px-1">{item.description}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProject(item);
                      }}
                      className="mt-1 px-2 py-0.5 bg-indigo-600 text-white text-[8px] rounded hover:bg-indigo-700 transition-colors"
                    >
                      View
                    </button>
                  </div>
                ))}
              />
              <span className="text-slate-800 dark:text-white font-bold tracking-wider uppercase text-sm mt-4">{folder.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageMap={imageMap}
      />
    </section>
  );
};

export default Projects;
