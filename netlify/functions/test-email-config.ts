import { Handler, HandlerEvent } from '@netlify/functions';

/**
 * Email Configuration Test Endpoint
 *
 * This is a diagnostic endpoint to help verify your SendGrid setup.
 *
 * Access: https://your-site.netlify.app/.netlify/functions/test-email-config
 *
 * This endpoint checks:
 * - If SENDGRID_API_KEY is set
 * - If SENDGRID_FROM_EMAIL is set
 * - If RECAPTCHA_SECRET_KEY is set
 * - API key format validation
 *
 * NOTE: This does NOT expose your actual keys, only checks if they're configured
 */

const handler: Handler = async (event: HandlerEvent) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed. Use GET request.' }),
    };
  }

  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Check configuration status
  const checks = {
    sendgridApiKey: {
      configured: !!sendgridApiKey && sendgridApiKey !== 'your_sendgrid_api_key_here',
      format: sendgridApiKey?.startsWith('SG.') ? 'valid' : 'invalid',
      length: sendgridApiKey ? sendgridApiKey.length : 0,
      status: '',
    },
    sendgridFromEmail: {
      configured: !!sendgridFromEmail && sendgridFromEmail !== 'noreply@sungur-electronics.com',
      value: sendgridFromEmail || 'NOT SET',
      isDefault: sendgridFromEmail === 'info@sungur-electronics.com',
      status: '',
    },
    recaptchaSecretKey: {
      configured: !!recaptchaSecretKey && recaptchaSecretKey !== 'your_secret_key_here',
      status: '',
    },
  };

  // Determine status messages
  if (!checks.sendgridApiKey.configured) {
    checks.sendgridApiKey.status = '❌ NOT CONFIGURED - Add SENDGRID_API_KEY to Netlify environment variables';
  } else if (!checks.sendgridApiKey.format) {
    checks.sendgridApiKey.status = '⚠️  INVALID FORMAT - API key should start with "SG."';
  } else {
    checks.sendgridApiKey.status = '✅ Configured correctly';
  }

  if (!checks.sendgridFromEmail.configured) {
    checks.sendgridFromEmail.status = '❌ NOT CONFIGURED - Add SENDGRID_FROM_EMAIL to Netlify environment variables';
  } else if (!checks.sendgridFromEmail.isDefault) {
    checks.sendgridFromEmail.status = '⚠️  Custom email set - make sure it is verified in SendGrid';
  } else {
    checks.sendgridFromEmail.status = '✅ Set to default (info@sungur-electronics.com)';
  }

  if (!checks.recaptchaSecretKey.configured) {
    checks.recaptchaSecretKey.status = '❌ NOT CONFIGURED - Add RECAPTCHA_SECRET_KEY to Netlify environment variables';
  } else {
    checks.recaptchaSecretKey.status = '✅ Configured correctly';
  }

  // Overall status
  const allGood =
    checks.sendgridApiKey.configured &&
    checks.sendgridApiKey.format === 'valid' &&
    checks.sendgridFromEmail.configured &&
    checks.recaptchaSecretKey.configured;

  const response = {
    status: allGood ? 'READY' : 'NEEDS CONFIGURATION',
    timestamp: new Date().toISOString(),
    checks: {
      sendgrid: {
        apiKey: checks.sendgridApiKey.status,
        fromEmail: checks.sendgridFromEmail.status,
        fromEmailValue: checks.sendgridFromEmail.value,
      },
      recaptcha: {
        secretKey: checks.recaptchaSecretKey.status,
      },
    },
    nextSteps: allGood ? [
      '✅ All environment variables are configured!',
      '📧 Next: Verify sender email in SendGrid Dashboard',
      '🧪 Test: Submit the contact form and check if email arrives',
      '📊 Monitor: Check Netlify function logs and SendGrid Activity',
    ] : [
      '1. Go to Netlify Dashboard → Site settings → Environment variables',
      '2. Add missing environment variables (see status above)',
      '3. Redeploy your site after adding variables',
      '4. Run this test again: /.netlify/functions/test-email-config',
      '5. See SENDGRID_SETUP.md for detailed instructions',
    ],
    documentation: {
      setup: 'See SENDGRID_SETUP.md in the repository',
      troubleshooting: 'See TROUBLESHOOTING.md for common issues',
    },
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(response, null, 2),
  };
};

export { handler };
