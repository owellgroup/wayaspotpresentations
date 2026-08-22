# Wayaspot Pitch Deck

Investor pitch deck for Wayaspot, built with [Astro](https://astro.build).

## Quick view (no install)

If you only need to present the deck right now, open this file in your browser:

```
wayaspot-pitch-deck_1.html
```

Keep `wayaspot-logo.png` in the same folder. No Node.js required.

---

## Install Node.js first (required for Astro)

If you see `'npm' is not recognized`, Node.js is not installed yet.

### Windows — recommended

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (green button)
3. Run the installer — accept defaults (include **npm** and **Add to PATH**)
4. **Close and reopen** your terminal (or Cursor)
5. Verify:

```bash
node -v
npm -v
```

You should see version numbers (e.g. `v22.x.x` and `10.x.x`).

### After Node.js is installed

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

Static output is generated in `dist/`.

## Project structure

- `src/pages/index.astro` — main deck page
- `src/components/DeckSlides.html` — slide markup (extracted from the original HTML deck)
- `src/styles/deck.css` — presentation styles
- `src/scripts/deck.ts` — slide navigation and scaling
- `public/wayaspot-logo.png` — brand logo

## Updating slides

Edit `wayaspot-pitch-deck_1.html`, then run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/extract-deck.ps1
```

This refreshes `src/components/DeckSlides.html` from the source deck.
