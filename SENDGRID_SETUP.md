# SendGrid Email Setup - Quick Start Guide

This guide will help you set up email delivery for the contact form in **5 minutes**.

## What You Need

- A SendGrid account (free tier is fine - 100 emails/day)
- Access to your Netlify dashboard
- 5 minutes of your time

---

## Step 1: Create SendGrid Account (2 minutes)

1. Go to [https://sendgrid.com/](https://sendgrid.com/)
2. Click **"Start for Free"**
3. Fill out the form and verify your email
4. Complete the onboarding wizard

**Cost:** FREE (100 emails/day - perfect for contact forms)

---

## Step 2: Create API Key (1 minute)

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Settings:
   - **Name:** `Sungur Electronics Contact Form`
   - **Access:** Restricted Access
   - **Mail Send:** Full Access (turn ON)
4. Click **"Create & View"**
5. **⚠️ COPY THE KEY NOW** (starts with `SG.xxxxx...`) - you can't see it again!

---

## Step 3: Verify Sender Email (2 minutes)

You must verify the email address you'll send FROM.

### Option A: Quick Single Sender (Recommended for testing)

1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in:
   - **From Email:** `info@sungur-electronics.com`
   - **From Name:** `Sungur Electronics`
   - Fill in other required fields
4. Click **"Create"**
5. **Check your inbox** (`info@sungur-electronics.com`) for verification email
6. Click the verification link

### Option B: Domain Authentication (Better for production)

1. Go to **Settings** → **Sender Authentication**
2. Click **"Authenticate Your Domain"**
3. Select your DNS host
4. Add the DNS records they provide to your domain
5. Wait for verification (can take up to 48 hours)

---

## Step 4: Add to Netlify (1 minute)

1. Go to your Netlify dashboard
2. Select your site → **Site settings** → **Environment variables**
3. Click **"Add a variable"** and add these two:

   **Variable 1:**
   ```
   Key: SENDGRID_API_KEY
   Value: SG.xxxxxxxxxxxxxxxxxxxxxxxxxx (paste your API key from Step 2)
   ```

   **Variable 2:**
   ```
   Key: SENDGRID_FROM_EMAIL
   Value: info@sungur-electronics.com (must match verified email from Step 3)
   ```

4. **Save** the variables

---

## Step 5: Deploy & Test

1. The code is already updated - just push to trigger a new deployment, or trigger a manual redeploy in Netlify
2. Wait for deployment to complete (~2 minutes)
3. Go to your live site: https://sungur-electronics.com/contacts
4. Fill out and submit the contact form
5. Check your email at `info@sungur-electronics.com`

---

## Troubleshooting

### ❌ Emails not arriving?

**Check SendGrid Activity:**
1. Go to SendGrid → **Activity**
2. See if your email appears
3. Check the status (Delivered, Bounced, etc.)

**Common Issues:**
- ✅ Check your spam folder
- ✅ Verify `SENDGRID_FROM_EMAIL` is verified in SendGrid
- ✅ Make sure API key starts with `SG.`
- ✅ Check Netlify function logs for errors

### ❌ "Sender not verified" error?

You need to verify the sender email in SendGrid (Step 3).
After verification, wait 2-3 minutes and try again.

### ❌ "API key invalid" error?

1. Check the API key in Netlify environment variables
2. Make sure there are no spaces before/after
3. The key should start with `SG.`
4. Try creating a new API key in SendGrid

---

## How to Check if It's Working

### Check Netlify Function Logs:
1. Go to Netlify dashboard
2. **Functions** tab
3. Click on `verify-recaptcha`
4. Check the logs for "Email sent successfully"

### Check SendGrid Activity:
1. Go to SendGrid dashboard
2. **Activity** tab
3. Look for recent emails
4. Status should show "Delivered"

---

## Current Configuration

When properly configured, the contact form will:

✅ Send email **TO:** `info@sungur-electronics.com`
✅ Send email **FROM:** `info@sungur-electronics.com` (your verified email)
✅ Include all form fields (name, email, phone, message)
✅ Include both plain text and HTML formatted email
✅ Show timestamp in Ashgabat timezone

---

## Need Help?

- **SendGrid Docs:** https://docs.sendgrid.com/
- **SendGrid Support:** https://support.sendgrid.com/
- **Netlify Docs:** https://docs.netlify.com/functions/overview/

---

## Security Notes

✅ **Your API key is secure** - it's only stored in Netlify's environment variables, never exposed to the frontend
✅ **Sender verification prevents spoofing** - you can only send from verified emails
✅ **reCAPTCHA prevents spam** - bots can't submit the form
✅ **Rate limited by SendGrid** - free tier is 100 emails/day (sufficient for contact forms)

---

**That's it! Your contact form should now send emails to info@sungur-electronics.com** 📧
