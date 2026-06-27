export default function Dashboard() {
  return (
    <>
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Critical Cases</span>
            <span style={{color: 'var(--danger-color)'}}>🚨</span>
          </div>
          <div className="metric-value">02</div>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span>Under Review</span>
            <span style={{color: 'var(--warning-color)'}}>⏳</span>
          </div>
          <div className="metric-value">04</div>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span>Resolved (30d)</span>
            <span style={{color: 'var(--success-color)'}}>✅</span>
          </div>
          <div className="metric-value">11</div>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span>Pending Sign-off</span>
            <span style={{color: 'var(--text-muted)'}}>⚖️</span>
          </div>
          <div className="metric-value">02</div>
        </div>
      </div>

      <div className="dashboard-layout">
        {/* Left Column: Priority Cases */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Priority Cases Awaiting Supervision</h3>
            <span className="badge warning">Live Feed</span>
          </div>
          <div className="case-list">
            <div className="case-item">
              <div className="case-info">
                <h4>case-2026-001</h4>
                <h3>Finance Dept: Sudden Absenteeism & Psychological Safety</h3>
                <p>Finance • Psychosocial Risk / Conflict Resolution</p>
              </div>
              <div className="case-badges">
                <span className="status-badge elevated">Elevated</span>
                <span className="status-badge action">Sign-off</span>
              </div>
            </div>
            
            <div className="case-item">
              <div className="case-info">
                <h4>case-2026-002</h4>
                <h3>Support Operations: Overwhelming Emotional Distress</h3>
                <p>Customer Operations • Occupational Health / Burnout Mitigation</p>
              </div>
              <div className="case-badges">
                <span className="status-badge action">Moderate</span>
                <span className="status-badge action">Sign-off</span>
              </div>
            </div>

            <div className="case-item">
              <div className="case-info">
                <h4>case-7883</h4>
                <h3>Construction Dept: Physical Safety Hazard Incident Evaluation</h3>
                <p>Construction • Physical Safety Hazard</p>
              </div>
              <div className="case-badges">
                <span className="status-badge elevated">Elevated</span>
                <span className="status-badge action">Sign-off</span>
              </div>
            </div>

            <div className="case-item">
              <div className="case-info">
                <h4>case-4175</h4>
                <h3>Warehouse: Physical Safety Hazard Incident Evaluation</h3>
                <p>Warehouse • Physical Safety Hazard</p>
              </div>
              <div className="case-badges">
                <span className="status-badge low">Low</span>
                <span className="status-badge warning">Triage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Profile & Agent Monitor */}
        <div>
          {/* Risk Profile */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Psychosocial Risk Profile</h3>
              <span className="badge">L1 Matrix</span>
            </div>
            <div className="card-body">
              <div className="risk-item">
                <div className="risk-header">
                  <span>Systemic Psychosocial Stress</span>
                  <span className="risk-value high">42%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar red" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div className="risk-item">
                <div className="risk-header">
                  <span>Bullying & Harassment Vector</span>
                  <span className="risk-value med">28%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar orange" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div className="risk-item">
                <div className="risk-header">
                  <span>Overwork & Fatigue Index</span>
                  <span className="risk-value blue">20%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar blue" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="risk-item">
                <div className="risk-header">
                  <span>Physical Workspace Hazard</span>
                  <span className="risk-value low">10%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar green" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Cluster Monitor */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Agent Cluster Monitor</h3>
            </div>
            <div className="card-body">
              <div className="agent-list">
                <div className="agent-row">
                  <div className="agent-avatar">TS</div>
                  <div className="agent-info">
                    <h4>Triage Sentinel</h4>
                    <p>Severity & Classification</p>
                  </div>
                  <span className="agent-status">Done</span>
                </div>
                
                <div className="agent-row">
                  <div className="agent-avatar ra">RA</div>
                  <div className="agent-info">
                    <h4>Risk Analytics</h4>
                    <p>Legal & Liability Exposure</p>
                  </div>
                  <span className="agent-status">Done</span>
                </div>

                <div className="agent-row">
                  <div className="agent-avatar pg">PG</div>
                  <div className="agent-info">
                    <h4>Policy Guard</h4>
                    <p>Policy & EAP Alignment</p>
                  </div>
                  <span className="agent-status">Done</span>
                </div>
                
                <div className="agent-row">
                  <div className="agent-avatar cn">CN</div>
                  <div className="agent-info">
                    <h4>Core Navigator</h4>
                    <p>Care Pathways</p>
                  </div>
                  <span className="agent-status" style={{color: 'var(--warning-color)', borderColor: 'var(--warning-color)'}}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
