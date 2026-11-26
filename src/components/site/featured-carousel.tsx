import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import heroSpeed from "@/assets/hero-speed.jpg";
import heroSpeedAlt from "@/assets/hero-speed-alt.jpg";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "./motion";

const cards = [
  { label: "Insight", title: "Placeholder insight title one", summary: "Placeholder summary. Replace with a short description of this article or idea." },
  { label: "Case study", title: "Placeholder case study title", summary: "Placeholder summary. Replace with the outcome of a real, approved project." },
  { label: "Perspective", title: "Placeholder perspective title", summary: "Placeholder summary. Replace with a point of view the studio wants to share." },
  { label: "Guide", title: "Placeholder guide title", summary: "Placeholder summary. Replace with a practical guide for clients." },
  { label: "News", title: "Placeholder studio news title", summary: "Placeholder summary. Replace with a real studio update." },
  { label: "Insight", title: "Placeholder insight title two", summary: "Placeholder summary. Replace with a second article or idea." },
].map((card, i) => ({ ...card, id: `featured-${i + 1}`, image: i % 2 ? heroSpeedAlt : heroSpeed }));

const AUTO_MS = 7000;

export function FeaturedCarousel() {
  const reduced = usePrefersReducedMotion();
  const regionRef = useRef<HTMLElement>(null);
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [onscreen, setOnscreen] = useState(false);
  const pages = Math.ceil(cards.length / perPage);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPerPage(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);
  useEffect(() => { setPage((p) => Math.min(p, pages - 1)); }, [pages]);
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnscreen(!!e?.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const autoRunning = playing && onscreen && !expanded && !reduced;
  useEffect(() => {
    if (!autoRunning) return;
    const t = window.setInterval(() => setPage((p) => (p + 1) % pages), AUTO_MS);
    return () => window.clearInterval(t);
  }, [autoRunning, pages]);

  const go = (p: number) => { setExpanded(null); setPage((p + pages) % pages); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(page + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(page - 1); }
  };
  const visible = cards.slice(page * perPage, page * perPage + perPage);

  return (
    <section ref={regionRef} aria-roledescription="carousel" aria-labelledby="featured-heading" onKeyDown={onKey} className="bg-paper px-5 py-20 text-ink sm:px-8 lg:px-14 lg:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-text">Featured · placeholder content</p>
          <h2 id="featured-heading" className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">Latest from the studio.</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="site" size="site" type="button" onClick={() => setPlaying((v) => !v)} aria-pressed={!playing} className="min-h-11 rounded-full border border-ink/20 px-5 text-xs font-bold uppercase tracking-[0.14em]">{playing ? "Pause" : "Play"}<span className="sr-only"> automatic slide rotation</span></Button>
          <Button variant="site" size="site" type="button" onClick={() => go(page - 1)} aria-label="Previous slides" aria-controls="featured-track" className="size-11 rounded-full bg-ink text-snow"><span aria-hidden="true">←</span></Button>
          <Button variant="site" size="site" type="button" onClick={() => go(page + 1)} aria-label="Next slides" aria-controls="featured-track" className="size-11 rounded-full bg-ink text-snow"><span aria-hidden="true">→</span></Button>
        </div>
      </div>
      <ul id="featured-track" aria-live={autoRunning ? "off" : "polite"} className="grid gap-6 md:grid-cols-3">
        {visible.map((card, i) => {
          const isOpen = expanded === card.id;
          return (
            <li key={card.id} role="group" aria-roledescription="slide" aria-label={`${page * perPage + i + 1} of ${cards.length}`} className={`carousel-card overflow-hidden rounded-[1.5rem] bg-cream ring-1 ring-ink/10 ${isOpen ? "md:col-span-3" : ""}`}>
              <div className={isOpen ? "grid md:grid-cols-2" : ""}>
                <img src={card.image} alt="Placeholder image: red and black motion streaks" width={1600} height={800} loading="lazy" decoding="async" className={`w-full object-cover ${isOpen ? "h-64 md:h-full" : "h-44"}`} />
                <div className="p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-text">{card.label}</p>
                  <h3 className={`${isOpen ? "text-3xl" : "text-xl"} font-semibold tracking-[-0.03em]`}>{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{card.summary}</p>
                  {isOpen && <p id={`${card.id}-more`} className="mt-4 text-sm leading-relaxed text-ink/70">Placeholder expanded copy. Replace with a longer excerpt, key takeaways or a link to the full piece once real content is approved.</p>}
                  <Button variant="site" size="site" type="button" onClick={() => setExpanded(isOpen ? null : card.id)} aria-expanded={isOpen} className="mt-5 min-h-11 text-xs font-bold uppercase tracking-[0.14em] underline decoration-brand underline-offset-8">{isOpen ? "Close" : "Expand"}<span className="sr-only">: {card.title}</span></Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex justify-center gap-1" role="group" aria-label="Choose slides">
        {Array.from({ length: pages }, (_, p) => (
          <Button key={p} variant="site" size="site" type="button" onClick={() => go(p)} aria-label={`Show slides page ${p + 1} of ${pages}`} aria-current={p === page ? "true" : undefined} className="flex size-11 items-center justify-center">
            <span className={`block h-2 rounded-full motion-safe:transition-all ${p === page ? "w-6 bg-brand" : "w-2 bg-ink/40"}`} />
          </Button>
        ))}
      </div>
    </section>
  );
}
