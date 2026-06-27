import { useState, useEffect } from 'react';

export default function ActiveCases() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Active Cases</h3>
      </div>
      <div className="card-body">
        {loading ? <p>Loading cases...</p> : (
          <div className="case-list">
            {cases.map((c, idx) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
