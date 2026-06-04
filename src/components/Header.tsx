import { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Phone, Dumbbell } from 'lucide-react';
import { STORE_PHONE } from '../data/storeData';
import BavidexLogo from './BavidexLogo';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: 'home' | 'shop' | 'planner' | 'gallery' | 'about' | 'contact';
  onChangePage: (page: 'home' | 'shop' | 'planner' | 'gallery' | 'about' | 'contact') => void;
}

export default function Header({
  onCartClick,
  onWishlistClick,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  currentPage,
  onChangePage
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' as const },
    { name: 'Shop Products', page: 'shop' as const },
    { name: 'Gym Planner', page: 'planner' as const },
    { name: 'Installations', page: 'gallery' as const },
    { name: 'About Us', page: 'about' as const },
    { name: 'Contact', page: 'contact' as const }
  ];

  const handleLinkClick = (page: 'home' | 'shop' | 'planner' | 'gallery' | 'about' | 'contact') => {
    setMobileMenuOpen(false);
    onChangePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner Alert */}
      <div className="bg-red-600 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2 relative">
        <span>🇳🇬 NATIONWIDE SHIPPING & PROFESSIONAL GYM INSTALLATION OVERALLS</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 fill-white text-red-600" /> WhatsApp Direct Support: {STORE_PHONE}
        </span>
      </div>

      <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo - Styled visually elegant similar to screenshots */}
            <a 
              href="#" 
              className="flex items-center gap-2.5 group shrink-0"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden shadow-lg shadow-zinc-950/25 transition-transform duration-300 group-hover:scale-105 bg-white">
                {/* Custom SVG logo mimicking the user requested round logo with white background */}
                <BavidexLogo variant="standard" className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white leading-none">
                  BAVIDEX
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-red-500 font-bold leading-tight">
                  FITNESS STORE
                </span>
              </div>
            </a>

            {/* Middle Nav - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.page)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    currentPage === link.page
                      ? 'text-red-500 bg-red-650/10 border-b-2 border-red-600 font-black'
                      : 'text-zinc-300 hover:text-red-500 hover:bg-zinc-900/40'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Smart Search Field */}
            <div className={`hidden md:flex items-center relative max-w-xs w-full transition-all duration-300 ${searchFocused ? 'max-w-sm' : 'max-w-xs'}`}>
              <input
                type="text"
                placeholder="Search premium kettlebell, bench, treadmill..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-zinc-900 text-xs text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-full border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-zinc-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Wishlist Button */}
              <button
                onClick={onWishlistClick}
                className="p-2 sm:p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-full border border-zinc-800 relative transition-all duration-200"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-zinc-950">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Trigger */}
              <button
                onClick={onCartClick}
                className="p-2 sm:p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full relative transition-all duration-200 shadow-md shadow-red-900/10 hover:shadow-red-900/30"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-zinc-950 ring-2 ring-red-600">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Action */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-all duration-200"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 shadow-2xl transition-all duration-300">
            <div className="px-4 pt-4 pb-6 space-y-4">
              
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white placeholder-zinc-500 pl-10 pr-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500"
                />
                <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-3 top-3.5" />
              </div>

              {/* Mobile Links */}
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.page)}
                    className={`p-3 text-left rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                      currentPage === link.page
                        ? 'bg-red-905/25 border-red-600 text-red-500 font-bold'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-red-500 border-zinc-850'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Instant WhatsApp quick support */}
              <div className="bg-red-950/20 border border-red-500/20 p-3.5 rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">Lekki Showroom Hub</span>
                  <span className="text-[9px] text-zinc-500">Need immediate help? Call us now!</span>
                </div>
                <a
                  href={`tel:${STORE_PHONE}`}
                  className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded uppercase tracking-wider text-center"
                >
                  Call Store
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
