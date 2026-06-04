import { ArrowRight, MessageSquare, Sparkles, ChevronDown, Trash2, Truck, ShieldCheck, Coins, ThumbsUp, Star } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/storeData';
import ProductCard from './ProductCard';

interface HomePageProps {
  products: Product[];
  wishlistItems: Product[];
  onCategorySelect: (id: string) => void;
  onChangePage: (page: 'home' | 'shop' | 'planner' | 'gallery' | 'about' | 'contact') => void;
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  STORE_WHATSAPP_NUMBER: string;
}

export default function HomePage({
  products,
  wishlistItems,
  onCategorySelect,
  onChangePage,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  STORE_WHATSAPP_NUMBER
}: HomePageProps) {
  // Take 3 top products for the hot best sellers display
  const bestSellers = products.slice(0, 3);

  return (
    <div>
      {/* 1. HERO BANNER - High-end premium layout with rich accents and dual CTAs */}
      <section className="relative min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden py-12">
        {/* Background photo under dark tinted gradient overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-[#070708] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920&auto=format&fit=crop"
            alt="Premium Gym Equipment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.4] saturate-120"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full transition-all duration-700">
          <div className="max-w-3xl">
            {/* Visual Red Tagline banner */}
            <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest px-4 py-2 rounded mb-6 select-none leading-none">
              <Sparkles className="w-3.5 h-3.5 fill-red-500" />
              <span>THE SUPREME SELECTION FOR CHAMPIONS</span>
            </div>

            {/* Giant Title display heading */}
            <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6 font-display">
              Transform Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-white">
                Fitness Journey
              </span> <br className="hidden sm:inline" />
              With Premium Gym Equipment.
            </h1>

            {/* Subheadline description text */}
            <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl font-light text-left">
              Shop quality dumbbells, resistance bands, power treadmills, heavy weight benches, and comprehensive home gym systems. Imported for durability and trusted by hundreds of top athletes and luxury wellness studios across Nigeria.
            </p>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onChangePage('shop')}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold uppercase tracking-widest text-xs py-4.5 px-8 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Premium Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=Hello%20Bavidex%20Fitness!%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20get%20a%20pricing%20quote%20for%2520heavy%2520home%2520gym%2520installations.`}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-extrabold uppercase tracking-widest text-xs py-4.5 px-8 rounded-xl flex items-center justify-center gap-2.5 border border-zinc-850 hover:border-zinc-700 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500" />
                <span>Consult on WhatsApp</span>
              </a>
            </div>

            {/* Row of micro statistics under content */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-zinc-900 pt-8 mt-12 max-w-xl text-left">
              <div>
                <span className="text-xl sm:text-3xl font-black text-white font-mono block">500+</span>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Gyms Equipped</span>
              </div>
              <div>
                <span className="text-xl sm:text-3xl font-black text-white font-mono block">100%</span>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Solid Warranty</span>
              </div>
              <div>
                <span className="text-xl sm:text-3xl font-black text-white font-mono block">24h</span>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Lagos Dispatch</span>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic scroll indicator banner at bottom border */}
        <button 
          onClick={() => onChangePage('shop')} 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 animate-bounce select-none cursor-pointer"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-zinc-500 font-mono">EXPLORE CACHED CATALOG</span>
          <ChevronDown className="w-4 h-4 text-red-500" />
        </button>
      </section>

      {/* 2. CHOOSE CATEGORY SLIDERS - Fast filter shortcuts to instantly target specific grids */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mb-1">
                EXQUISITE COLLECTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none font-display">
                Featured Categories
              </h2>
            </div>
            <p className="text-zinc-300 text-xs max-w-sm font-normal">
              Filter easily to view only dumbbells, spinning cycles, electric runners, benches, or accessories. Click any box to navigate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => {
              return (
                <button
                   key={cat.id}
                  onClick={() => onCategorySelect(cat.id)}
                  className="relative p-4 rounded-xl flex flex-col justify-between items-start text-left overflow-hidden min-h-[140px] border transition-all cursor-pointer select-none group bg-zinc-900/60 border-zinc-850 hover:border-zinc-700/80"
                >
                  {/* Category icon banner */}
                  <span className="text-2xl sm:text-3xl filter saturate-120 drop-shadow-md mb-2">{cat.symbol}</span>
                  
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white leading-tight group-hover:text-red-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] mt-1 leading-normal text-zinc-300 font-normal">
                      {cat.description.slice(0, 42)}...
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all w-0 group-hover:w-12" />
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. SPOTLIGHT SECTION: HOT BEST SELLERS */}
      <section className="py-20 bg-[#070708] border-t border-zinc-900/60 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1">
              DEMAND ACCENTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none font-display mb-3">
              Hot Best Sellers Spotlight
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-normal">
              Discover top-rated, commercial-grade gym systems frequently selected by executive estates and high-performance crossfit hubs in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {bestSellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(prod) => onAddToCart(prod)}
                onAddToWishlist={(prod) => onAddToWishlist(prod)}
                isWishlisted={wishlistItems.some(fav => fav.id === p.id)}
                onQuickView={(prod) => onQuickView(prod)}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onChangePage('shop')}
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-black uppercase tracking-widest py-4.5 px-10 rounded-xl border border-zinc-800 text-white transition-all hover:border-red-600"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US - Trust builders structural grids with fine icons */}
      <section className="py-20 bg-zinc-900/30 border-t border-zinc-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1 text-center">
              THE BAVIDEX STANDARD
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none text-center font-display mb-3">
              Why Elite Gyms Choose Us
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm text-center font-normal">
              We do not just import fitness machines; Bavidex is a trusted lifestyle partner ensuring lifetime workout durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 border border-red-500/25 rounded-xl flex items-center justify-center mb-5">
                <Truck className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-2">
                Nationwide Delivery
              </h3>
              <p className="text-xs text-zinc-300 leading-normal font-normal">
                Speedy same-day or 24-hour delivery directly to Lekki, Ikeja & Victoria Island overall Lagos, with secure tracked interstate shipments.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 border border-red-500/25 rounded-xl flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-2">
                Premium Equipment
              </h3>
              <p className="text-xs text-zinc-300 leading-normal font-normal">
                Every single piece of gear is constructed from commercial grade steel, heavy gauge welds, and custom tear-resistant padding material.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 border border-red-500/25 rounded-xl flex items-center justify-center mb-5">
                <Coins className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-2">
                Affordable Pricing
              </h3>
              <p className="text-xs text-zinc-300 leading-normal font-normal">
                By bypassing third-party wholesalers and importing directly from top global manufacturers, we offer elite gear at competitive Naira prices.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl hover:border-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 border border-red-500/25 rounded-xl flex items-center justify-center mb-5">
                <ThumbsUp className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-2">
                Trusted by Hundreds
              </h3>
              <p className="text-xs text-zinc-300 leading-normal font-normal">
                Equipping premium hotel wellness sectors, private luxury villas, security camps, and commercial fitness centers since inception.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-1 hover:border-zinc-800 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 border border-red-500/25 rounded-xl flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-2">
                Live Support
              </h3>
              <p className="text-xs text-zinc-300 leading-normal font-normal">
                Our sales team isn't automated. We offer customized guidance on WhatsApp with complete layout blueprints, videos, and assembly directions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. GENTLE INTRO TO INSTALLATIONS GALLERY */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900/60 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1">
            CREATIVES & RESULTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-none mb-4 font-display">
            Witness Our Real installations
          </h2>
          <p className="text-zinc-200 text-xs sm:text-sm max-w-lg mx-auto mb-8 font-normal">
            We have equipped beautiful residential highweight corners, corporate headquarters, and high-performance workout centers in Lekki Phase 1, Victoria Island, Ikeja GRA, and Abuja!
          </p>
          <button
            onClick={() => onChangePage('gallery')}
            className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-98"
          >
            Review Installations Gallery
          </button>
        </div>
      </section>
    </div>
  );
}
