import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const samplePosts = [
  {
    title: "Best Bed Frames of 2026: Our Top Editorial Picks",
    slug: "best-bed-frames-2026",
    excerpt: "Investing in a quality bed frame is the first step toward better sleep. We tested twenty different models to find the perfect balance of aesthetics, durability, and support for your mattress.",
    content: `
# Best Bed Frames of 2026: Our Top Editorial Picks

Finding the perfect bed frame can transform your sleep experience. After extensive testing, we've compiled our top recommendations for 2026.

## Why a Quality Bed Frame Matters

A good bed frame provides:
- Proper mattress support
- Enhanced bedroom aesthetics
- Improved air circulation
- Better sleep posture

## Our Top Picks

### 1. Luxury Upholstered Platform Bed
**Price: $899**

This stunning platform bed combines modern design with exceptional durability. The grey upholstered headboard adds a touch of elegance to any bedroom.

**Pros:**
- Easy assembly
- Sturdy construction
- Beautiful design
- 10-year warranty

**Cons:**
- Higher price point
- Requires professional cleaning

### 2. Minimalist Wooden Frame
**Price: $599**

For those who prefer natural materials, this solid wood frame offers timeless appeal and lasting durability.

## Conclusion

The right bed frame is an investment in your sleep quality. Consider your style preferences, budget, and practical needs when making your choice.
    `,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    imageAlt: "Modern minimalist bedroom with a high-end upholstered grey bed frame",
    categorySlug: "home-kitchen",
    publishedAt: new Date("2026-01-30"),
    featured: true,
  },
  {
    title: "The Ultimate Home Gym Setup for Small Spaces",
    slug: "home-gym-small-spaces",
    excerpt: "You don't need a massive basement to stay fit. Discover the curated list of multi-functional equipment that fits perfectly into an apartment lifestyle without sacrificing performance.",
    content: `
# The Ultimate Home Gym Setup for Small Spaces

Living in a small apartment doesn't mean you have to compromise on your fitness goals. Here's how to create an effective workout space.

## Essential Equipment for Small Spaces

### 1. Adjustable Dumbbells
**Price: $299**

Replace 15 sets of weights with one compact system. Perfect for apartments where space is at a premium.

### 2. Resistance Bands Set
**Price: $49**

Versatile, portable, and incredibly effective for strength training.

### 3. Folding Yoga Mat
**Price: $79**

High-density foam that provides excellent cushioning and folds away easily.

## Space-Saving Tips

1. Use wall-mounted storage
2. Choose collapsible equipment
3. Opt for multi-functional pieces
4. Create a dedicated workout corner

## Conclusion

A small space can still deliver big results with the right equipment and planning.
    `,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    imageAlt: "Sleek modern home gym equipment featuring matte black dumbbells and a premium yoga mat",
    categorySlug: "health-fitness",
    publishedAt: new Date("2026-01-28"),
    featured: true,
  },
  {
    title: "Smart Kitchen Appliances Worth the Investment",
    slug: "smart-kitchen-appliances",
    excerpt: "Technology in the kitchen has come a long way. From precision ovens to smart refrigerators, we look at which high-tech gadgets actually improve your cooking experience.",
    content: `
# Smart Kitchen Appliances Worth the Investment

Discover which smart kitchen gadgets deliver real value and which ones you can skip.

## Top Smart Kitchen Picks

### 1. Smart Espresso Machine
**Price: $1,299**

Program your perfect shot from your smartphone. Wake up to barista-quality coffee every morning.

### 2. Precision Cooker (Sous Vide)
**Price: $199**

Restaurant-quality results at home with WiFi connectivity.

### 3. Smart Refrigerator
**Price: $2,499**

Track groceries, create shopping lists, and manage recipes from a touchscreen display.

## What to Skip

- Smart toasters (unnecessary complexity)
- WiFi-enabled coffee makers without programmable features
- Smart microwaves (limited added value)

## Conclusion

Focus on appliances that genuinely improve your daily routine, not just add connectivity for its own sake.
    `,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    imageAlt: "High-end stainless steel espresso machine on a white marble countertop",
    categorySlug: "home-kitchen",
    publishedAt: new Date("2026-01-25"),
    featured: false,
  },
  {
    title: "Durable Backpacks for Your Next Outdoor Adventure",
    slug: "durable-backpacks-outdoor",
    excerpt: "Whether you're planning a weekend hike or a month-long expedition, the right backpack makes all the difference. We tested 25 models to find the best options for every adventure.",
    content: `
# Durable Backpacks for Your Next Outdoor Adventure

Your backpack is your most important piece of outdoor gear. Here's our comprehensive guide to finding the perfect one.

## Top Recommendations

### 1. All-Terrain Expedition Pack
**Price: $249**

70L capacity with weatherproof construction and ergonomic support.

### 2. Lightweight Day Hiker
**Price: $89**

Perfect for day trips with hydration compatibility and breathable mesh back panel.

## Key Features to Look For

- Water resistance
- Multiple compartments
- Padded hip belt
- Adjustable torso length
- Durability ratings

## Conclusion

Invest in quality that will last through countless adventures.
    `,
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    imageAlt: "Durable outdoor canvas backpack and copper lantern resting on a wooden log in a misty pine forest",
    categorySlug: "travel",
    publishedAt: new Date("2026-01-20"),
    featured: false,
  },
  {
    title: "Sustainable Footwear: The Best Eco-Sneakers Reviewed",
    slug: "sustainable-eco-sneakers",
    excerpt: "Looking good while doing good for the planet is easier than ever. We review the top eco-friendly sneakers that don't compromise on style or comfort.",
    content: `
# Sustainable Footwear: The Best Eco-Sneakers Reviewed

Step into sustainability with these eco-conscious sneakers.

## Top Picks

### 1. Ocean Plastic Runners
**Price: $129**

Made from recycled ocean plastic, these stylish sneakers are perfect for everyday wear.

### 2. Vegan Leather Classics
**Price: $149**

Cruelty-free and incredibly durable with a timeless design.

## What Makes a Sneaker Sustainable?

- Recycled materials
- Ethical manufacturing
- Carbon-neutral shipping
- Recyclable packaging
- Durable construction

## Conclusion

Sustainable sneakers have come a long way in style and performance.
    `,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    imageAlt: "Close up of minimalist white leather sneakers with clean lines on a pale grey concrete floor",
    categorySlug: "fashion",
    publishedAt: new Date("2026-01-18"),
    featured: false,
  },
  {
    title: "Minimalist Skincare Routines That Actually Work",
    slug: "minimalist-skincare-routines",
    excerpt: "Skip the 10-step routine. We've identified the essential products that deliver real results without the complexity and cost of elaborate regimens.",
    content: `
# Minimalist Skincare Routines That Actually Work

Less is more when it comes to skincare. Here's everything you actually need.

## The Simple 3-Step Routine

### Step 1: Gentle Cleanser
**Price: $24**

Remove dirt and impurities without stripping natural oils.

### Step 2: Vitamin C Serum
**Price: $45**

Brighten and protect with antioxidant power.

### Step 3: Moisturizer with SPF
**Price: $32**

Hydrate and protect in one simple step.

## Why Minimalist Works

- Fewer ingredients = fewer reactions
- Easier to maintain consistency
- More budget-friendly
- Better for sensitive skin

## Conclusion

Great skin doesn't require a complicated routine.
    `,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    imageAlt: "Selection of organic skincare products in glass bottles arranged on a textured linen cloth",
    categorySlug: "beauty",
    publishedAt: new Date("2026-01-15"),
    featured: false,
  },
  {
    title: "Testing the Most Comfortable Chairs for Gamers",
    slug: "comfortable-gaming-chairs",
    excerpt: "Long gaming sessions demand proper support. We spent 200+ hours testing gaming chairs to find the ones that keep you comfortable during marathon sessions.",
    content: `
# Testing the Most Comfortable Chairs for Gamers

Your gaming setup is only as good as your chair. Here are our top picks for comfort and performance.

## Top Gaming Chairs

### 1. Pro Ergonomic Racing Chair
**Price: $449**

Full lumbar support, adjustable armrests, and breathable mesh back.

### 2. Console Gaming Recliner
**Price: $329**

Perfect for console gamers with built-in speakers and cup holders.

## What to Look For

- Adjustable lumbar support
- Breathable materials
- Height adjustability
- Armrest customization
- Weight capacity
- Warranty coverage

## Conclusion

Invest in your comfort for those long gaming sessions.
    `,
    imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80",
    imageAlt: "Pro-level ergonomic gaming chair in a modern room with neon blue ambient lighting",
    categorySlug: "gaming",
    publishedAt: new Date("2026-01-12"),
    featured: false,
  },
]

const categories = [
  { name: "Home And Kitchen", slug: "home-kitchen", color: "#1c1c9b" },
  { name: "Health And Fitness", slug: "health-fitness", color: "#22c55e" },
  { name: "Travel", slug: "travel", color: "#3b82f6" },
  { name: "Fashion", slug: "fashion", color: "#AA0703" },
  { name: "Beauty", slug: "beauty", color: "#ec4899" },
  { name: "Gaming", slug: "gaming", color: "#8b5cf6" },
  { name: "Tech & Gear", slug: "tech-gear", color: "#f59e0b" },
  { name: "Wellness", slug: "wellness", color: "#14b8a6" },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Create site
  const site = await prisma.site.upsert({
    where: { name: 'Quality Products' },
    update: {},
    create: {
      name: 'Quality Products',
      description: 'Discover Quality, Choose with Confidence',
      primaryColor: '#1c1c9b',
      secondaryColor: '#AA0703',
      metaTitle: 'Quality Products - Discover Quality, Choose with Confidence',
      metaDescription: 'Your trusted source for quality product reviews and recommendations',
    },
  })

  console.log('✅ Created site:', site.name)

  // Create author
  const author = await prisma.author.upsert({
    where: { id: 'default-author' },
    update: {},
    create: {
      id: 'default-author',
      name: 'Nancy',
      email: 'nancy@qualityproducts.top',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      bio: 'Product enthusiast and quality seeker. Helping you find the best products for your lifestyle.',
      siteId: site.id,
    },
  })

  console.log('✅ Created author:', author.name)

  // Create categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: {
        siteId_slug: {
          siteId: site.id,
          slug: cat.slug,
        },
      },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        color: cat.color,
        siteId: site.id,
      },
    })
  }

  console.log('✅ Created', categories.length, 'categories')

  // Create posts
  for (const post of samplePosts) {
    const category = await prisma.category.findFirst({
      where: {
        siteId: site.id,
        slug: post.categorySlug,
      },
    })

    if (!category) continue

    await prisma.post.upsert({
      where: {
        siteId_slug: {
          siteId: site.id,
          slug: post.slug,
        },
      },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt,
        published: true,
        featured: post.featured,
        publishedAt: post.publishedAt,
        siteId: site.id,
        authorId: author.id,
        categoryId: category.id,
      },
    })
  }

  console.log('✅ Created', samplePosts.length, 'posts')

  // Create static pages
  const pages = [
    {
      title: 'About Us',
      slug: 'about-us',
      content: `
# About Quality Products

We are dedicated to helping consumers make informed purchasing decisions through thorough product research and honest reviews.

## Our Mission

To be the most trusted source for product recommendations on the internet.

## Our Process

Every product we recommend has been thoroughly researched and tested. We never accept payment for positive reviews.

## Contact Us

Have questions? Reach out to us at hello@qualityproducts.top
      `,
    },
    {
      title: 'Affiliate Disclosures',
      slug: 'affiliate-disclosures',
      content: `
# Affiliate Disclosure

Quality Products is a participant in various affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to select retailers.

## How We Make Money

When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the Amazon Services LLC Associates Program.

## Our Commitment to You

We only recommend products we truly believe in. Our editorial content is never influenced by affiliate partnerships.
      `,
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: `
# Privacy Policy

Your privacy is important to us. This policy outlines how we collect, use, and protect your information.

## Information We Collect

- Browser information
- Usage data
- Contact information (if you subscribe to our newsletter)

## How We Use Your Information

- To improve our website
- To send newsletters (with your permission)
- To analyze traffic patterns

## Contact

For privacy concerns, contact us at privacy@qualityproducts.top
      `,
    },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: {
        siteId_slug: {
          siteId: site.id,
          slug: page.slug,
        },
      },
      update: {},
      create: {
        title: page.title,
        slug: page.slug,
        content: page.content,
        published: true,
        siteId: site.id,
      },
    })
  }

  console.log('✅ Created', pages.length, 'pages')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
