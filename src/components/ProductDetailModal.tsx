import { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, MessageSquare, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { Product } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../data/storeData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted
}: ProductDetailModalProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImgIndex(0);
    setQuantity(1);
    
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleWhatsAppInstantBuy = () => {
    const totalAmount = product.price * quantity;
    const text = encodeURIComponent(
      `Hello Bavidex Fitness Store! I want to instantly order via WhatsApp:\n\n` +
      `Product: *${product.name}*\n` +
      `Quantity: ${quantity}\n` +
      `Unit Price: ${formatPrice(product.price)}\n` +
      `Total Cost: *${formatPrice(totalAmount)}*\n\n` +
      `Please let me know how to proceed with the payment transfer and secure delivery schedules!`
    );
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 text-left shadow-2xl transition-all my-8 w-full max-w-4xl p-6 sm:p-8">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:border-red-500 hover:text-red-500 text-zinc-400 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Image Stages */}
            <div className="space-y-4">
              <div className="aspect-square bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden relative">
                <img
                  src={product.images[selectedImgIndex]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Save Badges */}
                {product.isBestSeller && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black tracking-widest px-3 py-1 rounded">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-20 aspect-square rounded-lg overflow-hidden border-2 bg-zinc-900 shrink-0 transition-all ${
                        idx === selectedImgIndex ? 'border-red-500 scale-95' : 'border-zinc-800'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badge Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-zinc-400">
                <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <span className="font-bold block text-white">1-Yr Warranty</span>
                  Mechanical & Motor
                </div>
                <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-900">
                  <Truck className="w-4 h-4 text-red-500 mx-auto mb-1" />
                  <span className="font-bold block text-white">Nationwide</span>
                  Quick Shipment
                </div>
                <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-900">
                  <RefreshCw className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <span className="font-bold block text-white">Replacement</span>
                  If transit broken
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Configurations */}
            <div className="flex flex-col justify-between">
              
              <div>
                <span className="bg-zinc-900 text-red-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded border border-zinc-800">
                  {product.category.toUpperCase().replace('-', ' ')}
                </span>

                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">
                    {product.rating} / 5 ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2.5 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-3 mb-5">
                  <span className="text-2xl font-mono font-black text-red-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-zinc-500 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>

                {/* Main description paragraph */}
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/40 border-l-2 border-red-500 p-3 rounded-r-lg">
                  {product.description}
                </p>

                {/* Bullet Specifications list */}
                <div className="mt-5">
                  <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-2.5">
                    Product Specifications
                  </h4>
                  <ul className="space-y-1.5">
                    {product.specifications.map((spec, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-red-500 mt-1 shrink-0">▪</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons Group */}
              <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-4">
                
                {/* Quantity adjuster and Wishlist trigger */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center bg-zinc-900 rounded-lg p-1.5 border border-zinc-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-mono text-white font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onAddToWishlist(product)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      isWishlisted 
                      ? 'bg-red-600/20 text-red-500 border border-red-500/30' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Bags */}
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="w-full bg-zinc-850 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 border border-zinc-700/80 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Immediate WhatsApp Preorder */}
                  <button
                    onClick={handleWhatsAppInstantBuy}
                    className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
