import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import heroSpeed from "@/assets/hero-speed.jpg";
import heroSpeedAlt from "@/assets/hero-speed-alt.jpg";
import { jsonLd, pageHead, websiteSchema } from "@/lib/site";
import { services } from "@/lib/services";
import { projectPriceSignal } from "@/lib/project-offer";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/site/brand";
import { useSiteInquiry } from "@/components/site/layout";
import { FeaturedCarousel } from "@/components/site/featured-carousel";
import { Reveal, usePrefersReducedMotion } from "@/components/site/motion";

const TITLE = "MOD 12 — Web Design & Development Studio | Sarasota, FL";

export const Route = createFileRoute("/")({
  head: () => ({ ...pageHead("/", TITLE, "MOD 12 is an independent web design and development studio in Sarasota, Florida. Thoughtful strategy, distinctive design and fast websites for ambitious brands."), scripts: [jsonLd(websiteSchema)] }),
  component: Index,
});

function useHeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) { if (el) el.style.transform = ""; return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      el.style.transform = `translate3d(0, ${y * 0.12}px, 0) scale(${1 - y / window.innerHeight * 0.04})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [reduced]);
  return ref;
}

const eyebrow = "mb-4 text-xs font-bold uppercase tracking-[0.2em]";

function Index() {
  const startProject = useSiteInquiry();
  const parallaxRef = useHeroParallax();
  const lines = ["Ideas built", "at full speed."];
  return (
    <>
      <section data-hero className="relative min-h-[92vh] px-5 pb-12 pt-5 sm:px-8 lg:px-14 lg:pb-16">
        <div className="speed-line absolute right-0 top-0 h-full w-[42%] bg-brand" />
        <div aria-hidden="true" className="h-[65px] md:h-[61px]" />
        <div className="relative z-10 flex min-h-[calc(92vh-92px)] flex-col justify-end pt-24">
          <div className="my-auto w-full overflow-hidden rounded-[1.5rem] py-0 ring-1 ring-ink/10">
            <div ref={parallaxRef} className="hero-parallax">
              <img src={heroSpeed} alt="Long-exposure red and black motion streaks racing across a warm paper background" width={1600} height={800} loading="eager" fetchPriority="high" className="h-[20vh] w-full object-cover object-center sm:h-[26vh] lg:h-[30vh]" />
            </div>
          </div>
          <p className="mb-5 mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/55"><span className="h-px w-10 bg-brand" />Web design &amp; development · Sarasota, FL</p>
          <h1 className="max-w-[1100px] text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
            <span className="title-line"><span style={{ animationDelay: "80ms" }}>{lines[0]}</span></span>
            <span className="title-line pl-[10vw]"><span style={{ animationDelay: "220ms" }}>at <span className="text-brand">full speed.</span></span></span>
          </h1>
          <div className="mt-9 flex flex-col gap-8 border-t border-ink/15 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-ink/65">We bring web design and development together to build high-performing websites for ambitious brands ready to move forward.</p>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button variant="site" size="site" onClick={startProject} className="min-h-11 rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-snow motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">Start a project <Arrow /></Button>
                <Link to="/services" className="inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-ink underline decoration-brand underline-offset-8">See services <span aria-hidden="true">→</span></Link>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-brand opacity-40" /><span className="relative inline-flex size-2 rounded-full bg-brand" /></span>
                Now booking new projects
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCarousel />

      <section aria-labelledby="pov-heading" className="bg-cream px-5 py-24 text-ink sm:px-8 lg:px-14 lg:py-32">
        <Reveal><p className={`${eyebrow} text-brand-text`}>Point of view</p></Reveal>
        <Reveal delay={80}><h2 id="pov-heading" className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl">A website should move a business forward, not just sit there looking good.</h2></Reveal>
      </section>

      <section id="work" aria-labelledby="work-heading" className="bg-paper px-5 py-24 text-ink sm:px-8 lg:px-14 lg:py-32">
        <Reveal><p className={`${eyebrow} text-brand-text`}>Selected work</p></Reveal>
        <Reveal delay={80}><h2 id="work-heading" className="mb-12 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">Featured case study.</h2></Reveal>
        <Reveal as="article" className="grid gap-8 overflow-hidden rounded-[1.5rem] bg-cream ring-1 ring-ink/10 lg:grid-cols-[1.2fr_1fr]">
          <img src={heroSpeedAlt} alt="Placeholder image for the featured case study" width={1600} height={800} loading="lazy" decoding="async" className="h-64 w-full object-cover lg:h-full" />
          <div className="p-8 lg:p-12">
            <p className="mb-3 inline-block rounded-full border border-ink/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">Placeholder — not a real project</p>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Placeholder client name</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">Placeholder summary. Replace with the challenge, approach and result of an approved client project.</p>
          </div>
        </Reveal>
      </section>

      <section id="services" aria-labelledby="services-heading" className="bg-ink px-5 py-24 text-snow sm:px-8 lg:px-14 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <p className={`${eyebrow} text-brand-on-dark`}>What we do</p>
            <h2 id="services-heading" className="max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">From first thought to finish line.</h2>
            <Link to="/services" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-snow underline decoration-brand underline-offset-8">See all services <span aria-hidden="true">→</span></Link>
            <p className="mt-5 text-sm leading-relaxed text-snow/80">{projectPriceSignal}</p>
          </Reveal>
          <div className="self-center border-t border-snow/20">
            {services.map((service, i) => (
              <Reveal as="article" delay={i * 90} key={service.number} className="group grid gap-5 border-b border-snow/20 py-8 sm:grid-cols-[80px_1fr_1fr] sm:py-10">
                <span className="font-mono text-xs text-brand-on-dark">{service.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                <p className="text-sm leading-relaxed text-snow/60">{service.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="about-heading" className="bg-brand px-5 py-20 text-snow sm:px-8 lg:px-14 lg:py-28">
        <div className="grid items-end gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal><p className={`${eyebrow} mb-6 text-snow`}>About</p></Reveal>
            <Reveal delay={80}><h2 id="about-heading" className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Senior thinking. Sharp execution. No slow handoffs.</h2></Reveal>
          </div>
          <dl className="flex gap-10 border-t border-snow/30 pt-6 lg:block">
            {["Stat one", "Stat two"].map((label) => (
              <div key={label} className="lg:mb-10">
                <dt className="text-sm text-snow">{label} — placeholder</dt>
                <dd className="text-5xl font-semibold">00<span className="sr-only"> (placeholder value)</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
