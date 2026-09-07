import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const navigation = [
  { label: "Dashboard", to: "/dashboard", icon: "⌂" },
  { label: "My ideas", to: "/my-ideas", icon: "✦" },
  { label: "New startup", to: "/discover", icon: "+", accent: true },
];

const discovery = [
  ["Problem", "problem"],
  ["Customer", "customer"],
  ["Solution", "solution"],
  ["Market", "market"],
  ["Competition", "competition"],
  ["Business", "business"],
  ["Feasibility", "feasibility"],
  ["Risk", "risk"],
];

function SidebarContent({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="vp-sidebar-inner">
      <div className="vp-brand-row">
        <div className="vp-brand-mark">VP</div>
        <div>
          <strong>VenturePilot</strong>
          <span>build what matters</span>
        </div>
      </div>

      <nav className="vp-sidebar-nav" aria-label="Primary navigation">
        <div className="vp-nav-group">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={onClose} className={({ isActive }) => `vp-nav-link ${isActive ? "is-active" : ""} ${item.accent ? "is-accent" : ""}`}>
              <span className="vp-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="vp-nav-section">
          <span className="vp-nav-label">Discovery</span>
          {discovery.map(([label, matrix]) => (
            <NavLink key={matrix} to={`/discover/matrix/${matrix}`} onClick={onClose} className={({ isActive }) => `vp-nav-link vp-nav-link-sub ${isActive ? "is-active" : ""}`}>
              <span className="vp-nav-dot" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="vp-nav-group vp-nav-lower">
          <NavLink to="/discover/refine" onClick={onClose} className="vp-nav-link"><span className="vp-nav-icon">↗</span><span>Refine</span></NavLink>
          <NavLink to="/discover/validate" onClick={onClose} className="vp-nav-link"><span className="vp-nav-icon">✓</span><span>Validate</span></NavLink>
          <NavLink to="/discover/analysis" onClick={onClose} className="vp-nav-link"><span className="vp-nav-icon">◫</span><span>Analysis</span></NavLink>
            <NavLink to="/vp-one" onClick={onClose} className="vp-nav-link"><span className="vp-nav-icon">✺</span><span>VP-One</span></NavLink>
          <NavLink to="/discover/blueprint" onClick={onClose} className="vp-nav-link"><span className="vp-nav-icon">▣</span><span>Startup blueprint</span></NavLink>
        </div>
      </nav>

      <div className="vp-sidebar-footer">
        <button className="vp-nav-link vp-logout" onClick={handleLogout}><span className="vp-nav-icon">↪</span><span>Log out</span></button>
        <span className="vp-sidebar-version">VP-ONE / 01</span>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <aside className="vp-sidebar"><SidebarContent /></aside>
      {mobileOpen && <div className="vp-mobile-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`vp-sidebar vp-sidebar-mobile ${mobileOpen ? "is-open" : ""}`}><SidebarContent onClose={onClose} /></aside>
    </>
  );
}
