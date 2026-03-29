import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import {
  FileText,
  FolderTree,
  Users,
  Layout,
  Settings,
  AlertCircle,
  Database,
} from 'lucide-react'
import { SeedButton } from './seed-button'

export default async function AdminDashboard() {
  // Get counts
  const [site, postsCount, categoriesCount, authorsCount] = await Promise.all([
    db.site.findFirst(),
    db.post.count(),
    db.category.count(),
    db.author.count(),
  ])

  const isSeeded = !!site && authorsCount > 0 && categoriesCount > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your CMS dashboard
        </p>
      </div>

      {/* Setup Warning */}
      {!isSeeded && (
        <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-5 w-5" />
              Database Setup Required
            </CardTitle>
            <CardDescription className="text-amber-600 dark:text-amber-300">
              Your database needs to be seeded before you can create posts.
              {!site && " No site found."}
              {site && authorsCount === 0 && " No authors found."}
              {site && categoriesCount === 0 && " No categories found."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeedButton />
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
            <p className="text-xs text-muted-foreground">
              Blog posts created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesCount}</div>
            <p className="text-xs text-muted-foreground">
              Content categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorsCount}</div>
            <p className="text-xs text-muted-foreground">
              Content creators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Status</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {site ? 'Active' : 'Setup'}
            </div>
            <p className="text-xs text-muted-foreground">
              {site ? site.name : 'Needs configuration'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/posts/new">
              <Button>Create New Post</Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline">Manage Categories</Button>
            </Link>
            <Link href="/admin/sites">
              <Button variant="outline">Site Settings</Button>
            </Link>
            <SeedButton variant="outline" />
          </div>
        </CardContent>
      </Card>

      {/* Site Info */}
      {site && (
        <Card>
          <CardHeader>
            <CardTitle>Site Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{site.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Description</TableCell>
                  <TableCell>{site.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Primary Color</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: site.primaryColor }}
                      />
                      {site.primaryColor}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Secondary Color</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: site.secondaryColor }}
                      />
                      {site.secondaryColor}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
