import emailjs from '@emailjs/browser'

export interface ContactPayload {
  /** Placeholder names match the default EmailJS template variables. */
  from_name: string
  reply_to: string
  subject: string
  message: string
}

export type SendResult =
  | { ok: true }
  | { ok: false; code: 'not-configured' | 'error'; message: string }

/**
 * Sends a message using EmailJS.
 *
 * Credentials are read from `.env` (via `import.meta.env`) and are the
 * EmailJS PUBLIC key / service id / template id — designed by EmailJS to
 * be safe in frontend code. Private keys must never live in the browser,
 * which is why EmailJS only exposes a public key here.
 *
 * If the environment variables are missing, we return `not-configured`
 * instead of pretending the message was sent.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<SendResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    return {
      ok: false,
      code: 'not-configured',
      message: 'The contact form is not set up yet. Add your EmailJS credentials to the .env file (see README.md).',
    }
  }

  try {
    await emailjs.send(serviceId, templateId, { ...payload }, { publicKey })
    return { ok: true }
  } catch (error) {
    console.error('EmailJS send failed:', error)
    return {
      ok: false,
      code: 'error',
      message: "Something went wrong while sending your message. Please try again, or email me directly.",
    }
  }
}