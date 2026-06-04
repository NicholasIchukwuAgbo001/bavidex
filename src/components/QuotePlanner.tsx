import { useState } from 'react';
import { Target, Shield, CirclePercent, ArrowRight, CheckCircle2, Dumbbell } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';

interface QuotePlannerProps {
  onAddSelectedProducts: (products: Product[]) => void;
}

export default function QuotePlanner({ onAddSelectedProducts }: QuotePlannerProps) {
  const [goal, setGoal] = useState<'strength' | 'cardio' | 'ultimate' | 'budget'>('strength');
  const [environment, setEnvironment] = useState<'home' | 'commercial'>('home');
  const [bundleAddedFlag, setBundleAddedFlag] = useState(false);

  // Based on selections, generate the custom recommended bundle
  const getBundleRecommendation = () => {
    let selectedIds: string[] = [];
    let title = '';
    let subtitle = '';
    let bundleDiscountPercent = 10; // 10% exclusive bundle discount

    if (goal === 'strength') {
      selectedIds = ['p1', 'p4', 'p8']; // 55kg set, Adjustable bench, Resistance bands
      title = 'Bavidex Titan Strength Package';
      subtitle = 'Complete heavy weight dumbbells, custom utility bench, and non-snap loops to stack gains.';
    } else if (goal === 'cardio') {
      selectedIds = ['p2', 'p7', 'p8']; // Spin bike, Walking pad, Resistance bands
      title = 'Bavidex Aero Cardio Cluster';
      subtitle = 'Inertia spin cycle, premium sliding desk walking pad, and fabric resistance lines.';
    } else if (goal === 'ultimate') {
      selectedIds = ['p3', 'p4', 'p5']; // Automatic treadmill, Weight bench, Multi-station cables
      title = 'Bavidex Ultra Elite Home Gym';
      subtitle = 'Unparalleled premium 3.5HP structural treadmill, smith station pulley system, and adjustable steel bench.';
    } else {
      selectedIds = ['p1', 'p8', 'p9']; // 55kg set, resistance bands, stepper bench
      title = 'Bavidex Compact Essential Trio';
      subtitle = 'Space-conscious heavy chrome case dumbbells, multipurpose workout stepper, and knit bands.';
    }

    // Filter authentic matching product details from our static collection
    const matchingProducts = PRODUCTS.filter(p => selectedIds.includes(p.id));
    const totalOriginalCost = matchingProducts.reduce((acc, p) => acc + p.price, 0);
    const bundleDiscountAmount = Math.round(totalOriginalCost * (bundleDiscountPercent / 100));
    const bundleFinalCost = totalOriginalCost - bundleDiscountAmount;

    return {
      title,
      subtitle,
      products: matchingProducts,
      originalCost: totalOriginalCost,
      discountAmount: bundleDiscountAmount,
      finalCost: bundleFinalCost,
      discountPercent: bundleDiscountPercent
    };
  };

  const currentBundle = getBundleRecommendation();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddBundleToCart = () => {
    // Add all structured matching products to cart under the hood
    onAddSelectedProducts(currentBundle.products);
    setBundleAddedFlag(true);
    setTimeout(() => {
      setBundleAddedFlag(false);
    }, 4000);
  };

  return (
    <section id="gym-planner" className="py-20 bg-zinc-950 relative border-t border-zinc-900/60 overflow-hidden">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600/10 text-red-500 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-red-500/20 mb-3 block w-fit mx-auto">
            <Target className="w-4.5 h-4.5 text-red-500" />
            <span>Interactive Gym Build Planner</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Plan Your Space. Build Your Quote.
          </h2>
          <p className="text-zinc-200 text-xs sm:text-sm font-normal">
            Tell us about your space and training goals, and Bavidex will intelligently curate a recommended premium gym gear package with an exclusive bundle discount code!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Input selection boxes (5-span) */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-805 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Goal Selectors */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mb-3">
                Step 1: Primary Training Goal
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGoal('strength')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    goal === 'strength'
                      ? 'bg-red-950/20 border-red-500 shadow-lg shadow-red-900/10'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base sm:text-lg block mb-1">🏋️‍♂️</span>
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">Heavy Strength</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">Muscle building & Power</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal('cardio')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    goal === 'cardio'
                      ? 'bg-red-950/20 border-red-500 shadow-lg shadow-red-900/10'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base sm:text-lg block mb-1">🏃‍♀️</span>
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">Lean Cardio</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">Fat burn & Stamina</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal('ultimate')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    goal === 'ultimate'
                      ? 'bg-red-950/20 border-red-500 shadow-lg shadow-red-900/10'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base sm:text-lg block mb-1">👑</span>
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">Elite Premium</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">High performance setups</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal('budget')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    goal === 'budget'
                      ? 'bg-red-955/20 border-red-500 shadow-lg shadow-red-900/10'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base sm:text-lg block mb-1">💼</span>
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">Essentials</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">Compact & cost-efficient</span>
                </button>
              </div>
            </div>

            {/* Step 2: Spatial Layout constraints */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mb-3">
                Step 2: Training Environment
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEnvironment('home')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    environment === 'home'
                      ? 'bg-zinc-950 text-white border-zinc-500'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">🏠 Home Gym Space</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">Compact, quiet mechanics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEnvironment('commercial')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    environment === 'commercial'
                      ? 'bg-zinc-950 text-white border-zinc-500'
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-extrabold text-xs block text-white uppercase tracking-wider">🏢 Public Gym / Club</span>
                  <span className="text-[10px] text-zinc-400 block font-normal">Commercial, high-use durability</span>
                </button>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="bg-zinc-950/50 p-4 border border-zinc-850 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block mb-0.5">Bavidex Lifetime Frame Warranty</span>
                <p className="text-[10px] text-zinc-300 leading-relaxed font-normal">
                  All structural steel assemblies generated inside our custom suite are certified to withstand maximum fatigue limits.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Recommendations Panel (7-span) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            
            <div className="p-6 sm:p-8 bg-zinc-900/50 border-b border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded mb-2 w-fit">
                  <CirclePercent className="w-3.5 h-3.5" />
                  <span>SPECIAL BUNDLE DEALS</span>
                </span>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  {currentBundle.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {currentBundle.subtitle}
                </p>
              </div>

              {/* Discount Stamp badge */}
              <div className="shrink-0 bg-red-950/40 border border-red-500/30 text-red-500 font-mono font-black text-center p-3 rounded-xl flex flex-col justify-center min-w-24">
                <span className="text-2xl leading-none">-{currentBundle.discountPercent}%</span>
                <span className="text-[9px] uppercase tracking-wider mt-0.5">Save Quote</span>
              </div>
            </div>

            {/* Items inside selection */}
            <div className="p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-2">
                Included Products inside {currentBundle.title}
              </span>

              <div className="space-y-3">
                {currentBundle.products.map((p) => (
                  <div key={p.id} className="bg-zinc-950/40 border border-zinc-900/80 rounded-xl p-3.5 flex sm:items-center gap-4">
                    <img 
                      src={p.images[0]} 
                      alt="" 
                      referrerPolicy="no-referrer" 
                      className="w-12 h-12 object-cover rounded-lg shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest block mb-0.5">{p.category}</span>
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{p.name}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-mono font-black text-zinc-300 block">{formatPrice(p.price)}</span>
                      <span className="text-[10px] text-emerald-400 block font-bold">1 Yr Warranty</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="border-t border-zinc-900/85 pt-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-baseline gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 leading-none mb-1">Package Worth</span>
                    <span className="text-sm font-mono text-zinc-500 line-through">
                      {formatPrice(currentBundle.originalCost)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-red-500 leading-none mb-1">Bundled Price</span>
                    <span className="text-xl sm:text-2xl font-mono font-black text-white">
                      {formatPrice(currentBundle.finalCost)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {bundleAddedFlag ? (
                    <button
                      type="button"
                      disabled
                      className="w-full sm:w-auto bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Entire Package Added!</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleAddBundleToCart}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/15 transition-all"
                    >
                      <span>Add Entire Bundle</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
