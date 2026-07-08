import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, CheckCircle2, Trash2 } from 'lucide-react';

const TEMPLATES = {
  job: {
    label: 'Full-time Backend Job',
    subject: 'Backend / AI Engineering Opportunity',
    body: 'Hi Mohamed, I saw your portfolio and would love to schedule a technical chat about an open role we have...'
  },
  project: {
    label: 'API/AI Integration',
    subject: 'API Integration Project Inquiry',
    body: 'Hello Mohamed, I am looking to integrate Django API systems with custom machine learning pipelines and need assistance with...'
  },
  general: {
    label: 'General Inquiry',
    subject: 'General Connection Request',
    body: 'Hi Mohamed, let\'s connect! I am interested in exchanging best practices about Django REST Framework and AI model deployments.'
  }
};

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'job' | 'project' | 'general' | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const applyTemplate = (key: 'job' | 'project' | 'general') => {
    setSelectedTemplate(key);
    setSubject(TEMPLATES[key].subject);
    setMessage(TEMPLATES[key].body);
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSelectedTemplate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous feedback states
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');

    // Field validations
    if (!name.trim()) {
      setShowError(true);
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setShowError(true);
      setErrorMessage('Please enter your email.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowError(true);
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setShowError(true);
      setErrorMessage('Please enter a subject.');
      return;
    }

    if (!message.trim()) {
      setShowError(true);
      setErrorMessage('Please enter your message.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/m7md.a7md158@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _subject: 'New Portfolio Contact Message',
          _template: 'table',
          _captcha: 'false',
          _next: 'Display a professional success message after submission without redirecting to another page.'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSending(false);
        setShowSuccess(true);
        handleClearForm();

        // Autohide success screen after 6 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 6000);
      } else {
        throw new Error(data.message || 'Form submission failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Contact Form Error:', error);
      setIsSending(false);
      setShowError(true);
      setErrorMessage(error?.message || 'Failed to post payload. Please try again later.');
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-stretch">
      {/* Left side: Quick Info and Connections (Col-Span-5) */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
        <div className="space-y-4">
          <span className="font-mono text-xs text-accent-cyan uppercase font-bold tracking-wider">
            Secure Webhook Gateway
          </span>
          <h3 className="font-sans text-[28px] font-bold text-text-primary leading-tight">Let's build scalable systems together</h3>
          <p className="text-[18px] font-normal text-text-secondary leading-relaxed">
            Interested in hiring Mohamed, collaborating on Django APIs, or discussing TensorFlow classification integrations? Reach out via the sandbox pipeline or direct protocols.
          </p>

          <div className="space-y-3 pt-3">
            <a
              href="mailto:m7md.a7md158@gmail.com"
              className="flex items-center gap-4 p-4 rounded-[12px] bg-card-dark border border-border-subtle hover:border-accent-cyan/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-text-secondary uppercase">Primary Mail Gateway</p>
                <p className="text-sm font-mono text-text-primary group-hover:text-accent-cyan transition-colors">m7md.a7md158@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+201006905354"
              className="flex items-center gap-4 p-4 rounded-[12px] bg-card-dark border border-border-subtle hover:border-accent-cyan/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-text-secondary uppercase">Cellular Node</p>
                <p className="text-sm font-mono text-text-primary group-hover:text-accent-cyan transition-colors">+20 1006905354</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Right side: Interactive Email Form Sandbox (Col-Span-7) */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 bg-card-dark border border-border-subtle rounded-[20px] p-8 space-y-6 flex flex-col justify-between"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase font-semibold">
              Rest Request Body (POST payload)
            </span>
            <button
              type="button"
              onClick={handleClearForm}
              className="text-[10px] font-mono text-text-secondary hover:text-text-primary underline cursor-pointer flex items-center gap-1 transition-colors"
            >
              <Trash2 size={10} />
              Flush Form
            </button>
          </div>

          {/* Quick template helpers */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-text-secondary uppercase block">Autofill Message Presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyTemplate('job')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  selectedTemplate === 'job'
                    ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan font-bold'
                    : 'bg-bg-dark border-border-subtle text-text-secondary hover:border-text-secondary/40'
                }`}
              >
                💼 Job Offer
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('project')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  selectedTemplate === 'project'
                    ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan font-bold'
                    : 'bg-bg-dark border-border-subtle text-text-secondary hover:border-text-secondary/40'
                }`}
              >
                ⚙ AI/API Project
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('general')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  selectedTemplate === 'general'
                    ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan font-bold'
                    : 'bg-bg-dark border-border-subtle text-text-secondary hover:border-text-secondary/40'
                }`}
              >
                💬 Keep in touch
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label htmlFor="contact-name" className="block text-xs font-mono text-text-secondary uppercase font-bold">
                "sender_name"
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-bg-dark text-text-primary border border-border-subtle rounded-[12px] p-3.5 font-sans text-sm focus:border-accent-cyan focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="contact-email" className="block text-xs font-mono text-text-secondary uppercase font-bold">
                "sender_email"
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@company.com"
                className="w-full bg-bg-dark text-text-primary border border-border-subtle rounded-[12px] p-3.5 font-sans text-sm focus:border-accent-cyan focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="contact-subject" className="block text-xs font-mono text-text-secondary uppercase font-bold">
              "request_subject"
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. System Integration Consultation"
              className="w-full bg-bg-dark text-text-primary border border-border-subtle rounded-[12px] p-3.5 font-sans text-sm focus:border-accent-cyan focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="contact-message" className="block text-xs font-mono text-text-secondary uppercase font-bold">
              "payload_body"
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSelectedTemplate(null);
              }}
              placeholder="Write your connection payload here..."
              className="w-full bg-bg-dark text-text-primary border border-border-subtle rounded-[12px] p-3.5 font-sans text-sm focus:border-accent-cyan focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Dynamic states feedback */}
        <div className="space-y-3 pt-4">
          <AnimatePresence mode="wait">
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-4 bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 rounded-[12px] text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Payload committed successfully! Your message has been sent.</span>
              </motion.div>
            )}
            {showError && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-4 bg-rose-950/40 text-rose-300 border border-rose-500/20 rounded-[12px] text-xs font-mono flex items-center gap-2"
              >
                <span className="text-rose-400 shrink-0 font-bold">⚠️</span>
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full h-[52px] rounded-[12px] font-sans text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSending
                ? 'bg-bg-dark text-text-secondary cursor-not-allowed border border-border-subtle'
                : 'bg-primary-blue text-white hover:bg-blue-600 active:scale-[0.98] shadow-md shadow-primary-blue/10'
            }`}
            id="contact-submit-btn"
          >
            {isSending ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                POSTING PAYLOAD TO DB CLUSTER...
              </>
            ) : (
              <>
                <Send size={14} />
                POST TRANSMISSION / SEND
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
