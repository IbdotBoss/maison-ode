# Noir Components

Reusable noir-themed motion components for landing pages, built on Framer Motion and Tailwind v4.

## Install/use

These components are already importable from:

```tsx
import { HeroSilk, SpotlightCard } from "~/components/noir";
```

## HeroSilk

```tsx
<HeroSilk
  eyebrow="Spring Edition"
  title="Woven in"
  titleAccent="Silk Shadow"
  subtitle="A short sentence describing the moment in 2 lines."
  primaryCta={{ label: "Explore", href: "/shop" }}
  secondaryCta={{ label: "Lookbook", href: "/lookbook" }}
/>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| eyebrow | `string` | `"The New Collection"` | Small capsule line above the headline. |
| title | `string` | `"Woven in"` | First headline row. |
| titleAccent | `string` | `"Silk Shadow"` | Second headline row. |
| subtitle | `string` | `"..."` | Supporting copy. |
| primaryCta | `{label: string; href: string}` | `undefined` | Primary action button. |
| secondaryCta | `{label: string; href: string}` | `undefined` | Secondary action button. |

### Notes

- Uses `useReducedMotion` for accessibility. Orbs are `aria-hidden`.
- Typography relies on a `Cormorant Garamond` style display font mapped through Tailwind utilities (`font-['Cormorant_Garamond',Georgia,serif]`). Map your site font stack in `globals.css` accordingly.

## SpotlightCard

```tsx
<SpotlightCard
  title="Midnight Atelier"
  description="Shadow-draped tailoring with bone buttons and gold hardware."
  href="#"
  hrefLabel="View"
  radius={180}
  className="max-w-md"
/>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `undefined` | Card heading. |
| description | `string` | `undefined` | Body text. |
| href | `string` | `undefined` | Link target. |
| hrefLabel | `string` | `"View"` | Link text/aria-label. |
| radius | `number` | `180` | Spotlight radius in px. |
| className | `string` | `undefined` | Extra Tailwind classes. |
| children | `ReactNode` | `undefined` | Slot for custom body content. |

### Notes

- Decorative spotlight is `aria-hidden="true"`.
- Motion is restrained: spring scale only, duration ~0.45s.
