# Deploying to Vercel

Note: This project contains a **C++ backend**, which requires a custom runtime environment. Vercel's default environment is optimized for Node.js, Python, and Go.

## Prerequisites
1. A GitHub account with this repository connected.
2. A Vercel account.

## Steps to Deploy

### 1. Configure for C++ (Custom Runtime)
Since Vercel does not natively support C++ as a standard serverless function, you have two main options:

#### Option A: Using Vercel's Node.js Runtime with WebAssembly (Recommended)
You can compile your C++ logic to WebAssembly (Wasm) and call it from a Node.js serverless function.
1. Install Emscripten.
2. Compile `main.cpp` to Wasm.
3. Use the generated `.js` and `.wasm` files in your `api/` directory.

#### Option B: Using a Custom Runtime
Vercel allows community-built runtimes. You can look for a C++ runtime (like `vercel-cpp`) in the Vercel documentation.

### 2. Deployment Process
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **New Project** and import your repository.
4. If using a custom runtime, ensure your `vercel.json` is configured correctly:
   ```json
   {
     "functions": {
       "api/**/*.cpp": {
         "runtime": "vercel-cpp@0.1.0"
       }
     }
   }
   ```
5. Click **Deploy**.

## Local Testing
Always test your build locally using the `vercel dev` command before pushing to ensure the environment matches Vercel's infrastructure.
