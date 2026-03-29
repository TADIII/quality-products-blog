'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'

interface HeaderProps {
  pages?: Array<{ title: string; slug: string }>
}

export function Header({ pages = [] }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const defaultPages = [
    { title: 'About Us', slug: 'about-us' },
    { title: 'Affiliate Disclosures', slug: 'affiliate-disclosures' },
    { title: 'Privacy Policy', slug: 'privacy-policy' },
  ]

  const navPages = pages.length > 0 ? pages : defaultPages

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">
              Quality Products
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Home
            </Link>
            {navPages.map((page) => (
              <Link
                key={page.slug}
                href={`/page/${page.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {page.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button className="hidden sm:flex rounded-full px-6">
              Subscribe
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t dark:border-slate-800">
            <form action="/search" method="get" className="flex gap-2">
              <Input
                type="search"
                name="q"
                placeholder="Search articles..."
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-slate-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/page/${page.slug}`}
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {page.title}
                </Link>
              ))}
              <Button className="rounded-full w-full mt-4">
                Subscribe
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
