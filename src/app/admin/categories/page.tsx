import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit } from 'lucide-react'
import { CategoryActions } from './actions'

export default async function CategoriesPage() {
  const site = await db.site.findFirst()
  
  const categories = await db.category.findMany({
    where: { siteId: site?.id },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage post categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category._count.posts} post{category._count.posts !== 1 ? 's' : ''}
                </p>
              </div>
              <CategoryActions category={category} />
            </div>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-3">
                {category.description}
              </p>
            )}
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No categories yet. Create categories in your seed script.
          </div>
        )}
      </div>
    </div>
  )
}
