# 🚀 Quality Products Blog - Deployment Guide

Complete deployment instructions for your affiliate blog site.

---

## 📋 Prerequisites

- Node.js 20+
- Bun runtime
- Git

---

## 🎯 Quick Deploy Options

### Option 1: Vercel (Recommended for Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Manual Deployment:

```bash
# Install Vercel CLI
bun add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Environment Variables (Vercel):

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `file:./db/production.db` | For SQLite |
| Or PostgreSQL URL | `postgresql://...` | For production DB |

---

### Option 2: Docker

#### Build and Run:

```bash
# Build the Docker image
docker build -t quality-products-blog .

# Run the container
docker run -p 3000:3000 quality-products-blog
```

#### With Docker Compose:

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

#### With SSL/HTTPS:

1. Add your SSL certificates to `./ssl/` directory
2. Update `nginx.conf` with your domain
3. Run: `docker compose up -d`

---

### Option 3: Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

#### Manual Deployment:

```bash
# Install Railway CLI
bun add -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

---

### Option 4: Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create New Web Service
4. Connect GitHub repository
5. Configure:

| Setting | Value |
|---------|-------|
| Build Command | `bun install && bun run build` |
| Start Command | `bun run start` |
| Environment | Node |

Or use the included `render.yaml` for Blueprint deployment.

---

## 🗄️ Database Options

### SQLite (Default)

- **Best for**: Docker, VPS deployments
- **Free**: Yes
- **Limitations**: Not suitable for serverless platforms

```
DATABASE_URL="file:./db/production.db"
```

### PostgreSQL (Production)

- **Best for**: Vercel, Railway, Render
- **Free tiers**: Neon, Supabase, PlanetScale

#### Migration Steps:

1. **Create PostgreSQL database**:
   - [Neon](https://neon.tech) (Free tier)
   - [Supabase](https://supabase.com) (Free tier)
   - [PlanetScale](https://planetscale.com) (Free tier)

2. **Update schema**:
   ```bash
   # Replace prisma/schema.prisma with prisma/schema.postgres.prisma
   cp prisma/schema.postgres.prisma prisma/schema.prisma
   ```

3. **Set environment variable**:
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

4. **Push schema**:
   ```bash
   bun run db:push
   bun prisma/seed.ts
   ```

---

## 🔧 Environment Variables

Create `.env.production`:

```env
# Database
DATABASE_URL="file:./db/production.db"

# Or PostgreSQL
# DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Site URL (optional)
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

# Analytics (optional)
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 📦 One-Command Deployment

```bash
# Vercel
./deploy.sh vercel

# Docker
./deploy.sh docker

# Railway
./deploy.sh railway

# Render instructions
./deploy.sh render
```

---

## 🔒 Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS (automatic on Vercel/Railway/Render)
- [ ] Set secure environment variables
- [ ] Enable rate limiting (included in nginx.conf)
- [ ] Configure CSP headers (optional)

---

## 🌐 Custom Domain

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

### Docker/VPS:
1. Update `nginx.conf` with your domain
2. Add SSL certificates
3. Update DNS A record to server IP

---

## 📊 Monitoring (Optional)

### Recommended Services:

| Service | Free Tier | Features |
|---------|-----------|----------|
| [Sentry](https://sentry.io) | Yes | Error tracking |
| [Vercel Analytics](https://vercel.com/analytics) | Yes | Web analytics |
| [Logflare](https://logflare.app) | Yes | Log management |

---

## 🆘 Troubleshooting

### Build Fails:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
bun install
bun run build
```

### Database Errors:
```bash
# Regenerate Prisma client
bun run db:generate
```

### Port Already in Use:
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

---

## 📝 Post-Deployment

1. **Seed the database**:
   ```bash
   bun prisma/seed.ts
   ```

2. **Create admin user** (if implementing auth)

3. **Add your content** via `/admin`

4. **Set up backups** for your database

---

## 🔄 CI/CD (Optional)

### GitHub Actions:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📚 Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)

---

Need help? Check the logs:
```bash
# Docker
docker compose logs -f

# Vercel
vercel logs

# Local
tail -f dev.log
```
