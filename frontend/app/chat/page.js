"use client";
import { useState, useRef, useEffect } from "react";
import { sendQuestion } from "../../lib/api";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const ask = async () => {
    if (!question.trim() || isLoading) return;

    // 1. Optimistically add user message and clear input immediately
    const userQuestion = question;
    setMessages((prev) => [...prev, { role: "user", text: userQuestion }]);
    setQuestion("");
    setIsLoading(true);

    try {
      // 2. Fetch API response
      const response = await sendQuestion(userQuestion);
      
      // 3. Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Allow sending messages by pressing Enter (without Shift)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen mx-auto backdrop-blur-2xl bg-[url('/images/chat-bg.png')] bg-repeat animate-pan-bg text-slate-100 font-sans shadow-2xl">
      
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xl font-semibold tracking-wide bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            RAG Chatbot AI
          </h2>
        </div>
        <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
          v1.0
        </span>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-8 space-y-3">
            <div className="text-4xl">✨</div>
            <p className="text-lg font-medium text-slate-400">How can I help you today?</p>
            <p className="text-sm max-w-sm">Ask me anything, and I'll look through the knowledge base to give you an answer.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md text-sm leading-relaxed ${
                    isUser
                      ? "bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-none"
                  }`}
                >
                  {/* Role Label */}
                  <div className={`text-xs font-bold mb-1 tracking-wider opacity-75 uppercase`}>
                    {isUser ? "You" : "AI Assistant"}
                  </div>
                  {/* Message Content */}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}

        {/* Typing/Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-bl-none px-5 py-4 shadow-md">
              <div className="flex space-x-1.5 items-center h-4">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-200">
          <textarea
            rows={1}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="w-full bg-transparent resize-none outline-none py-3 pl-4 pr-14 text-slate-200 placeholder-slate-500 text-sm max-h-32 min-h-11"
          />
          <button
            onClick={ask}
            disabled={!question.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-lg transition-all duration-200 ${
              question.trim() && !isLoading
                ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-md shadow-emerald-500/10 cursor-pointer"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-600 mt-2 tracking-wide">
          AI-generated responses can be inaccurate. Double-check important facts.
        </p>
      </div>
    </div>
  );
}

export default Chat;