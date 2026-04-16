# 💍 Pepe & Pong's Digital Wedding Invitation

A beautifully curated, minimalist digital wedding invitation featuring deep red accents, brush script elements, and elegant scroll typography. Refactored from the ground up for superior performance and maintainability.

## 🌟 Features

- **Modern Architecture**: Built from the ground up using the highly optimized Next.js 15 **App Router** for superior performance and native layout routing.
- **Elegant Typography**: Features the natively optimized **Montserrat** (for structured geometric sans-serif) and **Great Vibes** (fluid brush script) fonts loaded instantly via `@next/font`.
- **Minimalist Design System**: A clean, distraction-free UI leveraging Tailwind CSS tokens with deep red accents (`#B31B1B`), creamy off-white backgrounds (`#FAFAFA`), and dark charcoal text.
- **Fluid Micro-Animations**: Delivers buttery smooth scroll-triggered animations and soft fade-ins powered effortlessly by **Framer Motion**.
- **Hand-Drawn Details**: Beautiful custom SVG cubic bézier paths (wavy lines) implemented to organically separate UI sections without rigid borders.
- **Supabase Wishlist**: An integrated wishing well where users can sign digital guestbooks and drop heartfelt comments safely utilizing a managed Supabase cluster.

---

## 🛠 Prerequisites

Before launching the project on any machine, guarantee you have:
1. **Node.js**: Recommended `v18.x` or above. 
   - *Windows Users* can download Node via the [Official Installer](https://nodejs.org/).
   - *Mac Users* can download Node via Installer or Homebrew (`brew install node`).
2. **Git**: Ensure Git is installed to clone/pull branches.
3. **Supabase Environment Config**: 
   Since this queries the Supabase DB for `xxx`, you must retrieve the database endpoint and `ANON_KEY`.

---

## 🚀 Installation Guide 

### 1. Clone & Navigate
Using Git or your terminal:
```bash
git clone <your-repository-url>
cd pepong-wedding-invitation
```

### 2. Environment Setup
Create a `.env.local` file at the root folder of the repository. Populate it with your designated database variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Install NPM Dependencies

**On macOS / Linux:**
```bash
npm install
```

**On Windows (Command Prompt / Powershell):**
```powershell
npm install
```

---

## 💻 Running Locally

To fire up the development server seamlessly on both PC & Macbook:
```bash
npm run dev
```

1. Open your browser and navigate to `http://localhost:3000`.
2. Notice the URL generating `.next/types/` natively on its first boot to establish all Next.js App Router rules.
3. Edit `app/page.tsx` and watch the browser hot-reload your alterations instantly!

---

## 📦 Deployment Strategy

Because this uses standard Next.js rendering formats, it is fully optimized to be deployed seamlessly onto [Vercel](https://vercel.com) or [Netlify](https://netlify.com) out of the box with zero configuration!
