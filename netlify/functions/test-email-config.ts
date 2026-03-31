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

  // Check if user wants JSON response (for API clients or via query param)
  const acceptHeader = event.headers?.accept || '';
  const queryParams = event.queryStringParameters || {};
  const wantsJson = acceptHeader.includes('application/json') || queryParams.json === '1' || queryParams.format === 'json';

  if (wantsJson) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(response, null, 2),
    };
  }

  // Return user-friendly HTML page
  const statusColor = allGood ? '#10b981' : '#ef4444';
  const statusEmoji = allGood ? '✅' : '⚠️';
  const statusText = allGood ? 'READY TO SEND EMAILS' : 'CONFIGURATION NEEDED';

  const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Configuration Test - Sungur Electronics</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 800px;
      width: 100%;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .status-badge {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      background: ${statusColor};
      color: white;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;
    }
    h1 {
      color: #1f2937;
      font-size: 28px;
      margin-bottom: 10px;
    }
    .timestamp {
      color: #6b7280;
      font-size: 14px;
    }
    .check-section {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .check-section h2 {
      color: #374151;
      font-size: 20px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .check-item {
      background: white;
      border-left: 4px solid #e5e7eb;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .check-item.success { border-left-color: #10b981; }
    .check-item.warning { border-left-color: #f59e0b; }
    .check-item.error { border-left-color: #ef4444; }
    .check-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 5px;
    }
    .check-value {
      color: #6b7280;
      font-size: 14px;
    }
    .next-steps {
      background: ${allGood ? '#ecfdf5' : '#fef3c7'};
      border-left: 4px solid ${allGood ? '#10b981' : '#f59e0b'};
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .next-steps h3 {
      color: #374151;
      margin-bottom: 15px;
    }
    .next-steps ol, .next-steps ul {
      margin-left: 20px;
      color: #4b5563;
      line-height: 1.8;
    }
    .next-steps li {
      margin: 8px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.3s;
      margin: 10px 10px 0 0;
    }
    .button:hover {
      background: #5568d3;
    }
    .button.secondary {
      background: #6b7280;
    }
    .button.secondary:hover {
      background: #4b5563;
    }
    .docs-link {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .code {
      background: #1f2937;
      color: #10b981;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    @media (max-width: 640px) {
      .container { padding: 20px; }
      h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="status-badge">${statusEmoji} ${statusText}</div>
      <h1>📧 Email Configuration Test</h1>
      <p class="timestamp">Tested at: ${new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ashgabat',
        dateStyle: 'full',
        timeStyle: 'long'
      })}</p>
    </div>

    <div class="check-section">
      <h2>📮 SendGrid Configuration</h2>

      <div class="check-item ${checks.sendgridApiKey.configured && checks.sendgridApiKey.format === 'valid' ? 'success' : 'error'}">
        <div class="check-label">API Key Status</div>
        <div class="check-value">${checks.sendgridApiKey.status}</div>
      </div>

      <div class="check-item ${checks.sendgridFromEmail.configured ? 'success' : 'error'}">
        <div class="check-label">Sender Email</div>
        <div class="check-value">${checks.sendgridFromEmail.status}</div>
        <div class="check-value" style="margin-top: 5px;">Current value: <span class="code">${checks.sendgridFromEmail.value}</span></div>
      </div>
    </div>

    <div class="check-section">
      <h2>🔒 reCAPTCHA Configuration</h2>

      <div class="check-item ${checks.recaptchaSecretKey.configured ? 'success' : 'error'}">
        <div class="check-label">Secret Key Status</div>
        <div class="check-value">${checks.recaptchaSecretKey.status}</div>
      </div>
    </div>

    <div class="next-steps">
      <h3>${allGood ? '✅ Next Steps - Everything Configured!' : '⚠️ Action Required'}</h3>
      ${allGood ? '<ul>' : '<ol>'}
        ${response.nextSteps.map(step => `<li>${step}</li>`).join('')}
      ${allGood ? '</ul>' : '</ol>'}
    </div>

    <div style="text-align: center; margin-top: 30px;">
      ${allGood
        ? `<a href="https://sungur-electronics.com/contacts" class="button">Test Contact Form Now</a>`
        : `<a href="https://github.com/Azeho/basic-build-boss/blob/master/EMAIL_FIX_GUIDE.md" class="button" target="_blank">View Fix Guide</a>`
      }
      <a href="?json=1" class="button secondary">View as JSON</a>
    </div>

    <div class="docs-link">
      <p style="color: #6b7280; margin-bottom: 10px;">📚 Documentation</p>
      <a href="https://github.com/Azeho/basic-build-boss/blob/master/EMAIL_FIX_GUIDE.md" target="_blank" style="color: #667eea; margin: 0 10px;">Quick Fix Guide</a>
      <a href="https://github.com/Azeho/basic-build-boss/blob/master/SENDGRID_SETUP.md" target="_blank" style="color: #667eea; margin: 0 10px;">SendGrid Setup</a>
      <a href="https://github.com/Azeho/basic-build-boss/blob/master/TROUBLESHOOTING.md" target="_blank" style="color: #667eea; margin: 0 10px;">Troubleshooting</a>
    </div>
  </div>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
    },
    body: htmlResponse,
  };
};

export { handler };
