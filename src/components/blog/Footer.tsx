'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

interface FooterProps {
  pages?: Array<{ title: string; slug: string }>
}

export function Footer({ pages = [] }: FooterProps) {
  const defaultPages = [
    { title: 'Affiliate Disclosures', slug: 'affiliate-disclosures' },
    { title: 'Privacy Policy', slug: 'privacy-policy' },
  ]

  const navPages = pages.length > 0 ? pages : defaultPages

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full mt-auto bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Brand */}
        <div 
          className="font-bold uppercase tracking-widest text-xl"
          style={{ color: '#60a5fa' }}
        >
          QUALITY PRODUCTS
        </div>

        {/* Affiliate Disclosure */}
        <div className="max-w-3xl">
          <p className="text-neutral-400 text-xs leading-relaxed">
            Affiliate Disclosure: Quality Products is a participant in various
            affiliate advertising programs designed to provide a means for sites
            to earn advertising fees by advertising and linking to select
            retailers. We only recommend products we truly believe in.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-8 border-y border-neutral-800 py-6 w-full max-w-2xl">
          {navPages.map((page) => (
            <Link
              key={page.slug}
              href={`/page/${page.slug}`}
              className="text-neutral-400 text-xs font-medium hover:text-white transition-colors"
            >
              {page.title}
            </Link>
          ))}
          <Link
            href="/page/about-us"
            className="text-neutral-400 text-xs font-medium hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/page/contact"
            className="text-neutral-400 text-xs font-medium hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-neutral-500 text-xs">
          © {new Date().getFullYear()} Quality Products. All rights reserved.
          Discover Quality, Choose with Confidence.
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-all hover:-translate-y-1"
          style={{ color: '#60a5fa' }}
        >
          Back to Top
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}
