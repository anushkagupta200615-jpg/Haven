import { useState, useEffect } from 'react';

export default function SignOffQueue() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        // Filter only sign-off cases
        setCases(data.filter((c: any) => c.status === 'sign-off'));
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Pending Sign-off Queue</h3>
      </div>
      <div className="card-body">
        {loading ? <p>Loading cases...</p> : cases.length === 0 ? <p>No cases pending sign-off.</p> : (
          <div className="case-list">
            {cases.map((c, idx) => (
              <div key={idx} className="case-item">
                <div className="case-info">
                  <h4>{c.id}</h4>
                  <h3>{c.title}</h3>
                  <p>{c.department}</p>
                </div>
                <button className="btn btn-primary">Review & Sign-off</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
