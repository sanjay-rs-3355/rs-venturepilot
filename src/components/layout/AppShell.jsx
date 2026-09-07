import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <div className="vp-app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="vp-main-column">
        <Navbar user={user} onMenuClick={() => setMobileOpen(true)} />
        <main className="vp-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
