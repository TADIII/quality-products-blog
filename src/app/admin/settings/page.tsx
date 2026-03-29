import { db } from '@/lib/db'
import { Settings as SettingsIcon, Palette, Globe, Bell } from 'lucide-react'

export default async function SettingsPage() {
  const site = await db.site.findFirst()

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your site settings
        </p>
      </div>

      {/* Site Info */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Site Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Site Name</label>
            <p className="mt-1">{site?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="mt-1">{site?.description}</p>
          </div>
          {site?.domain && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Domain</label>
              <p className="mt-1">{site.domain}</p>
            </div>
          )}
        </div>
      </div>

      {/* Branding */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Branding</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Primary Color</label>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: site?.primaryColor }}
                />
                <code className="text-sm">{site?.primaryColor}</code>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Secondary Color</label>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: site?.secondaryColor }}
                />
                <code className="text-sm">{site?.secondaryColor}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-site Info */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Multi-Site CMS</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          This CMS supports managing multiple sites from a single installation.
          Each site can have its own branding, content, authors, and categories.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          To add a new site, use the Sites page or create it programmatically.
        </p>
      </div>

      {/* Features */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Features</h2>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Multi-site support</li>
          <li>✓ Markdown content editing</li>
          <li>✓ Category management</li>
          <li>✓ Author management</li>
          <li>✓ SEO optimization</li>
          <li>✓ Dark mode support</li>
          <li>✓ Responsive design</li>
        </ul>
      </div>
    </div>
  )
}
