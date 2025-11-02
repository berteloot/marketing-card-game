# Deploying Campaign Spark to Render

## Quick Deploy Steps

### Option 1: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

2. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Or go to: https://dashboard.render.com/new/static-site

3. **Connect Your Repository**
   - Choose "Connect a repository"
   - Select GitHub
   - Authorize Render to access your GitHub
   - Select repository: `berteloot/marketing-card-game`
   - Click "Connect"

4. **Configure Build Settings**
   - **Name**: `campaign-spark` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - Click "Create Static Site"

5. **Add Environment Variables** (Optional)
   - Go to "Environment" tab
   - Add `VITE_OPENAI_API_KEY` = your OpenAI API key (if you want AI features)
   - Add `VITE_MEETING_URL` = your meeting URL (optional, defaults to HubSpot link)
   - Click "Save Changes"

6. **Deploy**
   - Render will automatically build and deploy
   - Wait for deployment to complete (~2-3 minutes)
   - Your app will be live at: `https://campaign-spark.onrender.com` (or your custom domain)

### Option 2: Using Render.yaml (Auto-detected)

If you commit the `render.yaml` file:
- Render will automatically detect it
- Just connect your repo and it will use the settings from the file

## Custom Domain (Optional)

1. Go to your site settings
2. Click "Custom Domains"
3. Add your domain (e.g., `campaignspark.com`)
4. Follow DNS configuration instructions

## Environment Variables in Render

In Render dashboard:
- Go to your Static Site
- Click "Environment" tab
- Add variables:
  - `VITE_OPENAI_API_KEY` (your OpenAI key)
  - `VITE_MEETING_URL` (optional, defaults to HubSpot link)

## Notes

- Render Static Sites are **free** for unlimited sites
- Builds automatically on every push to `main`
- Custom domains are free
- SSL certificates are automatically provisioned

## Troubleshooting

**Build fails?**
- Check build logs in Render dashboard
- Ensure `package.json` has correct scripts
- Verify Node.js version (Render uses latest LTS)

**App works locally but not on Render?**
- Check environment variables are set
- Verify `dist` folder is being generated
- Check browser console for errors

**Need help?**
- Render docs: https://render.com/docs
- Static site docs: https://render.com/docs/static-sites

