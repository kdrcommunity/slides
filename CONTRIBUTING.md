## Contributing to kdrcommunity-slides

Thanks for your interest in improving the **kdrcommunity-slides** project.  
This repo is intentionally **simple**: pure HTML, CSS, and JavaScript with **no build step**.

---

## Project structure

- **`index.html`**  
  Main entry point and all slide markup. Each slide is a `<section>` with:
  - `class="slide slide-N"`
  - `data-slide="N-1"` (zero-based index)

- **`style.css`**  
  - Global styles and color tokens (CSS variables in `:root`)
  - Layout and animations for each slide
  - Navigation, dots, and keyboard hint styling

- **`main.js`**  
  - Slide navigation logic (`goTo`, `next`, `prev`)
  - Keyboard navigation (arrow keys, space)
  - Touch / swipe navigation
  - Typing effect for the “Digital / Data / Designer / Developer” text
  - Hides the keyboard hint after first interaction

- **`README.md`**  
  High-level overview and how to run/preview the slides.

There are **no Node.js/Bun dependencies** or bundlers. The site runs directly in the browser.

---

## Running / previewing locally

You can simply open `index.html` in your browser, or (recommended) use a small static server.

- **Option 1 – Open directly**  
  - Double-click `index.html` from your file explorer, or  
  - Drag `index.html` into your browser window.

- **Option 2 – Simple static server (recommended for presenting)**  

  From the project root:

  ```bash
  python -m http.server 8000
  ```

  Then open `http://localhost:8000/index.html`.

---

## How to add or edit slides

All slides live inside `index.html` as `<section>` blocks.

### Adding a new slide

1. **Duplicate an existing slide** block in `index.html`, for example:
   - Copy the whole `<!-- SLIDE X: ... -->` comment and the following `<section class="slide ...">...</section>`.
2. **Update slide attributes**:
   - `class="slide slide-N"` → increment `N` (e.g. `slide-7`).
   - `data-slide="N-1"` → keep it zero-based (e.g. `data-slide="6"` for slide 7).
3. **Update any labels inside the slide**:
   - E.g. `.slide-label` text like `05` → increase to match the new order.
4. **Adjust content** (headings, paragraphs, icons) to match the story you want.

The navigation dots and counter are created **automatically** by `main.js` from the number of `.slide` elements, so you do **not** need to change the JavaScript when you add/remove slides.

### Editing an existing slide

1. Open `index.html`.
2. Find the slide section by its comment (e.g. `<!-- SLIDE 3: Timeline -->`).
3. Edit only the content (headings, text, icons) and keep:
   - `class="slide slide-N"`
   - `data-slide="N-1"`
   - The slide layout structure (wrapping `div`s) as much as possible.

If you need a totally different layout, prefer:

- Reusing existing utility classes and patterns from `style.css`.
- Adding **slide-specific** classes like `.slide-7-new-layout` instead of changing global styles.

---

## Styling conventions (`style.css`)

- **Colors & tokens**
  - Use the CSS variables defined in `:root` (e.g. `var(--yellow-400)`, `var(--dark)`) instead of hard-coded hex values where possible.

- **Class naming**
  - Use **kebab-case** for class names: `new-section-title`, `timeline-card-icon`.
  - For slide-specific styles, prefix with the slide class when appropriate  
    (e.g. `.slide-3 .timeline-card { ... }`).

- **Layout & responsiveness**
  - Prefer flexbox/grid layouts similar to existing sections (`.title-layout`, `.who-grid`, etc.).
  - Avoid fixed pixel widths where not necessary; follow existing responsive patterns.

- **Animations**
  - Reuse or extend existing keyframes and transitions when possible.
  - Keep animations subtle and performance‑friendly (no excessive box-shadows or large blur filters).

---

## JavaScript conventions (`main.js`)

- Keep everything **framework‑free** and **vanilla JS**.
- Prefer small, focused functions instead of large monoliths.
- When adding behavior:
  - Reuse the existing navigation API (`goTo`, `next`, `prev`) instead of reinventing it.
  - Avoid global variables unless they are part of the existing navigation state.
  - Guard DOM access with simple checks (like the `typing-word` element check).

If you introduce new features (e.g. auto-play, URL hash navigation), keep them:

- Optional (do not break the existing experience).
- Clearly commented.

---

## Git and PR workflow

We follow a simple, lightweight workflow.

1. **Fork or create a feature branch**
   - From `main`, create a branch like:
     - `feature/add-speaker-slide`
     - `fix/mobile-spacing`

2. **Make focused changes**
   - Keep changes small and related (e.g. “add new slide” or “tweak typography”, not both at once).

3. **Commit messages**
   - Use clear, descriptive messages, for example:
     - `feat: add activities slide`
     - `fix: improve mobile timeline spacing`
     - `chore: tidy styles for slide 1`

4. **Open a Pull Request**
   - Describe **what** you changed and **why**.
   - Mention any visual or behavioral changes (screenshots/gifs are helpful).

5. **Code review**
   - Be open to feedback and iteration.
   - Keep the tone friendly and collaborative — this is a community project.

---

## Questions / Help

If you are unsure about anything:

- Open a discussion or issue in the repository, or
- Reach out via the official community channels (website or social links in the last slide).

Happy contributing! 🎉

