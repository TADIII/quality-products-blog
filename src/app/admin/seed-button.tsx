'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Database, Loader2 } from 'lucide-react'

interface SeedButtonProps {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'link'
}

export function SeedButton({ variant = 'default' }: SeedButtonProps) {
  const router = useRouter()
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSeed = async () => {
    setSeeding(true)
    setMessage(null)

    try {
      const res = await fetch('/api/seed')
      const data = await res.json()

      if (res.ok) {
        setMessage('Database seeded successfully!')
        router.refresh()
      } else {
        setMessage(data.error || 'Failed to seed database')
      }
    } catch (error) {
      setMessage('Failed to seed database. Please try again.')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        onClick={handleSeed}
        disabled={seeding}
      >
        {seeding ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Seeding...
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            Seed Database
          </>
        )}
      </Button>
      {message && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  )
}
