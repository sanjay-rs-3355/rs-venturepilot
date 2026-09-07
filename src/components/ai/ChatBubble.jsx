export default function ChatBubble({
  message,
  isAI = true,
}) {
  return (
    <div
      className={`max-w-[80%] p-4 rounded-2xl ${
        isAI
          ? "bg-slate-800 mr-auto"
          : "bg-blue-600 ml-auto"
      }`}
    >
      {message}
    </div>
  );
}