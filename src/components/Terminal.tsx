import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CornerDownLeft } from 'lucide-react';

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'whoami',
      response: (
        <span className="text-text-secondary">
          Mohamed Ahmed Abdelsamie — Back-End Developer & AI Specialist.
          <br />
          Graduated with a B.Sc. in Artificial Intelligence from Menoufiya University, specialising in scalable web APIs and machine intelligence.
        </span>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const availableCommands = ['help', 'whoami', 'cat skills.json', 'projects', 'contact', 'clear'];

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-text-secondary">
            <p className="text-accent-cyan font-semibold">Available Commands:</p>
            <p><span className="text-text-primary font-bold">whoami</span> - Display professional profile snapshot</p>
            <p><span className="text-text-primary font-bold">cat skills.json</span> - Output complete technical stack payload</p>
            <p><span className="text-text-primary font-bold">projects</span> - List high-performance systems and deployments</p>
            <p><span className="text-text-primary font-bold">contact</span> - Output secure connection gateways (Email & Phone)</p>
            <p><span className="text-text-primary font-bold">clear</span> - Flush terminal buffer</p>
          </div>
        );
        break;
      case 'whoami':
        response = (
          <p className="text-text-secondary">
            Mohamed Ahmed Abdelsamie. Engineered for scalable business logic & reliable machine learning models.
            <br />
            Focuses on: Django REST Framework, database query designs (PostgreSQL, MySQL), container environments (Docker), and neural networks.
          </p>
        );
        break;
      case 'cat skills.json':
        response = (
          <pre className="text-emerald-300 font-mono whitespace-pre-wrap pl-3 border-l border-border-subtle">
{`{
  "languages": ["Python", "JavaScript", "SQL", "C++"],
  "frameworks": ["Django", "Django REST Framework (DRF)", "FastAPI"],
  "databases": ["PostgreSQL", "MySQL"],
  "tools_infra": ["Docker", "Git", "GitHub Actions", "CI/CD"],
  "machine_learning": ["TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Computer Vision"]
}`}
          </pre>
        );
        break;
      case 'projects':
        response = (
          <div className="space-y-3 text-text-secondary">
            <p className="text-accent-cyan font-bold">Deployments Found (6 core nodes):</p>
            <div>
              <p className="text-text-primary font-semibold">1. Fractional Agriculture Investment APIs</p>
              <p className="text-xs text-text-secondary pl-4">Backend services for distributed crop investment management & real-time revenue tracing.</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold">2. Crowd-Funding Platform</p>
              <p className="text-xs text-text-secondary pl-4">Collaborative ledger with transactional security hooks using Django REST Framework & PostgreSQL.</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold">3. Gender And Age Classification</p>
              <p className="text-xs text-text-secondary pl-4">Deep learning classifier utilizing custom convolutional neural network filters via TensorFlow.</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold">4. My Portfolio Website</p>
              <p className="text-xs text-text-secondary pl-4">A premium, minimalist portfolio website presenting professional achievements.</p>
            </div>
            <p className="text-xs text-accent-cyan mt-1">💡 Click "View Projects" or scroll down to see the visual boards.</p>
          </div>
        );
        break;
      case 'contact':
        response = (
          <div className="space-y-1 text-text-secondary">
            <p>📧 Email: <a href="mailto:m7md.a7md158@gmail.com" className="text-accent-cyan hover:underline font-bold">m7md.a7md158@gmail.com</a></p>
            <p>📞 Phone: <a href="tel:+201006905354" className="text-accent-cyan hover:underline">+20 1006905354</a></p>
            <p>🔗 GitHub: <a href="https://github.com/m7md158" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">github.com/m7md158</a></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/mohamedahmedabdelsamie/" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">linkedin.com/in/mohamedahmedabdelsamie</a></p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = (
          <p className="text-rose-400">
            sh: command not found: {trimmed}. Type <span className="underline font-bold">help</span> to view supported commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, response }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full flex flex-col bg-card-dark border border-border-subtle rounded-[20px] overflow-hidden shadow-2xl font-mono text-sm">
      {/* Terminal Title Bar */}
      <div className="bg-surface-dark px-4 py-3 flex justify-between items-center border-b border-border-subtle">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs text-text-secondary/70 select-none font-mono">maa@backend: ~ — zsh</div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Terminal Output Area */}
      <div className="p-6 min-h-[280px] max-h-[380px] overflow-y-auto space-y-4 font-mono text-left bg-bg-dark text-text-primary">
        <div className="text-xs text-text-secondary/60 leading-relaxed border-b border-border-subtle/40 pb-3">
          <p>Welcome to Mohamed's interactive backend explorer.</p>
          <p>Type <span className="text-accent-cyan font-bold">help</span> or click suggestions below to run commands.</p>
        </div>

        <AnimatePresence initial={false}>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-accent-cyan">➜</span>
                <span className="text-text-secondary">~</span>
                <span className="text-text-primary">{item.command}</span>
              </div>
              <div className="pl-4 pb-1 text-text-secondary leading-relaxed font-mono">
                {item.response}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={terminalEndRef} />
      </div>

      {/* Input Line Form */}
      <form onSubmit={handleSubmit} className="bg-surface-dark p-4 border-t border-border-subtle flex items-center gap-2">
        <span className="text-accent-cyan font-semibold pl-2">➜</span>
        <span className="text-text-secondary font-semibold">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' or explore..."
          className="flex-grow bg-transparent text-text-primary border-none outline-none focus:ring-0 font-mono text-sm placeholder-text-secondary/40"
          id="terminal-input"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="bg-bg-dark hover:bg-accent-cyan hover:text-bg-dark transition-colors border border-border-subtle hover:border-accent-cyan text-accent-cyan text-xs px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5"
          id="terminal-submit-btn"
        >
          <CornerDownLeft size={12} />
          RUN
        </button>
      </form>

      {/* Interactive Suggestion Pills */}
      <div className="bg-bg-dark/50 p-4 border-t border-border-subtle/50 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-text-secondary/60 uppercase font-semibold pl-1 font-mono">Presets:</span>
        <div className="flex flex-wrap gap-1.5">
          {availableCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 bg-card-dark hover:bg-surface-dark border border-border-subtle hover:border-accent-cyan rounded-md text-xs font-mono text-text-secondary hover:text-text-primary transition-all cursor-pointer active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
