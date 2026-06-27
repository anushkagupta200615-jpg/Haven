import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewIntake() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      // Redirect to dashboard to see the new case processing
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to submit case.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Submit New Case Intake</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Case Description & Notes</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Describe the employee incident, hazard, or wellbeing concern in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing with Agents...' : 'Trigger Multi-Agent Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
