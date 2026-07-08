import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal as TerminalIcon,
  BookOpen,
  ArrowRight,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import Terminal from './components/Terminal';
import ProjectShowcase from './components/ProjectShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsGrid from './components/SkillsGrid';
import ContactSection from './components/ContactSection';

import backendWorkspaceImg from './assets/images/backend_developer_workspace_1783497013051.jpg';
import backendArchitectureImg from './assets/images/backend_architecture_isometric_1783497146758.jpg';
import backendProjectsImg from './assets/images/backend_projects_env_1783497251765.jpg';
import modernDeskImg from './assets/images/modern_developer_desk_1783497336784.jpg';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [heroTab, setHeroTab] = useState<'workspace' | 'architecture' | 'deployment' | 'desk' | 'topology'>('workspace');

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex flex-col font-sans selection:bg-accent-cyan/20 selection:text-text-primary relative overflow-x-hidden">
      
      {/* Subtle Glowing Accents in background - High-end feel */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[800px] left-1/3 w-[500px] h-[500px] bg-primary-blue/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Tech Grid Overlay for Backend vibe */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-fine opacity-[0.01] pointer-events-none" />

      {/* FIXED NAVBAR */}
      <nav className="border-b border-border-subtle bg-bg-dark/80 backdrop-blur-md fixed top-0 left-0 right-0 z-40 w-full h-16">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center relative">
          
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={() => setActiveNav('home')}
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-text-primary hover:text-accent-cyan transition-colors z-10"
          >
            <div className="p-1.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan flex items-center justify-center">
              <TerminalIcon size={16} />
            </div>
            <span>M. Ahmed</span>
          </a>

          {/* Centered Navigation Menu */}
          <div className="hidden lg:flex absolute inset-0 justify-center items-center pointer-events-none">
            <div className="flex items-center gap-8 pointer-events-auto">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setActiveNav(link.id)}
                  className={`font-sans text-[14px] tracking-wide font-medium transition-colors relative py-1 ${
                    activeNav === link.id
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow w-full relative z-10 pt-16">

        {/* 1. HERO SECTION */}
        <section
          id="home"
          className="max-w-[1200px] mx-auto px-6 py-[120px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-64px)] relative"
        >
          {/* Left side column: Name, Summary, Actions */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-card-dark rounded-full border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
              <span className="font-mono text-[11px] text-text-primary tracking-wide font-medium">
                AVAILABLE FOR BACKEND OPPORTUNITIES
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-[64px] font-bold text-text-primary leading-none tracking-tight">
                Mohamed Ahmed <br />
                <span className="text-accent-cyan">Abdelsamie</span>
              </h1>
              <h2 className="font-sans text-xl lg:text-[28px] font-semibold text-text-secondary tracking-tight">
                Back-End Developer | AI &amp; Django Specialist
              </h2>
            </div>

            <p className="text-[18px] font-normal text-text-secondary max-w-xl leading-relaxed">
              Back-End Developer experienced in building secure, structured web APIs with Django and Django REST Framework. Specialized in normalized database designs, clean system integration, and machine learning model deployments.
            </p>

            {/* Dynamic Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="h-[52px] px-6 bg-primary-blue text-white font-sans text-sm font-bold uppercase tracking-wider rounded-[12px] flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all shadow-md shadow-primary-blue/10"
                id="hero-projects-btn"
              >
                View Projects
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="h-[52px] px-6 border border-border-subtle hover:border-accent-cyan/40 text-text-secondary hover:text-text-primary font-sans text-sm font-bold uppercase tracking-wider rounded-[12px] flex items-center justify-center active:scale-95 transition-all"
                id="hero-contact-btn"
              >
                Contact Me
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/m7md158"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg bg-card-dark border border-border-subtle"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamedahmedabdelsamie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg bg-card-dark border border-border-subtle"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:m7md.a7md158@gmail.com"
                className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg bg-card-dark border border-border-subtle"
                title="Direct Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right side column: Dual-Tab Interactive Preview (Workspace & System topology) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center space-y-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-accent-cyan to-primary-blue rounded-[20px] opacity-[0.03] blur-2xl pointer-events-none" />
            
            {/* Interactive Toggle Control Tab */}
            <div className="flex bg-card-dark border border-border-subtle p-1 rounded-xl w-full max-w-[480px] self-start lg:self-end">
              <button
                type="button"
                onClick={() => setHeroTab('workspace')}
                className={`flex-1 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  heroTab === 'workspace'
                    ? 'bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Workspace
              </button>
              <button
                type="button"
                onClick={() => setHeroTab('architecture')}
                className={`flex-1 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  heroTab === 'architecture'
                    ? 'bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => setHeroTab('deployment')}
                className={`flex-1 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  heroTab === 'deployment'
                    ? 'bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Deployments
              </button>
              <button
                type="button"
                onClick={() => setHeroTab('desk')}
                className={`flex-1 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  heroTab === 'desk'
                    ? 'bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Desk
              </button>
              <button
                type="button"
                onClick={() => setHeroTab('topology')}
                className={`flex-1 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  heroTab === 'topology'
                    ? 'bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Topology
              </button>
            </div>

            {heroTab === 'workspace' && (
              <div className="w-full bg-card-dark border border-border-subtle rounded-[20px] overflow-hidden shadow-xl group relative">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={backendWorkspaceImg}
                    alt="Backend Developer Workspace"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Digital workspace diagnostics banner overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-card-dark/95 backdrop-blur border border-border-subtle p-3 rounded-xl font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-accent-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      <span>Node: active_workstation_maa</span>
                    </div>
                    <span className="text-text-secondary/70">8K Setup</span>
                  </div>
                </div>
              </div>
            )}

            {heroTab === 'architecture' && (
              <div className="w-full bg-card-dark border border-border-subtle rounded-[20px] overflow-hidden shadow-xl group relative">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={backendArchitectureImg}
                    alt="Backend System Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Digital workspace diagnostics banner overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-card-dark/95 backdrop-blur border border-border-subtle p-3 rounded-xl font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-accent-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      <span>Cluster: prod_system_cluster</span>
                    </div>
                    <span className="text-text-secondary/70">Isometric 4K</span>
                  </div>
                </div>
              </div>
            )}

            {heroTab === 'deployment' && (
              <div className="w-full bg-card-dark border border-border-subtle rounded-[20px] overflow-hidden shadow-xl group relative">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={backendProjectsImg}
                    alt="Backend Projects Deployment Environment"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Digital workspace diagnostics banner overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-card-dark/95 backdrop-blur border border-border-subtle p-3 rounded-xl font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-accent-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      <span>Workspace: active_pipelines</span>
                    </div>
                    <span className="text-text-secondary/70">Production</span>
                  </div>
                </div>
              </div>
            )}

            {heroTab === 'desk' && (
              <div className="w-full bg-card-dark border border-border-subtle rounded-[20px] overflow-hidden shadow-xl group relative">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={modernDeskImg}
                    alt="Premium Minimal Modern Developer Desk"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Digital workspace diagnostics banner overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-card-dark/95 backdrop-blur border border-border-subtle p-3 rounded-xl font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-accent-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      <span>Device: macbook_pro_16</span>
                    </div>
                    <span className="text-text-secondary/70">Workspace 4K</span>
                  </div>
                </div>
              </div>
            )}

            {heroTab === 'topology' && (
              /* Architectural Block Diagram - Professional & Scalable */
              <div className="w-full bg-card-dark border border-border-subtle rounded-[20px] p-6 space-y-6 shadow-xl relative overflow-hidden text-left">
                <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                  <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">System Pipeline Topology</span>
                  <span className="font-mono text-[9px] text-accent-cyan">PROD_ENV</span>
                </div>

                {/* Core SVG flow layout representation */}
                <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto text-text-secondary" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection lines */}
                  <path d="M60 120 H120" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M190 120 H250" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
                  <path d="M310 120 H340" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
                  <path d="M155 90 V50 H280 V100" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* API Request Node */}
                  <rect x="10" y="95" width="50" height="50" rx="8" fill="#0B1220" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <text x="35" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Client</text>
                  <text x="35" y="132" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">Request</text>

                  {/* Gateway / Docker Container Node */}
                  <rect x="120" y="90" width="70" height="60" rx="8" fill="#111827" stroke="#22D3EE" strokeWidth="1.5" />
                  <text x="155" y="112" textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily="monospace" fontWeight="bold">DOCKER</text>
                  <text x="155" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">Django API</text>
                  <text x="155" y="134" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">REST Framework</text>

                  {/* Data Store Layer PostgreSQL + MySQL */}
                  <rect x="250" y="90" width="60" height="60" rx="8" fill="#111827" stroke="#3B82F6" strokeWidth="1.5" />
                  <text x="280" y="112" textAnchor="middle" fill="#3B82F6" fontSize="10" fontFamily="monospace" fontWeight="bold">DATABASE</text>
                  <text x="280" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">PostgreSQL</text>
                  <text x="280" y="134" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">MySQL DB</text>

                  {/* ML Inference Model Node */}
                  <rect x="230" y="15" width="100" height="35" rx="8" fill="#0B1220" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <text x="280" y="31" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">TensorFlow Node</text>
                  <text x="280" y="41" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">AI Inference Core</text>

                  {/* Deployment pipeline Cloud & CI/CD */}
                  <rect x="340" y="100" width="50" height="40" rx="6" fill="#0B1220" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <text x="365" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">CI/CD</text>
                  <text x="365" y="130" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="sans-serif">Actions</text>
                </svg>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border-subtle font-mono text-[10px] text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>REST APIs Optimized</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>CI/CD Flow Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Docker Orchestrated</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>AI Inference Integrated</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section
          id="about"
          className="max-w-[1200px] mx-auto px-6 py-[120px] text-left relative border-t border-border-subtle"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-2">
              <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
                About Me
              </h2>
            </div>

            <div className="rounded-[20px] border border-border-subtle bg-card-dark shadow-sm p-8 md:p-10 space-y-6 hover:border-accent-cyan/20 hover:scale-[1.01] hover:shadow-[0_4px_30px_rgba(6,182,212,0.02)] transition-all duration-300">
              <p className="text-[18px] font-normal text-text-secondary leading-relaxed">
                Back-End Developer experienced in building secure, structured web APIs with Django and Django REST Framework. Specialized in normalized database designs, clean system integration, and machine learning model deployments.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. EXPERIENCE TIMELINE SECTION */}
        <section
          id="experience"
          className="max-w-[1200px] mx-auto px-6 py-[120px] space-y-12 text-left border-t border-border-subtle"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
              Work Experience
            </h2>
          </motion.div>
          
          <ExperienceTimeline />
        </section>

        {/* 4. FEATURED PROJECTS SECTION */}
        <section
          id="projects"
          className="border-t border-border-subtle py-[120px] bg-surface-dark"
        >
          <div className="max-w-[1200px] mx-auto px-6 space-y-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div className="space-y-2">
                <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
                  Featured Projects
                </h2>
              </div>
              <a
                href="https://github.com/m7md158"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider self-start sm:self-auto"
              >
                <Github size={14} />
                SOURCE_CONTROL
              </a>
            </motion.div>

            <ProjectShowcase />
          </div>
        </section>

        {/* 5. SKILLS SECTION */}
        <section
          id="skills"
          className="max-w-[1200px] mx-auto px-6 py-[120px] space-y-12 text-left border-t border-border-subtle"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
              Technical Stack
            </h2>
          </motion.div>

          <SkillsGrid />
        </section>

        {/* 6. CERTIFICATIONS SECTION */}
        <section
          id="certifications"
          className="border-t border-border-subtle py-[120px] bg-surface-dark"
        >
          <div className="max-w-[1200px] mx-auto px-6 space-y-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
                Certifications
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Meta Django Web Framework',
                  issuer: 'Meta',
                  description: 'Core back-end architecture with Django templates, models, authentication flow controls, and test suites.'
                },
                {
                  title: 'IBM Machine Learning with Python',
                  issuer: 'IBM',
                  description: 'Regression, classification, and supervised clustering algorithms utilizing scikit-learn frameworks.'
                },
                {
                  title: 'Meta Introduction to Back-End',
                  issuer: 'Meta',
                  description: 'Foundations of server-side logic, networking protocols, databases, and structural API response layers.'
                },
                {
                  title: 'Meta Introduction to Database',
                  issuer: 'Meta',
                  description: 'Relational model designs, PostgreSQL tuning, database schemas, and structured query optimization.'
                },
                {
                  title: 'Meta APIs',
                  issuer: 'Meta',
                  description: 'REST API engineering, route serializers, request/response cycle manipulation, and secure token integrations.'
                },
                {
                  title: 'NTI Artificial Intelligence Summer Internship',
                  issuer: 'National Telecommunication Institute',
                  description: 'Advanced internship focusing on artificial intelligence structures, neural networks, and computer vision models.'
                }
              ].map((cert, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                  className="p-8 rounded-[20px] bg-card-dark border border-border-subtle shadow-sm flex flex-col justify-between hover:border-accent-cyan/30 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] transition-all duration-300"
                >
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold text-accent-cyan block">
                      CERTIFICATION_{String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-sans text-[24px] font-bold text-text-primary leading-tight">{cert.title}</h4>
                    <p className="font-mono text-xs text-accent-cyan">{cert.issuer}</p>
                    <p className="text-[16px] text-text-secondary leading-relaxed">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. EDUCATION SECTION */}
        <section
          id="education"
          className="max-w-[1200px] mx-auto px-6 py-[120px] space-y-12 text-left border-t border-border-subtle"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 w-full"
          >
            <div className="space-y-2">
              <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
                Education
              </h2>
            </div>

            <div className="rounded-[20px] p-8 md:p-10 relative overflow-hidden bg-card-dark border border-border-subtle shadow-sm max-w-4xl hover:border-accent-cyan/20 hover:scale-[1.01] hover:shadow-[0_4px_30px_rgba(6,182,212,0.02)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent-cyan/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 inline-flex items-center justify-center">
                  <BookOpen size={28} />
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-[24px] font-bold text-text-primary tracking-tight">
                    B.Sc. in Artificial Intelligence
                  </h4>
                  <p className="font-mono text-base text-accent-cyan">
                    Menoufiya University
                  </p>
                  <p className="font-mono text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                    Specializing in Machine Intelligence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section
          id="contact"
          className="border-t border-border-subtle py-[120px] bg-surface-dark"
        >
          <div className="max-w-[1200px] mx-auto px-6 space-y-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h2 className="font-sans text-3xl md:text-[40px] font-bold text-text-primary tracking-tight">
                Contact Me
              </h2>
            </motion.div>

            <ContactSection />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-bg-dark border-t border-border-subtle py-12 relative">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3 font-mono text-xs text-text-secondary">
            <span className="text-text-primary font-bold">Mohamed Ahmed Abdelsamie</span>
            <span>|</span>
            <span>Backend Developer</span>
          </div>

          <p className="text-xs text-text-secondary/80 font-sans text-center md:text-left">
            © 2026 Mohamed Ahmed Abdelsamie. Engineered for Performance &amp; Scalability.
          </p>

          {/* Social connections */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/m7md158"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamedahmedabdelsamie/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:m7md.a7md158@gmail.com"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="Direct Mail"
            >
              <Mail size={18} />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
