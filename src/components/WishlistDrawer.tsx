import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onAddToCart
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="wishlist-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-900 flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                My Favorites ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-zinc-800 mx-auto mb-4 stroke-[1px]" />
                <p className="text-zinc-400 text-sm font-semibold mb-1">Your wishlist is empty</p>
                <p className="text-zinc-600 text-xs px-6">Save articles you high-key desire to buy, then move them to bag easily anytime.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-zinc-900/40 rounded-xl border border-zinc-900/80 hover:border-zinc-800 transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg shrink-0 bg-zinc-950"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-100 truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-red-500 font-mono font-bold">
                          {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(product.price)}
                        </span>
                      </div>
                      
                      {/* Move to cart action */}
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveItem(product.id);
                        }}
                        className="text-[10px] font-bold text-white uppercase bg-zinc-800 hover:bg-red-600 px-2.5 py-1.5 rounded-md mt-1 w-fit transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Trash remove from wishlist */}
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-zinc-600 hover:text-red-500 shrink-0 self-center p-2"
                      title="Remove core favorite"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-zinc-900 bg-zinc-950">
            <button
              onClick={onClose}
              className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl border border-zinc-800 transition-colors"
            >
              Continue Exploring Shop
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
