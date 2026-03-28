// Import data to PostgreSQL from JSON files
// Run this after switching to PostgreSQL schema and pushing the schema

import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('📥 Importing data to PostgreSQL...')
  
  const exportDir = path.join(process.cwd(), '.migration-export')
  
  if (!fs.existsSync(exportDir)) {
    console.error('❌ No export directory found. Run export-sqlite.ts first.')
    process.exit(1)
  }

  // Import in order of dependencies
  const importOrder = [
    'site',
    'author', 
    'category',
    'tag',
    'post',
    'page',
    'menu',
    'siteSetting',
  ]

  for (const table of importOrder) {
    const filePath = path.join(exportDir, `${table}.json`)
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️ ${table}: skipped (no export file)`)
      continue
    }

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
      if (data.length === 0) {
        console.log(`  ⏭️ ${table}: no records to import`)
        continue
      }

      // @ts-ignore - dynamic model access
      await prisma[table].createMany({
        data,
        skipDuplicates: true,
      })

      console.log(`  ✅ ${table}: ${data.length} records imported`)
    } catch (error) {
      console.log(`  ❌ ${table}: import failed - ${error}`)
    }
  }

  console.log('')
  console.log('✅ Import complete!')
  console.log('')
  console.log('Verify your data and deploy!')
}

main()
  .catch((error) => {
    console.error('❌ Import failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
