# Deployment Guide

## Quick Deploy Options

### 🚀 Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build settings are automatically configured via `netlify.toml`
3. Deploy URL will be generated automatically

### ⚡ Vercel
1. Import your GitHub repository to Vercel
2. Configuration is handled by `vercel.json`
3. Automatic deployments on every push

### 🌐 GitHub Pages
1. Enable GitHub Pages in repository settings
2. GitHub Actions workflow will automatically deploy
3. Available at: `https://arun-66102.github.io/Community-Hub`

## Manual Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create `.env` file for production:
```env
VITE_APP_TITLE=Community Help Hub
VITE_MAP_DEFAULT_LAT=40.7128
VITE_MAP_DEFAULT_LNG=-74.0060
```

## Performance Optimization

- Images are optimized for web
- CSS is minified and purged
- JavaScript is bundled and compressed
- Lazy loading implemented for components

## Domain Configuration

For custom domains, update:
1. DNS settings to point to your hosting provider
2. SSL certificates (automatically handled by most providers)
3. Update any hardcoded URLs in the application
