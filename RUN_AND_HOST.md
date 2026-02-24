# Run Locally & Host on a Domain

Guide for **The Karma Compass** (feedback web app): run it on your Windows machine, then deploy to a host and attach a custom domain.

---

## Part 1: Run the project locally

### 1. Install Node.js

- Install **Node.js 20+** from [nodejs.org](https://nodejs.org/) (LTS).
- In PowerShell, check:
  ```powershell
  node -v
  npm -v
  ```

### 2. Get a PostgreSQL database

The app needs a Postgres DB (it uses `DATABASE_URL`). Options:

| Option | Best for |
|--------|----------|
| **Neon** (neon.tech) | Free tier, no local install |
| **Supabase** (supabase.com) | Free tier, dashboard + API |
| **Local PostgreSQL** | Full control on your PC |

- **Neon**: Sign up → Create project → copy the connection string.
- **Supabase**: New project → Settings → Database → Connection string (URI).
- **Local**: Install Postgres, create a database, then use:
  `postgresql://postgres:YOUR_PASSWORD@localhost:5432/your_db_name`

### 3. Open the project and install dependencies

In PowerShell:

```powershell
cd "c:\Users\91812\Downloads\Karma-Experience\Asset-Collector"
npm install
```

### 4. Create a `.env` file

In the same folder (`Asset-Collector`), create a file named `.env` (no extension) with:

```env
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

Replace with your real connection string from step 2. Optionally set:

```env
PORT=5000
```

Use `.env.example` as a template; do **not** commit `.env` (it should be in `.gitignore`).

### 5. Create the database tables

From `Asset-Collector`:

```powershell
npm run db:push
```

This uses Drizzle to create/update the `feedback` table in your database.

### 6. Start the app

**Development (with hot reload):**

```powershell
npm run dev
```

**Production (after building):**

```powershell
npm run build
npm run start
```

- Open **http://localhost:5000** in your browser (or the port you set in `PORT`).
- You should see the feedback form and be able to submit and list feedback.

---

## Part 2: Host on a server and use a proper domain

To have a real URL (e.g. `https://yourdomain.com`), you need:

1. A **host** that runs Node.js and has a public IP.
2. A **domain name** pointed at that host.
3. **HTTPS** (SSL) on the host.

### Option A: Deploy to a PaaS (easiest)

These platforms run your app and often give you a subdomain or custom domain + SSL.

| Platform | Free tier | Custom domain | Notes |
|----------|-----------|---------------|--------|
| **Railway** | Yes (limits) | Yes | Simple Node deploy, Postgres add-on |
| **Render** | Yes | Yes | Web Service + PostgreSQL |
| **Fly.io** | Yes | Yes | Good for full control |
| **Vercel** | Yes | Yes | Best for frontend; use serverless for API or separate API host |

**Typical steps (e.g. Railway or Render):**

1. Push your code to **GitHub** (create a repo, push the `Asset-Collector` folder or the whole project).
2. Sign up at **Railway** or **Render** and connect the GitHub repo.
3. Add a **PostgreSQL** database in the dashboard (they provide `DATABASE_URL`).
4. Set environment variables in the dashboard:
   - `DATABASE_URL` = the DB URL they give you
   - `NODE_ENV` = `production`
   - Optionally `PORT` (they often set this for you).
5. Set **build command**: `npm install && npm run build`
6. Set **start command**: `npm run start`
7. Deploy. You’ll get a URL like `https://your-app-name.up.railway.app` or `*.onrender.com`.
8. In the dashboard, add your **custom domain** (e.g. `feedback.yourdomain.com`). They’ll show you which **CNAME** or **A** record to add at your domain registrar.
9. They usually enable **HTTPS** automatically for your domain.

### Option B: VPS (e.g. DigitalOcean, Linode, AWS EC2)

You get a Linux server and configure everything yourself.

1. **Create a server** (Ubuntu 22.04), SSH in.
2. **Install Node.js** (e.g. via nvm or NodeSource).
3. **Install PostgreSQL** (or use a managed DB and only set `DATABASE_URL`).
4. **Clone your repo** and in the app directory:
   - Create `.env` with `DATABASE_URL` (and `PORT` if needed).
   - Run `npm install`, `npm run db:push`, `npm run build`, `npm run start`.
5. Use **PM2** (or systemd) to keep the Node process running:
   ```bash
   npm install -g pm2
   pm2 start dist/index.cjs --name karma-compass
   pm2 save && pm2 startup
   ```
6. Put **Nginx** (or Caddy) in front:
   - Nginx: proxy `http://localhost:5000` and add a server block for your domain; use Certbot for SSL.
   - Caddy: automatic HTTPS with `yourdomain.com { reverse_proxy localhost:5000 }`.
7. **Domain**: At your registrar, set an **A** record to your server’s public IP (and optionally a **CNAME** for `www`).

### Option C: Replit (where you built it)

- Replit can host the app and give you a Replit URL.
- For a **custom domain**: Replit’s paid plans support adding your own domain; follow their docs to point your domain to the Replit app and enable HTTPS.

---

## Step-by-step: Custom domain (any host)

1. **Buy a domain** (Namecheap, Google Domains, Cloudflare, etc.).
2. In your **hosting dashboard** (Railway, Render, VPS, etc.), add the domain (e.g. `app.yourdomain.com`). They’ll tell you:
   - **CNAME** → e.g. `your-app.up.railway.app`, or  
   - **A** → your server IP.
3. At the **domain registrar**:
   - Add the CNAME or A record they gave you.
   - Wait for DNS to propagate (minutes to 48 hours).
4. On the host, turn on **HTTPS** (PaaS usually does this automatically; on a VPS use Caddy or Nginx + Certbot).

---

## Checklist

**Local:**

- [ ] Node.js 20+ installed  
- [ ] PostgreSQL available (cloud or local)  
- [ ] `.env` with `DATABASE_URL`  
- [ ] `npm install` and `npm run db:push`  
- [ ] `npm run dev` or `npm run build` + `npm run start`  
- [ ] App works at http://localhost:5000  

**Hosting:**

- [ ] Code on GitHub  
- [ ] Host chosen (Railway / Render / VPS / Replit)  
- [ ] `DATABASE_URL` and `NODE_ENV=production` set on host  
- [ ] Build + start commands set  
- [ ] Domain added in host dashboard  
- [ ] DNS (CNAME or A) set at registrar  
- [ ] HTTPS enabled  

If you tell me which host you prefer (e.g. Railway vs VPS), I can give you exact clicks and commands for that option.
