import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-3 mt-6">
      <input
        type="text"
        placeholder="Ask VP-One anything..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}