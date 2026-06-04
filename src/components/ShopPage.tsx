import { SlidersHorizontal, Info } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/storeData';
import ProductCard from './ProductCard';

interface ShopPageProps {
  filteredProducts: Product[];
  wishlistItems: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceFilter: 'all' | 'under-100k' | '100k-500k' | 'over-500k';
  setPriceFilter: (pf: 'all' | 'under-100k' | '100k-500k' | 'over-500k') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export default function ShopPage({
  filteredProducts,
  wishlistItems,
  selectedCategory,
  setSelectedCategory,
  priceFilter,
  setPriceFilter,
  searchQuery,
  setSearchQuery,
  onAddToCart,
  onAddToWishlist,
  onQuickView
}: ShopPageProps) {
  return (
    <section className="py-12 bg-[#070708] min-h-[calc(100vh-120px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-500 text-xs font-black tracking-widest uppercase block mb-1">
            THE HARDWARE DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none font-display mb-3">
            Elite Workout Catalog
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Discover heavy duty adjustable dumbbells, non-snap bands, premium rowing steppers, spin cycle bikes, and auto runners with complete safety guarantees.
          </p>
        </div>

        {/* Search, Filter Category and Price control pill widgets */}
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-4 mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

          {/* Category Quick Filter Select list */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider h-fit mr-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all select-none cursor-pointer ${selectedCategory === c.id
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Price classification filters */}
          <div className="flex items-center justify-between lg:justify-end gap-3 border-t lg:border-t-0 border-zinc-850 pt-3.5 lg:pt-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="bg-zinc-950 text-zinc-350 text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500"
              >
                <option value="all">All Prices</option>
                <option value="under-100k">Under ₦100,000</option>
                <option value="100k-500k">₦100,000 - ₦500,000</option>
                <option value="over-500k">Above ₦500,000</option>
              </select>
            </div>

            {/* Reset filter trigger */}
            {(selectedCategory !== 'all' || priceFilter !== 'all' || searchQuery.trim() !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceFilter('all');
                  setSearchQuery('');
                }}
                className="text-[10px] uppercase font-black text-red-500 hover:text-white transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Catalog products grids */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-8 max-w-md mx-auto">
            <Info className="w-12 h-12 text-zinc-650 mx-auto mb-3 stroke-[1.5px]" />
            <p className="font-bold text-zinc-350 text-sm mb-1">No matching fitness gear found</p>
            <p className="text-zinc-500 text-xs mb-6">We couldn't find items matching your search criteria. Try filtering with a different category or price interval!</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="bg-zinc-900 border border-zinc-800 text-[11px] font-bold uppercase py-2.5 px-5 rounded-lg text-white hover:border-red-500/50 transition-colors"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(Boolean).map((p) => (
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
        )}

        {/* Cash On Delivery / Guarantee message banner for Nigerians */}
        <div className="mt-16 bg-linear-to-r from-red-950/20 via-zinc-900/40 to-transparent border border-zinc-850 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇳🇬</span>
            <div>
              <span className="text-white text-xs font-black uppercase block tracking-wider">CASH ON ARRIVAL LOGISTICS</span>
              <p className="text-[10px] text-zinc-400 mt-1">Available for standard orders within Lagos State. Certified setup support by qualified local physical tech mechanics.</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest border border-red-500/30 px-3 py-1.5 rounded bg-red-600/5">SUPPORTED TRANSACTIONS</span>
        </div>

      </div>
    </section>
  );
}
