import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStartup } from "../services/startupService";
import AIHeader from "../components/ai/AIHeader";
import Sidebar from "../components/ai/Sidebar";
import ChatWindow from "../components/ai/ChatWindow";

export default function AICoach() {
  const [loading, setLoading] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
const { id } = useParams();

const [startup, setStartup] = useState(null);
useEffect(() => {
  let active = true;
  getStartup(id).then((data) => {
    if (active) setStartup(data);
  });
  return () => {
    active = false;
  };
}, [id]);

  const startConversation = () => {
    setChatStarted(true);

    const intro = [
  `👋 Hello! I'm VP-One.`,
  `I'm reviewing "${startup?.basics?.title}".`,
  `Your startup belongs to the ${startup?.basics?.domain} domain.`,
  "I've completed my initial analysis.",
  "Let's improve your startup together!"
];

    intro.forEach((text, index) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text,
            isAI: true,
          },
        ]);
      }, index * 1800);
    });
  };

  const sendMessage = (text) => {
    // Student Message
    setMessages((prev) => [
      ...prev,
      {
        text,
        isAI: false,
      },
    ]);

    // Dummy AI Reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "🤖 That's a great question! Gemini AI integration will answer this intelligently soon.",
          isAI: true,
        },
      ]);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center">

        <div className="text-7xl animate-bounce mb-6">
          🚀
        </div>

        <h1 className="text-4xl font-bold">
          VenturePilot AI
        </h1>

        <p className="mt-4 text-slate-400">
          Initializing AI Startup Coach...
        </p>

        <div className="w-96 h-3 bg-slate-800 rounded-full overflow-hidden mt-8">
          <div
            className="h-3 bg-blue-500 animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
<>
  <AIHeader />

  <div className="flex gap-6">

    <Sidebar />

    <ChatWindow
      chatStarted={chatStarted}
      startConversation={startConversation}
      messages={messages}
      sendMessage={sendMessage}
    />

  </div>
</>

    </div>
  );
}