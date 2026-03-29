#!/bin/bash

# PostgreSQL Migration Script
# Migrates from SQLite to PostgreSQL for production deployment

set -e

echo "🔄 PostgreSQL Migration Script"
echo "==============================="

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it first."
    exit 1
fi

# Check if PostgreSQL URL is provided
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable not set."
    echo "Please set it to your PostgreSQL connection string:"
    echo "export DATABASE_URL='postgresql://user:password@host:5432/dbname'"
    exit 1
fi

echo ""
echo "📊 Source: SQLite (db/custom.db)"
echo "📊 Target: PostgreSQL ($DATABASE_URL)"
echo ""

# Confirm migration
read -p "Continue with migration? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled."
    exit 1
fi

echo ""
echo "📦 Step 1: Backing up SQLite schema..."
cp prisma/schema.prisma prisma/schema.sqlite.prisma.backup
echo "✅ Backup created: prisma/schema.sqlite.prisma.backup"

echo ""
echo "📦 Step 2: Switching to PostgreSQL schema..."
cp prisma/schema.postgres.prisma prisma/schema.prisma
echo "✅ PostgreSQL schema activated"

echo ""
echo "📦 Step 3: Generating Prisma Client for PostgreSQL..."
bun run db:generate
echo "✅ Prisma Client generated"

echo ""
echo "📦 Step 4: Pushing schema to PostgreSQL..."
bunx prisma db push --skip-generate
echo "✅ Schema pushed to PostgreSQL"

echo ""
echo "📦 Step 5: Exporting data from SQLite..."
# Create temp directory
mkdir -p .migration-temp

# Export data using SQLite
if command -v sqlite3 &> /dev/null; then
    echo "Exporting with sqlite3..."
    
    # Export posts
    sqlite3 db/custom.db -json "SELECT * FROM Post" > .migration-temp/posts.json
    sqlite3 db/custom.db -json "SELECT * FROM Category" > .migration-temp/categories.json
    sqlite3 db/custom.db -json "SELECT * FROM Author" > .migration-temp/authors.json
    sqlite3 db/custom.db -json "SELECT * FROM Site" > .migration-temp/sites.json
    sqlite3 db/custom.db -json "SELECT * FROM Page" > .migration-temp/pages.json
    
    echo "✅ Data exported to .migration-temp/"
else
    echo "⚠️ sqlite3 not found. Please install it for automatic data migration."
    echo "You can manually seed the database using: bun prisma/seed.ts"
fi

echo ""
echo "📦 Step 6: Seeding PostgreSQL database..."
bun prisma/seed.ts
echo "✅ Database seeded"

echo ""
echo "🎉 Migration Complete!"
echo ""
echo "Next steps:"
echo "1. Verify your data in PostgreSQL"
echo "2. Update your .env file with the PostgreSQL URL"
echo "3. Deploy to your platform (Vercel, Railway, etc.)"
echo ""
echo "To rollback to SQLite:"
echo "  cp prisma/schema.sqlite.prisma.backup prisma/schema.prisma"
echo "  bun run db:generate"
