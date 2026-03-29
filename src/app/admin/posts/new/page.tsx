'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, AlertCircle, Loader2 } from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface Site {
  id: string
  name: string
}

interface Author {
  id: string
  name: string
}

export default function NewPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    imageAlt: '',
    published: false,
    featured: false,
    siteId: '',
    authorId: '',
    categoryId: '',
  })

  useEffect(() => {
    setLoading(true)
    // Fetch categories, sites, and authors
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/admin/sites').then((r) => r.json()),
      fetch('/api/site').then((r) => r.json()),
    ])
      .then(([cats, siteList, siteData]) => {
        setCategories(cats || [])
        setSites(siteList || [])
        if (siteData?.id) {
          setFormData((prev) => ({ ...prev, siteId: siteData.id }))
        }
        if (siteData?.authors?.length > 0) {
          setFormData((prev) => ({ ...prev, authorId: siteData.authors[0].id }))
          setAuthors(siteData.authors)
        }
      })
      .catch((err) => {
        console.error('Failed to load data:', err)
        setError('Failed to load form data. Please refresh the page.')
      })
      .finally(() => setLoading(false))
  }, [])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    // Validate form
    if (!formData.title.trim()) {
      setError('Title is required')
      setSaving(false)
      return
    }
    if (!formData.slug.trim()) {
      setError('Slug is required')
      setSaving(false)
      return
    }
    if (!formData.categoryId) {
      setError('Please select a category')
      setSaving(false)
      return
    }
    if (!formData.imageUrl.trim()) {
      setError('Featured image URL is required')
      setSaving(false)
      return
    }
    if (!formData.content.trim()) {
      setError('Content is required')
      setSaving(false)
      return
    }

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/posts')
      } else {
        setError(data.error || 'Failed to create post')
      }
    } catch (error) {
      setError('Failed to create post. Please check your connection.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">New Post</h1>
          <p className="text-muted-foreground">Create a new blog post</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {categories.length === 0 && (
        <Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-900">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No categories found. Please{' '}
            <Link href="/admin/categories" className="underline font-medium">
              create a category
            </Link>{' '}
            first before creating a post.
          </AlertDescription>
        </Alert>
      )}

      {authors.length === 0 && (
        <Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-900">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No authors found. Please add an author in the site settings first.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            placeholder="post-url-slug"
            required
          />
          <p className="text-xs text-muted-foreground">
            URL-friendly version of the title. Auto-generated from title.
          </p>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) =>
              setFormData({ ...formData, categoryId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            placeholder="Brief description for previews"
            rows={3}
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl">
            Featured Image URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.imageUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full max-h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        {/* Image Alt */}
        <div className="space-y-2">
          <Label htmlFor="imageAlt">Image Alt Text</Label>
          <Input
            id="imageAlt"
            value={formData.imageAlt}
            onChange={(e) =>
              setFormData({ ...formData, imageAlt: e.target.value })
            }
            placeholder="Describe the image for accessibility"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">
            Content (Markdown) <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write your post content in markdown..."
            rows={15}
            className="font-mono"
            required
          />
        </div>

        {/* Switches */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, published: checked })
              }
            />
            <Label htmlFor="published">Published</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked })
              }
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-4">
          <Link href="/admin/posts">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving || categories.length === 0 || authors.length === 0}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
