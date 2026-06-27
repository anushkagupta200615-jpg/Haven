import { useState, useEffect } from 'react';
import { X, Activity, Server, Cpu, Database } from 'lucide-react';

export default function DiagnosticsPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Diagnostics initialized.",
    "[AGENT] Triage Sentinel memory allocation: 412MB",
    "[AGENT] Risk Analytics memory allocation: 380MB"
  ]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Simulate incoming logs
    const interval = setInterval(() => {
      const mockLogs = [
        "[NETWORK] Ping to Vercel edge... 24ms",
        "[DATABASE] Connection pool active (4/10)",
        "[AGENT] Policy Guard indexing background updates...",
        "[SYSTEM] Memory GC cycle completed (-12MB)",
      ];
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      setLogs(prev => [randomLog, ...prev].slice(0, 8)); // Keep last 8 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="panel-overlay" onClick={onClose}></div>
      <div className="panel slide-in">
        <div className="panel-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Activity size={20} color="var(--primary-color)" />
            <h2 style={{margin: 0, fontSize: '1.1rem'}}>System Diagnostics</h2>
          </div>
          <button className="btn" onClick={onClose} style={{padding: '0.25rem', border: 'none'}}>
            <X size={20} />
          </button>
        </div>
        
        <div className="panel-body">
          <div className="diag-grid">
            <div className="diag-card">
              <Server size={18} color="var(--success-color)" />
              <div>
                <p>API Latency</p>
                <h4>42ms</h4>
              </div>
            </div>
            <div className="diag-card">
              <Cpu size={18} color="var(--primary-color)" />
              <div>
                <p>Agent Memory</p>
                <h4>1.2 GB</h4>
              </div>
            </div>
            <div className="diag-card">
              <Database size={18} color="var(--warning-color)" />
              <div>
                <p>DB Connections</p>
                <h4>4 Active</h4>
              </div>
            </div>
          </div>

          <h3 style={{fontSize: '0.875rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-muted)'}}>
            LIVE LOG STREAM
          </h3>
          <div className="log-terminal">
            {logs.map((log, idx) => (
              <div key={idx} className="log-line">
                <span className="log-time">{new Date().toLocaleTimeString()}</span>
                <span className="log-text">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
