import { useState, MouseEvent } from 'react';
import { Heart, ShoppingCart, MessageSquare, Star, ArrowRight, Eye } from 'lucide-react';
import { Product } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../data/storeData';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onQuickView
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInstantWhatsApp = (e: MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Bavidex Fitness Store! I am interested in buying: *${product.name}*\n` +
      `Category: ${product.category.toUpperCase()}\n` +
      `Price: ${formatPrice(product.price)}\n` +
      `Please let me know the delivery guidelines. Thank you!`
    );
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div
      id={`product-${product.id}`}
      className="bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden group hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/10 transition-all duration-300 flex flex-col relative"
      onMouseEnter={() => {
        setHovered(true);
        if (product.images.length > 1) {
          setCurrentImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Badge Tags */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
        {product.isBestSeller && (
          <span className="bg-red-600 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
            BEST SELLER
          </span>
        )}
        {discount > 0 && (
          <span className="bg-white text-black text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
            SAVE {discount}%
          </span>
        )}
      </div>

      {/* Under stock warning flag */}
      {product.stockStatus === 'Low Stock' && (
        <span className="absolute top-3.5 right-3.5 z-10 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded">
          LOW STOCK
        </span>
      )}

      {/* Main Image Stage */}
      <div className="aspect-square relative overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Hover overlay quick controls banner */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-black hover:bg-red-600 hover:text-white rounded-full shadow-lg transition-colors duration-200"
            title="Quick View Products"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Direct Wishlist Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
            className={`p-3 rounded-full shadow-lg transition-colors duration-200 ${
              isWishlisted ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-white hover:text-black'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Mini dot indicators representing slide pagination */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-red-500 w-3' : 'bg-zinc-600/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Metadata Descriptions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Category & Star Rating row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-bold text-zinc-300 font-mono">
              {product.rating} <span className="text-zinc-500">({product.reviewsCount})</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onQuickView(product)}
          className="font-semibold text-sm sm:text-base text-zinc-100 line-clamp-2 hover:text-red-500 transition-colors cursor-pointer mb-2 leading-tight flex-1"
        >
          {product.name}
        </h3>

        {/* Pricing tag setup */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-base sm:text-lg font-black text-white font-mono">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-zinc-500 line-through font-mono">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Direct interactive buttons */}
        <div className="space-y-2 mt-auto">
          {/* Add to Gym Bag */}
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-zinc-800 hover:bg-zinc-750 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-zinc-700/50 hover:border-zinc-600 transition-all active:scale-98"
          >
            <ShoppingCart className="w-4 h-4 text-red-500" />
            <span>Add to Cart</span>
          </button>

          {/* Quick WhatsApp Single Order */}
          <button
            onClick={handleInstantWhatsApp}
            className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-red-500/20 transition-all active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-emerald-500 group-hover:text-white" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
