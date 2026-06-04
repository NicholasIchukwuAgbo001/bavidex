import { useState, useEffect, FormEvent } from 'react';
import { X, Trash2, ShoppingBag, Send, Phone, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../data/storeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  // Customer details form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryState, setDeliveryState] = useState('Lagos');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [formValidationError, setFormValidationError] = useState('');

  // Lock scroll when cart opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Automated WhatsApp Redirect
  const handleWhatsAppCheckout = (e: FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setFormValidationError('Please fill in your Name, Phone Number, and Delivery Address to place your order.');
      return;
    }

    setFormValidationError('');

    // Pre-formatting the item list
    let itemListing = '';
    cartItems.forEach((item, index) => {
      itemListing += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}\n`;
    });

    const finalAmount = subtotal;
    const notesString = additionalNotes.trim() ? `\n*Special Instructions:* ${additionalNotes}` : '';

    const textPayload = 
      `🔥 *NEW ORDER - BAVIDEX FITNESS STORE* 🔥\n\n` +
      `👤 *CUSTOMER INFORMATION:*\n` +
      `▪ Name: ${customerName}\n` +
      `▪ Mobile: ${customerPhone}\n` +
      `▪ Delivery State: *${deliveryState}*\n` +
      `▪ Destination Address: ${deliveryAddress}\n` +
      `${notesString}\n\n` +
      `🛒 *ORDERED GYM EQUIPMENT:*\n` +
      `${itemListing}\n` +
      `💰 *SUBTOTAL:* *${formatPrice(finalAmount)}*\n` +
      `🚛 *DELIVERY STATUS:* To be calculated based on destination.\n\n` +
      `Please confirm receipt of this order and send the company transfer details. Thank you!`;

    const encodedURLToken = encodeURIComponent(textPayload);
    window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedURLToken}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
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
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                My Gym Bag ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Bag Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-4 stroke-[1px]" />
                <p className="text-zinc-400 text-sm font-semibold mb-1">Your cart is currently empty</p>
                <p className="text-zinc-600 text-xs px-6 mb-6">Choose from our premium selected dumbbells, bikes, rows, and heavy racks to kickstart your journey!</p>
                <button
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-colors inline-block"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* List items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-zinc-900/40 rounded-xl border border-zinc-900/80 group hover:border-zinc-800 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-950">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-100 truncate group-hover:text-red-500 transition-colors">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.product.category}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1.5">
                          {/* Quantity adjusters */}
                          <div className="flex items-center bg-zinc-950 rounded p-1 border border-zinc-800">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[11px] font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-bold font-mono text-zinc-300">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-zinc-600 hover:text-red-500 shrink-0 self-center p-2"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Secure Checkout form inside the cart context to guarantee high conversion */}
                <div className="border-t border-zinc-900 pt-5 mt-4 space-y-4">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                      <span>1</span> Shipping Information
                    </h3>
                    <p className="text-[10px] text-zinc-500">Provide details to calculate delivery fees and coordinate shipment setups.</p>
                  </div>

                  <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                    {/* Full name input */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Kolawole Davies"
                        className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500 placeholder-zinc-650"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500 placeholder-zinc-650"
                      />
                    </div>

                    {/* State selection */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Delivery State</label>
                        <select
                          value={deliveryState}
                          onChange={(e) => setDeliveryState(e.target.value)}
                          className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500"
                        >
                          <option value="Lagos">Lagos State</option>
                          <option value="Abuja">Abuja FCT</option>
                          <option value="Rivers">Rivers State</option>
                          <option value="Oyo">Oyo State</option>
                          <option value="Edo">Edo State</option>
                          <option value="Delta">Delta State</option>
                          <option value="Enugu">Enugu State</option>
                          <option value="Kaduna">Kaduna State</option>
                          <option value="Kano">Kano State</option>
                          <option value="Other States">Other States (Nigeria)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Shipping Tier</label>
                        <div className="bg-zinc-900 text-zinc-300 text-[11px] p-2.5 rounded-lg border border-zinc-800 flex items-center justify-between">
                          <span className="font-semibold text-red-500">Premium Doorstep</span>
                        </div>
                      </div>
                    </div>

                    {/* Full Delivery street address */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Destination Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. House 4, Close B, Off Admiralty Road, Lekki Phase 1"
                        className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500 placeholder-zinc-650 resize-none"
                      />
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Special instructions / Notes</label>
                      <input
                        type="text"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="e.g. Call before coming, deliver in original boxes"
                        className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-red-500 placeholder-zinc-650"
                      />
                    </div>

                    {formValidationError && (
                      <div className="text-[10px] bg-red-950/30 border border-red-500/20 text-red-400 p-2.5 rounded-lg flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{formValidationError}</span>
                      </div>
                    )}
                  </form>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Total Estimated Quote:</span>
                <span className="text-xl font-mono font-black text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="text-[10px] text-zinc-500 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
                💡 <span className="font-bold text-zinc-300">Fast Bank Transfer</span> setup: Clicking the button below opens WhatsApp to coordinate swift delivery estimates, structural installations, and dispatch clearance instantly.
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all active:scale-98"
              >
                <Send className="w-4 h-4 fill-white text-red-600" />
                <span>Checkout on WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
