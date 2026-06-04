import QuotePlanner from './QuotePlanner';
import { Product } from '../types';

interface PlannerPageProps {
  onAddSelectedProducts: (products: Product[]) => void;
}

export default function PlannerPage({ onAddSelectedProducts }: PlannerPageProps) {
  return (
    <div className="py-12 bg-[#070708] min-h-[calc(100vh-120px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title and guide banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1">
            SPACIAL ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none font-display mb-3">
            Custom Gym Planner
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Configure your dream fitness corner! Pick your goals, assess your room dimension, and build full-gear equipment bundles with discount estimations dynamically.
          </p>
        </div>

        {/* Embedded Interactive Planner */}
        <QuotePlanner onAddSelectedProducts={onAddSelectedProducts} />

      </div>
    </div>
  );
}
