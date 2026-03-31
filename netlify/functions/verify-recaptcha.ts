import { Handler, HandlerEvent } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface RequestBody {
  token: string;
  formData?: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  };
}

const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { token, formData }: RequestBody = JSON.parse(event.body || '{}');

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'reCAPTCHA token is required' }),
      };
    }

    // Verify reCAPTCHA with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const recaptchaResponse = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData: RecaptchaVerifyResponse = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'reCAPTCHA verification failed',
          details: recaptchaData['error-codes'],
        }),
      };
    }

    // reCAPTCHA verification successful
    console.log('Contact form submission verified:', {
      timestamp: new Date().toISOString(),
      formData,
      verified: true,
    });

    // Send email via SendGrid
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL || 'info@sungur-electronics.com';

    if (!sendgridApiKey || sendgridApiKey === 'your_sendgrid_api_key_here') {
      console.error('❌ SENDGRID_API_KEY is not configured in Netlify environment variables');
      console.error('📧 Email will NOT be sent. Form data logged below:');
      console.log('Form submission:', JSON.stringify(formData, null, 2));
      console.error('⚠️  ACTION REQUIRED: Configure SendGrid in Netlify. See SENDGRID_SETUP.md');

      // Still return success to user, but log the error
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Form submitted successfully (email not configured)',
        }),
      };
    }

    try {
      sgMail.setApiKey(sendgridApiKey);

      const phoneInfo = formData?.phone ? `Phone: ${formData.phone}\n` : '';
      const emailTo = 'info@sungur-electronics.com';

      console.log('📧 Attempting to send email...');
      console.log(`   From: ${sendgridFromEmail}`);
      console.log(`   To: ${emailTo}`);
      console.log(`   Subject: New Contact Form Submission from ${formData?.name || 'Unknown'}`);

      await sgMail.send({
        to: emailTo,
        from: sendgridFromEmail,
        subject: `New Contact Form Submission from ${formData?.name || 'Unknown'}`,
        text: `You have received a new message from the contact form on sungur-electronics.com:

Name: ${formData?.name || 'N/A'}
Email: ${formData?.email || 'N/A'}
${phoneInfo}
Message:
${formData?.message || 'N/A'}

---
Submitted at: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p>You have received a new message from the contact form on <strong>sungur-electronics.com</strong>:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData?.name || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData?.email}">${formData?.email || 'N/A'}</a></td>
              </tr>
              ${formData?.phone ? `
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${formData?.message || 'N/A'}</td>
              </tr>
            </table>

            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ashgabat' })} (Ashgabat time)
            </p>
          </div>
        `,
      });

      console.log('✅ Email sent successfully to info@sungur-electronics.com');
      console.log('📬 Check the inbox for the message');
    } catch (emailError: any) {
      console.error('❌ Failed to send email via SendGrid');
      console.error('Error details:', emailError);

      if (emailError.response?.body) {
        console.error('SendGrid response:', JSON.stringify(emailError.response.body, null, 2));

        // Provide specific error guidance
        const errorBody = emailError.response.body;
        if (errorBody.errors) {
          errorBody.errors.forEach((err: any) => {
            if (err.message?.includes('does not contain a valid address')) {
              console.error('⚠️  Sender email not verified in SendGrid');
              console.error(`   Please verify ${sendgridFromEmail} in SendGrid Dashboard`);
              console.error('   See SENDGRID_SETUP.md for instructions');
            }
            if (err.message?.includes('api key')) {
              console.error('⚠️  Invalid SendGrid API key');
              console.error('   Please check SENDGRID_API_KEY in Netlify environment variables');
            }
          });
        }
      }

      console.error('⚠️  Form data was captured but email was NOT sent:');
      console.log(JSON.stringify(formData, null, 2));

      // Still return success to user to avoid confusion
      // but log the error for debugging
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
      }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
