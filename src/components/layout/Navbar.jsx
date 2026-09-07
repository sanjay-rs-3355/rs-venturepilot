import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUnreadNotificationCount } from "../../services/notificationService";

export default function Navbar({ user, onMenuClick }) {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;

    getUnreadNotificationCount().then((count) => {
      if (active) setUnreadCount(count);
    });

    return () => {
      active = false;
    };
  }, [location.pathname]);

  return (
    <header className="vp-navbar">
      <button className="vp-icon-button vp-mobile-menu" onClick={onMenuClick} aria-label="Open navigation">
        <span>☰</span>
      </button>

      <div className="vp-breadcrumb">
        <span className="vp-eyebrow">Student workspace</span>
        <strong>{location.pathname.startsWith("/discover") ? "Discovery engine" : "VenturePilot"}</strong>
      </div>

      <div className="vp-navbar-actions">
        <Link className="vp-notification-link" to="/notifications" aria-label="Notifications">
          <span className="vp-notification-icon">◌</span>
          {unreadCount > 0 && <span className="vp-notification-count">{unreadCount}</span>}
        </Link>
        <div className="vp-user-chip">
          <span className="vp-avatar">{(user?.displayName || user?.email || "S").slice(0, 1).toUpperCase()}</span>
          <span className="vp-user-name">{user?.displayName || user?.email?.split("@")[0] || "Student"}</span>
        </div>
      </div>
    </header>
  );
}
