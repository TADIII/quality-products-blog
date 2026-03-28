# 🚀 Quick Deployment Guide

Complete guide to deploy your Quality Products Blog.

---

## ⚡ Quick Start

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
bun add -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

### Option 2: Docker

```bash
# Build and run
docker compose up -d --build
```

### Option 3: Railway

```bash
# Install CLI and deploy
bun add -g @railway/cli
railway login
railway up
```

---

## 🔄 GitHub Actions CI/CD

Your repository is pre-configured with GitHub Actions workflows:

### Workflows Included:

| Workflow | File | Trigger |
|----------|------|---------|
| **CI** | `.github/workflows/ci.yml` | Push to main/develop, PRs |
| **Vercel Deploy** | `.github/workflows/deploy-vercel.yml` | Push to main |
| **Docker Deploy** | `.github/workflows/deploy-docker.yml` | Push to main, tags |
| **Railway Deploy** | `.github/workflows/deploy-railway.yml` | Push to main |

### Setup GitHub Secrets:

Go to **Settings → Secrets and variables → Actions** and add:

#### For Vercel:
```
VERCEL_TOKEN         - Your Vercel API token
VERCEL_ORG_ID        - Your Vercel org ID
VERCEL_PROJECT_ID    - Your Vercel project ID
```

#### For Docker:
```
SERVER_HOST          - Your server IP
SERVER_USER          - SSH username
SSH_PRIVATE_KEY      - SSH private key
```

#### For Railway:
```
RAILWAY_TOKEN        - Your Railway API token
RAILWAY_SERVICE_ID   - Your Railway service ID
```

### How to Get Secrets:

**Vercel:**
```bash
# Login to Vercel
vercel login

# Link project
vercel link

# Get IDs from .vercel/project.json
```

**Railway:**
```bash
# Get token from Railway dashboard
# Settings → Tokens → Create Token
```

---

## 🗄️ PostgreSQL Migration

For Vercel, Railway, or Render, you need PostgreSQL instead of SQLite.

### Step 1: Create PostgreSQL Database

Choose one:

| Provider | Free Tier | URL |
|----------|-----------|-----|
| **Neon** | ✅ 0.5GB | [neon.tech](https://neon.tech) |
| **Supabase** | ✅ 500MB | [supabase.com](https://supabase.com) |
| **PlanetScale** | ✅ 5GB | [planetscale.com](https://planetscale.com) |
| **Railway** | ✅ 1GB | [railway.app](https://railway.app) |

### Step 2: Get Connection String

Example: `postgresql://user:password@host:5432/database?schema=public`

### Step 3: Migrate

```bash
# Export SQLite data
bun run db:export

# Switch to PostgreSQL schema
cp prisma/schema.postgres.prisma prisma/schema.prisma

# Generate Prisma client
bun run db:generate

# Push schema to PostgreSQL
DATABASE_URL="postgresql://..." bunx prisma db push

# Import data (or seed fresh)
DATABASE_URL="postgresql://..." bun run db:seed
```

### Or use the automated script:

```bash
export DATABASE_URL="postgresql://user:password@host:5432/database"
./scripts/migrate-to-postgres.sh
```

---

## 📦 NPM Scripts Reference

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Run ESLint

# Database
bun run db:push          # Push schema changes
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Run migrations
bun run db:seed          # Seed database
bun run db:export        # Export SQLite data
bun run db:import        # Import to PostgreSQL

# Deployment
bun run deploy:vercel    # Deploy to Vercel
bun run deploy:docker    # Deploy with Docker Compose
bun run deploy:railway   # Deploy to Railway

# Docker
bun run docker:build     # Build Docker image
bun run docker:run       # Run Docker container
bun run docker:stop      # Stop Docker containers
```

---

## 🌐 Environment Variables

### Required:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Optional:
```env
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## 🔒 Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use PostgreSQL (not SQLite for serverless)
- [ ] Set all required environment variables
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set up GitHub Actions secrets
- [ ] Test production build locally

---

## 🆘 Troubleshooting

### Build Fails:
```bash
rm -rf .next node_modules
bun install
bun run build
```

### Database Connection Error:
```bash
# Check DATABASE_URL format
# PostgreSQL: postgresql://user:password@host:5432/database
# SQLite: file:./db/custom.db
```

### Prisma Errors:
```bash
bun run db:generate
bunx prisma db push
```

### Vercel Deployment Issues:
```bash
# Check logs
vercel logs

# Redeploy
vercel --prod --force
```

---

## 📚 More Resources

- [Full Deployment Guide](./DEPLOYMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)
