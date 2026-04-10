# Build Instructions for Production Deployment

This document explains how to build the website properly to match the working dist4.4.zip configuration.

## Prerequisites

1. **Node.js and npm** installed
2. **Google reCAPTCHA v2 keys** (required for contact form)

## Setup Before Building

### 1. Create .env file with reCAPTCHA keys

**CRITICAL**: The reCAPTCHA checkbox will NOT appear in the contact form unless you set up the environment variables before building.

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your actual reCAPTCHA keys
# Get keys from: https://www.google.com/recaptcha/admin
```

Your `.env` file should look like:
```
VITE_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Install dependencies

```bash
npm install
```

## Building for Production

### Standard Production Build

```bash
npm run build
```

This will:
- Create a `dist/` folder with all production files
- Use legacy mode for older browser support (System.import)
- Include reCAPTCHA checkbox if environment variables are set
- Copy .htaccess to dist folder automatically
- Minify and optimize all assets

### Build Output

After building, the `dist/` folder will contain:
- `index.html` - Main HTML file
- `assets/` - All JavaScript, CSS, and image files
  - `index-legacy-*.js` - Main application bundle (~540KB)
  - `polyfills-legacy-*.js` - Polyfills for older browsers (~45KB)
- `.htaccess` - Server configuration for Apache
- `contact.php` - Contact form handler
- `robots.txt` - SEO configuration
- `sitemap.xml` - Sitemap for search engines

## Creating Deployment Package

```bash
# After successful build, create zip file
cd dist
zip -r ../dist-production.zip .
cd ..
```

## Deployment

1. Extract the zip file on your server
2. Ensure the server has:
   - Apache with mod_rewrite, mod_mime, and mod_headers enabled
   - PHP with mail() function configured
   - SSL certificate (for reCAPTCHA to work with Secure cookies)

## Server Environment Variables

On your production server, set the reCAPTCHA secret key as an environment variable:

```bash
export RECAPTCHA_SECRET_KEY=your_secret_key_here
```

Or configure it in your server's PHP environment.

## Troubleshooting

### reCAPTCHA checkbox not showing

- ✓ Verify `.env` file exists with valid keys
- ✓ Check that `VITE_RECAPTCHA_SITE_KEY` is not set to 'your_recaptcha_site_key_here'
- ✓ Rebuild after creating/updating .env file

### White screen after deployment

- ✓ Check browser console for JavaScript errors
- ✓ Verify .htaccess is present in the deployment
- ✓ Check that server allows .htaccess files (AllowOverride All)
- ✓ Ensure mod_mime module is enabled on Apache

### Contact form not sending emails

- ✓ Verify PHP mail() function is configured on server
- ✓ Check that RECAPTCHA_SECRET_KEY is set on server
- ✓ Check server PHP error logs

## Configuration Files Match

This build configuration produces output that matches `dist4.4.zip`:
- Legacy build mode for maximum compatibility
- Security headers in .htaccess
- Cookie SameSite fixes
- reCAPTCHA enabled when environment variables are set
