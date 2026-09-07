export default function NotificationItem({
  notification,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">

      <h3 className="font-bold">
        {notification.title}
      </h3>

      <p className="text-slate-400 mt-2">
        {notification.message}
      </p>

    </div>
  );
}