import { useState, useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useScrollAnimation(gridRef, { stagger: 0.1 });

  const totalImages = 12;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % totalImages);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + totalImages) % totalImages);
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle 
            title="GALLERY" 
            subtitle="Moments from the court." 
          />
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: totalImages }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-4/3 relative rounded-xl overflow-hidden group scroll-animate bg-[#111118] border border-white/5 cursor-pointer"
                onClick={() => setSelectedImage(i)}
                data-testid={`gallery-item-${i}`}
              >
                {/* Court Pattern Background */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  backgroundPosition: "center"
                }} />
                
                {/* Center Logo/Watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="font-display text-5xl md:text-7xl text-white/5 tracking-widest">APEX</span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
            onClick={() => setSelectedImage(null)}
            data-testid="lightbox-modal"
          >
            {/* Close */}
            <button 
              className="absolute top-6 right-6 p-4 text-white/50 hover:text-primary transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Content */}
            <div className="relative w-full max-w-6xl aspect-video px-4 md:px-24 flex items-center justify-center">
              
              <button 
                className="absolute left-4 md:left-8 p-4 text-white/50 hover:text-primary transition-colors z-50"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
              </button>

              <div className="w-full h-full bg-[#111118] border border-white/10 rounded-xl relative overflow-hidden shadow-2xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Court Pattern Background */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                  backgroundPosition: "center"
                }} />
                <span className="font-display text-8xl md:text-[200px] text-white/5 tracking-widest">APEX</span>
              </div>

              <button 
                className="absolute right-4 md:right-8 p-4 text-white/50 hover:text-primary transition-colors z-50"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
              </button>

            </div>

            {/* Counter */}
            <div className="absolute bottom-8 font-mono text-white/50 tracking-widest" onClick={(e) => e.stopPropagation()}>
              {selectedImage + 1} / {totalImages}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
