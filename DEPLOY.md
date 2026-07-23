# Deploy AmiPro to Render in Under 5 Minutes

This guide gets your app live on Render using the included `render.yaml` blueprint.

## Prerequisites

- A [Render](https://render.com) account (free)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) free cluster (Render has no managed MongoDB)
- This repo pushed to GitHub

## ⚠️ Before you deploy: check your client build folder

Vite outputs to `client/dist`, Create React App outputs to `client/build`.
The `Dockerfile` assumes **Vite** (`client/dist`). If you're using CRA, change this line in `Dockerfile`:

```
COPY --from=client-build /app/client/dist ./client/dist
```
to:
```
COPY --from=client-build /app/client/build ./client/dist
```

## Step 1 — Create a free MongoDB Atlas cluster

1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster
3. Add database user (username/password)
4. Network Access → Allow access from `0.0.0.0/0` (or Render's IPs)
5. Copy your connection string, it looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/amipro`

## Step 2 — Push your code to GitHub

```bash
git init
git add .
git commit -m "Ready for deploy"
git remote add origin https://github.com/<you>/amipro.git
git push -u origin main
```

## Step 3 — Deploy on Render (3 commands / clicks)

### Option A — One-click Blueprint (recommended, no CLI needed)

1. Go to https://dashboard.render.com/blueprints
2. Click **New Blueprint Instance** → connect your GitHub repo
3. Render detects `render.yaml` automatically — click **Apply**
4. When prompted, set these env vars in the dashboard:
   - `MONGO_URI` → your Atlas connection string from Step 1
   - `CORS_ORIGIN` → your Render URL, e.g. `https://amipro.onrender.com`

Render will build and deploy automatically. Done — under 5 minutes.

### Option B — Render CLI

```bash
# 1. Install the Render CLI
curl -fsSL https://render.com/download-cli/install.sh | sh

# 2. Log in
render login

# 3. Deploy the blueprint from this repo
render blueprint launch
```

## Step 4 — Set up auto-deploy from GitHub Actions (optional)

1. In Render dashboard → your service → **Settings** → **Deploy Hook** → copy the URL
2. In GitHub repo → **Settings** → **Secrets and variables** → **Actions** → add secret:
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: (the URL you copied)
3. Every push to `main` now runs tests, builds, then triggers a Render deploy automatically.

## Step 5 — Verify it's live

```bash
curl https://amipro.onrender.com/health
```

You should get a `200 OK` response. If your `server/index.js` doesn't yet have a `/health` route, add:

```js
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
```

## Local testing with Docker (optional, before deploying)

```bash
docker compose up --build
curl http://localhost:10000/health
```

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails on client | Check Dockerfile `client/dist` vs `client/build` path (see top of this doc) |
| `MongoServerError: bad auth` | Double-check `MONGO_URI` user/password and Atlas network access |
| 502 on Render | Check `PORT` env var matches what `server/index.js` listens on (`process.env.PORT`) |
| Health check failing | Confirm `/health` route exists and returns 200 |