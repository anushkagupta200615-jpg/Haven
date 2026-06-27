import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Activity, Shield, Users, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Shield size={24} color="var(--primary-color)" />
          <h2>Haven</h2>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-label">Overview</div>
            <Link to="/dashboard" className={`nav-item ${path === '/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to="/active-cases" className={`nav-item ${path === '/active-cases' ? 'active' : ''}`}>
              <Activity size={18} />
              Active Cases
              <span className="badge danger">4</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-label">Workflow</div>
            <Link to="/new-intake" className={`nav-item ${path === '/new-intake' ? 'active' : ''}`}>
              <FileText size={18} />
              New Intake
            </Link>
            <Link to="/agent-room" className={`nav-item ${path === '/agent-room' ? 'active' : ''}`}>
              <Users size={18} />
              Agent Room
            </Link>
            <Link to="/sign-off" className={`nav-item ${path === '/sign-off' ? 'active' : ''}`}>
              <Shield size={18} />
              Sign-off Queue
              <span className="badge warning">2</span>
            </Link>
          </div>
        </nav>

        <div style={{padding: '1.5rem', borderTop: '1px solid var(--border-color)'}}>
          <Link to="/login" className="nav-item" style={{padding: '0.5rem 0'}}>
            <LogOut size={18} />
            Log out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-title">
            <p>Workspace / Dashboard</p>
            <h1>Compliance Dashboard</h1>
          </div>
          <div className="topbar-actions">
            <button className="btn">
              <Settings size={16} />
              Diagnostics
            </button>
            <button className="btn btn-primary">
              + New Case
            </button>
          </div>
        </header>
        
        <div className="content-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
