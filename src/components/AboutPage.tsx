import { ChevronDown, Star } from 'lucide-react';
import { FAQS } from '../data/storeData';

interface AboutPageProps {
  activeFaqIndex: number | null;
  setActiveFaqIndex: (idx: number | null) => void;
}

export default function AboutPage({ activeFaqIndex, setActiveFaqIndex }: AboutPageProps) {
  return (
    <div className="py-12 bg-[#070708] min-h-[calc(100vh-120px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Story Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left Block Story */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-600/10 text-red-500 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded border border-red-500/15 mb-3">
              <span>OUR BRAND STORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6 font-display">
              About Bavidex <br />
              <span className="text-red-500">Fitness Store</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
              <p>
                Established with a vision to redefine commercial and residential fitness infrastructure in Nigeria, <strong className="text-white font-bold">Bavidex Fitness Store</strong> has grown to become the premier importer and installer of heavy-duty gym equipment.
              </p>
              <p>
                We operate as a complete design and procurement powerhouse. Whether setting up a single corner of your home, equipping a penthouse villa, or launching a multi-tier commercial training playground, our team delivers high-inertia spin cycles, non-slip stepper blocks, power racks, and high weight stack platforms built for extreme performance.
              </p>
              
              {/* Visual quote from founders */}
              <div className="border-l-4 border-red-600 pl-4 py-1.5 bg-zinc-900/40 rounded-r-lg my-6 text-zinc-100 text-xs italic font-medium leading-relaxed">
                "Our philosophy goes beyond sales. Bavidex is dedicated to supporting wellness. We handle everything from custom procurement, secure shipping, interior design setups, mapping calibration, to 1-Year core parts warranties."
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-2">
                <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-xl">
                  <span className="text-red-500 font-extrabold text-xs tracking-wider uppercase block mb-1">Our Mission</span>
                  <span className="text-[11px] text-zinc-300 leading-relaxed font-normal">To inspire athletic breakthroughs across West Africa by delivering beautiful, unbreakable, and accessible gym machines.</span>
                </div>
                <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-xl">
                  <span className="text-red-500 font-extrabold text-xs tracking-wider uppercase block mb-1">Our Vision</span>
                  <span className="text-[11px] text-zinc-300 leading-relaxed font-normal">To maintain the crown as Nigeria's most trusted fitness supplier of home gyms, treadmills, cardio cycles, and accessories.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block Showroom Image Frame */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-red-600 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-red-600 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
              alt="Bavidex Fitness Showroom"
              referrerPolicy="no-referrer"
              className="w-full h-[450px] object-cover rounded-2xl border border-zinc-800 shadow-2xl saturate-110 brightness-[0.7]"
            />
            {/* Overlaid Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/90 backdrop-blur border border-zinc-800 p-5 rounded-xl flex items-center gap-4">
              <span className="text-2xl sm:text-3xl">🏅</span>
              <div>
                <span className="text-white text-xs font-black uppercase tracking-widest block font-display">AUTHORIZED BRAND DISTRIBUTOR</span>
                <span className="text-zinc-200 text-[11px] block leading-normal mt-0.5 font-normal">Certifying authentic equipment matching all safety warranties and performance thresholds.</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs list */}
        <div className="max-w-4xl mx-auto border-t border-zinc-900 pt-16">
          <div className="text-center mb-12">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1">
              SUPPORT DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isActive = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/50 border border-zinc-850 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isActive ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
                      {faq.question}
                    </span>
                    <span className={`text-red-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isActive ? 'max-h-56 border-t border-zinc-850/60' : 'max-h-0'}`}>
                    <p className="p-5 sm:p-6 text-xs text-zinc-300 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
