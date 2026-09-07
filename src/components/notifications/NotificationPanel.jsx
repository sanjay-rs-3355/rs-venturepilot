import { useEffect, useState } from "react";

import NotificationItem from "./NotificationItem";

import {
  getNotifications,
} from "../../services/notificationService";

export default function NotificationPanel() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  return (
    <div className="space-y-4">

      {notifications.length === 0 ? (

        <p>No Notifications</p>

      ) : (

        notifications.map(notification => (

          <NotificationItem
            key={notification.id}
            notification={notification}
          />

        ))

      )}

    </div>
  );
}