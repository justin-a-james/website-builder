import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Scroll-triggered reveal. Content stays visible without JS; hiding only starts after mount. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children }: { as?: ElementType; className?: string; delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setState("shown"); return; }
    setState("armed");
    const io = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setState("shown"); io.disconnect(); } }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-reveal={state} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>{children}</Tag>;
}
