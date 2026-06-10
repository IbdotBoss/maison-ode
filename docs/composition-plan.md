# COMPOSITION PLAN — Maison Ode lookbook

Hero scale: Giant Statement
Sections:
  1. Hero — anchor: cinema, background: Silk motion canvas, layout: centered low stack
  2. Manifesto — anchor: words, background: full-bleed dark tone with radial light, layout: oversized centered quote
  3. Collection — anchor: bottles, background: ink surface, layout: asymmetric 2+1 editorial grid
  4. Ritual — anchor: moments, background: ink-soft surface, layout: horizontal stacked timeline
  5. Philosophy — anchor: voice, background: ink surface with thin gold rule, layout: single centered statement with pull quote
  6. Footer — anchor: close, background: ink-soft surface, layout: expanded tonal close with tagline + care info

Variety check: passed — 6 distinct layout families (centered stack, full-bleed quote, asymmetric grid, horizontal timeline, centered statement, expanded footer)

Media plan:
- Hero: Silk reactive shader; CSS noise grain overlay for tactile feel
- Manifesto: no external media, atmospheric radial only
- Collection: inline bottle SVG artwork per product, no placeholder gradients
- Ritual: typographic only
- Philosophy: typographic only
- Footer: typographic only

Anti-slop checks:
- No eyebrow labels on every section
- No scroll cue
- No decorative dividers between every section
- No identical card grid repeated in adjacent sections (collection grid, then ritual grid)
- No rounded-corner image boxes everywhere
- Hero stack discipline: headline + subtext + 2 CTAs max

Library component assignment:
- Silk: hero background
- ScrollReveal: section taglines
- SpotlightCard: product cards
- Float: product bottle motion
- ScrambleHover: removed from nav (animation friction risk)
- NumberTicker: removed from trust strip (doesn't serve the lookbook goal)
