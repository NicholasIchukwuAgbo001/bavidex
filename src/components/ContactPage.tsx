import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactPageProps {
  contactName: string;
  setContactName: (n: string) => void;
  contactEmail: string;
  setContactEmail: (e: string) => void;
  contactMessage: string;
  setContactMessage: (m: string) => void;
  contactSubmitted: boolean;
  onContactSubmit: (e: any) => void;
  STORE_ADDRESS: string;
  STORE_PHONE: string;
  STORE_EMAIL: string;
  GOOGLE_MAPS_EMBED: string;
}

export default function ContactPage({
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  contactSubmitted,
  onContactSubmit,
  STORE_ADDRESS,
  STORE_PHONE,
  STORE_EMAIL,
  GOOGLE_MAPS_EMBED
}: ContactPageProps) {
  return (
    <div className="py-12 bg-[#070708] min-h-[calc(100vh-120px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left side text info elements (5-span) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mb-1">
                OUR HEADQUARTERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6 font-display">
                Visit Our <br />
                <span className="text-red-500">Showroom</span>
              </h2>
              <p className="text-zinc-200 text-xs sm:text-sm mb-8 leading-relaxed font-normal">
                Want to physically inspect the 55kg heavy chrome dumbbell sets, try out the multi-station smith machines, or test treadmill limits? Hop on down to our flagship Lagos showroom center!
              </p>

              {/* Info lists */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase font-extrabold tracking-widest block mb-0.5">Physical Store Address</span>
                    <span className="text-white text-xs font-semibold leading-normal block">{STORE_ADDRESS}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase font-extrabold tracking-widest block mb-0.5">Hotland support channels</span>
                    <a href={`tel:${STORE_PHONE}`} className="text-white text-xs font-semibold leading-normal block hover:text-red-500 transition-colors">{STORE_PHONE}</a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase font-extrabold tracking-widest block mb-0.5">Corporate Email</span>
                    <a href={`mailto:${STORE_EMAIL}`} className="text-white text-xs font-semibold leading-normal block hover:text-red-500 transition-colors">{STORE_EMAIL}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Badge seal */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-4.5 mt-8 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="text-xs font-bold text-white uppercase block">Fast Shipment Logistics</span>
                <p className="text-[10px] text-zinc-300 font-normal mt-0.5">Same-day delivery inside Lagos and rapid dispatch schedules. Secure payment on transfer clearance.</p>
              </div>
            </div>
          </div>

          {/* Right side Map & Contact form (7-span) */}
          <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
            
            {/* Form Segment */}
            <div>
              <h3 className="text-xs uppercase font-extrabold text-white tracking-widest mb-4">
                Send Us a Direct Message
              </h3>

              {contactSubmitted ? (
                <div className="bg-emerald-950/20 border border-emerald-500/25 p-5 rounded-xl text-center">
                  <span className="text-2xl mb-1.5 block">👏</span>
                  <span className="font-extrabold text-emerald-400 text-sm block">Message Received Securely!</span>
                  <p className="text-[11px] text-zinc-300 mt-1 font-normal animate-fade-in">Thank you. One of our elite fitness procurement designers will contact you via email or phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={onContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Kolawole Davies"
                        className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="kola@gmail.com"
                        className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Detailed Message</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="I want to ask if the 55kg chrome set carries standard warranties..."
                      className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-700 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-widest py-3 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Embedded maps step */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Live Showroom Location Map:</span>
              <div className="h-56 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Bavidex Lekki Showroom Maps Layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full filter invert saturate-[0.8] contrast-105"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
