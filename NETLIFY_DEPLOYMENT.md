# Netlify Deployment Guide for sungur-electronics.com

## Overview
This guide will help you deploy your site to Netlify with reCAPTCHA v2 backend verification properly configured.

## Prerequisites
- Netlify account
- GitHub repository connected to Netlify
- reCAPTCHA keys from Google Console

## Step 1: Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository: `Azeho/basic-build-boss`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

## Step 2: Configure Environment Variables

⚠️ **CRITICAL**: You must add your reCAPTCHA secret key to Netlify environment variables for backend verification to work.

### Add Environment Variables in Netlify:

1. Go to your site dashboard in Netlify
2. Navigate to **Site configuration** → **Environment variables**
3. Click **"Add a variable"** and add the following:

| Key | Value | Visibility |
|-----|-------|------------|
| `VITE_RECAPTCHA_SITE_KEY` | `6Le6s0UsAAAAAOGuib60IIEPUCmfGmS5DFMZRiVf` | Public |
| `RECAPTCHA_SECRET_KEY` | `6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF` | **Secret** ⚠️ |

⚠️ **IMPORTANT**:
- Mark `RECAPTCHA_SECRET_KEY` as **sensitive/secret**
- Never commit this to Git
- Never expose it in frontend code

### Alternative: Using Netlify CLI

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your local repository to Netlify site
netlify link

# Set environment variables
netlify env:set VITE_RECAPTCHA_SITE_KEY "6Le6s0UsAAAAAOGuib60IIEPUCmfGmS5DFMZRiVf"
netlify env:set RECAPTCHA_SECRET_KEY "6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF"
```

## Step 3: Configure Custom Domain (Optional)

If you want to use `sungur-electronics.com`:

1. In Netlify dashboard, go to **Domain management**
2. Click **"Add a domain"**
3. Enter: `sungur-electronics.com`
4. Follow DNS configuration instructions from Netlify

### Update reCAPTCHA Domains

After configuring your domain, update your reCAPTCHA key:

1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Edit your key
3. Add domains:
   - `sungur-electronics.com`
   - `www.sungur-electronics.com`
   - `your-app.netlify.app` (your Netlify subdomain)
   - `localhost` (for local development)

## Step 4: Deploy

### Automatic Deployment (Recommended)

Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Configure reCAPTCHA with correct keys"
git push origin claude/rebuild-website-01WEwBgPiZFU1JMWxqx7YAGq
```

### Manual Deployment

1. In Netlify dashboard, click **"Deploys"**
2. Click **"Trigger deploy"** → **"Deploy site"**

### Using Netlify CLI

```bash
# Build and deploy
netlify deploy --prod
```

## Step 5: Verify reCAPTCHA Integration

After deployment:

1. Visit your deployed site
2. Go to the **Contact** page
3. Fill out the form and complete the reCAPTCHA
4. Submit the form
5. Check Netlify function logs:
   - Go to **Functions** tab in Netlify dashboard
   - Click on `verify-recaptcha`
   - Check the logs for successful verification

### Check Google reCAPTCHA Console

Within 24 hours, check your [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin):

- The **"Unprotected"** warning should disappear
- You should see verification requests in the metrics
- Backend integration status should show ✅ green checkmark

## Troubleshooting

### Issue: "Backend verification not working"

**Check:**
1. Environment variable is set correctly in Netlify:
   ```bash
   netlify env:list
   ```
2. Function is deployed:
   - Check Netlify **Functions** tab
   - Look for `verify-recaptcha` function
3. Function logs for errors:
   - View logs in Netlify dashboard under **Functions**

### Issue: "RECAPTCHA_SECRET_KEY is not set"

**Solution:**
- Add the secret key to Netlify environment variables (see Step 2)
- Redeploy the site after adding the variable

### Issue: "reCAPTCHA verification failed"

**Possible causes:**
1. Wrong secret key → Verify key in Netlify env vars
2. Domain not added to reCAPTCHA → Add domain in Google Console
3. Keys mismatch → Ensure frontend and backend use matching key pair

### Issue: Function returns 404

**Check:**
- `netlify.toml` has correct redirect configuration
- Functions directory is set to `netlify/functions`
- Function file is named `verify-recaptcha.ts`

## Testing Locally

To test the backend verification locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local development server with functions
netlify dev
```

This will:
- Start Vite dev server
- Run Netlify functions locally
- Load environment variables from `.env`

## Security Best Practices

✅ **DO:**
- Keep `RECAPTCHA_SECRET_KEY` in environment variables only
- Mark secret key as sensitive in Netlify
- Use different keys for development and production
- Regularly monitor reCAPTCHA console for suspicious activity

❌ **DON'T:**
- Never commit `.env` file to Git (already in `.gitignore`)
- Never expose secret key in frontend code
- Never share secret key publicly
- Don't use the same keys across multiple domains

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [reCAPTCHA v2 Documentation](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## Support

If you encounter issues:
1. Check Netlify function logs
2. Verify environment variables are set
3. Check Google reCAPTCHA console for errors
4. Review this guide's troubleshooting section

---

**Last Updated**: 2026-03-20
**reCAPTCHA Version**: v2 (Checkbox)
**Netlify Functions**: Enabled
