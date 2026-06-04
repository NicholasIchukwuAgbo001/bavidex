import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Plus,
  Check,
  Star,
  MapPin,
  Mail,
  Phone,
  Search,
  Sparkles,
  ShieldCheck,
  Truck,
  Coins,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Info,
  ChevronUp,
  SlidersHorizontal,
  ThumbsUp,
  Dumbbell
} from 'lucide-react';

import Header from './components/Header';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Lightbox from './components/Lightbox';
import WhatsAppFloating from './WhatsAppFloating';
import Interactive3DBackground from './components/Interactive3DBackground';

// Modular Route Page views
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import PlannerPage from './components/PlannerPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BavidexLogo from './components/BavidexLogo';

import { Product, CartItem, Testimonial, FAQItem, GalleryItem } from './types';
import {
  PRODUCTS,
  CATEGORIES,
  TESTIMONIALS,
  GALLERY,
  FAQS,
  STORE_PHONE,
  STORE_WHATSAPP_NUMBER,
  STORE_EMAIL,
  STORE_ADDRESS,
  GOOGLE_MAPS_EMBED
} from './data/storeData';

export default function App() {
  // Application State managers
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'planner' | 'gallery' | 'about' | 'contact'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-100k' | '100k-500k' | 'over-500k'>('all');

  // Interactivity and Drawer controls
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProductForView, setSelectedProductForView] = useState<Product | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Forms states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // SEO Schema Markup injection and Google Analytics Mock Tracker
  useEffect(() => {
    // Inject Structured SEO Schema Dynamic Object
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "SportsStore",
      "name": "Bavidex Fitness Store",
      "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot 12, Admiralty Way, Lekki Phase 1",
        "addressLocality": "Lagos State",
        "addressCountry": "Nigeria"
      },
      "telephone": STORE_PHONE,
      "email": STORE_EMAIL,
      "priceRange": "₦₦₦",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://instagram.com/bavidex.fitness.store"
      ]
    };

    const scriptId = 'bavidex-seo-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.text = JSON.stringify(schemaMarkup);

    // Google Analytics Integration Event Dispatch Simulator
    console.log('[Google Analytics] Loaded pixel tag. Custom identifier: G-BAVIDEX2026');

    // Load saved cart and wishlist from standard Client Storage
    try {
      const savedCart = localStorage.getItem('bavidex_gym_cart');
      const savedWishlist = localStorage.getItem('bavidex_gym_favorites');
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Error loading states from browser localStorage context', e);
    }
  }, []);

  // Sync state modifications to browser localStorage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('bavidex_gym_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWishlist: Product[]) => {
    localStorage.setItem('bavidex_gym_favorites', JSON.stringify(updatedWishlist));
  };

  // Adding product to Shopping Cart Bag
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = prev.map((item, i) =>
          i === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }
      saveCartToStorage(updated);
      return updated;
    });
    setCartOpen(true);
  };

  // Bulk add entire recommended bundle setup
  const handleAddBundleToCart = (productsToAdd: Product[]) => {
    setCartItems(prev => {
      let updated = [...prev];
      productsToAdd.forEach(p => {
        const existingIdx = updated.findIndex(item => item.product.id === p.id);
        if (existingIdx > -1) {
          updated[existingIdx] = { ...updated[existingIdx], quantity: updated[existingIdx].quantity + 1 };
        } else {
          updated.push({ product: p, quantity: 1 });
        }
      });
      saveCartToStorage(updated);
      return updated;
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      );
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      saveCartToStorage(updated);
      return updated;
    });
  };

  // Toggle favorite listings
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prev.filter(item => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  const handleRemoveWishlistItem = (productId: string) => {
    setWishlistItems(prev => {
      const updated = prev.filter(p => p.id !== productId);
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  // Lightbox index management
  const handleGalleryNavigation = (dir: 'prev' | 'next') => {
    if (selectedGalleryIndex === null) return;
    let nextIdx = dir === 'prev' ? selectedGalleryIndex - 1 : selectedGalleryIndex + 1;
    if (nextIdx < 0) nextIdx = GALLERY.length - 1;
    if (nextIdx >= GALLERY.length) nextIdx = 0;
    setSelectedGalleryIndex(nextIdx);
  };

  // Contact form submission
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSubmitted(false);
    }, 4500);
  };

  // Newsletter signup Form
  const handleNewsletterSignup = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4500);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtering products list
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    let matchesPrice = true;
    if (priceFilter === 'under-100k') {
      matchesPrice = p.price < 100000;
    } else if (priceFilter === '100k-500k') {
      matchesPrice = p.price >= 100000 && p.price <= 500000;
    } else if (priceFilter === 'over-500k') {
      matchesPrice = p.price > 500000;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#070708] text-white font-sans overflow-x-hidden selection:bg-red-600 selection:text-white">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        html, body {
          background-color: #070708 !important;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Outfit', sans-serif;
        }
        
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0d0d0f;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>

      {/* Main sticky navigation header controller */}
      <Header
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            setCurrentPage('shop');
          }
        }}
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {/* DYNAMIC ANIMATED VIEWPORTS SWITCHER */}
      <main className="pt-[112px]">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <HomePage
                products={PRODUCTS}
                wishlistItems={wishlistItems}
                onCategorySelect={handleCategorySelect}
                onChangePage={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                onQuickView={setSelectedProductForView}
                STORE_WHATSAPP_NUMBER={STORE_WHATSAPP_NUMBER}
              />
            </motion.div>
          )}

          {currentPage === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <ShopPage
                filteredProducts={filteredProducts}
                wishlistItems={wishlistItems}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                onQuickView={setSelectedProductForView}
              />
            </motion.div>
          )}

          {currentPage === 'planner' && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <PlannerPage onAddSelectedProducts={handleAddBundleToCart} />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <GalleryPage onSelectPhotoIndex={setSelectedGalleryIndex} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <AboutPage
                activeFaqIndex={activeFaqIndex}
                setActiveFaqIndex={setActiveFaqIndex}
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <ContactPage
                contactName={contactName}
                setContactName={setContactName}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                contactMessage={contactMessage}
                setContactMessage={setContactMessage}
                contactSubmitted={contactSubmitted}
                onContactSubmit={handleContactSubmit}
                STORE_ADDRESS={STORE_ADDRESS}
                STORE_PHONE={STORE_PHONE}
                STORE_EMAIL={STORE_EMAIL}
                GOOGLE_MAPS_EMBED={GOOGLE_MAPS_EMBED}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 11. PERSISTENT FOOTER SESSIONS */}
      <footer className="bg-[#040405] border-t border-zinc-900 pt-16 pb-8 text-zinc-500 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

            {/* Logo Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden shadow flex items-center justify-center shrink-0 bg-white">
                  <BavidexLogo variant="standard" className="w-full h-full" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm sm:text-base tracking-tight text-white leading-none">BAVIDEX</span>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-red-500 font-bold leading-tight">FITNESS STORE</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
                Nigeria's premier importer and developer of durability-guaranteed residential and commercial gym installations. We represent the absolute crest of luxury and tough performance hardware.
              </p>

              <div className="inline-flex items-center gap-2 bg-zinc-900/60 p-2 rounded-lg border border-zinc-850 w-fit">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[10px] text-zinc-350 font-bold font-mono">4.9 / 5.0 Rating based on verified Lekki reviews</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase text-white tracking-widest">
                Quick Navigation
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><button onClick={() => { setCurrentPage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Catalog Products</button></li>
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Featured Categories</button></li>
                <li><button onClick={() => { setCurrentPage('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Gym Planner Suite</button></li>
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Why Bavidex</button></li>
                <li><button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Our Brand Heritage</button></li>
              </ul>
            </div>

            {/* Categories column */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase text-white tracking-widest">
                Heavy Equipment
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><button onClick={() => { handleCategorySelect('dumbbells'); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Chrome Dumbbells</button></li>
                <li><button onClick={() => { handleCategorySelect('home-gym'); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Cable Smith Stations</button></li>
                <li><button onClick={() => { handleCategorySelect('treadmills'); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Power Treadmills</button></li>
                <li><button onClick={() => { handleCategorySelect('exercise-bikes'); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Spin Exercise Bikes</button></li>
                <li><button onClick={() => { handleCategorySelect('weight-benches'); }} className="hover:text-red-500 transition-colors text-left cursor-pointer">Multi-adjustable Benches</button></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black uppercase text-white tracking-widest">
                Elite Newsletter
              </h4>
              <p className="text-[10.5px] text-zinc-400 leading-relaxed font-light">
                Subscribe to get priority notifications on seasonal model imports, holiday price cuts, and free gym designs.
              </p>

              {newsletterSubscribed ? (
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-emerald-400 block">✨ Subscribed Successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSignup} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="kola@davies.com"
                    className="flex-1 bg-zinc-950 border border-zinc-800 text-[11px] text-white p-2 rounded focus:outline-none focus:border-red-500 placeholder-zinc-700"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] uppercase px-3.5 py-2 rounded transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}

              <div className="flex gap-3 text-zinc-400 pt-1.5">
                <a href="https://instagram.com/bavidex.fitness.store" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors" title="Instagram"><Instagram className="w-4 h-4" /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors" title="Facebook"><Facebook className="w-4 h-4" /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors" title="Twitter"><Twitter className="w-4 h-4" /></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors" title="Youtube"><Youtube className="w-4 h-4" /></a>
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-900/80 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            <p className="text-zinc-500 font-light text-center sm:text-left">
              &copy; {new Date().getFullYear()} Bavidex Fitness Store. All rights reserved.
            </p>
            <div className="flex gap-4 justify-center sm:justify-end text-zinc-500 text-[11px]">
              <button onClick={() => setCurrentPage('about')} className="hover:text-red-500 transition-colors cursor-pointer">Privacy Warranty</button>
              <span>&bull;</span>
              <button onClick={() => setCurrentPage('about')} className="hover:text-red-500 transition-colors cursor-pointer">Return Logistics Policy</button>
              <span>&bull;</span>
              <span className="text-zinc-600 font-mono text-[9px]">Lagos, NG IP Hub</span>
            </div>
          </div>

        </div>
      </footer>

      {/* DYNAMIC CART SIDE DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* DYNAMIC WISHLIST SIDE CABINET */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleRemoveWishlistItem}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* DYNAMIC PRODUCT QUICKVIEW DETAIL MODAL OVERLAY */}
      <ProductDetailModal
        product={selectedProductForView}
        onClose={() => setSelectedProductForView(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onAddToWishlist={(p) => handleToggleWishlist(p)}
        isWishlisted={selectedProductForView ? wishlistItems.some(fav => fav.id === selectedProductForView.id) : false}
      />

      {/* DYNAMIC INSTALLATION GALLERY LIGHTBOX VIEWFINDER */}
      <Lightbox
        item={selectedGalleryIndex !== null ? GALLERY[selectedGalleryIndex] : null}
        onClose={() => setSelectedGalleryIndex(null)}
        onNavigate={handleGalleryNavigation}
      />

      {/* LIVE FLOATING WHATSAPP CHAT COUNTER */}
      <WhatsAppFloating />

    </div>
  );
}
