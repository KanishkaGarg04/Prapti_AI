import { useState, useRef, useEffect } from "react";
import api from "../../services/api";
import { Send, Bot, User } from "lucide-react";

export default function ChatAssistant({ analysisId }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your AI Financial Advisor. Ask me anything about your loan, investments, savings or financial planning.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {
      const res = await api.post("/chat", {
        analysisId,
        messages: updatedMessages,
      });

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">
          AI Financial Assistant
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Powered by OpenRouter AI
        </p>
      </div>

      <div className="h-[500px] overflow-y-auto p-6 bg-slate-50">

        <div className="space-y-5">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 flex gap-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot size={22} />
                ) : (
                  <User size={22} />
                )}

                <p className="whitespace-pre-wrap leading-7">
                  {msg.content}
                </p>
              </div>
            </div>

          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border bg-white px-5 py-4">
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />

        </div>

      </div>

      <div className="border-t border-slate-200 p-5 flex gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              sendMessage();
          }}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700 transition"
        >
          <Send size={20} />
        </button>

      </div>

    </div>
  );
}