"use client";

import { useEffect, useMemo, useState } from "react";
import Silk from "@/components/Silk";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import { cn, formatPrice } from "@/lib/utils";
import Float from "@/components/fancy/blocks/float";
import ScrambleHover from "@/components/fancy/text/scramble-hover";
import NumberTicker from "@/components/fancy/text/basic-number-ticker";

/* ---------- Types & initial data ---------- */

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

type ToastState = { visible: boolean; message: string };

const PRODUCTS = [
  {
    id: "midnight-velvet",
    name: "Midnight Velvet",
    tagline: "Oud • Leather • Amber",
    price: 285,
    image: "/globe.svg",
    size: "100ml",
    description:
      "A midnight elixir wrapping skin in velvet oud, sun-worn leather and a single strand of smoked amber.",
  },
  {
    id: "ivory-dusk",
    name: "Ivory Dusk",
    tagline: "Iris • White Musk • Sandalwood",
    price: 245,
    image: "/window.svg",
    size: "75ml",
    description:
      "Cool iris petals unfurl into sandalwood and a whisper of white musk, catching light like dusk on marble.",
    reverse: true,
  },
  {
    id: "noir-absolu",
    name: "Noir Absolu",
    tagline: "Tonka • Black Pepper • Fig",
    price: 320,
    image: "/file.svg",
    size: "100ml",
    description:
      "Bold tonka is cut with black pepper and ripe fig for a scent that lingers after the room goes quiet.",
  },
] as const;

/* ---------- Page ---------- */

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2200);
  };

  const addToCart = (product: (typeof PRODUCTS)[number]) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found)
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name}`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increment = (id: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const decrement = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="min-h-screen bg-ink text-bone-dim">
      {/* ==================== TOAST ==================== */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed right-6 top-24 z-50 translate-y-0 transition-all duration-300 md:right-10",
          toast.visible ? "opacity-100" : "pointer-events-none opacity-0 translate-y-2",
        )}
      >
        <div className="rounded-full border border-gold/70 bg-ink-soft px-5 py-3 text-[11px] font-mono uppercase tracking-wider text-bone shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]">
          {toast.message}
        </div>
      </div>

      {/* ==================== NAV ==================== */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ink-soft/60 bg-ink/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl tracking-wide text-bone sm:text-[26px]">
            Maison Ode
          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.24em] md:flex">
            <a href="#products" className="text-bone-dim transition-colors duration-300 hover:text-gold">
              <ScrambleHover text="Collection" scrambleSpeed={35} className="text-[11px] font-medium uppercase tracking-[0.24em]" />
            </a>
            <a href="#ritual" className="text-bone-dim transition-colors duration-300 hover:text-gold">
              <ScrambleHover text="Ritual" scrambleSpeed={35} className="text-[11px] font-medium uppercase tracking-[0.24em]" />
            </a>
            <a href="#philosophy" className="text-bone-dim transition-colors duration-300 hover:text-gold">
              <ScrambleHover text="Philosophy" scrambleSpeed={35} className="text-[11px] font-medium uppercase tracking-[0.24em]" />
            </a>
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-3 rounded-full border border-ink-soft bg-ink-soft/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-bone transition-colors duration-300 hover:border-gold/50 hover:text-gold"
          >
            <span className="hidden sm:inline">Cart</span>
            {cartCount !== 0 && (
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
            )}
            {cartCount !== 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold/20 px-1.5 text-[10px] font-mono text-gold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative isolate min-h-[88vh] w-full overflow-hidden bg-[#060606]">
        <div className="absolute inset-0">
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#060606_62%)]"
        />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
          <SplitText
            text="Maison Ode"
            className="font-['Cormorant_Garamond',Georgia,serif] text-5xl font-medium uppercase tracking-wide text-[#e8e0d4] sm:text-6xl md:text-7xl"
            delay={50}
            duration={1.25}
            splitType="chars"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8ad9a]/90 sm:text-lg">
            Parfums d&apos;ombre et de lumiere. Crafted in Grasse for those who move between poetry and provocation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#c9a96e]/60 px-7 text-sm font-medium uppercase tracking-widest text-[#e8e0d4] transition-colors duration-300 hover:border-[#e3c47d] hover:text-[#e3c47d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/60"
            >
              Explore the collection
            </a>
            <a
              href="#philosophy"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#b8ad9a]/30 px-7 text-sm font-medium uppercase tracking-widest text-[#b8ad9a] transition-colors duration-300 hover:border-[#b8ad9a] hover:text-[#e8e0d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ad9a]/50"
            >
              Our story
            </a>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent"
        />
      </section>

      {/* ==================== PRODUCTS ==================== */}
      <section id="products" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <ScrollReveal containerClassName="font-display text-4xl uppercase tracking-wide text-bone md:text-5xl" textClassName="font-display text-4xl uppercase tracking-wide text-bone md:text-5xl inline-block">
              The Collection
            </ScrollReveal>
            <p className="mt-4 font-body text-bone/90">
              Three silences. Three intensities. Three ways to become the air in the room.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <SpotlightCard key={product.id} className="!p-0">
                <div className="flex flex-col">
                  <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-b from-ink-soft/80 to-ink/60 p-8">
                    <Float className="flex h-full w-full items-center justify-center">
                      <svg viewBox="0 0 120 160" className="h-32 w-20 drop-shadow-[0_0_18px_rgba(201,169,110,0.35)]">
                        <defs>
                          <linearGradient id="bottle" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0" stopColor="#e8e0d4" stopOpacity="0.95" />
                            <stop offset="0.5" stopColor="#b8ad9a" stopOpacity="0.85" />
                            <stop offset="1" stopColor="#7b756e" stopOpacity="0.95" />
                          </linearGradient>
                          <linearGradient id="cap" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0" stopColor="#c9a96e" />
                            <stop offset="1" stopColor="#7b5f3a" />
                          </linearGradient>
                        </defs>
                        <rect x="44" y="0" width="32" height="22" rx="3" fill="url(#cap)" />
                        <rect x="36" y="18" width="48" height="6" rx="1" fill="#b8ad9a" />
                        <path d="M36,26 L84,26 C92,26 98,36 98,52 L98,146 C98,152 92,158 86,158 L34,158 C28,158 22,152 22,146 L22,52 C22,36 28,26 36,26 Z" fill="url(#bottle)" />
                        <rect x="30" y="82" width="60" height="1" fill="#c9a96e" opacity="0.5" />
                        <rect x="30" y="88" width="60" height="1" fill="#c9a96e" opacity="0.35" />
                      </svg>
                    </Float>
                  </div>
                  <div className="border-t border-ink-soft/70 p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-dim">
                        {product.size} • EdP
                      </p>
                      <span className="font-mono text-[13px] text-gold">{formatPrice(product.price)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-bone-dim">{product.description}</p>
                    <div className="mt-5">
                      <button
                        onClick={() => addToCart(product)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-gold/60 bg-gold/10 px-5 text-[11px] font-medium uppercase tracking-[0.28em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                      >
                        Add to bag
                      </button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PHILOSOPHY ==================== */}
      <section id="philosophy" className="border-t border-ink-soft/40 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal containerClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-gold" textClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-gold inline-block">
            Philosophy
          </ScrollReveal>
          <h2 className="mt-6 font-display text-4xl uppercase tracking-wide text-bone md:text-[44px]">
            More than fragrance. Memory before it becomes memory.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-bone-dim">
            Each Maison Ode composition is built around a single emotional landscape. We work only with
            small-batch extractions, natural absolutes and the quiet endurance of wood. There is no
            noise in our accords — only the things that matter when the lights go down.
          </p>
        </div>
      </section>

      {/* ==================== MANIFESTO ==================== */}
      <section className="relative overflow-hidden border-y border-ink-soft/50 py-28 md:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ink to-transparent"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.12) 0%, rgba(6,6,6,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-gold-bright">Manifesto</span>
          <blockquote className="mx-auto mt-8 font-display text-3xl italic leading-snug text-bone md:text-[38px]">
            &ldquo;The most intimate accessory you will ever wear.<br className="hidden sm:block" />&nbsp;It touches
            only the people you allow close.&rdquo;
          </blockquote>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-bone-dim">
            Jean-Marie Ode, Paris 2014
          </p>
        </div>
      </section>

      {/* ==================== RITUAL ==================== */}
      <section id="ritual" className="border-b border-ink-soft/40 py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <ScrollReveal containerClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-gold" textClassName="font-mono text-[10px] uppercase tracking-[0.36em] text-gold inline-block">
              Ritual
            </ScrollReveal>
            <h2 className="mt-6 font-display text-4xl uppercase tracking-wide text-bone md:text-5xl">
              Three moments. One evening.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-14">
            {[
              { step: "01", title: "Anoint", text: "Apply to clean skin at the pulse: wrists, nape, inner elbow. Let warmth wake the top notes." },
              { step: "02", title: "Breathe", text: "Wait thirty seconds. Let the alcohol lift so the heart of the fragrance can speak clearly." },
              { step: "03", title: "Remember", text: "Do not over-apply. The object is not to announce yourself but to stay." },
            ].map(({ step, title, text }) => (
              <div key={step} className="relative rounded-3xl border border-ink-soft/70 bg-ink-soft/40 p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">{step}</span>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-wide text-bone">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">{text}</p>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-bone/[0.04] to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-b border-ink-soft/40 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Natural absolutes", value: null },
              { label: "Founded", value: 2014 },
              { label: "Formulations", value: 3 },
              { label: "Carbon neutral", value: null },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                {value ? (
                  <NumberTicker
                    from={0}
                    target={value}
                    transition={{ duration: 3, type: "tween", ease: "easeInOut" }}
                    className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-dim"
                  />
                ) : (
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-dim">
                    {label}
                  </p>
                )}
                {value ? (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim/70">{label}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-ink-soft/50 bg-ink-soft/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <p className="font-display text-2xl tracking-wide text-bone">Maison Ode</p>
              <p className="mt-3 text-sm text-bone-dim">
                Parfumerie d&apos;attention.<br />
                Paris • New York • Tokyo
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Fragrances</p>
              <ul className="mt-4 space-y-2 text-sm text-bone-dim">
                <li>Midnight Velvet</li>
                <li>Ivory Dusk</li>
                <li>Noir Absolu</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">House</p>
              <ul className="mt-4 space-y-2 text-sm text-bone-dim">
                <li>Story</li>
                <li>Atelier</li>
                <li>Journal</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Client care</p>
              <ul className="mt-4 space-y-2 text-sm text-bone-dim">
                <li>Contact</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
              <p className="mt-4 font-mono text-[11px] text-bone-dim">care@maisonode.com</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-ink-soft/60 pt-8 text-[11px] font-mono uppercase tracking-[0.24em] text-bone-dim md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Maison Ode. All rights reserved.</span>
            <span>Crafted with restraint.</span>
          </div>
        </div>
      </footer>

      {/* ==================== CART OVERLAY ==================== */}
      <div
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
        data-cart-overlay
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* ==================== CART DRAWER ==================== */}
      <aside
        aria-label="Shopping bag"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex max-w-md w-full translate-x-0 flex-col border-l border-ink-soft/70 bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] transition-transform duration-300 md:translate-x-0",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ display: cartOpen ? "flex" : "none" }}
      >
        <div className="flex items-center justify-between border-b border-ink-soft/70 px-6 py-5">
          <p className="font-display text-xl uppercase tracking-wide text-bone">Your bag</p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-bone-dim">{cartCount} {cartCount === 1 ? "item" : "items"}</span>
            <button
              onClick={() => setCartOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-soft text-bone-dim transition-colors duration-300 hover:border-gold hover:text-gold"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <span aria-hidden="true" className="h-24 w-24 rounded-full border border-ink-soft/60 bg-ink-soft/50" />
              <p className="max-w-xs text-sm text-bone-dim">Your bag is quiet.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-full border border-gold/60 px-6 text-[11px] font-medium uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[80px_1fr_auto] items-start gap-4 rounded-2xl border border-ink-soft/50 bg-ink-soft/40 p-3"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-ink-soft">
                    <div className="h-14 w-14 rounded-full bg-bone/8" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-base uppercase text-bone">{item.name}</p>
                      <span className="font-mono text-[12px] text-gold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-dim">{item.size}</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-ink-soft/60 bg-ink-soft/60 px-1">
                      <button
                        onClick={() => decrement(item.id)}
                        className="flex h-7 w-7 items-center justify-center text-bone-dim transition-colors duration-300 hover:text-bone"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-[18px] text-center text-[11px] font-mono text-bone">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="flex h-7 w-7 items-center justify-center text-bone-dim transition-colors duration-300 hover:text-bone"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from bag`}
                      className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-soft/70 text-bone-dim transition-colors duration-300 hover:border-gold/70 hover:text-gold active:scale-95"
                    >
                      <span className="text-xs transition-transform duration-300 group-hover:rotate-90">✕</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length !== 0 && (
          <div className="border-t border-ink-soft/70 px-6 py-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-bone-dim">
                <span>Subtotal</span>
                <span className="font-mono text-bone">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-bone-dim">
                <span>Shipping</span>
                <span className="font-mono text-bone-dim">Complimentary</span>
              </div>
              <div className="flex items-center justify-between border-t border-ink-soft/60 pt-3 text-bone">
                <span className="font-display text-base uppercase">Total</span>
                <span className="font-mono text-[13px] text-gold">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold font-mono text-[11px] uppercase tracking-[0.32em] text-ink transition-colors duration-300 hover:bg-gold-bright">
              Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full border border-ink-soft/70 text-[11px] font-mono uppercase tracking-[0.24em] text-bone-dim transition-colors duration-300 hover:border-gold/50 hover:text-gold"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
