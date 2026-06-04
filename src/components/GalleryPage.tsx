import { MessageSquare } from 'lucide-react';
import { GALLERY, STORE_WHATSAPP_NUMBER } from '../data/storeData';

interface GalleryPageProps {
  onSelectPhotoIndex: (idx: number) => void;
}

export default function GalleryPage({ onSelectPhotoIndex }: GalleryPageProps) {
  return (
    <div className="py-12 bg-[#070708] min-h-[calc(100vh-120px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mb-1">
              LIVESTOCK CAPTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none font-display">
              Fitness Installations Portfolio
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-light">
            Take a physical look at actual home gyms and commercial wellness facilities custom design-installed by Bavidex technical teams. Click to enlarge.
          </p>
        </div>

        {/* Gallery masonry photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {GALLERY.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectPhotoIndex(index)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-zinc-850 cursor-pointer z-10 transition-all duration-300 hover:border-red-500/30"
            >
              {/* Main image with hover effects */}
              <img
                src={item.url}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cover tinted overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Floating details shown on hover overall cards */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-355">
                <span className="bg-red-600 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded w-fit mb-2">
                  {item.tag}
                </span>
                <h3 className="font-extrabold text-xs sm:text-sm text-zinc-100 group-hover:text-white transition-colors line-clamp-2">
                  {item.caption}
                </h3>
                <span className="text-[9px] text-zinc-300 mt-1 uppercase tracking-wider font-mono hidden group-hover:block">
                  Click to Expand Full View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Large Conversion CTA */}
        <div className="bg-gradient-to-br from-red-600/10 via-zinc-950 to-[#070708] border border-zinc-850 rounded-2xl py-12 px-6 text-center relative overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-xl mx-auto relative z-10">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-3 leading-none">
              FREE GYM ARCHITECTURE PROCURING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none font-display mb-6">
              Need Help Choosing Equipment?
            </h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed mb-8 font-normal">
              Contact us today on WhatsApp. Send pictures of your empty room dimensions, listing your budgeted thresholds. Our engineers will instantly draft recommended bundles!
            </p>

            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hello%20Bavidex%20Fitness!%20%F0%9F%91%8B%20I%2520need%2520expert%2520assistance%2520choosing%2520the%2520best%2520gym%2520equipment%2520sets%2520for%2520my%2520new%2520workout%2520space.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-extrabold uppercase tracking-widest text-xs py-4.5 px-10 rounded-xl shadow-xl shadow-red-900/20 active:scale-98 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white text-red-600" />
              <span>Chat Live with an Expert</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
