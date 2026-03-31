# Contact Form Email Troubleshooting Guide

## Problem: Emails Not Arriving at info@sungur-electronics.com

This guide will help you diagnose and fix email delivery issues.

---

## Step 1: Verify Netlify Environment Variables

### Check if variables are set:

1. Go to **Netlify Dashboard** → Your site → **Site settings** → **Environment variables**
2. Verify these two variables exist and are correct:

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=info@sungur-electronics.com
```

### ❌ If they're missing or set to placeholder values:

Follow the **SENDGRID_SETUP.md** guide to configure them properly.

### ❌ If they're set incorrectly:

- `SENDGRID_API_KEY` must start with `SG.`
- `SENDGRID_FROM_EMAIL` must be a verified sender in SendGrid
- **After changing:** Trigger a new deployment in Netlify

---

## Step 2: Check SendGrid Activity Log

1. Log in to **SendGrid Dashboard**
2. Go to **Activity** tab
3. Look for recent emails

### What to check:

- **If NO emails appear:** The API key might be invalid or not set in Netlify
- **If emails show "Bounced":** The recipient email might be invalid
- **If emails show "Blocked":** The sender email is not verified
- **If emails show "Delivered":** Check your spam folder!

---

## Step 3: Check Netlify Function Logs

1. Go to **Netlify Dashboard** → Your site → **Functions** tab
2. Click on **verify-recaptcha** function
3. Check recent logs

### Look for these messages:

✅ **"Email sent successfully to info@sungur-electronics.com"** = Working!
❌ **"SENDGRID_API_KEY is not set"** = Add the API key to Netlify env vars
❌ **"Failed to send email"** = Check the error details below it

---

## Step 4: Verify SendGrid Sender Authentication

### For Single Sender Verification:

1. **SendGrid Dashboard** → **Settings** → **Sender Authentication**
2. Under **Single Sender Verification**, check if `info@sungur-electronics.com` is listed
3. **Status must be "Verified"** (with a green checkmark)

### ❌ If not verified:

1. Click **"Verify a Single Sender"**
2. Enter:
   - From Email: `info@sungur-electronics.com`
   - From Name: `Sungur Electronics`
   - Reply To: `info@sungur-electronics.com`
3. Fill in other required fields
4. Click **"Create"**
5. **Check the inbox** of `info@sungur-electronics.com`
6. Click the verification link in the email

**⚠️ IMPORTANT:** You must have access to `info@sungur-electronics.com` inbox to verify it!

---

## Step 5: Test the Contact Form

1. Go to https://sungur-electronics.com/contacts
2. Fill out the form with test data
3. Complete the reCAPTCHA
4. Click **"Send Message"**
5. Check:
   - ✅ Success dialog appears (this always happens)
   - ✅ Email arrives at `info@sungur-electronics.com` (this is what we're fixing)

---

## Common Issues & Solutions

### Issue 1: "Sender not verified" in SendGrid Activity

**Solution:**
- Verify the sender email in SendGrid (see Step 4 above)
- Make sure `SENDGRID_FROM_EMAIL` in Netlify matches the verified email exactly

### Issue 2: Emails going to spam

**Solution:**
- Check your spam/junk folder
- Add the sender to your contacts
- Consider setting up Domain Authentication in SendGrid (see SENDGRID_SETUP.md)

### Issue 3: "Invalid API key" error in logs

**Solution:**
1. Go to SendGrid → **Settings** → **API Keys**
2. Create a new API key with "Mail Send" full access
3. Copy the new key (starts with `SG.`)
4. Update `SENDGRID_API_KEY` in Netlify environment variables
5. Redeploy the site

### Issue 4: No logs appear in Netlify Functions

**Solution:**
- The function might not be deploying correctly
- Check **Netlify Deploy logs** for errors
- Ensure `netlify/functions/verify-recaptcha.ts` exists in your repo

---

## How to Access Email Logs

### Netlify Function Logs:

```
Netlify Dashboard → Your Site → Functions → verify-recaptcha → Real-time logs
```

### SendGrid Activity:

```
SendGrid Dashboard → Activity → Filter by recipient: info@sungur-electronics.com
```

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] SendGrid account created
- [ ] SendGrid API key created (starts with `SG.`)
- [ ] Sender email `info@sungur-electronics.com` verified in SendGrid
- [ ] `SENDGRID_API_KEY` set in Netlify environment variables
- [ ] `SENDGRID_FROM_EMAIL` set to `info@sungur-electronics.com` in Netlify
- [ ] Site redeployed after adding environment variables
- [ ] Form submission succeeds (success dialog appears)
- [ ] Email appears in SendGrid Activity log
- [ ] Email status in SendGrid is "Delivered"
- [ ] Checked spam folder in `info@sungur-electronics.com`

---

## Still Not Working?

### Check the browser console:

1. Open the contact form page
2. Press F12 (Developer Tools)
3. Go to **Console** tab
4. Submit the form
5. Look for any error messages in red

### Check network requests:

1. In Developer Tools, go to **Network** tab
2. Submit the form
3. Look for the request to `verify-recaptcha`
4. Check the response - it should show `{"success": true, "message": "Form submitted successfully"}`

### If the function returns an error:

Look at the response body for specific error messages like:
- "reCAPTCHA verification failed"
- "Server configuration error"
- etc.

---

## Need More Help?

1. **Check Netlify function logs** for specific error messages
2. **Check SendGrid activity** to see if emails are being sent
3. Review **SENDGRID_SETUP.md** for detailed setup instructions
4. Contact SendGrid support if emails show as "Blocked" or "Bounced"

---

**Most Common Fix:** Add the SendGrid API key to Netlify environment variables and redeploy! 🎯
