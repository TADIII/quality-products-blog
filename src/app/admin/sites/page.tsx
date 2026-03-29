import { db } from '@/lib/db'
import { Globe, FileText, FolderOpen, Users } from 'lucide-react'

export default async function SitesPage() {
  const sites = await db.site.findMany({
    include: {
      _count: {
        select: {
          posts: true,
          categories: true,
          authors: true,
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sites</h1>
        <p className="text-muted-foreground mt-1">
          Manage your multi-site network
        </p>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: site.primaryColor + '20' }}
              >
                <Globe
                  className="h-6 w-6"
                  style={{ color: site.primaryColor }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl">{site.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {site.description}
                </p>
                {site.domain && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {site.domain}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold">{site._count.posts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <FolderOpen className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold">{site._count.categories}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold">{site._count.authors}</p>
                <p className="text-xs text-muted-foreground">Authors</p>
              </div>
            </div>
          </div>
        ))}
        {sites.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No sites yet. Create your first site in the seed script.
          </div>
        )}
      </div>
    </div>
  )
}
