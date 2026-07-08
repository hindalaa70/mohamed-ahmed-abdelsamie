import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Experience } from '../types';

const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    period: '01/09/2025 – Present',
    company: 'Wills-Business',
    role: 'Back-End Developer',
    description: 'Responsible for developing backend business applications, building relational databases, and implementing APIs. Deployed clean, well-tested Python and Django code to support business features, system integration, and security controls.',
    tags: ['Django', 'System Design', 'PostgreSQL', 'API Security']
  },
  {
    id: 'exp-2',
    period: '01/07/2025 – 13/08/2025',
    company: 'ITI (Information Technology Institute)',
    role: 'Full Stack Python Developer Intern',
    description: 'Completed an intensive training program on Full-Stack Python. Built and deployed web applications and APIs, designed relational schemas, and implemented Django REST Framework serializers and viewsets.',
    tags: ['PostgreSQL', 'REST APIs', 'Python', 'Django']
  },
  {
    id: 'exp-4',
    period: '2023 – Present',
    company: 'Social Media Platforms',
    role: 'Technical Content Creator | Egypt',
    description: 'Produced engaging and educational tech videos on machine learning, back-end development, and deep learning concepts. Gained an audience for simplifying complex AI topics for aspiring developers and students.',
    tags: ['Content Creation', 'Machine Learning', 'Technical Writing']
  },
  {
    id: 'exp-3',
    period: '06/2023 – 09/2023',
    company: 'NTI (National Telecommunication Institute)',
    role: 'AI Intern',
    description: 'Collaborated in neural network analysis and computer vision experiments. Trained and evaluated deep learning models for image classification and feature analysis using TensorFlow.',
    tags: ['Computer Vision', 'Artificial Intelligence', 'TensorFlow']
  }
];

export default function ExperienceTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full relative space-y-8">
      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-[21%] top-4 bottom-4 w-[2px] bg-border-subtle hidden md:block" />

      {EXPERIENCES.map((exp, idx) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative flex flex-col md:flex-row gap-6 md:gap-10 text-left items-start p-8 rounded-[20px] border bg-card-dark border-border-subtle hover:border-accent-cyan/30 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] transition-all duration-300"
        >
          {/* Left Column: Period */}
          <div className="w-full md:w-[18%] md:text-right pt-1 select-none">
            <span className="font-mono text-sm text-accent-cyan font-bold tracking-wider uppercase block">
              {exp.period}
            </span>
          </div>

          {/* Connected Node Dot */}
          <div className="absolute left-6 md:left-[21%] top-[34px] -translate-x-[5px] w-[12px] h-[12px] rounded-full bg-bg-dark border border-border-subtle transition-all z-10 hidden md:flex items-center justify-center">
            <div
              className={`w-[6px] h-[6px] rounded-full transition-all ${
                hoveredIdx === idx ? 'bg-accent-cyan scale-125' : 'bg-text-secondary/40'
              }`}
            />
          </div>

          {/* Right Column: Work details */}
          <div className="flex-grow space-y-4 md:pl-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-sans text-[24px] font-bold text-text-primary tracking-tight flex items-center gap-2">
                {exp.company}
                {idx === 0 && (
                  <span className="bg-primary-blue/10 text-accent-cyan border border-accent-cyan/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider">
                    ACTIVE_NODE
                  </span>
                )}
              </h3>
              <span className="font-mono text-sm text-text-secondary font-medium">
                {exp.role}
              </span>
            </div>

            <p className="text-[18px] font-normal text-text-secondary leading-relaxed">
              {exp.description}
            </p>

            {/* Tag Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-bg-dark hover:border-accent-cyan text-text-secondary hover:text-text-primary px-3 py-1 rounded-full font-mono text-[11px] border border-border-subtle transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
