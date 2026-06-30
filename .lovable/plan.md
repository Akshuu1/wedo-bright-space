# WeDo — Cinematic Studio Site

A dark, editorial, motion-led site inspired by Nudot's structure and pacing — rebuilt around WeDo's brand (Design. Develop. Automate.). Not a 1:1 copy: composition, typography rhythm, and asset library are original.

## Visual direction

- **Palette**: near-black canvas `#0A0A0A`, off-white type `#F2EFEA`, muted gunmetal `#1A1A1C`, single warm accent (molten amber `#E8A24B`) used sparingly for hover/active states and index numerals.
- **Typography**: editorial display serif (Instrument Serif) paired with a precise mono (JetBrains Mono) for labels/counters, and a clean sans (Inter Tight) for body. Mixed-script feel mimics the EN/中文 duality of the reference without copying its words.
- **Texture**: subtle film-grain overlay, generous negative space, large numeric section indices ([ 00 ] … [ 05 ]), thin hairline dividers, captioned brackets like `( Brand Direction )`.
- **Motion**: custom blended-difference cursor, route transitions via a black curtain wipe, scroll-triggered word/letter reveals, infinite marquee strip, hover-image preview in nav, smooth lenis-style scroll.

## Pages (routes)

```
src/routes/
  __root.tsx           shell: cursor, curtain transition, grain, nav, footer
  index.tsx            / — hero, services teaser, featured work, marquee, contact CTA
  about.tsx            /about — studio manifesto, capabilities, principles
  work.tsx             /work — case-study archive grid (filterable by service)
  work.$slug.tsx       /work/:slug — case study detail (hero, brief, gallery)
  labs.tsx             /labs — experiments / R&D tiles
  contact.tsx          /contact — email, phone, project inquiry form
  story.tsx            /story — UNIQUE cinematic scroll page (see below)
```

Each route ships its own `head()` metadata (title, description, og:title, og:description). `work.$slug` derives og:image from the case hero.

## The "Story" page (cinema-style)

`/story` is a vertical-scroll narrative told in acts, like a film:

- **Act I — Cold Open**: fullscreen black, single line fades in ("In 2024, a small team asked: what if shipping software felt like making a film?"). Letter-by-letter reveal driven by scroll.
- **Act II — The Crew**: split-screen portraits with names sliding in opposite directions; pinned scrub.
- **Act III — The Craft**: horizontal scroll-jacked strip of 5 process "scenes" (Discover → Design → Develop → Automate → Ship), each with a numbered slate (`SCENE 03 / TAKE 01`).
- **Act IV — The Work**: parallax stack of project stills that snap forward.
- **Act V — The Promise**: closing title card, credits-roll-style scrolling list of services & clients, fade to black with an end-card CTA to `/contact`.

Built with native `IntersectionObserver` + CSS transforms + Motion (Framer Motion) for pinning/scrubbing. No heavy 3D — feasible in the Worker SSR environment.

## Hero (home)

I'll wire all three centerpieces and leave them switchable via a single prop so you can pick the keeper:

1. **AI-generated chrome "W" hero image** (premium imagegen, dark studio render).
2. **`<video>` slot** with a still poster (you drop in a clip later).
3. **Pure-canvas particle/metaball motion** behind the wordmark.

A small floating card in the corner (`HERO: 01 / 02 / 03`) cycles them so you can compare live; once you call it, I lock the winner and remove the switcher.

## Interactions (Full polish)

- Custom cursor: small dot + lagging ring, `mix-blend-mode: difference`, grows on link hover, morphs into "VIEW" on work tiles.
- Page transitions: black panel slides up over outgoing route, lifts on incoming — implemented via a transition layer in `__root.tsx` keyed on `location.pathname` using Motion's `AnimatePresence`.
- Nav: hover any item to swap the hero corner image to that section's preview (matches the reference's hover-image nav).
- Marquee: infinite horizontal strip of services + dots, pauses on hover.
- Scroll reveals: words split into spans, staggered translateY + opacity on enter.
- Smooth scroll: lightweight rAF-based smoother (no Lenis dep) to keep the bundle lean and Worker-safe.

## Content blocks per page

- **Home**: `[00] index.html` slate → hero → `( Services )` 4-line list → featured work (3 tiles) → marquee → manifesto quote → contact strip.
- **About**: manifesto paragraphs, capabilities grid (6 services), principles (4 numbered), team teaser.
- **Work**: filter chips (All / Web / Mobile / 3D / Automation), archive list rows with hover image preview (year, client, tags).
- **Work detail**: oversized title, brief, role, year, gallery, next-case link.
- **Labs**: experimental tiles (canvas demos, mini interactions).
- **Contact**: huge `hello@wedo…` mailto, phone, inquiry form (name, company, budget, message) — stored locally for now (no backend in this plan; ask if you want Lovable Cloud added later).
- **Story**: as described above.

## Tech notes

- TanStack Start v1 file routing; `<Link to>` everywhere; each route's `Route.head()` set.
- `motion` (Framer Motion) for transitions & pinned sections — `bun add motion`.
- Fonts via `@fontsource/instrument-serif`, `@fontsource/inter-tight`, `@fontsource/jetbrains-mono` imported in `src/start.ts` (no remote `@import`).
- Design tokens (palette, radii, shadows, grain) defined in `src/styles.css` under `@theme` + `:root`; no hardcoded colors in components.
- Hero image generated with `imagegen` (premium) saved to `src/assets/`; case-study + labs imagery generated as needed.
- All animation respects `prefers-reduced-motion` (custom cursor + transitions degrade gracefully).
- Form submits to a no-op handler with a toast; backend can be wired later with Lovable Cloud if you want persistence.

## Build order

1. Tokens, fonts, global shell (grain, cursor, curtain transition, nav, footer).
2. Home with all three hero variants + switcher.
3. About, Work archive, Work detail template (1 sample case), Labs, Contact.
4. `/story` cinematic page.
5. Polish pass: reveals, marquee, hover-image nav, reduced-motion fallbacks, SEO metadata.

After build I'll point you to the hero switcher so you can pick the keeper.
