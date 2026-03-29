// Export SQLite data to JSON files
// Run this before switching to PostgreSQL schema

import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('📤 Exporting SQLite data...')
  
  // Create export directory
  const exportDir = path.join(process.cwd(), '.migration-export')
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  // Export all tables
  const tables = ['site', 'author', 'category', 'tag', 'post', 'page', 'menu', 'siteSetting']
  
  for (const table of tables) {
    try {
      // @ts-ignore - dynamic model access
      const data = await prisma[table].findMany()
      
      const filePath = path.join(exportDir, `${table}.json`)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      
      console.log(`  ✅ ${table}: ${data.length} records`)
    } catch (error) {
      console.log(`  ⏭️ ${table}: skipped (may not exist)`)
    }
  }

  console.log('')
  console.log(`✅ Data exported to ${exportDir}/`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Switch to PostgreSQL schema')
  console.log('2. Run: bun scripts/import-postgres.ts')
}

main()
  .catch((error) => {
    console.error('❌ Export failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
