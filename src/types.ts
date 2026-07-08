export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: 'django' | 'ai' | 'fullstack';
  architecture: {
    entry: string;
    processing: string;
    storage: string;
    ai?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  github?: string;
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
  techText: string;
}

export interface LogMessage {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  service: string;
  message: string;
}
