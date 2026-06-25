import { useState, useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight, Maximize2, ImageOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../context/DataContext";

export default function Gallery() {
  const { data } = useData();
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  useScrollAnimation(gridRef, { stagger: 0.1 });

  const images = data.gallery;
  const total = images.length;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % total);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + total) % total);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle title="GALLERY" subtitle="Moments from the court." />
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          {images.length === 0 ? (
            <div className="text-center py-24">
              <ImageOff className="w-16 h-16 text-primary/30 mx-auto mb-6" />
              <h3 className="font-display text-3xl text-white mb-3">No Photos Yet</h3>
              <p className="text-muted-foreground">Photos will appear here once they're added.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="aspect-4/3 relative rounded-xl overflow-hidden group scroll-animate bg-[#111118] border border-white/5 cursor-pointer"
                  onClick={() => setSelectedIndex(i)}
                  data-testid={`gallery-item-${i}`}
                >
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.caption || `Gallery photo ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                    {img.caption && <p className="text-white text-sm font-medium px-4 text-center">{img.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && total > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
            onClick={() => setSelectedIndex(null)}
            data-testid="lightbox-modal"
          >
            <button
              className="absolute top-6 right-6 p-4 text-white/50 hover:text-primary transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-6xl px-4 md:px-24 flex items-center justify-center" style={{ maxHeight: "80vh" }}>
              <button className="absolute left-4 md:left-8 p-4 text-white/50 hover:text-primary transition-colors z-50" onClick={handlePrev} aria-label="Previous image">
                <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
              </button>

              <div className="w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {images[selectedIndex]?.url ? (
                  <img
                    src={images[selectedIndex].url}
                    alt={images[selectedIndex].caption || "Gallery photo"}
                    className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full aspect-video bg-[#111118] border border-white/10 rounded-xl flex items-center justify-center">
                    <span className="font-display text-8xl text-white/5">APEX</span>
                  </div>
                )}
              </div>

              <button className="absolute right-4 md:right-8 p-4 text-white/50 hover:text-primary transition-colors z-50" onClick={handleNext} aria-label="Next image">
                <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
              </button>
            </div>

            {images[selectedIndex]?.caption && (
              <p className="mt-4 text-white/70 text-sm text-center px-4" onClick={(e) => e.stopPropagation()}>
                {images[selectedIndex].caption}
              </p>
            )}
            <div className="absolute bottom-8 font-mono text-white/50 tracking-widest" onClick={(e) => e.stopPropagation()}>
              {selectedIndex + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
