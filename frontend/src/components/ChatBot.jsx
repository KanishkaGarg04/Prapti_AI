import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm your Prapti AI Assistant. Ask me anything about your loan analysis." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: input }]);

    let reply = "Let me think...";

    const query = input.toLowerCase();

    if (results.risk) {
      if (query.includes("risk") || query.includes("score")) {
        reply = `Your Debt Trap Risk Score is ${results.risk.risk.risk_score}/100 (${results.risk.risk.category}). ${results.risk.risk.explanation}`;
      }
    }

    if (results.optimize) {
      if (query.includes("optimize") || query.includes("tenure") || query.includes("best")) {
        reply = `AI recommends ${results.optimize.recommended_tenure_years} years tenure. This will save you ₹${results.optimize.interest_saved?.toLocaleString('en-IN')} in interest.`;
      }
    }

    if (results.opportunity) {
      if (query.includes("opportunity") || query.includes("invest") || query.includes("mutual")) {
        reply = "If you invested your EMI in mutual funds instead of paying the loan, you could grow your money significantly at 12% return!";
      }
    }

    if (results.debtvsrent) {
      if (query.includes("rent") || query.includes("buy") || query.includes("debt vs")) {
        reply = "Over 20 years, buying with loan is usually better than renting in the long run, but it depends on your risk tolerance.";
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 900);

    setInput('');
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-2xl flex items-center justify-center text-4xl z-50 hover:shadow-emerald-500/50 transition-shadow"
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-28 right-8 w-96 bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <div>
                  <p className="font-semibold">Prapti AI Assistant</p>
                  <p className="text-xs opacity-75">Ask about your analysis</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-3xl leading-none">×</button>
            </div>

            <div className="h-96 p-5 overflow-y-auto bg-zinc-950 space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-6 py-4 rounded-3xl ${
                    msg.type === 'user' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-zinc-800 text-zinc-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-700">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about your loan..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500"
                />
                <button onClick={handleSend} className="bg-emerald-500 px-8 rounded-2xl font-medium">Send</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}