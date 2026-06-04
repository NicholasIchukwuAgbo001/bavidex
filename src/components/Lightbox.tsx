import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function Lightbox({ item, onClose, onNavigate }: LightboxProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      {/* Absolute background click to close */}
      <div className="absolute inset-0 z-0 cursor-default" onClick={onClose} />

      {/* Top Controls Header */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
        <span className="bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 px-3.5 py-1.5 rounded-full uppercase font-bold tracking-widest">
          {item.tag} Setup Setup
        </span>
        <button
          onClick={onClose}
          className="p-2 bg-zinc-900/80 border border-zinc-800 rounded-full hover:border-red-500 hover:text-red-500 text-zinc-400 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slider body container */}
      <div className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10">
        
        {/* Navigation triggers */}
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-2 sm:-left-12 p-3 bg-zinc-900/80 hover:bg-zinc-800/80 text-white rounded-full border border-zinc-800 cursor-pointer hover:border-red-500 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('next')}
          className="absolute right-2 sm:-right-12 p-3 bg-zinc-900/80 hover:bg-zinc-800/80 text-white rounded-full border border-zinc-800 cursor-pointer hover:border-red-500 transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Display Center */}
        <div className="bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl w-full aspect-video sm:aspect-auto sm:h-[65vh]">
          <img
            src={item.url}
            alt={item.caption}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Caption */}
        <div className="text-center mt-4 max-w-lg">
          <p className="text-xs sm:text-sm text-zinc-100 font-medium">
            {item.caption}
          </p>
          <span className="text-[10px] text-zinc-500 mt-1 block tracking-wider uppercase">
            Bavidex Certified Installation Showroom
          </span>
        </div>

      </div>
    </div>
  );
}
