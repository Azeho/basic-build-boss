# reCAPTCHA Setup Guide

This project uses Google reCAPTCHA v2 to protect the contact form from spam and bots.

## Configuration

### Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

```env
VITE_RECAPTCHA_SITE_KEY=6Le6soUsAAAAAOGuibG0IIEPUCmfGmS5DFMZRiVf
RECAPTCHA_SECRET_KEY=6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@sungur-electronics.com
```

### Deployment on Netlify

1. **Push to GitHub/GitLab**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Select your repository

3. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add all required variables:
     - `VITE_RECAPTCHA_SITE_KEY` = `6Le6soUsAAAAAOGuibG0IIEPUCmfGmS5DFMZRiVf`
     - `RECAPTCHA_SECRET_KEY` = `6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF`
     - `SENDGRID_API_KEY` = (your SendGrid API key - see SendGrid Setup below)
     - `SENDGRID_FROM_EMAIL` = `noreply@sungur-electronics.com` (must be verified in SendGrid)

4. **Deploy**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions` (auto-detected)

### Deployment on Vercel

For Vercel, you'll need to adapt the serverless function:

1. Create `api/verify-recaptcha.ts` instead of `netlify/functions/verify-recaptcha.ts`
2. Update imports to use Vercel's types
3. Configure environment variables in Vercel dashboard

## How It Works

### Frontend (React)
1. User fills out the contact form
2. User completes reCAPTCHA checkbox
3. On submit, form sends token + data to backend
4. Shows loading state during verification
5. Displays success/error message

### Backend (Serverless Function)
1. Receives reCAPTCHA token from frontend
2. Verifies token with Google's API using secret key
3. Returns success/failure to frontend
4. Logs verified submissions (can be extended to send emails, save to DB, etc.)

## Testing Locally

To test the serverless function locally with Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

This will run your site at `http://localhost:8888` with functions at `http://localhost:8888/api/verify-recaptcha`

## Security Notes

- ✅ **Secret key is NEVER exposed to frontend** (only used in serverless function)
- ✅ **Environment variables are loaded at build time** (VITE_* vars) and runtime (serverless vars)
- ✅ **All verification happens server-side** - frontend just displays the widget
- ✅ **Token is single-use** - automatically resets after submission

## SendGrid Setup (Email Delivery)

The contact form is now configured to send emails via SendGrid. Follow these steps to set it up:

### 1. Create a SendGrid Account

1. Go to [SendGrid](https://sendgrid.com/) and sign up for a free account
2. Free tier includes **100 emails per day** (perfect for contact forms)
3. Verify your email address

### 2. Create an API Key

1. Log into your SendGrid dashboard
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it (e.g., "Sungur Electronics Contact Form")
5. Select **Restricted Access** and enable only:
   - **Mail Send** → Full Access
6. Click **Create & View**
7. **IMPORTANT:** Copy the API key immediately (you won't see it again!)

### 3. Verify Sender Email (Required)

SendGrid requires you to verify the email address you send from:

1. Go to **Settings** → **Sender Authentication**
2. Choose one of two options:

   **Option A: Single Sender Verification (Easier)**
   - Click **Verify a Single Sender**
   - Add `noreply@sungur-electronics.com` or any email you own
   - Check your inbox and click the verification link

   **Option B: Domain Authentication (Recommended for production)**
   - Click **Authenticate Your Domain**
   - Follow the wizard to add DNS records to your domain
   - This allows sending from any `@sungur-electronics.com` address

### 4. Add Environment Variables

Add these to your Netlify environment variables:

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@sungur-electronics.com
```

**Note:** The `SENDGRID_FROM_EMAIL` must match the email you verified in step 3.

### 5. Deploy and Test

1. Push your changes to trigger a new deployment
2. Test the contact form on your live site
3. Check that emails arrive at `info@sungur-electronics.com`

### Troubleshooting Email Issues

**Emails not arriving?**
- Check SendGrid Activity feed (Dashboard → Activity)
- Verify the `SENDGRID_FROM_EMAIL` is verified in SendGrid
- Check spam folder
- Look at Netlify function logs for errors

**"sender not verified" error?**
- You must verify the sender email in SendGrid (step 3)
- Wait a few minutes after verification before testing

**API key invalid?**
- Double-check the API key in Netlify environment variables
- Ensure there are no extra spaces or characters
- The key should start with `SG.`

## Troubleshooting

### "Failed to submit form"
- Check browser console for error details
- Verify environment variables are set in Netlify/Vercel
- Check Functions logs in Netlify dashboard

### reCAPTCHA widget not showing
- Check browser console for script loading errors
- Verify `VITE_RECAPTCHA_SITE_KEY` is correct
- Clear browser cache

### "reCAPTCHA verification failed"
- Verify `RECAPTCHA_SECRET_KEY` is correct
- Check that domain is authorized in Google reCAPTCHA admin
- Token may have expired (valid for 2 minutes)
