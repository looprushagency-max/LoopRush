# LoopRush — TikTok Creator Network Platform

A production-ready Next.js platform for the official TikTok Creator Network, featuring authentication, role-based permissions, and beautiful dark-mode UI.

---

## 🚀 Quick Start (Local Development)

### Step 1 — Install Dependencies

```bash
cd looprush
npm install
```

### Step 2 — Set Up Supabase (see full guide below)

Copy the environment file:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials in `.env.local`.

### Step 3 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Supabase Setup (Step-by-Step)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up / log in
2. Click **"New Project"**
3. Choose your organization, give the project a name (e.g., `looprush`), set a strong database password, and pick your region
4. Wait ~2 minutes for the project to spin up

### 2. Run the Database Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file `supabase-setup.sql` from this project
4. Copy and paste the entire contents into the editor
5. Click **"Run"**

You should see: `Success. No rows returned`

### 3. Get Your API Keys

1. In your Supabase dashboard, go to **Settings → API**
2. Copy these two values:
   - **Project URL** → goes into `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → goes into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configure Authentication

1. In Supabase, go to **Authentication → URL Configuration**
2. Set **Site URL** to your production URL (e.g., `https://looprush.netlify.app`)
3. Add to **Redirect URLs**:
   - `http://localhost:3000/**` (for local dev)
   - `https://your-netlify-url.netlify.app/**` (for production)

### 5. Make Yourself an Admin

After you register your first account:

1. Go to Supabase → **SQL Editor**
2. Run this query (replace with your email):

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
```

3. Sign out and sign back in — you'll now be redirected to `/dashboard/admin`

---

## 🌐 Netlify Deployment (Step-by-Step)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial LoopRush commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/looprush.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site" → "Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `looprush` repository
5. Netlify will auto-detect Next.js settings from `netlify.toml` — **don't change them**
6. Click **"Deploy site"**

### 3. Add Environment Variables in Netlify

1. After deploying, go to **Site Settings → Environment Variables**
2. Click **"Add a variable"** for each:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-site.netlify.app` |

3. Go to **Deploys → Trigger deploy → Deploy site** to apply the new variables

### 4. Install the Netlify Next.js Plugin

Netlify should auto-install `@netlify/plugin-nextjs` from `netlify.toml`.
If not, go to **Plugins** in your Netlify dashboard and search for "Next.js".

### 5. Update Supabase URLs

Back in Supabase → **Authentication → URL Configuration**:
- Set **Site URL** to `https://your-site.netlify.app`
- Add `https://your-site.netlify.app/**` to **Redirect URLs**

---

## 📁 Project Structure

```
looprush/
├── src/
│   ├── app/
│   │   ├── (auth)/                 ← Login, Register, Forgot Password
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (marketing)/            ← Public pages with Navbar + Footer
│   │   │   ├── page.tsx            ← Landing page (HOME)
│   │   │   ├── about/
│   │   │   ├── pricing/
│   │   │   └── contact/
│   │   ├── dashboard/
│   │   │   ├── creator/            ← Creator dashboard (role-protected)
│   │   │   └── admin/              ← Admin dashboard (admin-only)
│   │   ├── auth/callback/          ← Supabase OAuth callback
│   │   ├── layout.tsx              ← Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                     ← Reusable: Button, Input, Logo
│   │   ├── layout/                 ← Navbar, Footer
│   │   ├── auth/                   ← AuthCard wrapper
│   │   └── dashboard/              ← Sidebar, StatCard
│   ├── config/
│   │   └── site.ts                 ← ✏️ EDIT THIS to update content
│   ├── lib/
│   │   ├── supabase/               ← Client, Server, Middleware configs
│   │   └── actions/                ← Server actions (auth)
│   ├── types/                      ← TypeScript types
│   └── middleware.ts               ← Route protection
├── supabase-setup.sql              ← Run this in Supabase SQL Editor
├── netlify.toml                    ← Netlify deployment config
└── .env.local.example              ← Copy to .env.local and fill in
```

---

## ✏️ How to Edit Content (No Coding!)

All site text, stats, features, and team info is in one file:

```
src/config/site.ts
```

Open it in any text editor and change:
- **Site name and tagline** — top of the file
- **Navigation links** — `navLinks` array
- **Stats** on the homepage — `stats` array
- **Feature cards** — `features` array
- **Pricing plans** — `plans` array
- **About page** — `about` object
- **Team members** — `about.team` array

Save the file and the site updates automatically.

---

## 🔐 How Roles Work

| Role | Can Access |
|---|---|
| `creator` (default) | `/dashboard/creator` |
| `admin` | `/dashboard/admin` |

- Every new sign-up becomes a `creator` by default
- To promote someone to admin, run the SQL command in Supabase
- Users are automatically redirected to the right dashboard on login
- Middleware prevents creators from accessing admin routes and vice versa

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| Supabase | Auth + Database |
| Netlify | Hosting |
| react-hot-toast | Notifications |

---

## Phase 2 (Coming Next)

- TikTok OAuth integration
- Campaign creation and management
- Creator analytics dashboard with charts
- Brand partner portal
- Payment integration (Stripe)
- Email notifications
