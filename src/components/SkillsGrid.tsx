import React from 'react';
import { motion } from 'motion/react';

const CATEGORIZED_SKILLS = {
  'Languages': [
    'Python', 'C++', 'HTML', 'SQL', 'MySQL', 'Postgres'
  ],
  'Frameworks & Libraries': [
    'Django', 'Django REST', 'Pytest', 'FastAPI', 'TensorFlow', 'OpenCV'
  ],
  'Tools': [
    'Postman', 'Google Colab', 'Git', 'GitHub', 'CMD', 'Streamlit', 'VS Code', 'Docker'
  ],
  'AI & Machine Learning': [
    'Machine Learning', 'Deep Learning', 'Digital Image Processing', 'Computer Vision'
  ]
};

export default function SkillsGrid() {
  return (
    <div className="w-full text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(CATEGORIZED_SKILLS).map(([category, skills], idx) => (
          <motion.div 
            key={category} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            className="p-8 rounded-[20px] bg-card-dark border border-border-subtle shadow-sm space-y-4 hover:border-accent-cyan/30 hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] transition-all duration-300"
          >
            <h3 className="font-mono text-xs text-accent-cyan font-bold uppercase tracking-widest">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-bg-dark text-text-secondary hover:text-text-primary hover:border-accent-cyan/60 px-3 py-1 rounded-full font-sans text-[13px] font-medium border border-border-subtle transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
