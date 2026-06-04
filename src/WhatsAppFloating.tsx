import { useState, useEffect, FormEvent } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from './data/storeData';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    // Show a delay tooltip to prompt conversations similar to high-converting sites
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenWhatsAppChat = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    // Default chat text
    const defaultText = typedMessage.trim() 
      ? typedMessage.trim() 
      : "Hello Bavidex Fitness! I am currently visiting your website and would like to ask a few questions about your premium gym equipment.";
      
    const encodedValue = encodeURIComponent(defaultText);
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedValue}`, '_blank');
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip Form / Prompt Box */}
      {showTooltip && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 mb-3 max-w-xs w-[280px] text-left relative animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Close button */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2.5 right-2.5 text-zinc-500 hover:text-zinc-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Assistant Info Header */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="relative">
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-zinc-900" />
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black text-white">
                BX
              </div>
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-white block leading-none">Bavidex Concierge</span>
              <span className="text-[9px] text-emerald-400 block mt-0.5 font-bold">● Active Online</span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-300 leading-normal mb-3">
            Welcome to Bavidex! 👋 Need a quick custom invoice or help choosing the right dumbbell or treadmill weight sets? Let us chat right now!
          </p>

          {/* Quick Chat Input */}
          <form onSubmit={handleOpenWhatsAppChat} className="flex gap-1">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 bg-zinc-950 text-[10px] text-white placeholder-zinc-650 px-2.5 py-2 rounded-md border border-zinc-800 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-md transition-colors"
            >
              <Send className="w-3 h-3 text-white fill-white" />
            </button>
          </form>
        </div>
      )}

      {/* Primary Floating Action Trigger Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="relative group bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-900/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute left-[-110px] bg-zinc-900 border border-zinc-800 text-[10px] text-emerald-400 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-bold">
          Message Support
        </span>
        <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
        <span className="absolute top-[-2px] right-[-2px] flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </button>

    </div>
  );
}
