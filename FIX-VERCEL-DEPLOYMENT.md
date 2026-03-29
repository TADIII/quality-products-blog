# 🚀 Fix Your Vercel Deployment - Step by Step Guide

Your site is showing "Site not found. Please run the seed script first." because:
1. **SQLite doesn't work on Vercel** (serverless platforms need cloud databases)
2. **The database needs to be seeded** with initial content

## ✅ Follow These Steps Exactly

### Step 1: Add Vercel Postgres Database

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your **Quality Products** project
3. Click on the **Storage** tab at the top
4. Click **Create Database**
5. Select **Postgres** (Neon)
6. Choose a name like `quality-products-db`
7. Select the **Hobby** (free) plan
8. Click **Create**
9. **IMPORTANT**: After creation, click **Connect to Project**
10. Select your project and click **Connect**

This will automatically add the `DATABASE_URL` environment variable to your project.

### Step 2: Push the Updated Code to GitHub

You need to update your GitHub repository with the fixed code. 

**Option A: If you can access your local files**
```bash
git add .
git commit -m "Fix: Switch to PostgreSQL for Vercel deployment"
git push origin main
```

**Option B: If you need the updated files**
- Download the updated files from me and push them to your GitHub

### Step 3: Trigger a New Deployment

1. Go to your **Vercel Dashboard**
2. Click on your project
3. Go to **Deployments** tab
4. Click the **...** (three dots) on the latest deployment
5. Click **Redeploy**

OR simply push new code to GitHub - Vercel will auto-deploy.

### Step 4: Seed the Database

After the deployment succeeds:

1. Go to your live site URL: `https://your-project-name.vercel.app`
2. Add `/api/seed` to the URL: `https://your-project-name.vercel.app/api/seed`
3. Press **Enter** to visit this URL
4. You should see a success message like:
   ```json
   {
     "success": true,
     "message": "Database seeded successfully!",
     "data": {
       "site": "Quality Products",
       "categories": 8,
       "posts": 7,
       "pages": 3
     }
   }
   ```
5. Now visit your homepage: `https://your-project-name.vercel.app`
6. Your site should now show all the articles!

---

## 🔒 (Optional) Protect the Seed Endpoint

To prevent unauthorized people from seeding your database:

1. Go to your **Vercel Dashboard**
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `SEED_SECRET`
   - **Value**: Any random string (e.g., `my-secret-key-12345`)
5. Click **Save**
6. Redeploy your project
7. Now to seed, you need to add the secret to the URL:
   `https://your-project-name.vercel.app/api/seed?secret=my-secret-key-12345`

---

## 📝 Summary

| Step | What to Do | Where |
|------|------------|-------|
| 1 | Create Vercel Postgres database | Vercel Dashboard → Storage |
| 2 | Connect database to your project | Vercel Dashboard → Storage → Connect |
| 3 | Push updated code to GitHub | Your local machine or download |
| 4 | Redeploy on Vercel | Vercel Dashboard → Deployments |
| 5 | Visit `/api/seed` to seed database | Your live site URL |
| 6 | Enjoy your live site! | Your live site homepage |

---

## ❓ Troubleshooting

### "Database connection error"
- Make sure you connected the Postgres database to your project in Step 1
- Check that `DATABASE_URL` appears in your Environment Variables

### "Migration failed"
- The migration files are now included in the updated code
- Make sure you pushed all files including the `prisma/migrations/` folder

### "Still showing Site not found"
- Make sure you visited `/api/seed` after the deployment succeeded
- Check the Vercel Functions logs for any errors

### Need more help?
- Check Vercel deployment logs: Project → Deployments → Click on deployment → View Function Logs
