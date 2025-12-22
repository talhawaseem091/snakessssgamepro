# Step-by-Step Vercel Deployment for C++

Follow these exact steps to get your C++ assignment live on Vercel.

### Step 1: Push your code to GitHub
Make sure your latest changes (including `main.cpp` and `Makefile`) are on GitHub:
1. Open the **Terminal** in Replit.
2. Run: `git add .`
3. Run: `git commit -m "Final C++ Snake Game"`
4. Run: `git push`

### Step 2: Prepare the Vercel Configuration
Vercel needs a `vercel.json` file to understand how to handle your project. I have already created this file for you in the root directory.

### Step 3: Connect to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** then **"Project"**.
3. Import your GitHub repository.
4. **IMPORTANT - Framework Override:** 
   - Vercel might automatically detect this as a "Vite" project.
   - Look for **"Framework Preset"** and change it to **"Other"**.
   - Under **"Build and Output Settings"**, make sure:
     - **Build Command** is empty (or just `true`).
     - **Output Directory** is empty.
     - **Install Command** is empty.
5. Click **"Deploy"**.

Vercel will now use our `vercel.json` instructions instead of trying to build a Vite frontend.

### Step 4: Add Environment Variables (If needed)
If your backend needs a database (like the one we set up), go to the **Settings > Environment Variables** tab in your Vercel project and add your `DATABASE_URL`.

### Important Note for your Assignment
Since Vercel is a "Serverless" platform, long-running games like a C++ GUI app are best hosted as a **WebAssembly (WASM)** front-end or as a compiled binary using a custom C++ runtime. The instructions in `vercel-deployment.md` show you how to set up the custom runtime.
