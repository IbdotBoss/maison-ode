"use client";

import { useEffect, useMemo, useState } from "react";
import Silk from "@/components/Silk";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import { cn, formatPrice } from "@/lib/utils";
import Float from "@/components/fancy/blocks/float";
import Particles from "@/components/Particles";

/* ---------- Types & initial data ---------- */

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

type ToastState = { visible: boolean; message: string };

const PRODUCTS = [
  {
    id: "midnight-velvet",
    name: "Midnight Velvet",
    price: 285,
    size: "100ml",
    description:
      "A midnight elixir wrapping skin in velvet oud, sun-worn leather and a single strand of smoked amber.",
  },
  {
    id: "ivory-dusk",
    name: "Ivory Dusk",
    price: 245,
    size: "75ml",
    description:
      "Cool iris petals unfurl into sandalwood and a whisper of white musk, catching light like dusk on marble.",
  },
  {
    id: "noir-absolu",
    name: "Noir Absolu",
    price: 320,
    size: "100ml",
    description:
      "Bold tonka is cut with black pepper and ripe fig for a scent that lingers after the room goes quiet.",
  },
] as const;

const RITUAL_STEPS = [
  { step: "01", title: "Anoint", text: "Apply to clean skin at the pulse: wrists, nape, inner elbow. Let warmth wake the top notes." },
  { step: "02", title: "Breathe", text: "Wait thirty seconds. Let the alcohol lift so the heart of the fragrance can speak clearly." },
  { step: "03", title: "Remember", text: "Do not over-apply. The object is not to announce yourself but to stay." },
];

/* ---------- Page ---------- */

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2200);
  };

  const addToCart = (product: (typeof PRODUCTS)[number]) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name}`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increment = (id: string) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrement = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e8e0d4]">
      {/* Custom cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference"
        style={{ opacity: 0.6 }}
      >
        <div
          className="absolute h-3 w-3 rounded-full bg-[#e8e0d4]"
          style={{
            transform: `translate(${cursorPos.x - 6}px, ${cursorPos.y - 6}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />
      </div>

      {/* ==================== TOAST ==================== */}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed right-6 top-24 z-50 translate-y-0 transition-all duration-300 md:right-10",
          toast.visible ? "opacity-100" : "pointer-events-none opacity-0 translate-y-2",
        )}
      >
        <div className="rounded-full border border-[#a68a64]/60 bg-[#0d0c0b] px-5 py-3 text-[11px] font-mono uppercase tracking-wider text-[#e8e0d4]">
          {toast.message}
        </div>
      </div>

      {/* ==================== NAV ==================== */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#a68a64]/20 bg-[#0a0a0a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="font-display text-2xl tracking-wide text-[#e8e0d4] sm:text-[26px]">
            Maison Ode
          </a>
          <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.28em] md:flex">
            <a href="#manifesto" className="text-[#b8ad9a] transition-colors duration-500 hover:text-[#e8e0d4]">Manifesto</a>
            <a href="#collection" className="text-[#b8ad9a] transition-colors duration-500 hover:text-[#e8e0d4]">Collection</a>
            <a href="#ritual" className="text-[#b8ad9a] transition-colors duration-500 hover:text-[#e8e0d4]">Ritual</a>
            <a href="#philosophy" className="text-[#b8ad9a] transition-colors duration-500 hover:text-[#e8e0d4]">Philosophy</a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-3 rounded-full border border-[#a68a64]/40 bg-[#0d0c0b]/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#e8e0d4] transition-all duration-500 hover:border-[#e8e0d4]/60 hover:text-[#e8e0d4]"
          >
            <span className="hidden sm:inline">Cart</span>
            {cartCount !== 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a68a64]/20 px-1.5 text-[10px] font-mono text-[#e8e0d4]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-70">
          <Silk speed={2} scale={1.2} color="#5c534a" noiseIntensity={1} />
        </div>
        <div className="absolute inset-0">
          <Particles particleColors={["#a68a64", "#e8e0d4"]} particleCount={180} speed={0.2} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <SplitText
            text="Maison Ode"
            className="font-['Playfair_Display',Georgia,serif] text-5xl font-medium uppercase tracking-wide text-[#e8e0d4] sm:text-6xl md:text-7xl lg:text-8xl"
            delay={80}
            duration={1.6}
            splitType="chars"
          />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#b8ad9a]/90 md:text-xl">
            Parfums d&apos;ombre et de lumiere. Crafted in Grasse for those who move between poetry and provocation.
          </p>
          <div className="mt-12 flex items-center justify-center gap-5">
            <a
              href="#collection"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#a68a64]/60 bg-[#a68a64]/10 px-8 text-sm font-medium uppercase tracking-[0.2em] text-[#e8e0d4] transition-all duration-500 hover:bg-[#a68a64]/20 hover:border-[#e8e0d4]/60"
            >
              Enter the collection
            </a>
          </div>
        </div>
      </section>

      {/* ==================== MANIFESTO ==================== */}
      <section id="manifesto" className="relative border-y border-[#a68a64]/20 py-32 md:py-44">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0e0c] to-[#0a0a0a]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal
            containerClassName="font-['Playfair_Display',Georgia,serif] text-3xl italic leading-snug text-[#e8e0d4] md:text-5xl"
            textClassName="font-['Playfair_Display',Georgia,serif] text-3xl italic leading-snug text-[#e8e0d4] md:text-5xl"
          >
            The most intimate accessory you will ever wear. It touches only the people you allow close.
          </ScrollReveal>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.32em] text-[#a68a64]">Jean-Marie Ode, Paris 2014</p>
        </div>
      </section>

      {/* ==================== COLLECTION ==================== */}
      <section id="collection" className="relative bg-[#0a0a0a] py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0c0b] to-[#0a0a0a]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <ScrollReveal
              containerClassName="font-['Playfair_Display',Georgia,serif] text-4xl uppercase tracking-wide text-[#e8e0d4] md:text-6xl inline-block"
              textClassName="font-['Playfair_Display',Georgia,serif] text-4xl uppercase tracking-wide text-[#e8e0d4] md:text-6xl inline-block"
            >
              The Collection
            </ScrollReveal>
            <p className="mt-6 text-base text-[#b8ad9a]/80 md:text-lg">Three silences. Three intensities.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, idx) => (
              <SpotlightCard key={product.id} className="!rounded-none border border-[#a68a64]/10 bg-[#0f0e0c]/60">
                <div className="flex h-full flex-col">
                  <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-b from-[#1a1816] to-[#0a0a0a] p-10">
                    <Float className="flex h-full w-full items-center justify-center">
                      <svg viewBox="0 0 120 160" className="h-40 w-28 drop-shadow-[0_0_30px_rgba(166,138,100,0.4)]">
                        <defs>
                          <linearGradient id={`bottle-${product.id}`} x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0" stopColor="#e8e0d4" stopOpacity="0.95" />
                            <stop offset="0.5" stopColor="#b8ad9a" stopOpacity="0.85" />
                            <stop offset="1" stopColor="#7b756e" stopOpacity="0.95" />
                          </linearGradient>
                          <linearGradient id={`cap-${product.id}`} x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0" stopColor="#a68a64" />
                            <stop offset="1" stopColor="#6b5a44" />
                          </linearGradient>
                        </defs>
                        <rect x="44" y="0" width="32" height="22" rx="3" fill={`url(#cap-${product.id})`} />
                        <rect x="36" y="18" width="48" height="6" rx="1" fill="#b8ad9a" />
                        <path d="M36,26 L84,26 C92,26 98,36 98,52 L98,146 C98,152 92,158 86,158 L34,158 C28,158 22,152 22,146 L22,52 C22,36 28,26 36,26 Z" fill={`url(#bottle-${product.id})`} />
                        <rect x="30" y="82" width="60" height="1" fill="#a68a64" opacity="0.5" />
                        <rect x="30" y="88" width="60" height="1" fill="#a68a64" opacity="0.35" />
                      </svg>
                    </Float>
                  </div>
                  <div className="border-t border-[#a68a64]/15 p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.32em] text-[#b8ad9a]">
                        {product.size} • EdP
                      </p>
                      <span className="font-['JetBrains_Mono',monospace] text-[13px] text-[#e8e0d4]">{formatPrice(product.price)}</span>
                    </div>
                    <h3 className="mt-3 font-['Playfair_Display',Georgia,serif] text-xl uppercase tracking-wide text-[#e8e0d4]">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#b8ad9a]/80">{product.description}</p>
                    <div className="mt-6">
                      <button
                        onClick={() => addToCart(product)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#a68a64]/50 bg-transparent px-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#e8e0d4] transition-all duration-500 hover:border-[#e8e0d4]/80 hover:bg-[#e8e0d4]/5"
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

      {/* ==================== RITUAL ==================== */}
      <section id="ritual" className="relative border-y border-[#a68a64]/20 bg-[#0f0e0c] py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0e0c] to-[#0a0a0a]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <ScrollReveal
              containerClassName="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.36em] text-[#a68a64] inline-block"
              textClassName="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.36em] text-[#a68a64] inline-block"
            >
              Ritual
            </ScrollReveal>
            <h2 className="mt-6 font-['Playfair_Display',Georgia,serif] text-4xl uppercase tracking-wide text-[#e8e0d4] md:text-5xl">
              Three moments. One evening.
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-16">
            {RITUAL_STEPS.map(({ step, title, text }) => (
              <div key={step} className="relative border-t border-[#a68a64]/30 pt-8">
                <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.32em] text-[#a68a64]">{step}</span>
                <h3 className="mt-4 font-['Playfair_Display',Georgia,serif] text-3xl uppercase tracking-wide text-[#e8e0d4]">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#b8ad9a]/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PHILOSOPHY ==================== */}
      <section id="philosophy" className="relative bg-[#0a0a0a] py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0e0c] to-[#0a0a0a]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal
            containerClassName="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.36em] text-[#a68a64] inline-block"
            textClassName="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.36em] text-[#a68a64] inline-block"
          >
            Philosophy
          </ScrollReveal>
          <h2 className="mx-auto mt-10 max-w-3xl font-['Playfair_Display',Georgia,serif] text-3xl uppercase tracking-wide text-[#e8e0d4] md:text-5xl lg:text-6xl">
            More than fragrance. Memory before it becomes memory.
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#b8ad9a]/80">
            Each Maison Ode composition is built around a single emotional landscape. We work only with small-batch extractions, natural absolutes and the quiet endurance of wood. There is no noise in our accords — only the things that matter when the lights go down.
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[#a68a64]/20 bg-[#0f0e0c] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <p className="font-['Playfair_Display',Georgia,serif] text-2xl tracking-wide text-[#e8e0d4]">Maison Ode</p>
              <p className="mt-4 text-sm text-[#b8ad9a]/80">
                Parfumerie d&apos;attention.<br />
                Paris • New York • Tokyo
              </p>
            </div>
            <div>
              <p className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.28em] text-[#a68a64]">Fragrances</p>
              <ul className="mt-5 space-y-3 text-sm text-[#b8ad9a]/80">
                <li>Midnight Velvet</li>
                <li>Ivory Dusk</li>
                <li>Noir Absolu</li>
              </ul>
            </div>
            <div>
              <p className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.28em] text-[#a68a64]">House</p>
              <ul className="mt-5 space-y-3 text-sm text-[#b8ad9a]/80">
                <li>Story</li>
                <li>Atelier</li>
                <li>Journal</li>
              </ul>
            </div>
            <div>
              <p className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.28em] text-[#a68a64]">Client care</p>
              <ul className="mt-5 space-y-3 text-sm text-[#b8ad9a]/80">
                <li>Contact</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
              <p className="mt-5 font-['JetBrains_Mono',monospace] text-[11px] text-[#b8ad9a]/80">care@maisonode.com</p>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-4 border-t border-[#a68a64]/15 pt-8 text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-[0.24em] text-[#b8ad9a]/60 md:flex-row md:items-center md:justify-between">
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
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-500",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* ==================== CART DRAWER ==================== */}
      <aside
        aria-label="Shopping bag"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex max-w-md w-full -translate-x-0 flex-col border-l border-[#a68a64]/20 bg-[#0f0e0c]/95 backdrop-blur-xl transition-transform duration-500 md:translate-x-0",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ display: cartOpen ? "flex" : "none" }}
      >
        <div className="flex items-center justify-between border-b border-[#a68a64]/15 px-6 py-5">
          <p className="font-['Playfair_Display',Georgia,serif] text-xl uppercase tracking-wide text-[#e8e0d4]">Your bag</p>
          <div className="flex items-center gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#b8ad9a]">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
            <button
              onClick={() => setCartOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a68a64]/40 text-[#b8ad9a] transition-all duration-300 hover:border-[#e8e0d4]/60 hover:text-[#e8e0d4]"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <span aria-hidden="true" className="h-24 w-24 rounded-full border border-[#a68a64]/30 bg-[#0a0a0a]/50" />
              <p className="max-w-xs text-sm text-[#b8ad9a]/80">Your bag is quiet.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#a68a64]/50 px-6 text-[11px] font-medium uppercase tracking-[0.28em] text-[#e8e0d4] transition-all duration-500 hover:border-[#e8e0d4]/80"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.id} className="grid grid-cols-[80px_1fr_auto] items-start gap-4 rounded-2xl border border-[#a68a64]/10 bg-[#0a0a0a]/40 p-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#1a1816]">
                    <div className="h-14 w-14 rounded-full bg-[#a68a64]/10" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-['Playfair_Display',Georgia,serif] text-base uppercase text-[#e8e0d4]">{item.name}</p>
                      <span className="font-['JetBrains_Mono',monospace] text-[12px] text-[#e8e0d4]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.28em] text-[#b8ad9a]">{item.size}</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#a68a64]/40 bg-[#0a0a0a]/60 px-1">
                      <button
                        onClick={() => decrement(item.id)}
                        className="flex h-7 w-7 items-center justify-center text-[#b8ad9a] transition-colors duration-300 hover:text-[#e8e0d4]"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-[18px] text-center text-[11px] font-['JetBrains_Mono',monospace] text-[#e8e0d4]">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="flex h-7 w-7 items-center justify-center text-[#b8ad9a] transition-colors duration-300 hover:text-[#e8e0d4]"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider text-[#b8ad9a] transition-colors duration-300 hover:text-[#e8e0d4]"
                    aria-label={`Remove ${item.name} from bag`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[#a68a64]/15 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.24em] text-[#b8ad9a]">Subtotal</span>
              <span className="font-['JetBrains_Mono',monospace] text-[13px] text-[#e8e0d4]">{formatPrice(cartTotal)}</span>
            </div>
            <p className="mt-2 text-[11px] text-[#b8ad9a]/60">Shipping calculated at checkout.</p>
            <button className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-[#a68a64]/50 bg-transparent px-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#e8e0d4] transition-all duration-500 hover:border-[#e8e0d4]/80 hover:bg-[#e8e0d4]/5">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
