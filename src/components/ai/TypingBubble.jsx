export default function TypingBubble() {
  return (
    <div className="bg-slate-800 px-6 py-4 rounded-xl w-fit">

      <div className="flex gap-2">

        <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>

        <span
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>

    </div>
  );
}