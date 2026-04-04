import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function ChatBot({ results }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "I've analyzed your data. You can ask me about your risk score, EMI optimization, or investment trade-offs." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // We pass the current 'results' to the backend so the AI knows the context
      const response = await axios.post('http://localhost:8000/api/chat', {
        message: input,
        context: results 
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the brain. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f19]">
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl rounded-tl-none flex gap-1">
              <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 border-t border-zinc-800/50 bg-zinc-900/20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Prapti AI..."
            className="w-full bg-[#0b0f19] border border-zinc-800 rounded-lg pl-3 pr-10 py-2 text-[11px] text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
          />
          <button 
            type="submit"
            className="absolute right-2 text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 rotate-90">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925a.5.5 0 00.16.242l6.132 3.594-6.132 3.594a.5.5 0 00-.16.242L2.279 16.76a.75.75 0 00.826.95l12.75-5.25a.75.75 0 000-1.42l-12.75-5.25z" />
            </svg>
          </button>
        </div>
        <p className="text-[8px] text-zinc-600 mt-2 text-center uppercase tracking-widest font-bold">
          Powered by Prapti Intelligence
        </p>
      </form>
    </div>
  );
}