#!/bin/bash

# Quality Products Blog - Deployment Script
# Usage: ./deploy.sh [option]
# Options: vercel, docker, railway, render

set -e

echo "🚀 Quality Products Blog Deployment"
echo "===================================="

# Check for required tools
check_requirements() {
    echo "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is required but not installed."
        exit 1
    fi
    
    if ! command -v bun &> /dev/null; then
        echo "❌ Bun is required but not installed."
        exit 1
    fi
    
    echo "✅ Requirements met"
}

# Build the application
build_app() {
    echo ""
    echo "📦 Building application..."
    
    bun install
    bun run db:generate
    
    if [ -f "prisma/seed.ts" ]; then
        echo "Seeding database..."
        bun prisma/seed.ts
    fi
    
    bun run build
    
    echo "✅ Build complete"
}

# Deploy to Vercel
deploy_vercel() {
    echo ""
    echo "🔷 Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        bun add -g vercel
    fi
    
    # Check if logged in
    if ! vercel whoami &> /dev/null; then
        echo "Please login to Vercel..."
        vercel login
    fi
    
    # Deploy
    vercel --prod
    
    echo "✅ Deployed to Vercel!"
}

# Deploy with Docker
deploy_docker() {
    echo ""
    echo "🐳 Building Docker image..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is required but not installed."
        exit 1
    fi
    
    # Build image
    docker build -t quality-products-blog:latest .
    
    echo ""
    echo "Starting with Docker Compose..."
    docker compose up -d
    
    echo "✅ Deployed with Docker!"
    echo "Your app is running at http://localhost:3000"
}

# Deploy to Railway
deploy_railway() {
    echo ""
    echo "🚂 Deploying to Railway..."
    
    if ! command -v railway &> /dev/null; then
        echo "Installing Railway CLI..."
        bun add -g @railway/cli
    fi
    
    # Check if logged in
    if ! railway whoami &> /dev/null; then
        echo "Please login to Railway..."
        railway login
    fi
    
    # Deploy
    railway up
    
    echo "✅ Deployed to Railway!"
}

# Deploy to Render
deploy_render() {
    echo ""
    echo "🎨 Render Deployment"
    echo ""
    echo "To deploy to Render:"
    echo "1. Push your code to GitHub"
    echo "2. Go to https://dashboard.render.com"
    echo "3. Create a new Web Service"
    echo "4. Connect your GitHub repository"
    echo "5. Use these settings:"
    echo "   - Build Command: bun install && bun run build"
    echo "   - Start Command: bun run start"
    echo "   - Environment: Node"
    echo ""
    echo "Or use the render.yaml file for Blueprint deployment."
}

# Main deployment logic
case "$1" in
    vercel)
        check_requirements
        build_app
        deploy_vercel
        ;;
    docker)
        check_requirements
        build_app
        deploy_docker
        ;;
    railway)
        check_requirements
        build_app
        deploy_railway
        ;;
    render)
        deploy_render
        ;;
    *)
        echo ""
        echo "Usage: ./deploy.sh [option]"
        echo ""
        echo "Options:"
        echo "  vercel   - Deploy to Vercel (recommended for Next.js)"
        echo "  docker   - Deploy with Docker Compose"
        echo "  railway  - Deploy to Railway.app"
        echo "  render   - Show Render deployment instructions"
        echo ""
        echo "Example: ./deploy.sh vercel"
        ;;
esac
