import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cases", err);
        setLoading(false);
      });
  }, []);

  const criticalCount = cases.filter(c => c.severity === 'critical').length;
  const underReviewCount = cases.filter(c => c.status === 'triage').length;
  const pendingSignoffCount = cases.filter(c => c.status === 'sign-off').length;
  
  // Aggregate average risks for the profile
  const avgRisk = cases.reduce((acc, curr) => {
    acc.systemic += curr.riskProfile?.systemic || 0;
    acc.bullying += curr.riskProfile?.bullying || 0;
    acc.fatigue += curr.riskProfile?.fatigue || 0;
    acc.physical += curr.riskProfile?.physical || 0;
    return acc;
  }, { systemic: 0, bullying: 0, fatigue: 0, physical: 0 });

  if (cases.length > 0) {
    avgRisk.systemic = Math.round(avgRisk.systemic / cases.length);
    avgRisk.bullying = Math.round(avgRisk.bullying / cases.length);
    avgRisk.fatigue = Math.round(avgRisk.fatigue / cases.length);
    avgRisk.physical = Math.round(avgRisk.physical / cases.length);
  }

  return (
    <>
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Critical Cases</span>
            <span style={{color: 'var(--danger-color)'}}>🚨</span>
          </div>
          <div className="metric-value">0{criticalCount}</div>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <span>Under Review</span>
            <span style={{color: 'var(--warning-color)'}}>⏳</span>
          </div>
          <div className="metric-value">0{underReviewCount}</div>
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
          <div className="metric-value">0{pendingSignoffCount}</div>
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
            {loading ? (
              <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>Loading cases...</div>
            ) : cases.length === 0 ? (
              <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>No cases found.</div>
            ) : (
              cases.map((c, idx) => (
                <div key={idx} className="case-item">
                  <div className="case-info">
                    <h4>{c.id}</h4>
                    <h3>{c.title}</h3>
                    <p>{c.department} • {c.category}</p>
                  </div>
                  <div className="case-badges">
                    <span className={`status-badge ${c.severity === 'critical' ? 'danger' : c.severity === 'elevated' ? 'warning' : 'action'}`}>
                      {c.severity}
                    </span>
                    <span className={`status-badge ${c.status === 'triage' ? 'warning' : 'low'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Risk Profile & Agent Monitor */}
        <div>
          {/* Risk Profile */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Average Risk Profile</h3>
              <span className="badge">L1 Matrix</span>
            </div>
            <div className="card-body">
              <div className="risk-item">
                <div className="risk-header">
                  <span>Systemic Psychosocial Stress</span>
                  <span className="risk-value high">{avgRisk.systemic}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar red" style={{ width: `${avgRisk.systemic}%` }}></div>
                </div>
              </div>
              
              <div className="risk-item">
                <div className="risk-header">
                  <span>Bullying & Harassment Vector</span>
                  <span className="risk-value med">{avgRisk.bullying}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar orange" style={{ width: `${avgRisk.bullying}%` }}></div>
                </div>
              </div>

              <div className="risk-item">
                <div className="risk-header">
                  <span>Overwork & Fatigue Index</span>
                  <span className="risk-value blue">{avgRisk.fatigue}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar blue" style={{ width: `${avgRisk.fatigue}%` }}></div>
                </div>
              </div>

              <div className="risk-item">
                <div className="risk-header">
                  <span>Physical Workspace Hazard</span>
                  <span className="risk-value low">{avgRisk.physical}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar green" style={{ width: `${avgRisk.physical}%` }}></div>
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
                  <span className="agent-status">Online</span>
                </div>
                
                <div className="agent-row">
                  <div className="agent-avatar ra">RA</div>
                  <div className="agent-info">
                    <h4>Risk Analytics</h4>
                    <p>Legal & Liability Exposure</p>
                  </div>
                  <span className="agent-status">Online</span>
                </div>

                <div className="agent-row">
                  <div className="agent-avatar pg">PG</div>
                  <div className="agent-info">
                    <h4>Policy Guard</h4>
                    <p>Policy & EAP Alignment</p>
                  </div>
                  <span className="agent-status">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
