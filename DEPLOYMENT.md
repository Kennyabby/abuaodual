# Deploying to Vercel

This guide will help you deploy the Abua-Odual Local Government website to Vercel.

## Quick Deploy (Easiest Method)

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/abua-odual-website.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   
   That's it! Vercel will automatically detect the configuration from `vercel.json` and deploy your site.

## Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

## Configuration Details

The `vercel.json` file includes:

- **Static Asset Caching**: All images, CSS, and JS files are cached for 1 year for optimal performance
- **HTML Caching**: Index.html is not cached to ensure updates are always visible
- **Routing**: All routes properly serve static files
- **SPA Support**: Fallback to index.html for client-side routing

## Custom Domain

After deployment:

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `www.abuaodual.gov.ng`)
4. Follow Vercel's instructions to update your DNS records

## Environment Variables

This website doesn't require environment variables since it's purely static. All content is embedded in the HTML.

## Performance

Your site will be automatically:
- ✅ Deployed to Vercel's global CDN
- ✅ Served over HTTPS
- ✅ Optimized for speed with edge caching
- ✅ Auto-scaled based on traffic

## Troubleshooting

If you encounter issues:

1. **Build fails**: Check the Vercel deployment logs
2. **Assets not loading**: Verify file paths are correct (case-sensitive)
3. **Map not working**: Ensure you have internet connectivity (Leaflet requires external tiles)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Static Deployment Guide](https://vercel.com/docs/concepts/deployments/overview)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
