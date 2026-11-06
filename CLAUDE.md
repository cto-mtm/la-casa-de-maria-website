# La Casa de María — Website

## Project Structure

- `www/` — Nuxt 4 marketing website
- `firebase/` — Firebase Hosting config + Cloud Functions
- `docs/` — Internal documentation

## Development

- **Do not** run `nuxi build`, `npm run build`, or any build commands unless explicitly asked.
- **Do not** prompt the user asking if they would like to run a build.
- The dev server (`npm run dev`) is managed by the user separately.
- Use `npm` as the package manager (not yarn or pnpm).

## Brand & Design System

### Colors
- **Antique Gold** `#C2A45A` — Buttons, accents, dividers, icons
- **Warm Ivory** `#FAFAF5` — Main background
- **Charcoal** `#2A2925` — Primary text (never use pure black)
- **Stone** `#EFECE4` — Section separators, card backgrounds

### Typography
- **Cormorant Garamond** — Display headings (H1, H2), room names. Always uppercase or title case.
- **Montserrat** — Navigation, buttons, labels, subheaders. Uppercase with `letter-spacing: 0.15em`.
- **Lora** — Body paragraphs, long-form text. Warm serif for readability.

### UI Elements
- Buttons: Solid gold (`btn-brand`) or outlined ghost (`btn-brand-outline`)
- Dividers: 1px lines in gold (`brand-divider`, `brand-divider-centered`)
- Images: Subtle 1px gold border framing, no drop shadows

## Nuxt & i18n Guardrails
- **Internationalized Routing:** NEVER hardcode standard links (e.g., `<NuxtLink to="/about">`). You must ALWAYS use `localePath()` for internal navigation (e.g., `<NuxtLink :to="localePath('rooms')">`) so the i18n module can correctly route users based on their active language.
- **Supported languages:** English (default), Spanish

## Agent Guidance (Modern Web Standards)
- **Zero Legacy Bloat:** Prioritize modern, native browser APIs over legacy libraries or polyfills.
- **WebMCP:** When building forms or interactive components, utilize WebMCP annotations (Declarative API) so the site's features are exposed as structured tools for browser-based AI agents.
- **Accessibility:** All forms MUST use proper `<form>` wrappers, explicit `<label for="id">` tags, and `aria-describedby` for validation hints/errors.
