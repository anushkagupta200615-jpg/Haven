import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import NewIntake from './pages/NewIntake';
import ActiveCases from './pages/ActiveCases';
import SignOffQueue from './pages/SignOffQueue';
import AgentRoom from './pages/AgentRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="active-cases" element={<ActiveCases />} />
          <Route path="new-intake" element={<NewIntake />} />
          <Route path="sign-off" element={<SignOffQueue />} />
          <Route path="agent-room" element={<AgentRoom />} />
          {/* Catch-all for other sidebar links */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
