# reCAPTCHA Setup Guide

This project uses Google reCAPTCHA v2 to protect the contact form from spam and bots.

## Configuration

### Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

```env
VITE_RECAPTCHA_SITE_KEY=6Le6soUsAAAAAOGuibG0IIEPUCmfGmS5DFMZRiVf
RECAPTCHA_SECRET_KEY=6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF
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
   - Add both variables:
     - `VITE_RECAPTCHA_SITE_KEY` = `6Le6soUsAAAAAOGuibG0IIEPUCmfGmS5DFMZRiVf`
     - `RECAPTCHA_SECRET_KEY` = `6Le6soUsAAAAAGgHcpDkoeu-fnfrno1mHdLvDeQF`

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

## Extending the Function

The serverless function can be extended to:

- **Send emails** using SendGrid, AWS SES, or nodemailer
- **Save to database** (MongoDB, PostgreSQL, Airtable, etc.)
- **Send notifications** to Slack, Discord, etc.
- **Forward to CRM** (HubSpot, Salesforce, etc.)

Example with SendGrid:

```typescript
// In netlify/functions/verify-recaptcha.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// After reCAPTCHA verification succeeds:
await sgMail.send({
  to: 'info@sungur-electronics.com',
  from: 'noreply@sungur-electronics.com',
  subject: `New Contact Form: ${formData.name}`,
  text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
});
```

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
