import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

/**
 * Hero banner carousel — generik & reusable. Tujuan klik tiap slide (mana
 * yang dituju: rute internal atau URL eksternal) selalu ditentukan oleh
 * `slide.onClick`, yang di-resolve oleh pemanggil lewat `goToItem()` dari
 * navigation.js — komponen ini sendiri tidak menyimpan URL apa pun.
 *
 * Props:
 *  - slides: [{ id, eyebrow, title, description, ctaLabel, gradient, Icon, onClick }]
 *  - intervalMs: jeda auto-slide (default 6000ms)
 */
export default function HeroCarousel({ slides, intervalMs = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, slides.length, intervalMs]);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <button
            key={slide.id}
            type="button"
            onClick={slide.onClick}
            className={`relative flex w-full shrink-0 flex-col justify-end overflow-hidden px-6 py-10 text-left sm:px-10 sm:py-14 md:min-h-[320px] ${slide.gradient}`}
          >
            {/* Watermark ikon besar di kanan, dekoratif */}
            {slide.Icon && (
              <slide.Icon
                size={220}
                strokeWidth={1}
                className="pointer-events-none absolute -right-8 -top-8 text-white/10"
              />
            )}

            <div className="relative max-w-xl">
              {slide.eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-300">
                  {slide.eyebrow}
                </p>
              )}
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{slide.title}</h2>
              {slide.description && (
                <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">{slide.description}</p>
              )}
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950">
                {slide.ctaLabel || "Selengkapnya"}
                <ArrowRight size={15} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Sebelumnya"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Berikutnya"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Ke banner ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
