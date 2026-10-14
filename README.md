# Fahmida Alam Mimi — Portfolio (New Brutalism Edition)

A premium personal portfolio for **Fahmida Alam Mimi**, an aspiring frontend developer
learning **React, TypeScript and AI-assisted development**.

The design uses the **new brutalism (neubrutalism)** style: flat, saturated colors,
thick black borders, hard offset drop-shadows, chunky display type, and playful
"sticker" elements — built to look bold and memorable while staying fast, accessible
and easy for a beginner to edit.

---

## ✨ Features

- **New brutalism design system** — flat color palette, 3px borders, hard `x/y` shadows,
  hover "lift" and click "press" button interactions.
- **Light / dark theme** with a toggle, saved to `localStorage`, no flash on load.
- **Animated, premium feel** (Motion / Framer Motion) with scroll reveals, a short
  loading screen, and staggered hero intro — all disabled for `prefers-reduced-motion`.
- **Responsive** from small phones to large desktops, with a mobile hamburger menu.
- **Sections:** Navbar, Hero, About, Skills, Projects (with filters), Education &
  Certifications, Contact, Footer.
- **Accessible:** semantic HTML, keyboard-focus outlines, skip-to-content link,
  ARIA labels, descriptive `alt` text, reduced-motion support.
- **Contact form** validated with React Hook Form + Zod and wired to **EmailJS**
  (with a clear "not configured yet" message instead of pretending to send).
- **SEO:** descriptive title, meta description, Open Graph/Twitter tags, favicon,
  `robots.txt`, `sitemap.xml`, and a custom **404** page.
- **Fast:** route- and section-level code splitting keeps the initial bundle small.
- **Honest content:** no fake experience, percentages, or certifications — placeholders
  are clearly marked and easy to replace.

---

## 🧰 Technology Stack

| Purpose            | Tool                                   |
| ------------------ | -------------------------------------- |
| UI library         | React 19 + TypeScript (TSX)            |
| Build tool / dev   | Vite                                   |
| Styling            | Tailwind CSS v4 (`@tailwindcss/vite`)  |
| Animation          | Motion (`motion/react`)                |
| Icons              | lucide-react (+ custom brand SVGs)     |
| Routing            | React Router                           |
| Forms + validation | React Hook Form + Zod                  |
| Email              | EmailJS (`@emailjs/browser`)           |
| Linting            | Oxlint                                 |
| Runtime            | Node.js                                |

> No backend is required. The contact form talks to EmailJS directly from the browser
> using a **public** key (by design safe to expose). See "Connect the contact form".

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile-placeholder.svg   # replace with your photo
│   │   └── og-image.svg              # social share image
│   ├── Fahmida-Alam-Mimi-CV.pdf      # replace with your real CV
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects                    # SPA fallback for Netlify
├── src/
│   ├── components/   # reusable UI (Navbar, ProjectCard, ContactForm pieces, ...)
│   ├── sections/     # page sections (Hero, About, Skills, Projects, ...)
│   ├── pages/        # Home, NotFound
│   ├── data/         # 👈 ALL your editable content lives here
│   ├── hooks/        # useTheme, useScrollSpy
│   ├── lib/          # email.ts (EmailJS helper)
│   ├── types/        # TypeScript types/interfaces
│   ├── utils/        # cn() className helper
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css     # Tailwind theme + neubrutalist component classes
├── .env.example
├── index.html
├── vercel.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

**Requirements:** [Node.js](https://nodejs.org) 18+ (LTS recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (output in /dist)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Lint the code
npm run lint
```

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start Vite dev server with hot reload     |
| `npm run build`   | Type-check (`tsc`) + build to `dist/`     |
| `npm run preview` | Serve the built `dist/` locally           |
| `npm run lint`    | Run Oxlint                                |

---

## ✏️ Customizing Your Content

Almost everything you need to change lives in **`src/data/`** — you won't need to touch
the components.

### 1. Personal info, headline, About text, socials
Edit **`src/data/profile.ts`**:
- `name`, `firstName`, `nameDisplay`, `role`, `intro`
- `about.paragraphs` and `about.highlights`
- `contact.email`, `contact.location`
- `profileImage`, `cvUrl`, `availability`
- `socialLinks` → replace the placeholder GitHub / LinkedIn / email URLs with your own.

### 2. Profile photo
1. Add your photo to `public/images/` (e.g. `profile.jpg`).
2. In `src/data/profile.ts`, set `profileImage: '/images/profile.jpg'`.

### 3. CV download
Replace `public/Fahmida-Alam-Mimi-CV.pdf` with your real CV, keeping the same filename —
**or** change `cvUrl` in `src/data/profile.ts` to point at your file.

### 4. Skills
Edit **`src/data/skills.ts`**. Each skill has an honest `level`
(`'learning' | 'beginner' | 'intermediate' | 'confident'`) and a flat `color`
(e.g. `'bg-brand-yellow'`). No fake percentages.

### 5. Projects
Edit **`src/data/projects.ts`**. Set `demoUrl` and `repoUrl` to your **real** links.
Leave them as `''` (empty) until a deployment/repository exists — the buttons then show
a clear **"Pending"** state instead of a broken link. Change `status`
(`'Concept' | 'In progress' | 'Demo' | 'Live'`) and `color` as you like.

### 6. Education & certifications
Edit **`src/data/education.ts`**. Add items to the `education` array and (when earned)
uncomment/replace entries in `certifications`. Only add verified information.

### 7. Colors & the neubrutalist theme
Edit **`src/index.css`**:
- `--nb-ink`, `--nb-paper`, `--nb-surface`, `--nb-shadow` control borders/text,
  page background, card background and shadow color (light + dark values).
- The `--color-brand-*` variables are the bold palette (yellow, pink, cyan, green,
  orange, blue, violet, red).
- `.nb-card`, `.nb-btn`, `.nb-input`, `.nb-pill`, `.nb-tag`, `.nb-grid` define the
  reusable brutalist look for the whole site.

---

## 📬 Connect the Contact Form (EmailJS)

The form validates input and, when configured, sends messages through
[EmailJS](https://www.emailjs.com) — a free service that emails you from the browser
using a **public** key. Private credentials never touch the frontend.

1. Create a free EmailJS account.
2. **Email Services** → add a service (e.g. Gmail) → copy its **Service ID**.
3. **Email Templates** → create a template with these variables:
   `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}` → copy its **Template ID**.
4. **Account → API Keys** → copy the **Public Key**.
5. Create a `.env` file in the project root (copy `.env.example`) and fill it in:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_CONTACT_EMAIL=your.email@example.com
   VITE_SITE_URL=https://your-domain.example
   ```

6. Restart `npm run dev`.

> ⚠️ **Never commit `.env`** — it's already ignored by `.gitignore`.
> If the variables are missing, the form shows a helpful setup message and a direct
> `mailto:` link instead of falsely claiming success.

**Alternative:** swap `src/lib/email.ts` for [Formspree](https://formspree.io) or your
own Node/Express endpoint (add proper validation and keep secrets server-side).

---

## ☁️ Deployment

### Vercel (recommended)
1. Push the project to GitHub (see below).
2. On [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
4. Add the environment variables from `.env` (Project → Settings → Environment Variables).
5. Deploy. `vercel.json` already handles client-side routing.

### Netlify
1. New site → import from GitHub.
2. Build command `npm run build`, publish directory `dist`.
3. Add the same environment variables under **Site settings → Environment variables**.
4. Deploy. (`public/_redirects` provides the SPA fallback.)

### GitHub Pages
1. `npm install` and set the base path if your site lives in a subfolder: in
   `vite.config.ts` add `base: '/your-repo-name/'`.
2. Build: `npm run build`, then publish the `dist/` folder to the `gh-pages` branch
   (e.g. with the `gh-pages` package or a GitHub Action).
3. Update `public/robots.txt` and `public/sitemap.xml` with your real URL.

---

## 🐙 Push to GitHub

Git must be installed ([git-scm.com](https://git-scm.com/downloads)). Then:

```bash
git init
git add .
git commit -m "Initial commit: neubrutalist portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

---

## 🧩 Main Components Explained

| File                              | What it does                                                        |
| --------------------------------- | ------------------------------------------------------------------- |
| `src/App.tsx`                     | Theme provider, router, layout, loading screen, skip link           |
| `src/components/Navbar.tsx`       | Fixed nav, scroll-spy active link, theme toggle, mobile menu        |
| `src/components/ThemeToggle.tsx`  | Switches dark/light via `useTheme`                                  |
| `src/hooks/useTheme.ts`           | Reads/writes the theme, toggles the `.dark` class on `<html>`       |
| `src/sections/Hero.tsx`           | Name, headline, intro, profile photo, CTAs, socials                 |
| `src/sections/Skills.tsx`         | Groups skills; `SkillCard` shows honest level labels                |
| `src/sections/Projects.tsx`       | Category filters + `ProjectCard` grid                               |
| `src/sections/Education.tsx`      | Education timeline + certifications area                            |
| `src/sections/Contact.tsx`        | Contact details + `ContactForm`                                     |
| `src/sections/ContactForm.tsx`    | React Hook Form + Zod validation → `src/lib/email.ts`               |
| `src/components/ProjectCard.tsx`  | Project card; shows "Pending" buttons when links are empty          |
| `src/components/Reveal.tsx`       | Scroll-reveal wrapper used across sections                          |
| `src/data/*`                      | **Your editable content** (profile, skills, projects, education)    |
| `src/index.css`                   | Tailwind theme tokens + neubrutalist component classes              |

---

## ✅ Before You Publish — Checklist

- [ ] Replace `public/images/profile-placeholder.svg` with your photo (update `profileImage`).
- [ ] Replace `public/Fahmida-Alam-Mimi-CV.pdf` with your real CV.
- [ ] Replace placeholder GitHub / LinkedIn / email URLs in `src/data/profile.ts`.
- [ ] Add real `demoUrl` / `repoUrl` values in `src/data/projects.ts`.
- [ ] Add verified certificates in `src/data/education.ts` (optional).
- [ ] Set up EmailJS and create `.env` (see above).
- [ ] Update `robots.txt`, `sitemap.xml`, and the meta/OG URLs in `index.html` with your domain.
- [ ] Replace `public/images/og-image.svg` with a PNG/JPG share image (1200×630).

---

Made with React, TypeScript, Tailwind CSS & Motion. 🖤
