import { Routes, Route } from "react-router-dom";
import IdeaVault from "../pages/IdeaVault";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Launchpad from "../pages/Launchpad";
import ReviewHub from "../pages/ReviewHub";
import IncubationBoard from "../pages/IncubationBoard";
import CommandCenter from "../pages/CommandCenter";
import VendorPortal from "../pages/VendorPortal";
import MyIdeas from "../pages/MyIdeas";
import IdeaDetails from "../pages/IdeaDetails";
import StartupWizard from "../pages/StartupWizard";

import StudentDashboard from "../pages/StudentDashboard";
import Notifications from "../pages/Notifications";
import DiscoveryHome from "../pages/DiscoveryHome";
import IdeaCanvas from "../pages/IdeaCanvas";
import DiscoveryMatrix from "../pages/DiscoveryMatrix";
import DiscoveryPlaceholder from "../pages/DiscoveryPlaceholder";
import DiscoveryAnalysis from "../pages/DiscoveryAnalysis";
import ValidationPlan from "../pages/ValidationPlan";
import StartupBlueprint from "../pages/StartupBlueprint";
import RefinementPage from "../pages/RefinementPage";
import VPOne from "../pages/VPOne";
import AppShell from "../components/layout/AppShell";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<Launchpad />} />
      <Route path="/mentor" element={<ReviewHub />} />
      <Route path="/coordinator" element={<IncubationBoard />} />
      <Route path="/vendor" element={<VendorPortal />} />
      <Route path="/admin" element={<CommandCenter />} />
      <Route path="/idea-vault" element={<IdeaVault />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<StudentDashboard />}/>
        <Route path="/discover" element={<DiscoveryHome />} />
        <Route path="/discover/:id/canvas" element={<IdeaCanvas />} />
        <Route path="/discover/:id/matrix/:matrixId" element={<DiscoveryMatrix />} />
        <Route path="/discover/:id/analysis" element={<DiscoveryAnalysis />} />
        <Route path="/discover/:id/validate" element={<ValidationPlan />} />
        <Route path="/discover/:id/blueprint" element={<StartupBlueprint />} />
        <Route path="/discover/:id/refine" element={<RefinementPage />} />
        <Route path="/discover/matrix/:matrixId" element={<DiscoveryMatrix />} />
        <Route path="/vp-one" element={<VPOne />} />
        <Route path="/vp-one/:id" element={<VPOne />} />
        <Route path="/ai-coach/:id" element={<VPOne />} />
        <Route path="/discover/:id/:section" element={<DiscoveryPlaceholder />} />
        <Route path="/discover/:section" element={<DiscoveryPlaceholder />} />
        <Route path="/my-ideas" element={<MyIdeas />} />
        <Route path="/idea/:id" element={<IdeaDetails />} />
        <Route path="/startup-wizard" element={<StartupWizard />} />
        <Route path="/startup-wizard/:id" element={<StartupWizard />}/>
        <Route path="/notifications" element={<Notifications />} />
      </Route>
</Routes>
  );
}