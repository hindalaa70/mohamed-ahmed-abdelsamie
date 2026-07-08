import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LogMessage {
  time: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  service: string;
  msg: string;
}

export default function ApiVisualizer() {
  const [selectedRoute, setSelectedRoute] = useState<'projects' | 'ai' | 'post_message'>('projects');
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [jsonResponse, setJsonResponse] = useState<string>('');
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Define some routes configuration
  const routesData = {
    projects: {
      method: 'GET',
      path: '/api/v1/deployments?status=active',
      desc: 'Retrieves active microservices and system configurations.',
      response: {
        status: 'success',
        code: 200,
        latency_ms: 12.4,
        cache_hit: false,
        data: {
          total_deployments: 3,
          services: [
            { id: 'srv-01', name: 'FractionalAgriAPIs', version: 'v2.4.1', state: 'HEALTHY' },
            { id: 'srv-02', name: 'CrowdLedgerEngine', version: 'v1.1.0', state: 'HEALTHY' },
            { id: 'srv-03', name: 'GenderAgeNet', version: 'v3.0.0', state: 'STABLE' }
          ]
        }
      },
      logSteps: [
        { level: 'INFO', service: 'nginx-gw', msg: 'Incoming GET /api/v1/deployments?status=active from 192.168.1.45' },
        { level: 'INFO', service: 'django-core', msg: 'Intercepted request. Active session validated successfully.' },
        { level: 'WARN', service: 'redis-cache', msg: 'Redis Cache Key "v1:deployments:active" - MISS' },
        { level: 'INFO', service: 'postgres-db', msg: 'SQL Executed: SELECT * FROM system_deployments WHERE is_active = TRUE;' },
        { level: 'SUCCESS', service: 'postgres-db', msg: 'Database returned 3 records. Row size: 1.4 KB in 1.84ms' },
        { level: 'SUCCESS', service: 'redis-cache', msg: 'Cached SQL payload in Redis as "v1:deployments:active" (expiry 300s)' },
        { level: 'SUCCESS', service: 'django-core', msg: 'Built response payload with gzip compression. Code 200 OK.' }
      ]
    },
    ai: {
      method: 'GET',
      path: '/api/v1/models/recommend?userId=99',
      desc: 'Runs the TensorFlow k-Means model to recommend customer segmentation categories.',
      response: {
        status: 'success',
        code: 200,
        latency_ms: 48.7,
        cache_hit: false,
        model_metrics: {
          inference_engine: 'TensorFlow-v2.14',
          confidence: 0.982,
          cluster_id: 4,
          compute_time_ms: 32.1
        },
        recommendations: [
          { segment: 'High-Value Enterprise Integrator', affinity_score: 0.941 },
          { segment: 'Distributed Scaler', affinity_score: 0.812 }
        ]
      },
      logSteps: [
        { level: 'INFO', service: 'nginx-gw', msg: 'Incoming GET /api/v1/models/recommend?userId=99' },
        { level: 'INFO', service: 'django-core', msg: 'User session verified. Dispatching cluster matrix queries.' },
        { level: 'INFO', service: 'postgres-db', msg: 'SQL: SELECT feature_vector FROM user_features WHERE user_id = 99 LIMIT 1;' },
        { level: 'SUCCESS', service: 'postgres-db', msg: 'Retrieved dense 1x128 feature tensor in 2.15ms' },
        { level: 'INFO', service: 'tf-inference', msg: 'TensorFlow loading K-Means weight tensor "cluster_centroids_v3.bin"' },
        { level: 'INFO', service: 'tf-inference', msg: 'Performing distance calculations over 8 centroids' },
        { level: 'SUCCESS', service: 'tf-inference', msg: 'Classification completed. Cluster assigned: ID=4 (Confidence=98.2%)' },
        { level: 'SUCCESS', service: 'django-core', msg: 'Returned tensor-backed recommendation payload.' }
      ]
    },
    post_message: {
      method: 'POST',
      path: '/api/v1/contact/send',
      desc: 'Queues a safe contact submission to Django and appends a pipeline message.',
      response: {
        status: 'queued',
        code: 201,
        message: 'System accepted contact payload and dispatched webhook.',
        tracking_id: 'msg_98f24a10e8d',
        timestamp: new Date().toISOString()
      },
      logSteps: [
        { level: 'INFO', service: 'nginx-gw', msg: 'Incoming POST /api/v1/contact/send' },
        { level: 'INFO', service: 'django-core', msg: 'Content-Type: application/json. Parsing payload keys...' },
        { level: 'INFO', service: 'django-core', msg: 'Validation successful. Body contains sender and message content.' },
        { level: 'INFO', service: 'postgres-db', msg: 'SQL: INSERT INTO contact_submissions (name, email, text) VALUES (...);' },
        { level: 'SUCCESS', service: 'postgres-db', msg: 'Row inserted successfully. Assigned sequence id: 84' },
        { level: 'SUCCESS', service: 'redis-cache', msg: 'Dispatched task "webhook_notify_sender" to Redis Celery Broker' },
        { level: 'SUCCESS', service: 'django-core', msg: 'Transaction committed. Returning 201 Created.' }
      ]
    }
  };

  const currentRoute = routesData[selectedRoute];

  const triggerRequest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setAnimationStep(0);
    setLogs([]);
    setJsonResponse('');

    const logSteps = currentRoute.logSteps;
    let step = 0;

    const interval = setInterval(() => {
      if (step < logSteps.length) {
        // Map animation step based on log index
        if (step <= 1) setAnimationStep(1); // Client -> Gateway
        else if (step === 2) setAnimationStep(2); // Gateway -> Redis Cache check
        else if (step <= 4) setAnimationStep(3); // Cache -> PostgreSQL
        else if (step === 5) setAnimationStep(4); // PostgreSQL / Cache back to service
        else setAnimationStep(5); // Service response to Client

        const date = new Date();
        const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${(date.getMilliseconds() % 1000).toString().padStart(3, '0')}`;
        
        const newLog: LogMessage = {
          time: timeStr,
          level: logSteps[step].level as any,
          service: logSteps[step].service,
          msg: logSteps[step].msg
        };

        setLogs((prev) => [...prev, newLog]);
        setActiveNode(logSteps[step].service);
        step++;
      } else {
        setAnimationStep(6); // Completed
        setJsonResponse(JSON.stringify(currentRoute.response, null, 2));
        setIsRunning(false);
        setActiveNode(null);
        clearInterval(interval);
      }
    }, 450);
  };

  useEffect(() => {
    // Reset state on route change
    setAnimationStep(0);
    setLogs([]);
    setJsonResponse('');
    setIsRunning(false);
    setActiveNode(null);
  }, [selectedRoute]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-lg bg-[#0d1515] text-[#dce4e4] rounded-xl border border-outline-variant/60 overflow-hidden font-sans">
      
      {/* Interactive Controls & Parameters (Col-Span-4) */}
      <div className="lg:col-span-4 p-5 md:p-6 bg-charcoal-dark/50 border-r border-outline-variant/50 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-highlight animate-pulse" />
            <span className="font-mono text-xs text-cyan-highlight uppercase tracking-wider font-bold">API Gateway Sandbox</span>
          </div>
          
          <h3 className="font-display text-xl font-bold text-white">Dynamic API Orchestrator</h3>
          <p className="text-sm text-outline">
            Test Mohamed's custom backend endpoints. Select a route, send a simulated request, and analyze how data flows across the system topology.
          </p>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-mono text-outline uppercase font-semibold">Select Endpoint Route:</label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedRoute('projects')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoute === 'projects'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                <div className="font-mono text-xs">
                  <span className="bg-[#003739] text-[#e9feff] px-1.5 py-0.5 rounded font-bold mr-1.5">GET</span>
                  /api/v1/deployments
                </div>
                <span className="material-symbols-outlined text-sm">database</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoute('ai')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoute === 'ai'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                <div className="font-mono text-xs">
                  <span className="bg-[#003739] text-[#e9feff] px-1.5 py-0.5 rounded font-bold mr-1.5">GET</span>
                  /api/v1/models/recommend
                </div>
                <span className="material-symbols-outlined text-sm">psychology</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoute('post_message')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoute === 'post_message'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant hover:border-outline-variant'
                }`}
              >
                <div className="font-mono text-xs">
                  <span className="bg-[#ffbd2e]/20 text-[#ffe16c] px-1.5 py-0.5 rounded font-bold mr-1.5">POST</span>
                  /api/v1/contact/send
                </div>
                <span className="material-symbols-outlined text-sm">mail</span>
              </button>
            </div>
          </div>

          <div className="bg-[#0d131b] p-3.5 rounded-lg border border-outline-variant/30 mt-3">
            <p className="text-xs text-white font-mono flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-xs text-cyan-highlight">info</span>
              Endpoint Description
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentRoute.desc}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={triggerRequest}
          disabled={isRunning}
          className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
            isRunning
              ? 'bg-[#151d1d] text-outline cursor-not-allowed border border-outline-variant/30'
              : 'bg-cyan-highlight text-[#070b13] hover:opacity-90 active:scale-[0.98]'
          }`}
          id="send-request-btn"
        >
          {isRunning ? (
            <>
              <span className="w-4 h-4 border-2 border-t-transparent border-outline rounded-full animate-spin" />
              EXECUTING PIPELINE...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">send</span>
              SEND API REQUEST
            </>
          )}
        </button>
      </div>

      {/* Visual Canvas Nodes & Flow (Col-Span-8) */}
      <div className="lg:col-span-8 p-5 md:p-6 flex flex-col justify-between space-y-6">
        
        {/* Nodes Canvas Grid */}
        <div className="relative bg-navy-dark/80 rounded-xl p-6 border border-outline-variant/30 tech-grid min-h-[160px] flex flex-col justify-center items-center">
          
          {/* Node Connections */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-[2px] bg-outline-variant/30 hidden sm:block">
            {/* Pulsing request dot */}
            {isRunning && animationStep >= 1 && animationStep <= 5 && (
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-cyan-highlight glow-cyan-sm"
                animate={{
                  left: animationStep === 1 ? '10%' :
                        animationStep === 2 ? '35%' :
                        animationStep === 3 ? '60%' :
                        animationStep === 4 ? '75%' : '15%'
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                style={{ top: '-5px' }}
              />
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full relative z-10">
            {/* Node 1: Client */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
                  animationStep === 0 || animationStep === 6
                    ? 'bg-[#151d1d] border-outline-variant/40 text-white'
                    : 'bg-[#151d1d] border-outline-variant/20 text-outline'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">laptop_mac</span>
              </div>
              <span className="text-[11px] font-mono mt-2 font-bold text-white text-center">API Client</span>
              <span className="text-[9px] font-mono text-outline">User Browser</span>
            </div>

            {/* Node 2: Gateway */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
                  activeNode === 'nginx-gw' || activeNode === 'django-core'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight glow-cyan-sm'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">router</span>
              </div>
              <span className="text-[11px] font-mono mt-2 font-bold text-white text-center">Nginx / Django</span>
              <span className="text-[9px] font-mono text-outline">Core Gateway</span>
            </div>

            {/* Node 3: Cache / Inference */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
                  activeNode === 'redis-cache' || activeNode === 'tf-inference'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight glow-cyan-sm'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {selectedRoute === 'ai' ? 'psychology' : 'memory'}
                </span>
              </div>
              <span className="text-[11px] font-mono mt-2 font-bold text-white text-center">
                {selectedRoute === 'ai' ? 'TensorFlow' : 'Redis Cache'}
              </span>
              <span className="text-[9px] font-mono text-outline">
                {selectedRoute === 'ai' ? 'ML Model Core' : 'Memory Cache'}
              </span>
            </div>

            {/* Node 4: DB */}
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
                  activeNode === 'postgres-db'
                    ? 'bg-cyan-highlight/10 border-cyan-highlight text-cyan-highlight glow-cyan-sm'
                    : 'bg-[#151d1d] border-outline-variant/40 text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">database</span>
              </div>
              <span className="text-[11px] font-mono mt-2 font-bold text-white text-center">PostgreSQL</span>
              <span className="text-[9px] font-mono text-outline">Data Store</span>
            </div>
          </div>

          {/* Flow status message */}
          <div className="mt-4 text-xs font-mono text-center">
            {isRunning ? (
              <span className="text-cyan-highlight animate-pulse font-semibold">
                ▲ Request tracing active... Service: "{activeNode || 'Initializing'}"
              </span>
            ) : animationStep === 6 ? (
              <span className="text-secondary font-semibold">✔ Pipeline Execution Completed Successfully</span>
            ) : (
              <span className="text-outline">Ready to establish pipeline session</span>
            )}
          </div>
        </div>

        {/* Realtime logs (middle) and JSON payload output (bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Live server stdout logs terminal */}
          <div className="bg-[#080d0d] rounded-lg p-4 border border-outline-variant/30 h-[190px] overflow-y-auto flex flex-col font-mono text-[11px] text-left">
            <span className="text-outline uppercase text-[9px] tracking-wider mb-2 font-semibold">Stdout System Logs:</span>
            <div className="space-y-1.5 flex-grow">
              {logs.length === 0 ? (
                <div className="text-outline/40 italic flex items-center justify-center h-full text-center">
                  Stdout stream idle. Click "Send Request" to pipe server logs.
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    <span className="text-outline">[{log.time}]</span>{' '}
                    <span
                      className={`font-semibold px-1 rounded-[2px] text-[10px] ${
                        log.level === 'SUCCESS' ? 'bg-[#2b4e3e] text-[#a9cfba]' :
                        log.level === 'WARN' ? 'bg-[#ffbd2e]/20 text-[#ffe16c]' :
                        log.level === 'ERROR' ? 'bg-error-container text-on-error-container' :
                        'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {log.level}
                    </span>{' '}
                    <span className="text-primary-fixed font-semibold">{log.service}:</span>{' '}
                    <span className="text-white">{log.msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* JSON Response frame */}
          <div className="bg-[#080d0d] rounded-lg p-4 border border-outline-variant/30 h-[190px] overflow-y-auto flex flex-col font-mono text-xs text-left">
            <span className="text-outline uppercase text-[9px] tracking-wider mb-2 font-semibold">Response JSON Body:</span>
            <div className="flex-grow">
              {jsonResponse ? (
                <pre className="text-cyan-highlight whitespace-pre-wrap">{jsonResponse}</pre>
              ) : (
                <div className="text-outline/40 italic flex items-center justify-center h-full text-center">
                  {'{\n  "message": "Awaiting request dispatch"\n}'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
