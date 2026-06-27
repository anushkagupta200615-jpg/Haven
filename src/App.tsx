import { useState } from 'react';
import { Bot, Shield, CheckCircle } from 'lucide-react';
import './index.css';

function App() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/cases/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      alert('Failed to submit case.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Haven</h1>
        <p>Intelligent Workplace Case Management</p>
      </header>

      {!response ? (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">Case Description</label>
              <textarea
                id="description"
                className="form-control"
                placeholder="Describe the employee incident or wellbeing concern..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : <Shield size={20} />}
              {loading ? 'Analyzing...' : 'Trigger Agent Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="results-container">
          <div className="card">
            <h2>Agent Deliberation</h2>
            <div className="agent-list">
              {response.results.map((res: any, idx: number) => (
                <div key={idx} className="result-item">
                  <div className="agent-icon">
                    <Bot size={20} />
                  </div>
                  <div className="agent-content">
                    <h3>{res.agent}</h3>
                    <p>{res.action}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="memo-box">
              <h3><CheckCircle size={20} style={{display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom'}}/> Final Memo</h3>
              <p>{response.memo}</p>
            </div>
            <button 
              style={{marginTop: '2rem'}} 
              className="btn btn-primary"
              onClick={() => setResponse(null)}
            >
              Review Another Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
