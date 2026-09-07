import NotificationPanel from "../components/notifications/NotificationPanel";

export default function Notifications() {
  return (
    <div className="vp-notifications-page">
      <div className="vp-page-kicker"><span className="vp-kicker-dot" /> Your workspace</div>
      <h1 className="vp-section-heading">Notifications</h1>
      <p className="vp-section-intro">Mentor feedback, validation reminders, and movement across your startup journey.</p>
      <div className="vp-notification-surface">
        <NotificationPanel />
      </div>
    </div>
  );
}
