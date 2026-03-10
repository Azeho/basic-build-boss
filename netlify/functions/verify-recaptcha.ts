import { Handler, HandlerEvent } from '@netlify/functions';

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

    // Here you can add logic to:
    // - Send email via SendGrid, AWS SES, etc.
    // - Save to database
    // - Forward to another service

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
