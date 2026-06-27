export default function AgentRoom() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Live Agent Deliberation Room</h3>
        <span className="badge warning">Active Session</span>
      </div>
      <div className="card-body">
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
          Watch the AI agents deliberate on the latest cases in real-time.
        </p>

        <div className="agent-list" style={{gap: '1.5rem'}}>
          <div className="result-item" style={{border: '1px solid var(--border-color)', borderRadius: '0.5rem'}}>
            <div className="agent-icon" style={{background: 'var(--primary-color)', color: 'white'}}>TS</div>
            <div className="agent-content">
              <h3 style={{fontSize: '1rem', marginBottom: '0.25rem'}}>Triage Sentinel</h3>
              <p>I have reviewed case-2026-003. Severity upgraded to <strong>Elevated</strong> due to mentions of physical hazards.</p>
            </div>
          </div>
          
          <div className="result-item" style={{border: '1px solid var(--border-color)', borderRadius: '0.5rem', marginLeft: '2rem'}}>
            <div className="agent-icon" style={{background: 'var(--warning-color)', color: 'white'}}>RA</div>
            <div className="agent-content">
              <h3 style={{fontSize: '1rem', marginBottom: '0.25rem'}}>Risk Analytics</h3>
              <p>Agreed. Physical Workspace Hazard index increased to 80% for this incident. Legal compliance review required.</p>
            </div>
          </div>
          
          <div className="result-item" style={{border: '1px solid var(--border-color)', borderRadius: '0.5rem', marginLeft: '4rem'}}>
            <div className="agent-icon" style={{background: 'var(--success-color)', color: 'white'}}>HR</div>
            <div className="agent-content">
              <h3 style={{fontSize: '1rem', marginBottom: '0.25rem'}}>HR Advisory</h3>
              <p>Generating action plan. Recommend immediate safety inspection and suspension of area access pending review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
