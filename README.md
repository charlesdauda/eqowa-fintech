# Eqowa Fintech 🛡️

> A premium institutional digital-asset settlement UI — built end-to-end through AI-assisted development.

A multi-view React interface for a fictional fintech operating in Ghana's SEC regulatory sandbox. Three distinct surfaces: a brand landing page, a client-facing secure portal, and an institutional command center for back-office operators.

---

## 🎯 About this project

This repository is the artifact of a deliberate experiment in **AI-assisted frontend development** — specifically, evaluating how far a current-generation language model can go when given minimal direction and trusted to make design and architectural decisions on its own.

The methodology was simple. I provided three inputs:

- 📝 A one-sentence behavioral spec ("clicking login opens the dashboard")
- 🎨 An aesthetic direction ("premium, smooth, unique")

No design system was provided. No component breakdown. No detailed acceptance criteria. The model was responsible for typography choices, color palette, motion design, component architecture, file organization, and progressive refactoring across iterations.

Every line of UI code in this repository was generated through that process. My role was limited to providing direction, requesting refinements (restructuring, modernization, additional views), and handling deployment.

The result is a working production-grade interface with three connected views, animated SVG backgrounds, custom data visualizations, and consistent design tokens — none of which I authored directly. This is what people now call **"vibe coding"**: high-level intent in, finished interface out. ✨

---

## 🛠️ Stack

- ⚛️ **React 18/19** — modern JSX with hoisted style/link elements
- 🎨 **Tailwind CSS** — utility-first styling with arbitrary value support
- ⚡ **Vite** — build tooling and dev server
- 🌐 **Vercel** — production hosting with automatic GitHub deploys

No additional runtime dependencies. Fonts and global styles are injected declaratively via React's native `<style>` and `<link>` JSX support.

---

## 📁 Project structure
```
eqowa-fintech/
├── 📄 index.html
├── 📦 package.json
├── ⚙️  vite.config.js
├── 🎨 tailwind.config.js
├── 🎨 postcss.config.js
└── 📂 src/
├── 🎯 main.jsx                    # React mount point
├── 🧭 App.jsx                     # View routing + global styles
├── 🖼️  logo.svg                    # Brand mark (swappable)
└── 📂 components/
├── 🏠 HomeView.jsx            # Landing page with brand introduction
├── 🔐 DashboardView.jsx       # Client secure portal
├── 🎛️  CommandCenterView.jsx   # Institutional operations console
├── 🌀 CircuitField.jsx        # Animated SVG network background
├── ✅ TimelineStep.jsx        # Settlement timeline node
├── 🪪 Logo.jsx                # Logo wrapper with glow treatment
└── 🎨 Icons.jsx               # Inline SVG icon set
```
---

## 🎨 Design system

| Token         | Value                                | Usage                          |
|---------------|--------------------------------------|--------------------------------|
| Background    | `#0a0908` obsidian + radial gradient | All views                      |
| Text primary  | `#f5f1e8` parchment                  | Headings, key values           |
| Accent gold   | `#d4af6f`                            | Client-facing surfaces 🪙       |
| Accent cyan   | `#4dd4d4`                            | Operator/back-office surfaces 🔷|
| Display font  | Fraunces (variable serif)            | Headings, balances, names      |
| Body font     | Manrope                              | UI labels, body copy           |
| Numeric font  | JetBrains Mono                       | Account numbers, references    |

Motion: staggered reveal animations on mount, animated SVG backgrounds, progressive timeline fills, hand-drawn signature stroke-on, view-to-view fade-blur transitions (~500ms).

---

## 🚀 Pulling the repo

To get the project running locally:

```bash
# Clone the repository
git clone https://github.com/charlesdauda/eqowa-fintech.git

# Enter the project directory
cd eqowa-fintech

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the URL Vite prints in your terminal (typically `http://localhost:5173`). 🎉

To build for production:

```bash
npm run build
npm run preview
```

---

## 🔄 Replacing the logo

Drop your own logo image into `src/` (any format: PNG, JPG, SVG, WebP), then change one line at the top of `src/App.jsx`:

```jsx
import logo from './logo.svg';   // → './your-logo.png'
```

The `<Logo />` component renders it consistently across all views with the appropriate sizing and glow treatment.

---

## 💡 Observations from the experiment

A few patterns worth noting from this build:

**Where the model excelled** — aesthetic judgment, micro-interaction design, and architectural consistency across iterations. Asked to add a third view (the Command Center), it produced a coherent companion to the existing two without prompting on how they should relate.

**Where it required steering** — the model tended to over-deliver on initial requests, scaffolding entire Vite projects when only source files were needed. Refinement happened over a handful of iterations rather than in a single shot.

**Where it surprised me** — the model proactively suggested modernizations I didn't request (React 19 native style hoisting, `useId` for SVG collisions, replacing inline style objects with Tailwind arbitrary utilities) when asked to "use modern React syntax."

This is not a production fintech application. It's an exploration of what's possible when human intent and AI execution meet at the interface layer. 🤝

---

## 📜 License

MIT — use it, fork it, learn from it.

---
