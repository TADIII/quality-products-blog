import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, FolderOpen, Users, Eye, Plus } from 'lucide-react'

export default async function AdminDashboard() {
  const site = await db.site.findFirst()
  
  const [postsCount, categoriesCount, authorsCount, publishedCount] = await Promise.all([
    db.post.count({ where: { siteId: site?.id } }),
    db.category.count({ where: { siteId: site?.id } }),
    db.author.count({ where: { siteId: site?.id } }),
    db.post.count({ where: { siteId: site?.id, published: true } }),
  ])

  const recentPosts = await db.post.findMany({
    where: { siteId: site?.id },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = [
    { name: 'Total Posts', value: postsCount, icon: FileText, color: 'text-blue-500' },
    { name: 'Categories', value: categoriesCount, icon: FolderOpen, color: 'text-green-500' },
    { name: 'Authors', value: authorsCount, icon: Users, color: 'text-purple-500' },
    { name: 'Published', value: publishedCount, icon: Eye, color: 'text-orange-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your multi-site CMS admin panel
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Posts</CardTitle>
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {post.category.name} • {post.published ? 'Published' : 'Draft'}
                  </p>
                </div>
                <Link href={`/admin/posts/${post.id}`}>
                  <Button variant="ghost" size="sm">Edit</Button>
                </Link>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No posts yet. Create your first post!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
