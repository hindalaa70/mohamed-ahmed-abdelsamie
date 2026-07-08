import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { Github, Terminal, Code, Cpu, X } from 'lucide-react';

const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'Fractional Agriculture Investment APIs',
    subtitle: 'Django + PostgreSQL + Docker',
    description: 'Backend services for managing distributed agricultural investments and revenue tracking.',
    longDescription: 'Engineered a highly normalized relational database architecture inside PostgreSQL to handle fractionated agricultural assets. Deployed backend services that calculate periodic crop growth yields, project future cash-flows, and distribute payouts safely with multi-database transactions.',
    image: '',
    tags: ['Django', 'PostgreSQL', 'Docker', 'REST APIs'],
    category: 'django',
    architecture: {
      entry: 'Django Rest Framework Router',
      processing: 'Python 3.11 Multi-threaded Calculation workers',
      storage: 'PostgreSQL Relational DB with B-Tree indexes',
      ai: 'Linear Regression for Yield estimation'
    },
    metrics: [
      { label: 'API Response Time', value: '<15ms average' },
      { label: 'Database Normalization', value: '3NF Compliant' },
      { label: 'Concurrency', value: 'Safe parallel reads' }
    ]
  },
  {
    id: 'proj-02',
    title: 'Crowd-Funding Platform',
    subtitle: 'Django + PostgreSQL + Bootstrap + Docker',
    description: 'Collaborative funding engine built with secure transaction logic and real-time tracking.',
    longDescription: 'Created the transaction ledger core that supports concurrent user investments. Implemented atomic database transactions inside Django to guarantee zero funding double-allocations, alongside optimized database queries for campaign listings.',
    image: '',
    tags: ['Django', 'PostgreSQL', 'Bootstrap', 'Docker'],
    category: 'django',
    architecture: {
      entry: 'Django Views & Custom Middlewares',
      processing: 'Atomic transaction decorators (select_for_update)',
      storage: 'PostgreSQL / SQL-based state engine'
    },
    metrics: [
      { label: 'API Endpoints', value: '24 routes' },
      { label: 'Data Consistency', value: '100% ACID' },
      { label: 'Transaction Safety', value: 'Full ACID Compliance' }
    ],
    github: 'https://github.com/m7md158/ITI_GraduationProject'
  },
  {
    id: 'proj-03',
    title: 'Gender And Age Classification',
    subtitle: 'TensorFlow + VGG16 + Streamlit',
    description: 'Deep learning implementation for automated visual demographic analysis, utilizing a VGG16 pretrained model and deployed via Streamlit.',
    longDescription: 'Architected and trained a convolutional neural network (CNN) classifier capable of estimating age and classifying gender from images. Integrated the VGG16 pretrained model to enhance feature extraction and built an interactive web app deployed via Streamlit for real-time model inference.',
    image: '',
    tags: ['TensorFlow', 'Computer Vision', 'Deep Learning', 'VGG16', 'Streamlit'],
    category: 'ai',
    architecture: {
      entry: 'Image Preprocessing & Normalization layers',
      processing: 'CNN Filter blocks with VGG16 features',
      storage: 'TensorWeight files & Streamlit app deployment',
      ai: 'VGG16 Transfer Learning backbone'
    },
    metrics: [
      { label: 'Inference Accuracy', value: '92% Classification' },
      { label: 'Model Weights size', value: '42 MB optimized binary' },
      { label: 'Execution Speed', value: '35ms single frame' }
    ],
    github: 'https://github.com/m7md158/DL_Colloge_Project'
  },
  {
    id: 'proj-04',
    title: 'My Portfolio Website',
    subtitle: 'Django Framework + RESTful API',
    description: 'Django-powered portfolio backend and API showcasing software engineering projects and technical skills.',
    longDescription: 'Developed a robust Django-powered backend portfolio featuring clean RESTful APIs, utilizing Class-Based Views (CBV) for modularity and Postman for complete endpoint testing and documentation.',
    image: '',
    tags: ['Django', 'RESTful API', 'CBV', 'Postman'],
    category: 'fullstack',
    architecture: {
      entry: 'Vite SPA static router / Django endpoints',
      processing: 'Class-Based Views for response generation',
      storage: 'PostgreSQL DB / Client-side state buffer'
    },
    metrics: [
      { label: 'Build size', value: 'Ultra lightweight' },
      { label: 'Performance', value: '100/100 Lighthouse' },
      { label: 'Interactions', value: 'Dynamic terminal UI' }
    ],
    github: 'https://github.com/m7md158/portfolio'
  },
  {
    id: 'proj-05',
    title: 'Job Board Website',
    subtitle: 'Django + PostgreSQL + Postman',
    description: 'Complete recruitment portal with advanced filtering, applicant tracking, and role-based access control.',
    longDescription: 'Designed a fully functional applicant-employer platform. Leveraged Django’s robust built-in user models to implement customized role-based permissions (Candidate, Company Recruiter, Admin). Set up custom Django querysets to carry out performant, multi-parameter text search filtering.',
    image: '',
    tags: ['Django', 'PostgreSQL', 'RESTful API', 'Postman'],
    category: 'fullstack',
    architecture: {
      entry: 'Django Views & Session authentication',
      processing: 'Custom RBAC Check Middlewares',
      storage: 'PostgreSQL full text query optimization'
    },
    metrics: [
      { label: 'Data Entities', value: '11 tables, clean FK indexes' },
      { label: 'Auth Middleware', value: 'Role-based session guard' },
      { label: 'Search Latency', value: '<5ms queries' }
    ],
    github: 'https://github.com/m7md158/django-job-board'
  },
  {
    id: 'proj-06',
    title: 'Customers Segmentation Analysis',
    subtitle: 'Scikit-learn + Pandas',
    description: 'Data science analysis using K-means clustering to identify distinct behavioral patterns in customer datasets.',
    longDescription: 'Analysed raw transaction logs to build normalized behavioral feature vectors. Utilized PCA (Principal Component Analysis) to reduce dimensionality, followed by K-Means clustering algorithms to segment customer groups. Visualized silhouettes to measure and report exact model confidence boundaries.',
    image: '',
    tags: ['Scikit-learn', 'Pandas', 'NumPy', 'Data Clustering'],
    category: 'ai',
    architecture: {
      entry: 'CSV / SQL Raw Log pipeline',
      processing: 'Feature Vector Normalization & Scaling',
      storage: 'Clean pandas dataframes',
      ai: 'K-Means Clustering with Elbow evaluation'
    },
    metrics: [
      { label: 'Log records', value: '100,000+ entries processed' },
      { label: 'Feature set size', value: '8 scaled dimension points' },
      { label: 'Optimal Cluster K', value: '5 distinct segments found' }
    ],
    github: 'https://github.com/m7md158/data_analysis_project'
  }
];

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'django' | 'ai' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 justify-start">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border cursor-pointer ${
            activeTab === 'all'
              ? 'bg-primary-blue/10 border-accent-cyan text-accent-cyan font-bold'
              : 'bg-[#111827] border-border-subtle text-text-secondary hover:border-text-secondary/40'
          }`}
        >
          All DEPLOYMENTS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('django')}
          className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border cursor-pointer ${
            activeTab === 'django'
              ? 'bg-primary-blue/10 border-accent-cyan text-accent-cyan font-bold'
              : 'bg-[#111827] border-border-subtle text-text-secondary hover:border-text-secondary/40'
          }`}
        >
          Python &amp; Django APIs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-primary-blue/10 border-accent-cyan text-accent-cyan font-bold'
              : 'bg-[#111827] border-border-subtle text-text-secondary hover:border-text-secondary/40'
          }`}
        >
          AI &amp; Data Science
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('fullstack')}
          className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border cursor-pointer ${
            activeTab === 'fullstack'
              ? 'bg-primary-blue/10 border-accent-cyan text-accent-cyan font-bold'
              : 'bg-[#111827] border-border-subtle text-text-secondary hover:border-text-secondary/40'
          }`}
        >
          Full-Stack Portals
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
              onClick={() => setSelectedProject(p)}
              className="group rounded-[20px] overflow-hidden border border-border-subtle cursor-pointer flex flex-col justify-between h-full bg-card-dark shadow-sm hover:border-accent-cyan/30 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] transition-all duration-300"
              id={`project-card-${p.id}`}
            >
              <div className="flex-grow flex flex-col">
                {/* Image Placeholder */}
                <div className="h-52 relative bg-gradient-to-br from-[#0B1220] to-[#111827] flex flex-col justify-center items-center p-6 border-b border-border-subtle text-center select-none overflow-hidden">
                  <div className="absolute inset-0 tech-grid opacity-[0.03]" />
                  <div className="p-3 bg-card-dark/80 rounded-full border border-border-subtle text-accent-cyan group-hover:scale-110 transition-transform duration-300">
                    {p.category === 'ai' ? <Cpu size={24} /> : <Code size={24} />}
                  </div>
                  <span className="font-mono text-[10px] text-text-secondary/60 tracking-widest uppercase mt-3">System Interface</span>
                  <span className="font-mono text-[9px] text-[#22D3EE]/80 mt-1 uppercase font-bold tracking-widest">
                    {p.category === 'django' ? 'django_core_node' : p.category === 'ai' ? 'ml_tensor_node' : 'fullstack_web_node'}
                  </span>
                </div>

                <div className="p-6 space-y-4 text-left flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-accent-cyan font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      {p.subtitle}
                    </div>
                    <h3 className="font-sans text-[24px] font-bold text-text-primary group-hover:text-accent-cyan transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[18px] font-normal text-text-secondary line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="bg-bg-dark text-text-secondary px-2.5 py-1 rounded-full font-mono text-[10px] border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="bg-bg-dark text-accent-cyan px-2 py-1 rounded-full font-mono text-[10px] font-bold border border-border-subtle">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* GitHub Button (Height: 52px, Radius: 12px) */}
              <div className="p-6 pt-0">
                {p.github ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(p.github, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full h-[52px] rounded-[12px] bg-transparent border border-border-subtle hover:border-accent-cyan/60 hover:text-text-primary text-text-secondary font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <Github size={14} />
                    VIEW ON GITHUB
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full h-[52px] rounded-[12px] bg-transparent border border-border-subtle/30 text-text-secondary/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    PRIVATE REPOSITORY
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Details Slide-over / Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-bg-dark/85 backdrop-blur-sm">
            {/* Backdrop click closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0"
              id="details-backdrop"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl h-full bg-[#111827] border-l border-border-subtle shadow-2xl overflow-y-auto flex flex-col justify-between z-10"
              id="details-panel"
            >
              {/* Header */}
              <div className="p-6 border-b border-border-subtle bg-bg-dark flex justify-between items-center sticky top-0 z-20">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs text-accent-cyan uppercase font-bold tracking-wider">Project Specification</span>
                  <span className="font-mono text-[10px] text-text-secondary mt-0.5">ID: {selectedProject.id}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-card-dark border border-border-subtle flex items-center justify-center hover:bg-bg-dark hover:border-accent-cyan text-text-primary transition-all cursor-pointer active:scale-90"
                  id="close-details-btn"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 space-y-6 flex-grow text-left">
                {/* Title */}
                <div className="space-y-2">
                  <h3 className="font-sans text-[28px] font-bold text-text-primary leading-tight">{selectedProject.title}</h3>
                  <p className="text-sm font-mono text-accent-cyan">{selectedProject.subtitle}</p>
                </div>

                {/* Performance Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-3 bg-bg-dark p-4 rounded-[12px] border border-border-subtle text-center relative overflow-hidden">
                    <div className="absolute inset-0 tech-grid-fine opacity-[0.03]" />
                    {selectedProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-1 relative z-10">
                        <p className="font-mono text-base font-bold text-accent-cyan">{m.value}</p>
                        <p className="font-mono text-[9px] text-text-secondary uppercase tracking-wider">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Long description */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-text-secondary uppercase font-bold tracking-wider">Architectural Overview:</h4>
                  <p className="text-[18px] text-text-secondary leading-relaxed font-sans font-normal">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Pipeline schema block */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-text-secondary uppercase font-bold tracking-wider">Core Pipeline Stack:</h4>
                  <div className="bg-bg-dark rounded-[12px] p-5 border border-border-subtle space-y-3 font-mono text-xs text-text-secondary">
                    <div className="flex items-start gap-2">
                      <span className="text-accent-cyan font-bold">▲</span>
                      <p>
                        <span className="text-text-primary font-semibold">Router / Entry:</span> {selectedProject.architecture.entry}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent-cyan font-bold">▲</span>
                      <p>
                        <span className="text-text-primary font-semibold">Logics Core:</span> {selectedProject.architecture.processing}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent-cyan font-bold">▲</span>
                      <p>
                        <span className="text-text-primary font-semibold">Data Cluster:</span> {selectedProject.architecture.storage}
                      </p>
                    </div>
                    {selectedProject.architecture.ai && (
                      <div className="flex items-start gap-2 border-t border-border-subtle pt-2">
                        <span className="text-[#22D3EE] font-bold">⚙</span>
                        <p>
                          <span className="text-accent-cyan font-semibold">ML Engine:</span> {selectedProject.architecture.ai}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech chips */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-text-secondary uppercase font-bold tracking-wider">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-card-dark text-text-primary px-3 py-1 rounded font-mono text-[10px] border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Footer */}
              <div className="p-6 border-t border-border-subtle bg-bg-dark flex gap-3 sticky bottom-0 z-20">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-3 px-4 bg-primary-blue hover:bg-blue-600 text-white font-sans text-sm font-bold uppercase tracking-wider text-center rounded-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                  >
                    <Terminal size={14} />
                    INSPECT REPOSITORY
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex-grow py-3 px-4 bg-[#1e293b]/40 border border-border-subtle/30 text-text-secondary/40 font-sans text-sm font-bold uppercase tracking-wider text-center rounded-[12px] flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    PRIVATE REPOSITORY
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="py-3 px-5 border border-border-subtle text-text-primary font-mono text-xs font-bold uppercase tracking-wider rounded-[12px] cursor-pointer hover:border-accent-cyan transition-colors active:scale-95 bg-transparent"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
