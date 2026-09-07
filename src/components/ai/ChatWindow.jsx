import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  chatStarted,
  startConversation,
  messages,
  sendMessage,
}) {
  return (
    <div className="flex-1 bg-slate-800 rounded-xl p-6 flex flex-col">

      {!chatStarted ? (

        <div>

          <h2 className="text-3xl font-bold">
            Hello! 👋
          </h2>

          <p className="mt-4 text-lg">
            I have finished analyzing your startup.
          </p>

          <p className="mt-2 text-slate-300">
            Would you like me to walk you through my analysis?
          </p>

          <button
            onClick={startConversation}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Let's Start →
          </button>

        </div>

      ) : (

        <>
          <div className="flex-1 h-[500px] overflow-y-auto space-y-4 pr-2">

            {messages.map((msg, index) => (

              <ChatBubble
                key={index}
                message={msg.text}
                isAI={msg.isAI}
              />

            ))}

          </div>

          <ChatInput onSend={sendMessage} />

        </>

      )}

    </div>
  );
}