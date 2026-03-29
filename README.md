# Quality Products Blog

A modern affiliate blog platform built with Next.js 16, TypeScript, Prisma, and Tailwind CSS.

## Features

- Multi-site CMS support
- Blog posts with categories and authors
- Admin panel for content management
- Dark/light theme support
- SEO optimized
- Mobile responsive design
- Affiliate link management

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma

## Quick Start

### Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Git** - [Download here](https://git-scm.com/download/win)
3. **Bun** (recommended) or npm - [Download here](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/quality-products-blog.git
cd quality-products-blog

# Install dependencies
bun install
# OR
npm install

# Set up the database
bun run db:push
# OR
npm run db:push

# Seed the database with sample content
bun run db:seed
# OR
npm run db:seed

# Start the development server
bun run dev
# OR
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel (Recommended - FREE)

1. Create a [Vercel account](https://vercel.com/signup) using your GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Done! Your site will be live in minutes.

### Environment Variables (for production)

Create a `.env` file with:

```env
DATABASE_URL="your-postgresql-connection-string"
```

For Vercel, add environment variables in your project settings.

## Admin Panel

Access the admin panel at `/admin` to:
- Manage posts
- Manage categories
- Manage sites
- Configure settings

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   ├── category/           # Category pages
│   ├── page/               # Static pages
│   ├── post/               # Blog post pages
│   └── search/             # Search page
├── components/
│   ├── blog/               # Blog-specific components
│   └── ui/                 # UI components (shadcn)
└── lib/
    └── db.ts               # Database client

prisma/
├── schema.prisma           # SQLite schema (development)
└── schema.postgres.prisma  # PostgreSQL schema (production)
```

## License

MIT
