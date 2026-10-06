import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  src: string;
  title: string;
  category?: string;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Store trigger element when opened to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      triggerElementRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  if (!currentItem) return null;

  const handleNext = () => {
    onNavigate((currentIndex + 1) % items.length);
  };

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 animate-fade-in"
    >
      {/* Backdrop with --blur-lg token */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-primary/80 backdrop-blur-lg transition-opacity"
        aria-hidden="true"
      />

      {/* Main Lightbox Content */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full mb-4 px-2 text-surface">
          <div>
            {currentItem.category && (
              <span className="text-12 font-bold uppercase tracking-wider text-secondary">
                {currentItem.category}
              </span>
            )}
            <h3 className="text-18 font-medium text-surface">{currentItem.title}</h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-14 text-grey-2">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/10 text-surface hover:bg-surface/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Close image viewer (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Image Container with navigation arrows */}
        <div className="relative flex items-center justify-center w-full max-h-[75vh] overflow-hidden rounded-16 border border-surface/20 bg-surface/5 shadow-md">
          <img
            src={currentItem.src}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-16"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/70 text-surface backdrop-blur-md hover:bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label="Previous image (Left arrow)"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/70 text-surface backdrop-blur-md hover:bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label="Next image (Right arrow)"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
